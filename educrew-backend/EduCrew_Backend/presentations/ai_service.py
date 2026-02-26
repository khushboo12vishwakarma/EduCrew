"""
AI Content Generator for Presentation Slides
Supports: Perplexity API only
"""

import json
import re
import requests
import logging
from django.conf import settings
from typing import Dict, Optional, Tuple
from functools import wraps
import time

logger = logging.getLogger(__name__)


# ============================================================================
# AI CONTENT GENERATOR CLASS
# ============================================================================


class AIContentGenerator:
    """AI-powered presentation slide generator using Perplexity API"""
    
    API_URL = "https://api.perplexity.ai/chat/completions"
    DEFAULT_MODEL = "sonar"
    DEFAULT_TIMEOUT = 60
    DEFAULT_MAX_RETRIES = 3
    
    def __init__(self, model: Optional[str] = None, timeout: int = DEFAULT_TIMEOUT, max_retries: int = DEFAULT_MAX_RETRIES):
        """
        Initialize AI Content Generator
        
        Args:
            model: Perplexity model name (default: "sonar")
            timeout: Request timeout in seconds (default: 60)
            max_retries: Maximum number of retry attempts (default: 3)
        """
        self.model = model or self.DEFAULT_MODEL
        self.timeout = timeout
        self.max_retries = max_retries
        self.api_key = self._get_api_key()
        
        logger.info(f"[AI-PERPLEXITY] Initialized with model: {self.model}")
    
    def _get_api_key(self) -> str:
        """
        Get Perplexity API key from Django settings
        
        Returns:
            API key string
        
        Raises:
            ValueError: If API key is not configured
        """
        api_key = getattr(settings, 'PERPLEXITY_API_KEY', None)
        if not api_key:
            logger.error("[AI-PERPLEXITY] API key not found in settings.PERPLEXITY_API_KEY")
            raise ValueError("PERPLEXITY_API_KEY not configured in Django settings")
        return api_key
    
    @staticmethod
    def retry_on_failure(max_attempts: int = 3, delay: float = 1.0, backoff: float = 2.0):
        """
        Retry decorator with exponential backoff
        
        Args:
            max_attempts: Maximum number of retry attempts
            delay: Initial delay between retries in seconds
            backoff: Multiplier for delay after each retry
        
        Returns:
            Decorated function with retry logic
        """
        def decorator(func):
            @wraps(func)
            def wrapper(*args, **kwargs):
                current_delay = delay
                last_exception = None
                
                for attempt in range(1, max_attempts + 1):
                    try:
                        return func(*args, **kwargs)
                    except Exception as e:
                        last_exception = e
                        
                        if attempt == max_attempts:
                            logger.error(f"[RETRY] Failed after {max_attempts} attempts: {e}")
                            raise
                        
                        logger.warning(
                            f"[RETRY] Attempt {attempt}/{max_attempts} failed: {e}. "
                            f"Retrying in {current_delay:.1f}s..."
                        )
                        time.sleep(current_delay)
                        current_delay *= backoff
                
                raise last_exception
            
            return wrapper
        return decorator
    
    def _build_prompt(self, topic: str, num_slides: int, content: Optional[str] = None) -> str:
        """
        Build optimized prompt for slide generation
        
        Args:
            topic: Presentation topic
            num_slides: Number of slides to generate
            content: Optional custom content to include
        
        Returns:
            Formatted prompt string
        """
        if content:
            return f"""You are a professional academic presentation expert.

Create a college-level PowerPoint presentation based on:
Topic: "{topic}"
Custom Content: {content}

Generate EXACTLY {num_slides} slides with professional, academic language.

STRICT RULES:
1. No citations [1][2][3]
2. No markdown formatting
3. Plain text only
4. Each slide has 3-5 bullet points
5. Bullet points: MAX 15 words each
6. Professional language

Return ONLY valid JSON (no markdown, no text before/after):

{{"slides": [{{"title": "Slide Title", "bullets": ["Point 1", "Point 2", "Point 3"]}}]}}"""
        
        return f"""You are a professional academic presentation expert.

Create a college-level PowerPoint on "{topic}".
Generate EXACTLY {num_slides} slides.

STRICT RULES:
1. No citations
2. No markdown
3. Plain text
4. 6-8 bullets per slide
6. Professional language

JSON format:
{{"slides": [{{"title": "Introduction to {topic}", "bullets": ["Point 1", "Point 2", "Point 3", "Point 3"]}}, ...]}}

Return ONLY the JSON object:"""
    
    def _build_payload(self, prompt: str) -> Dict:
        """
        Build API request payload
        
        Args:
            prompt: Formatted prompt string
        
        Returns:
            Dictionary containing API payload
        """
        return {
            "model": self.model,
            "messages": [
                {"role": "system", "content": "Return ONLY valid JSON. No explanations."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.3,
            "max_tokens": 4000,
        }
    
    def _build_headers(self) -> Dict[str, str]:
        """
        Build request headers
        
        Returns:
            Dictionary containing request headers
        """
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
    
    def _extract_json(self, text: str) -> Optional[Dict]:
        """
        Extract valid JSON from text with multiple fallback strategies
        
        Args:
            text: Raw text potentially containing JSON
        
        Returns:
            Parsed JSON dict or None
        """
        # Strategy 1: Direct JSON parse
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            pass
        
        # Strategy 2: Extract from markdown code blocks
        code_block_patterns = [
            r"``````",
            r"``````"
        ]
        for pattern in code_block_patterns:
            matches = re.findall(pattern, text)
            for match in matches:
                try:
                    return json.loads(match.strip())
                except json.JSONDecodeError:
                    continue
        
        # Strategy 3: Find largest JSON object
        matches = re.findall(r"\{[\s\S]*\}", text)
        for match in reversed(matches):  # Try largest first
            try:
                return json.loads(match)
            except json.JSONDecodeError:
                continue
        
        # Strategy 4: Extract between first { and last }
        if '{' in text and '}' in text:
            start = text.find('{')
            end = text.rfind('}') + 1
            try:
                return json.loads(text[start:end])
            except json.JSONDecodeError:
                pass
        
        logger.warning("[AI-PERPLEXITY] Failed to extract JSON from response")
        return None
    
    def _validate_slides(self, data: Dict, min_slides: int = 1) -> Tuple[bool, str]:
        """
        Validate slide data structure
        
        Args:
            data: Parsed JSON data
            min_slides: Minimum expected slides
        
        Returns:
            Tuple of (is_valid, error_message)
        """
        if not isinstance(data, dict):
            return False, "Response is not a dictionary"
        
        slides = data.get('slides')
        if not slides:
            return False, "Missing 'slides' key"
        
        if not isinstance(slides, list):
            return False, "'slides' is not a list"
        
        if len(slides) < min_slides:
            return False, f"Insufficient slides: got {len(slides)}, expected >= {min_slides}"
        
        # Validate structure of first slide
        if slides:
            first_slide = slides[0]
            if not isinstance(first_slide, dict):
                return False, "Slide is not a dictionary"
            
            if 'title' not in first_slide:
                return False, "Slide missing 'title' field"
            
            if 'bullets' not in first_slide:
                return False, "Slide missing 'bullets' field"
            
            if not isinstance(first_slide['bullets'], list):
                return False, "'bullets' is not a list"
        
        return True, ""
    
    @retry_on_failure(max_attempts=3, delay=1.0, backoff=2.0)
    def _make_api_request(self, payload: Dict, headers: Dict) -> str:
        """
        Make API request with retry logic
        
        Args:
            payload: Request payload
            headers: Request headers
        
        Returns:
            Raw response content string
        
        Raises:
            requests.exceptions.RequestException: On request failure
            ValueError: If response is empty
        """
        response = requests.post(
            self.API_URL,
            json=payload,
            headers=headers,
            timeout=self.timeout
        )
        response.raise_for_status()
        
        raw_response = response.json()
        content = raw_response.get("choices", [{}])[0].get("message", {}).get("content", "")
        
        if not content:
            raise ValueError("Empty response content from Perplexity API")
        
        return content.strip()
    
    def generate_slides(self, topic: str, num_slides: int = 8) -> Dict:
        """
        Generate presentation slides from topic
        
        Args:
            topic: Presentation topic
            num_slides: Number of slides to generate (default: 8)
        
        Returns:
            Dict with 'slides' key containing list of slide dictionaries
            Each slide has 'title' and 'bullets' keys
        
        Raises:
            ValueError: If generation fails, API key is missing, or validation fails
            requests.exceptions.RequestException: On API request failure
        
        Example:
            >>> generator = AIContentGenerator()
            >>> slides = generator.generate_slides("Machine Learning", num_slides=5)
            >>> print(slides['slides'][0]['title'])
            'Introduction to Machine Learning'
        """
        logger.info(f"[AI-PERPLEXITY] Generating {num_slides} slides for: '{topic}'")
        
        prompt = self._build_prompt(topic, num_slides)
        payload = self._build_payload(prompt)
        headers = self._build_headers()
        
        try:
            raw_content = self._make_api_request(payload, headers)
            logger.debug(f"[AI-PERPLEXITY] Response received ({len(raw_content)} chars)")
            
            data = self._extract_json(raw_content)
            
            if not data:
                raise ValueError("Failed to extract valid JSON from API response")
            
            is_valid, error_msg = self._validate_slides(data, num_slides)
            
            if not is_valid:
                raise ValueError(f"Invalid slide structure: {error_msg}")
            
            actual_slides = len(data['slides'])
            logger.info(f"[AI-PERPLEXITY] ✅ Successfully generated {actual_slides} slides")
            
            return data
        
        except requests.exceptions.Timeout:
            logger.error(f"[AI-PERPLEXITY] ❌ Request timeout after {self.timeout}s")
            raise ValueError(f"Perplexity API request timeout after {self.timeout}s")
        
        except requests.exceptions.RequestException as e:
            logger.error(f"[AI-PERPLEXITY] ❌ Request error: {e}")
            raise ValueError(f"Perplexity API request failed: {e}")
        
        except Exception as e:
            logger.error(f"[AI-PERPLEXITY] ❌ Unexpected error: {e}")
            raise
    
    def generate_from_topic(self, topic: str, num_slides: int = 8) -> Dict:
        """
        Generate presentation slides from topic (alias for generate_slides)
        
        Args:
            topic: Presentation topic
            num_slides: Number of slides to generate (default: 8)
        
        Returns:
            Dict with 'slides' key containing list of slide dictionaries
        
        Example:
            >>> generator = AIContentGenerator()
            >>> slides = generator.generate_from_topic("Python Programming", num_slides=7)
        """
        return self.generate_slides(topic, num_slides)
    
    def generate_from_content(self, topic: str, content: str, num_slides: int = 8) -> Dict:
        """
        Generate presentation slides from topic and custom content
        
        Args:
            topic: Presentation topic
            content: Custom content to base slides on
            num_slides: Number of slides to generate (default: 8)
        
        Returns:
            Dict with 'slides' key containing list of slide dictionaries
        
        Raises:
            ValueError: If generation fails or validation fails
            requests.exceptions.RequestException: On API request failure
        
        Example:
            >>> generator = AIContentGenerator()
            >>> custom = "Focus on supervised learning, regression, and classification"
            >>> slides = generator.generate_from_content("ML Basics", custom, num_slides=6)
        """
        logger.info(f"[AI-PERPLEXITY] Generating {num_slides} slides from custom content for: '{topic}'")
        
        prompt = self._build_prompt(topic, num_slides, content)
        payload = self._build_payload(prompt)
        headers = self._build_headers()
        
        try:
            raw_content = self._make_api_request(payload, headers)
            logger.debug(f"[AI-PERPLEXITY] Response received ({len(raw_content)} chars)")
            
            data = self._extract_json(raw_content)
            
            if not data:
                raise ValueError("Failed to extract valid JSON from API response")
            
            is_valid, error_msg = self._validate_slides(data, num_slides)
            
            if not is_valid:
                raise ValueError(f"Invalid slide structure: {error_msg}")
            
            actual_slides = len(data['slides'])
            logger.info(f"[AI-PERPLEXITY] ✅ Successfully generated {actual_slides} slides from content")
            
            return data
        
        except requests.exceptions.Timeout:
            logger.error(f"[AI-PERPLEXITY] ❌ Request timeout after {self.timeout}s")
            raise ValueError(f"Perplexity API request timeout after {self.timeout}s")
        
        except requests.exceptions.RequestException as e:
            logger.error(f"[AI-PERPLEXITY] ❌ Request error: {e}")
            raise ValueError(f"Perplexity API request failed: {e}")
        
        except Exception as e:
            logger.error(f"[AI-PERPLEXITY] ❌ Unexpected error: {e}")
            raise


# ============================================================================
# USAGE EXAMPLES
# ============================================================================

"""
# Example 1: Using generate_slides
generator = AIContentGenerator()
slides = generator.generate_slides("Machine Learning Basics", num_slides=8)

# Example 2: Using generate_from_topic (alias)
generator = AIContentGenerator()
slides = generator.generate_from_topic("Python Web Development", num_slides=10)

# Example 3: Using custom model
generator = AIContentGenerator(model="sonar-pro")
slides = generator.generate_from_topic("Data Structures", num_slides=6)

# Example 4: Generate from custom content
generator = AIContentGenerator()
custom_content = "Focus on neural networks, backpropagation, and gradient descent"
slides = generator.generate_from_content(
    topic="Deep Learning",
    content=custom_content,
    num_slides=6
)

# Example 5: Access slide data
generator = AIContentGenerator()
result = generator.generate_from_topic("Django REST Framework", num_slides=5)

for i, slide in enumerate(result['slides'], 1):
    print(f"Slide {i}: {slide['title']}")
    for bullet in slide['bullets']:
        print(f"  - {bullet}")
"""
