# # quality_llm.py

# import json
# from django.conf import settings
# from openai import OpenAI

# client = OpenAI(
#     api_key=settings.PERPLEXITY_API_KEY,
#     base_url="https://api.perplexity.ai"
# )

# QUALITY_SCHEMA_EXAMPLE = {
#     "overall_score": 92,
#     "grammar_score": 90,
#     "style_score": 88,
#     "citation_score": 95,
#     "requirement_match_score": 93,
#     "summary": "Short paragraph (3–4 sentences) of overall feedback.",
#     "issues": [
#         {
#             "type": "grammar",
#             "severity": "medium",
#             "message": "Clear description of the problem.",
#             "suggestion": "Suggested fix in student-friendly language.",
#             "location": {
#                 "paragraph": 3,
#                 "sentence": 1,
#                 "offset_start": 120,
#                 "offset_end": 145
#             }
#         }
#     ]
# }


# def build_quality_prompt(text: str, requirements: str | None):
#     requirements_part = requirements or (
#         "No explicit rubric was provided. Judge using typical university-level expectations."
#     )
#     return f"""
# You are an academic writing quality reviewer.

# Analyze the following student assignment text for:
# - Grammar and spelling
# - Academic writing style and clarity
# - Correct and consistent citation / referencing style
# - How well the answer matches the assignment requirements

# Assignment requirements / rubric:
# {requirements_part}

# Student text:
# {text}

# Return ONLY valid JSON with this schema (no markdown, no comments, no extra text):
# {json.dumps(QUALITY_SCHEMA_EXAMPLE, indent=2)}
# """


# def run_quality_llm(text: str, requirements: str | None):
#     prompt = build_quality_prompt(text, requirements)

#     chat = client.chat.completions.create(
#         model="sonar-pro",
#         messages=[{"role": "user", "content": prompt}],
#         temperature=0.2,
#         max_tokens=1500,
#     )

#     raw = chat.choices[0].message.content.strip()

#     # Handle fenced code blocks
#     if raw.startswith("```"):
#         lines = raw.splitlines()
#         raw = "\n".join(lines[1:-1]).strip()
#         if raw.lower().startswith("json"):
#             raw = raw[4:].strip()

#     try:
#         data = json.loads(raw)
#     except json.JSONDecodeError:
#         last = raw.rfind("}")
#         data = json.loads(raw[: last + 1])

#     return data






# quality_llm.py

import json
import re
from django.conf import settings
from openai import OpenAI

client = OpenAI(
    api_key=settings.PERPLEXITY_API_KEY,
    base_url="https://api.perplexity.ai"
)

DEFAULT_RESPONSE = {
    "overall_score": 75,
    "grammar_score": 75,
    "style_score": 75,
    "citation_score": 75,
    "requirement_match_score": 75,
    "summary": "Analysis completed. Please review your document manually.",
    "issues": []
}


def build_quality_prompt(text: str, requirements: str | None) -> str:
    """Build prompt for quality analysis with deduplication instructions."""
    requirements_part = requirements or "Typical university-level academic writing standards."
    
    safe_text = text[:12000] if len(text) > 12000 else text
    
    return f"""Analyze this academic document and return JSON.

REQUIREMENTS: {requirements_part}

TEXT: {safe_text}

IMPORTANT INSTRUCTIONS:
1. Identify MAXIMUM 5 most important issues (prioritize critical problems)
2. Do NOT repeat the same type of issue multiple times - combine similar issues
3. Use severity: "low", "medium", or "high" only (no "critical")
4. Types: "grammar", "style", "citation", "structure", "content"

Return ONLY this JSON structure:
{{
  "overall_score": 0-100,
  "grammar_score": 0-100,
  "style_score": 0-100,
  "citation_score": 0-100,
  "requirement_match_score": 0-100,
  "summary": "2-3 sentences of overall feedback",
  "issues": [
    {{
      "type": "grammar|style|citation|structure|content",
      "severity": "low|medium|high",
      "message": "Clear description of the problem",
      "suggestion": "How to fix it"
    }}
  ]
}}

YOUR JSON OUTPUT:"""


def extract_json_from_text(text: str) -> dict:
    """Extract and parse JSON from text."""
    
    # Try direct parse
    try:
        return json.loads(text.strip())
    except json.JSONDecodeError:
        pass
    
    # Extract from code blocks
    patterns = [
        r'```json\s*(.*?)\s*```',
        r'```\s*(.*?)\s*```',
    ]
    
    for pattern in patterns:
        matches = re.findall(pattern, text, re.DOTALL)
        for match in matches:
            try:
                return json.loads(match.strip())
            except:
                continue
    
    # Find JSON between braces
    start = text.find('{')
    end = text.rfind('}')
    if start != -1 and end != -1 and end > start:
        try:
            return json.loads(text[start:end+1])
        except:
            pass
    
    # Fix common issues
    cleaned = text
    cleaned = re.sub(r',(\s*[}\]])', r'\1', cleaned)  # Remove trailing commas
    cleaned = cleaned.replace("'", '"')  # Replace single quotes
    cleaned = cleaned.replace('True', 'true').replace('False', 'false').replace('None', 'null')
    
    try:
        return json.loads(cleaned)
    except:
        pass
    
    # Regex extraction fallback
    result = DEFAULT_RESPONSE.copy()
    
    scores = re.findall(r'"(overall|grammar|style|citation|requirement_match)_score"\s*:\s*(\d+)', text)
    for score_type, score_val in scores:
        result[f"{score_type}_score"] = int(score_val)
    
    summary_match = re.search(r'"summary"\s*:\s*"([^"]+)"', text, re.DOTALL)
    if summary_match:
        result["summary"] = summary_match.group(1).replace('\\n', '\n')
    
    return result


def run_quality_llm(text: str, requirements: str | None) -> dict:
    """Run quality analysis with Perplexity API."""
    
    if not text or len(text) < 50:
        return DEFAULT_RESPONSE
    
    prompt = build_quality_prompt(text, requirements)
    
    try:
        response = client.chat.completions.create(
            model="sonar-pro",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.1,
            max_tokens=1200,  # Reduced to encourage conciseness
        )
        
        raw_output = response.choices[0].message.content.strip()
        print(f"LLM Raw: {raw_output[:500]}...")
        
        result = extract_json_from_text(raw_output)
        
        # Validate and set defaults
        for key in ["overall_score", "grammar_score", "style_score", "citation_score", "requirement_match_score"]:
            try:
                result[key] = int(result.get(key, 75))
            except:
                result[key] = 75
        
        result["summary"] = result.get("summary", "Analysis completed.")
        
        # Ensure issues is list with max 5 items
        issues = result.get("issues", [])
        if not isinstance(issues, list):
            issues = []
        result["issues"] = issues[:5]  # Limit to 5 issues
        
        return result
        
    except Exception as e:
        print(f"LLM Error: {e}")
        result = DEFAULT_RESPONSE.copy()
        result["summary"] = f"Error: {str(e)[:100]}"
        return result