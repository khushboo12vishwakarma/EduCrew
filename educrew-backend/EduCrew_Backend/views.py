from django.contrib.auth.models import User
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.models import User
import requests
import re
import time
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes  # Add permission_classes
from rest_framework import status
from rest_framework.permissions import AllowAny  # Add this import

@api_view(['POST'])
@permission_classes([AllowAny])  # Add this line - allows anyone to register
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    password2 = request.data.get('password2')
    
    if password != password2:
        return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({'username': ['Username already exists']}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(email=email).exists():
        return Response({'email': ['Email already exists']}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, email=email, password=password)
    
    return Response({
        'message': 'User created successfully',
        'username': user.username,
        'email': user.email
    }, status=status.HTTP_201_CREATED)



from django.core.mail import send_mail
from django.core.mail import get_connection
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password(request):
    email = request.data.get('email')
    
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        
        # FORCE console backend - ignores settings.py
        connection = get_connection(
            backend='django.core.mail.backends.console.EmailBackend',
            fail_silently=False,
        )
        
        send_mail(
            subject='EduCrew - Password Reset Request',
            message=f'''Hello {user.username},

You requested a password reset for your EduCrew account.

Click the link below to reset your password:
http://localhost:3000/reset-password?user={user.username}&token=PLACEHOLDER_TOKEN

If you did not request this, please ignore this email.

Thanks,
EduCrew Team''',
            from_email='noreply@educrew.com',
            recipient_list=[email],
            connection=connection,  # This forces console backend
        )
        
        # Print to console as well for debugging
        print(f"\n{'='*50}")
        print(f"PASSWORD RESET EMAIL SENT TO: {email}")
        print(f"Username: {user.username}")
        print(f"{'='*50}\n")
        
        return Response({
            'message': 'Password reset instructions sent to your email'
        }, status=status.HTTP_200_OK)
        
    except User.DoesNotExist:
        # Don't reveal if email exists
        print(f"\nPassword reset requested for non-existent email: {email}\n")
        return Response({
            'message': 'Password reset instructions sent to your email'
        }, status=status.HTTP_200_OK)
    

from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    username = request.data.get('username')
    token = request.data.get('token')  # You should validate this token properly
    password = request.data.get('password')
    password2 = request.data.get('password2')
    
    if password != password2:
        return Response({'error': 'Passwords do not match'}, status=400)
    
    try:
        user = User.objects.get(username=username)
        # TODO: Validate token properly (check if token is valid and not expired)
        # For now, just reset the password
        user.password = make_password(password)
        user.save()
        
        return Response({'message': 'Password reset successful'})
    except User.DoesNotExist:
        return Response({'error': 'Invalid reset link'}, status=400)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET', 'PATCH', 'PUT'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    """Handle profile GET and UPDATE"""
    user = request.user
    
    if request.method == 'GET':
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'date_joined': user.date_joined,
        })
    
    # PATCH or PUT - partial update
    data = request.data
    
    # Update user fields (only if provided)
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'first_name' in data:
        user.first_name = data['first_name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    
    try:
        user.save()
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'date_joined': user.date_joined,
        })
    except Exception as e:
        return Response(
            {'detail': str(e)}, 
            status=status.HTTP_400_BAD_REQUEST
        )
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    """Get current user profile"""
    user = request.user
    return Response({
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        # Add other fields as needed
    })

@api_view(['GET', 'PATCH', 'PUT'])  # Add PATCH here
@permission_classes([IsAuthenticated])
def update_profile(request):
    """Update user profile"""
    user = request.user
    
    if request.method == 'GET':
        return Response({
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        })
    
    # Handle PATCH/PUT
    data = request.data
    
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'first_name' in data:
        user.first_name = data['first_name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    if 'bio' in data:
        user.profile.bio = data['bio']
        user.profile.save()
    
    user.save()
    return Response({
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    """Change user password"""
    user = request.user
    data = request.data
    
    current_password = data.get('current_password')
    new_password = data.get('new_password')
    
    if not user.check_password(current_password):
        return Response(
            {'detail': 'Current password is incorrect'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user.set_password(new_password)
    user.save()
    return Response({'detail': 'Password changed successfully'})


@api_view(['POST'])
def top_research_papers(request):
    """
    Returns top 10 UNIQUE research papers with:
    - website_url  (normal article page)
    - pdf_url      (direct PDF when possible)
    - proper APA citations
    """
    topic = request.data.get('topic')
    sort_by = request.data.get('sort_by', 'recent')

    if not topic:
        return Response({'error': 'Topic is required'}, status=400)

    headers = {
        "Authorization": f"Bearer {settings.PERPLEXITY_API_KEY}",
        "Content-Type": "application/json"
    }

    if sort_by == 'recent':
        sort_instruction = "Focus on papers published in the last 10 years (2015-2025)."
    elif sort_by == 'cited':
        sort_instruction = "Focus on the most highly-cited, seminal papers."
    else:
        sort_instruction = "Focus on papers most relevant to the topic."

    # ---- Step 1: Get Top 10 Research Papers ----
    find_papers_payload = {
        "model": "sonar",
        "messages": [
            {
                "role": "system",
                "content": f"""You are a research expert. Find and list the top 10 most relevant research papers.
{sort_instruction}

Format EXACTLY as follows for each paper:

**1. Paper Title**
**Authors:** Author Names
**Year:** YYYY
# **URL/DOI:** https://...
**Significance:** 1-2 sentence explanation

---

Separate each paper with ---. Include the actual paper link/DOI.
Do NOT include duplicate papers."""
            },
            {
                "role": "user",
                "content": f"""Find the top 10 research papers about: {topic}

{sort_instruction}

Requirements:
- Include paper title, authors, year, and actual URL/DOI
- Do NOT include duplicate papers
- Each paper should have a unique URL or title
- Focus on peer-reviewed papers from conferences or journals
- Format each paper clearly with --- separator"""
            }
        ],
        "temperature": 0.3,
        "max_tokens": 3500
    }

    papers_text = None
    max_retries = 2

    for attempt in range(max_retries):
        try:
            print(f"Attempt {attempt + 1} to fetch papers for topic: {topic}")
            response = requests.post(
                "https://api.perplexity.ai/chat/completions",
                headers=headers,
                json=find_papers_payload,
                timeout=60
            )
            response.raise_for_status()
            result = response.json()
            papers_text = result["choices"][0]["message"]["content"]
            print("✓ Papers fetched successfully")
            break

        except requests.exceptions.Timeout:
            print(f"✗ Timeout on attempt {attempt + 1}")
            if attempt < max_retries - 1:
                time.sleep(3)
            else:
                return Response({
                    'success': False,
                    'error': 'Request timeout. Try again.'
                }, status=504)

        except Exception as e:
            print(f"✗ Error: {str(e)}")
            if attempt == max_retries - 1:
                return Response({
                    'success': False,
                    'error': f'Failed: {str(e)}'
                }, status=500)
            time.sleep(2)

    if not papers_text:
        return Response({
            'success': False,
            'error': 'No response from API'
        }, status=500)

    # ---- Step 2: Parse Papers ----
    papers = aggressive_parse_papers(papers_text)

    # ---- Step 3: Remove Duplicates ----
    papers = remove_duplicate_papers(papers)

    if not papers:
        return Response({
            'success': True,
            'topic': topic,
            'message': 'No unique papers found',
            'papers': [],
            'bibliography': []
        })

    print(f"✓ Parsed {len(papers)} unique papers")

    # ---- Step 4: Summarize Each Paper + add website_url / pdf_url ----
    summarized_papers = []
    bibliography_entries = []

    for idx, paper in enumerate(papers[:10], 1):
        title = paper.get('title', 'Unknown')
        authors = paper.get('authors', 'Unknown')
        year = paper.get('year', 'Unknown')
        original_url = paper.get('url', '').strip()
        significance = paper.get('significance', '')

        print(f"[{idx}] Processing: {title[:50]}...")

        # NEW: split into website_url + pdf_url
        website_url, pdf_url = split_website_and_pdf(original_url)

        summary_payload = {
            "model": "sonar",
            "messages": [
                {
                    "role": "system",
                    "content": "Summarize concisely. Provide: 1) 2-3 sentence summary, 2) 5 key points with bullets."
                },
                {
                    "role": "user",
                    "content": f"Title: {title}\nAuthors: {authors}\nYear: {year}\nSignificance: {significance}\n\nSummarize this paper."
                }
            ],
            "temperature": 0.5,
            "max_tokens": 500
        }

        summary = ""
        key_points = []

        try:
            summary_response = requests.post(
                "https://api.perplexity.ai/chat/completions",
                headers=headers,
                json=summary_payload,
                timeout=45
            )
            summary_response.raise_for_status()
            summary_result = summary_response.json()
            summary_text = summary_result["choices"][0]["message"]["content"]
            summary, key_points = parse_summary_improved(summary_text)

        except requests.exceptions.Timeout:
            summary = extract_first_sentences(significance, 2)
        except Exception as e:
            summary = extract_first_sentences(significance, 2)

        # APA citation should use website_url (preferred landing page)
        apa_citation = generate_proper_apa_citation(
            authors, year, title, website_url or pdf_url
        )

        summarized_papers.append({
            "id": idx,
            "title": title,
            "authors": authors,
            "year": year,
            "website_url": website_url,   # ← click title to open website
            "pdf_url": pdf_url,           # ← click button to open PDF
            "summary": summary,
            "key_points": key_points,
            "apa_citation": apa_citation
        })

        bibliography_entries.append(apa_citation)

    return Response({
        'success': True,
        'topic': topic,
        'sort_by': sort_by,
        'total_papers': len(summarized_papers),
        'papers': summarized_papers,
        'bibliography': bibliography_entries
    })


# # --------- NEW HELPER: website_url + pdf_url ---------
def split_website_and_pdf(url: str):
    """
    Derive website_url and pdf_url from a single URL.

    - arXiv abs  -> website = abs,  pdf = pdf
    - arXiv pdf  -> website = pdf,  pdf = pdf
    - direct .pdf -> website = pdf, pdf = pdf
    - DOI / other publishers -> website only, no pdf_url
    """
    if not url:
        return None, None

    url = url.strip()

    # Direct PDF already
    if url.lower().endswith(".pdf"):
        return url, url

    # arXiv abs
    if "arxiv.org/abs/" in url:
        arxiv_id = url.split("arxiv.org/abs/")[-1]
        pdf_url = f"https://arxiv.org/pdf/{arxiv_id}.pdf"
        return url, pdf_url

    # arXiv pdf
    if "arxiv.org/pdf/" in url and url.lower().endswith(".pdf"):
        return url, url

    # DOI – treat as canonical website only
    if "doi.org/" in url:
        return url, None

    # Known publisher HTML pages
    if any(domain in url for domain in [
        "nature.com", "springer.com", "acm.org", "ieee.org",
        "sciencedirect.com", "tandfonline.com", "openaccess.thecvf.com"
    ]):
        return url, None

    # Fallback
    return url, None



# ---------- EXISTING HELPERS (unchanged) ----------

def remove_duplicate_papers(papers):
    """Remove duplicate papers based on URL or title+year combo."""
    seen_urls = set()
    seen_titles = set()
    unique_papers = []

    for paper in papers:
        url = paper.get('url', '').strip()
        title = paper.get('title', '').strip()
        year = paper.get('year', '').strip()

        if not title:
            continue

        url_id = url if url else None
        title_year_id = f"{title.lower()}_{year}"

        if url_id and url_id in seen_urls:
            print(f"  ✗ Duplicate URL: {title}")
            continue

        if title_year_id in seen_titles:
            print(f"  ✗ Duplicate Title+Year: {title}")
            continue

        if url_id:
            seen_urls.add(url_id)
        seen_titles.add(title_year_id)

        unique_papers.append(paper)
        print(f"  ✓ Added: {title}")

    return unique_papers


def aggressive_parse_papers(text):
    """Parse papers from text."""
    papers = []
    sections = text.split('---')

    if len(sections) <= 1:
        sections = text.split('\n\n')

    for section in sections:
        section = section.strip()
        if not section or len(section) < 20:
            continue

        paper = {
            'title': '',
            'authors': '',
            'year': '',
            'url': '',
            'significance': ''
        }

        lines = section.split('\n')

        for line in lines:
            line = line.strip()
            if not line:
                continue

            if re.match(r'^[\*]*\*?\d+[\.\)]\s*', line):
                title = re.sub(r'^[\*]*\*?\d+[\.\)]\s*[\*]*\*?', '', line).replace('**', '')
                if title:
                    paper['title'] = title.strip()

            elif 'author' in line.lower():
                authors = re.sub(r'^\*?\*?authors?:\*?\*?\s*', '', line, flags=re.IGNORECASE)
                if authors and authors.lower() != 'not specified':
                    paper['authors'] = authors.strip()

            elif 'year' in line.lower():
                year_match = re.search(r'\d{4}', line)
                if year_match:
                    paper['year'] = year_match.group()

            elif 'url' in line.lower() or 'doi' in line.lower():
                url_match = re.search(r'https?://\S+', line)
                if url_match:
                    paper['url'] = url_match.group().rstrip(',;.)')

            elif 'significance' in line.lower():
                significance = re.sub(r'^\*?\*?significance:\*?\*?\s*', '', line, flags=re.IGNORECASE)
                if significance:
                    paper['significance'] = significance.strip()

        if paper['title'] and paper['url']:
            papers.append(paper)

    return papers


def parse_summary_improved(text):
    """Extract summary and key points."""
    summary = ""
    key_points = []

    lines = text.split('\n')
    summary_lines = []

    for line in lines:
        line = line.strip()
        if not line:
            continue

        if 'summary' in line.lower() or 'key point' in line.lower():
            continue

        if re.match(r'^[-•\*\d\.]\s*', line):
            key_point = re.sub(r'^[-•\*]\s*|\d+[\.\)]\s*', '', line).strip()
            key_point = key_point.replace('**', '')
            if key_point and len(key_points) < 5:
                key_points.append(key_point)
        else:
            summary_lines.append(line)

    summary = ' '.join(summary_lines).strip()
    if len(summary) > 300:
        summary = summary[:297] + "..."

    return summary, key_points


def extract_first_sentences(text, num_sentences=2):
    """Extract first N sentences."""
    if not text:
        return ""

    sentences = re.split(r'(?<=[.!?])\s+', text)
    result = ' '.join(sentences[:num_sentences])
    return result[:300]


def generate_proper_apa_citation(authors, year, title, url):
    """
    Generate proper APA citation WITHOUT URL duplication.
    Handles different URL types (DOI, arXiv, etc.)
    """
    if url and 'doi.org' in url:
        doi = url.replace('https://doi.org/', '').replace('http://doi.org/', '')
        return f"{authors} ({year}). {title}. https://doi.org/{doi}"

    elif url and 'arxiv' in url:
        arxiv_id = url.split('/')[-1]
        return f"{authors} ({year}). {title}. arXiv:{arxiv_id}"

    elif url and any(domain in url for domain in ['sagepub', 'tandfonline', 'informs', 'emerald']):
        return f"{authors} ({year}). {title}. Retrieved from {url}"

    elif url and 'ncbi.nlm.nih.gov' in url:
        return f"{authors} ({year}). {title}. Retrieved from {url}"

    elif url and url.endswith('.pdf'):
        return f"{authors} ({year}). {title}. Retrieved from {url}"

    elif url:
        return f"{authors} ({year}). {title}. Retrieved from {url}"

    else:
        return f"{authors} ({year}). {title}."




# EduCrew_Backend/views.py
import json
import requests
import PyPDF2
from io import BytesIO

from django.contrib.auth.models import User
from django.conf import settings
from django.http import JsonResponse
from django.utils import timezone

from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated

from .models import StudyMaterial

PERPLEXITY_URL = "https://api.perplexity.ai/chat/completions"
MODEL = "sonar"


def perplexity_call(prompt: str) -> str:
    print("PERPLEXITY KEY:", settings.PERPLEXITY_API_KEY)
    """Safe Perplexity API wrapper with debug logging."""
    headers = {
        "Authorization": f"Bearer {settings.PERPLEXITY_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": MODEL,
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 3000,
    }

    resp = requests.post(PERPLEXITY_URL, json=payload, headers=headers)
    print("PERPLEXITY STATUS:", resp.status_code)
    print("PERPLEXITY RESPONSE:", resp.text[:400])

    if resp.status_code != 200:
        return f"Perplexity API error (status {resp.status_code}): {resp.text[:200]}"

    try:
        data = resp.json()
        return data["choices"][0]["message"]["content"]
    except Exception as e:
        return f"Error parsing Perplexity response: {str(e)}"


# ------------------------- MAIN API -------------------------
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAuthenticated])
def upload_and_process(request):
    # ✅ DYNAMIC: Get the actually logged-in user (ppt123)
    user = request.user

    # ---------------- CASE 1: RAW TEXT ----------------
    user_text = request.data.get("text", "").strip()
    if user_text and "file" not in request.FILES:
        # ✅ DYNAMIC: Use logged-in user
        material = StudyMaterial.objects.create(
            user=user,
            filename=f"notes_{timezone.now().strftime('%Y%m%d_%H%M%S')}.txt",
        )

        # Notes prompt
        notes_prompt = f"""
Write clear, simple, student-friendly notes based ONLY on the text given below.

Rules:
- No citations, no bracketed numbers, no links.
- Do not use markdown symbols like ##, **, ---, or code blocks.
- Use clean headings written normally (for example: Introduction, Key Concepts).
- Use paragraphs.
- Language must be easy for school or college students.
- Use bullet points only when necessary.
- Do not add extra knowledge beyond the provided text.
- Do not mention that the text was provided.

Follow this structure:
1. Introduction
2. Definition
3. Basic Components
4. Key Concepts Explained
5. Key Terms with simple definitions
6. Step-by-step Explanation (if applicable)
7. Real-life Examples
8. Types (if applicable)
9. Key Applications
10. Advantages
11. Important Points to Remember

TEXT START
{user_text}
TEXT END

Write the notes like a clear chapter for students.
"""

        summary_prompt = f"Write a short 3-paragraph summary of these notes:\n\n{user_text}"

        flowchart_prompt = f"""
Create a Mermaid flowchart for the topic:
"{user_text}"

Rules:
- Use 'flowchart TD;'
- Only Mermaid syntax
- No backticks
- No explanations
"""

        flashcard_quiz_prompt = f"""
Create flashcards and MCQ quiz in JSON format ONLY based on:
"{user_text}"

JSON format:
{{
  "flashcards": [
    {{ "q": "question", "a": "answer" }}
  ],
  "quiz": [
    {{
      "question": "question",
      "options": ["A","B","C","D"],
      "answer": "A"
    }}
  ]
}}
"""

        notes = perplexity_call(notes_prompt)
        summary = perplexity_call(summary_prompt)
        flowchart = perplexity_call(flowchart_prompt).replace("```", "").replace("mermaid", "").strip()
        raw_json = perplexity_call(flashcard_quiz_prompt)

        try:
            parsed = json.loads(raw_json.replace("```json", "").replace("```", "").strip())
        except:
            parsed = {"flashcards": [], "quiz": []}

        # Save
        material.notes = notes
        material.summary = summary
        material.flowchart = flowchart
        material.flashcards = parsed.get("flashcards", [])
        material.quiz = parsed.get("quiz", [])
        material.save()

        return JsonResponse({
            "status": "success",
            "mode": "notes_generated",
            "notes": notes,
            "summary": summary,
            "flowchart": flowchart,
            "flashcards": parsed.get("flashcards", []),
            "quiz": parsed.get("quiz", [])
        })

    # ---------------- CASE 2: FILE UPLOAD ----------------
    files = request.FILES.getlist("file")
    if not files:
        return JsonResponse({"error": "No file uploaded"}, status=400)

    results = []

    for file_obj in files:
        print(f"🔍 RAW FILE INFO: name='{file_obj.name}', size={file_obj.size}, content_type='{file_obj.content_type}'")
        
        # ✅ DYNAMIC: Use logged-in user
        material = StudyMaterial.objects.create(
            user=user,
            file=file_obj,
            filename=file_obj.name
        )

        # ULTRA-ROBUST TEXT EXTRACTION
        text = ""
        
        # Method 1: Try as TEXT file first
        try:
            file_obj.seek(0)
            raw_bytes = file_obj.read()
            print(f"📦 RAW BYTES: {len(raw_bytes)}")
            
            text = raw_bytes.decode('utf-8', errors='ignore')
            print(f"✅ UTF-8 DECODED: {len(text)} chars")
            print(f"📄 FIRST 300 CHARS: {repr(text[:300])}")
        except:
            text = "UTF-8 decode failed"
        
        # Method 2: If still empty, try PDF specifically
        if len(text.strip()) < 10:
            try:
                file_obj.seek(0)
                pdf_reader = PyPDF2.PdfReader(BytesIO(file_obj.read()))
                text = ""
                for i, page in enumerate(pdf_reader.pages[:3]):
                    page_text = page.extract_text() or ""
                    text += page_text + "\n\n"
                print(f"✅ PDF EXTRACTED: {len(text)} chars")
            except Exception as pdf_error:
                print(f"PDF failed: {pdf_error}")
                text = "PDF extraction failed"
        
        # Final cleanup
        text = ' '.join(text.split()).strip()[:6000]
        
        if len(text) < 20:
            text = f"❌ NO TEXT FOUND in {file_obj.name} ({len(raw_bytes)} bytes)"
        
        print(f"🎯 FINAL TEXT LENGTH: {len(text)} chars")
        print(f"📝 FINAL PREVIEW: {text[:200]}...")

        # SIMPLE PROMPTS THAT WORK
        notes_prompt = f"""
    Write clear, simple, student-friendly notes based ONLY on the text given below.

    Rules:
    - No citations, no bracketed numbers, no links.
    - Do not use markdown symbols like ##, **, ---, or code blocks.
    - Use clean headings written normally (for example: Introduction, Key Concepts).
    - Use paragraphs.
    - Language must be easy for school or college students.
    - Use bullet points only when necessary.
    - Do not add extra knowledge beyond the provided text.
    - Do not mention that the text was provided.

    Follow this structure:
    1. Introduction
    2. Definition
    3. Basic Components
    4. Key Concepts Explained
    5. Key Terms with simple definitions
    6. Step-by-step Explanation (if applicable)
    7. Real-life Examples
    8. Types (if applicable)
    9. Key Applications
    10. Advantages
    11. Important Points to Remember

    TEXT START
    {text}
    TEXT END

    Write the notes like a clear chapter for students.
    """

        summary_prompt = f"""3-paragraph summary of ONLY this text:

    {text[:3000]}"""

        flowchart_prompt = f"""Create a Mermaid flowchart for the topic:

    {text}

    Rules:
    - Use 'flowchart TD;'
    - Only Mermaid syntax
    - No backticks"""

        flashcard_prompt = f"""JSON flashcards from ONLY this text:

    {text[:2500]}

    {{
    "flashcards": [{{"q":"?", "a":"?"}}],
    "quiz": [{{"question":"?", "options":["A","B","C","D"], "answer":"A"}}]
    }}"""

        # AI CALLS
        notes = perplexity_call(notes_prompt)
        summary = perplexity_call(summary_prompt)
        flowchart = perplexity_call(flowchart_prompt).replace("```mermaid", "").replace("```", "").strip()
        flashcards_raw = perplexity_call(flashcard_prompt)

        try:
            flashcards = json.loads(flashcards_raw.replace("```json", "").replace("```", "").strip())
        except:
            flashcards = {"flashcards": [], "quiz": []}

        # SAVE
        material.notes = notes
        material.summary = summary
        material.content_text = text
        material.flowchart = flowchart
        material.flashcards = flashcards.get("flashcards", [])
        material.quiz = flashcards.get("quiz", [])
        material.save()

        results.append({
            "filename": file_obj.name,
            "extracted_chars": len(text),
            "preview": text[:200],
            "notes": notes,
            "summary": summary,
            "flowchart": flowchart,
            "flashcards": flashcards.get("flashcards", []),
            "quiz": flashcards.get("quiz", [])
        })

    return JsonResponse({"results": results})

#     # ---------------- CASE 2: FILE UPLOAD ----------------
#     files = request.FILES.getlist("file")
#     if not files:
#         return JsonResponse({"error": "No file uploaded"}, status=400)

#     results = []

#     for file in files:
#         material = StudyMaterial.objects.create(
#             user=default_user,
#             file=file,
#             filename=file.name
#         )

#         # Extract text
#         text = ""
#         if file.name.lower().endswith(".pdf"):
#             pdf_reader = PyPDF2.PdfReader(file)
#             for page in pdf_reader.pages:
#                 text += page.extract_text() or ""
#         else:
#             text = file.read().decode("utf-8", errors="ignore")

#         # AI prompts
#         summary_prompt = f"Summarize this in simple language:\n\n{text}"

#         flowchart_prompt = f"""
# Create a Mermaid flowchart for this content:

# {text}

# Use:
# flowchart TD;
# No backticks.
# """

#         flashcard_quiz_prompt = f"""
# Create flashcards and MCQs based on the following text:

# {text}

# JSON ONLY:
# {{
#   "flashcards": [
#     {{ "q": "question", "a": "answer" }}
#   ],
#   "quiz": [
#     {{
#       "question": "question",
#       "options": ["A","B","C","D"],
#       "answer": "A"
#     }}
#   ]
# }}
# """

#         # AI calls
#         summary = perplexity_call(summary_prompt)
#         flowchart = perplexity_call(flowchart_prompt).replace("```", "").strip()
#         raw_json = perplexity_call(flashcard_quiz_prompt)

#         try:
#             parsed = json.loads(raw_json.replace("```json", "").replace("```", ""))
#         except:
#             parsed = {"flashcards": [], "quiz": []}

#         # Save
#         material.summary = summary
#         material.flowchart = flowchart
#         material.flashcards = parsed.get("flashcards", [])
#         material.quiz = parsed.get("quiz", [])
#         material.save()

#         results.append({
#             "filename": file.name,
#             "material_id": material.id,
#             "summary": summary,
#             "flowchart": flowchart,
#             "flashcards": parsed.get("flashcards", []),
#             "quiz": parsed.get("quiz", [])
#         })

#     return JsonResponse({"results": results})





from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.files.base import ContentFile
from django.conf import settings
from django.db import transaction
from rest_framework.permissions import IsAuthenticated

from .models import Presentation, PresentationSlide
from .serializers import PresentationSerializer
from .presentations.ai_service import AIContentGenerator
from .presentations.image_generator_smart import ImageGenerator
from .presentations.pptx_professional import PowerPointGenerator

import os
import time
import logging

logger = logging.getLogger(__name__)


class PresentationViewSet(viewsets.ModelViewSet):
    """
    API ViewSet for generating professional college-ready presentations
    """
    permission_classes = [IsAuthenticated]
    queryset = Presentation.objects.all()
    serializer_class = PresentationSerializer

    def get_queryset(self):
        return Presentation.objects.filter(user=self.request.user)

    # ============================================================
    # HELPER METHODS
    # ============================================================

    def _convert_content_to_bullets(self, slides):
        logger.info(f"[CONVERT] Converting {len(slides)} slides")

        for s in slides:
            if 'content' in s:
                content = s.pop('content', [])
                if isinstance(content, list):
                    s['bullets'] = content
                elif isinstance(content, str):
                    s['bullets'] = [content]
                else:
                    s['bullets'] = []

            if 'bullets' not in s:
                s['bullets'] = []

            if 'image_url' not in s:
                s['image_url'] = ''

            # Preserve optional AI metadata
            s['slide_type'] = s.get('slide_type', 'content')
            s['diagram_type'] = s.get('diagram_type', 'none')

        return slides

    def _apply_college_structure(
        self,
        topic,
        slides,
        presenter_name,
        presentation_date,
        subject_name,
    ):
        logger.info(f"[STRUCT] Applying college structure to {len(slides)} slides")

        final_slides = []

        for i, slide in enumerate(slides):
            final_slides.append({
                "slide_number": i + 1,
                "title": slide.get('title', f'Slide {i+1}'),
                "bullets": slide.get('bullets', [])[:5],
                "image_url": slide.get('image_url', ''),
                "slide_type": slide.get('slide_type', 'content'),
                "diagram_type": slide.get('diagram_type', 'none'),
            })

        return final_slides

    def _generate_images(self, slides, topic, use_ai):
        logger.info(f"[IMAGES] Starting image generation for {len(slides)} slides")

        try:
            if not use_ai:
                for slide in slides:
                    slide['image_url'] = ''
                return slides

            gen = ImageGenerator()
            updated_slides = gen.generate_for_slides(slides, topic, use_ai=True)

            return updated_slides

        except Exception as e:
            logger.error(f"[IMAGES] Error: {e}", exc_info=True)
            for slide in slides:
                slide['image_url'] = ''
            return slides

    # ============================================================
    # SAVE PRESENTATION
    # ============================================================

    def _save_ppt(self, request, presentation_data, topic, content_provided):
        logger.info("[SAVE] Saving presentation")

        try:
            timestamp = int(time.time())
            filename = f"{topic.replace(' ', '_')[:20]}_{timestamp}.pptx"
            output_path = os.path.join(settings.MEDIA_ROOT, 'presentations', filename)
            os.makedirs(os.path.dirname(output_path), exist_ok=True)

            # Generate PPT
            ppt_gen = PowerPointGenerator(output_path)
            ppt_gen.generate(presentation_data)

            with transaction.atomic():
                # Create Presentation record
                presentation = Presentation.objects.create(
                    user=request.user,
                    title=presentation_data.get('title', topic),
                    topic=topic,
                    content_provided=content_provided,
                    status='completed',
                    slides_count=len(presentation_data.get('slides', []))
                )

                # Save slides
                for slide_data in presentation_data.get('slides', []):
                    PresentationSlide.objects.create(
                        presentation=presentation,
                        slide_number=slide_data.get('slide_number', 1),
                        title=slide_data.get('title', ''),
                        content=slide_data.get('bullets', []),  # JSONField (correct)
                        slide_type=slide_data.get('slide_type', 'content'),
                        diagram_type=slide_data.get('diagram_type', 'none'),
                        image_url=slide_data.get('image_url')
                    )

                # Save PPT file
                with open(output_path, 'rb') as f:
                    presentation.pptx_file.save(
                        filename,
                        ContentFile(f.read()),
                        save=False
                    )
                    presentation.save()

            images_in_data = sum(1 for s in presentation_data.get('slides', []) if s.get('image_url'))

            return Response({
                'message': 'Professional college presentation generated successfully',
                'presentation_id': presentation.id,
                'title': presentation.title,
                'file_url': presentation.pptx_file.url,
                'total_slides': presentation.slides_count,
                'images_count': images_in_data
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f"[SAVE] Error saving presentation: {e}", exc_info=True)
            return Response(
                {'error': 'Failed to save presentation'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    # ============================================================
    # API ENDPOINTS
    # ============================================================

    @action(detail=False, methods=['post'])
    def generate_from_topic(self, request):
        try:
            topic = request.data.get('topic')
            num_slides = int(request.data.get('num_slides', 8))
            presenter_name = request.data.get('presenter_name', 'Student Name')
            subject = request.data.get('subject', topic)
            presentation_date = request.data.get('date', 'Academic Year 2024-25')
            use_ai_images = request.data.get('use_ai_images', True)

            if not topic:
                return Response({'error': 'Topic is required'}, status=status.HTTP_400_BAD_REQUEST)

            ai_gen = AIContentGenerator()
            ai_data = ai_gen.generate_from_topic(topic, num_slides)

            if not ai_data.get('slides'):
                return Response({'error': 'AI returned no slides'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            presentation_data = {
                'title': topic,
                'presenter_name': presenter_name,
                'subject': subject,
                'presentation_date': presentation_date,
                'slides': ai_data.get('slides', [])
            }

            presentation_data['slides'] = self._convert_content_to_bullets(presentation_data['slides'])
            presentation_data['slides'] = self._apply_college_structure(
                topic, presentation_data['slides'], presenter_name, presentation_date, subject
            )
            presentation_data['slides'] = self._generate_images(
                presentation_data['slides'], topic, use_ai_images
            )

            return self._save_ppt(request, presentation_data, topic, False)

        except Exception as e:
            logger.error(f"[API] Error in generate_from_topic: {e}", exc_info=True)
            return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['post'])
    def generate_from_content(self, request):
        try:
            topic = request.data.get('topic')
            content = request.data.get('content')
            num_slides = int(request.data.get('num_slides', 8))
            presenter_name = request.data.get('presenter_name', 'Student Name')
            subject = request.data.get('subject', topic)
            presentation_date = request.data.get('date', 'Academic Year 2024-25')
            use_ai_images = request.data.get('use_ai_images', True)

            if not topic or not content:
                return Response({'error': 'Topic and content are required'}, status=status.HTTP_400_BAD_REQUEST)

            ai_gen = AIContentGenerator()
            ai_data = ai_gen.generate_from_content(topic, content, num_slides)

            if not ai_data.get('slides'):
                return Response({'error': 'AI returned no slides'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            presentation_data = {
                'title': topic,
                'presenter_name': presenter_name,
                'subject': subject,
                'presentation_date': presentation_date,
                'slides': ai_data.get('slides', [])
            }

            presentation_data['slides'] = self._convert_content_to_bullets(presentation_data['slides'])
            presentation_data['slides'] = self._apply_college_structure(
                topic, presentation_data['slides'], presenter_name, presentation_date, subject
            )
            presentation_data['slides'] = self._generate_images(
                presentation_data['slides'], topic, use_ai_images
            )

            return self._save_ppt(request, presentation_data, topic, True)

        except Exception as e:
            logger.error(f"[API] Error in generate_from_content: {e}", exc_info=True)
            return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        try:
            presentation = self.get_object()

            if not presentation.pptx_file:
                return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)

            return Response({
                'file_url': presentation.pptx_file.url,
                'title': presentation.title,
                'presentation_id': presentation.id
            })

        except Exception as e:
            logger.error(f"[DOWNLOAD] Error: {e}", exc_info=True)
            return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# In your PresentationViewSet, FIX the _save_ppt method:

def _save_ppt(self, request, presentation_data, topic, content_provided):
    logger.info("[SAVE] Saving presentation")

    try:
        timestamp = int(time.time())
        filename = f"{topic.replace(' ', '_')[:20]}_{timestamp}.pptx"
        
        # Use temporary path first
        temp_dir = os.path.join(settings.MEDIA_ROOT, 'temp')
        os.makedirs(temp_dir, exist_ok=True)
        temp_path = os.path.join(temp_dir, filename)
        
        # Generate PPT
        ppt_gen = PowerPointGenerator(temp_path)
        ppt_gen.generate(presentation_data)
        
        # Verify file was created and is valid
        if not os.path.exists(temp_path) or os.path.getsize(temp_path) == 0:
            raise Exception("PPT generation failed - file is empty")
        
        # Read file content BEFORE creating DB record
        with open(temp_path, 'rb') as f:
            file_content = f.read()
        
        with transaction.atomic():
            # Create Presentation record
            presentation = Presentation.objects.create(
                user=request.user,
                title=presentation_data.get('title', topic),
                topic=topic,
                content_provided=content_provided,
                status='completed',
                slides_count=len(presentation_data.get('slides', []))
            )

            # Save slides to PresentationSlide model
            for slide_data in presentation_data.get('slides', []):
                PresentationSlide.objects.create(
                    presentation=presentation,
                    slide_number=slide_data.get('slide_number', 1),
                    title=slide_data.get('title', ''),
                    content=slide_data.get('bullets', []),
                    slide_type=slide_data.get('slide_type', 'content'),
                    diagram_type=slide_data.get('diagram_type', 'none'),
                    image_url=slide_data.get('image_url', '')
                )

            # Save PPT file from memory (already read)
            from django.core.files.base import ContentFile
            presentation.pptx_file.save(
                filename,
                ContentFile(file_content),
                save=True
            )
            
            presentation.save()
        
        # Clean up temp file
        try:
            os.remove(temp_path)
        except:
            pass

        return Response({
            'message': 'Presentation generated successfully',
            'presentation_id': presentation.id,
            'title': presentation.title,
            'file_url': request.build_absolute_uri(presentation.pptx_file.url),
            'total_slides': presentation.slides_count,
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        logger.error(f"[SAVE] Error: {e}", exc_info=True)
        return Response(
            {'error': f'Failed to save: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# code mentor agent
import os
from dotenv import load_dotenv
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import docker
from .models import CodeSession
from .serializers import CodeSessionSerializer
from openai import OpenAI
from .models import CodeSession


load_dotenv()

OPENAI_API_KEY = os.getenv("PERPLEXITY_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY, base_url="https://api.perplexity.ai")



LANG_CONFIG = {

    
    "python": {
        "image": "python:3.12-slim",
        "command": ["bash", "-lc", "printf '%s\\n' \"$CODE\" > main.py && python main.py"],
    },
    "javascript": {
        "image": "node:20-alpine", 
        "command": ["sh", "-lc", "printf '%s\\n' \"$CODE\" > main.js && node main.js"],
    },
"java": {
    "image": "eclipse-temurin:21-jdk",
    "command": [
        "bash",
        "-lc",
        "printf '%s\\n' \"$CODE\" > Main.java && javac Main.java && timeout 5s java Main"
    ],






    

    },
    "cpp": {
        "image": "gcc:13",
        "command": ["bash", "-lc", "printf '%s\\n' \"$CODE\" > main.cpp && g++ main.cpp -O2 -std=c++17 -o main && ./main"],
    },
    "sql": {
        "image": "sqlite:latest",  # ✅ Fixed
        "command": ["sh", "-lc", "printf '%s\\n' \"$CODE\" | sqlite3 -column -header :memory:"],
    },





    # "python": {
    #     "image": "educrew-python-sandbox",  # your custom image
    #     "command": [
    #         "bash",
    #         "-lc",
    #         "printf '%s\n' \"$CODE\" > main.py && python main.py"
    #     ],
    # },


    # "javascript": {  # JS via Node
    #     "image": "node:22-alpine",
    #     "command": [
    #         "sh",
    #         "-lc",
    #         "printf '%s\n' \"$CODE\" > main.js && node main.js"
    #     ],
    # },



    "typescript": {
    "image": "node:22-alpine",
    "command": [
        "sh",
        "-lc",
        "printf '%s\n' \"$CODE\" > main.ts && "
        "echo 'TypeScript compile step disabled in sandbox; running as JavaScript:' >&2 && "
        "node -e \"require('fs').readFileSync('main.ts','utf8')\""
    ],
    

    },
    "c": {
        "image": "gcc:14.2.0",
        "command": [
            "bash",
            "-lc",
            "printf '%s\n' \"$CODE\" > main.c && "
            "gcc main.c -O2 -std=c17 -o main.out && ./main.out"
        ],
    },
    # "cpp": {  # C++
    #     "image": "gcc:14.2.0",
    #     "command": [
    #         "bash",
    #         "-lc",
    #         "printf '%s\n' \"$CODE\" > main.cpp && "
    #         "g++ main.cpp -O2 -std=c++17 -o main.out && ./main.out"
    #     ],
    # },
    # "java": {
    #     "image": "eclipse-temurin:21-jdk",
    #     "command": [
    #         "bash",
    #         "-lc",
    #         "printf '%s\n' \"$CODE\" > Main.java && "
    #         "javac Main.java && java Main"
    #     ],
    # },
    "php": {
        "image": "php:8.3-cli",
        "command": [
            "sh",
            "-lc",
            "printf '%s\n' \"$CODE\" > main.php && php main.php"
        ],
    # },
    # "sql": {
    # "image": "educrew-sqlite-sandbox",
    # "command": [
    #     "bash",
    #     "-lc",
    #     "printf '%s\n' \"$CODE\" | sqlite3 -cmd '.headers on' -cmd '.mode column' :memory:"
    # ],
},

"go": {
        "image": "golang:1.23-alpine",
        "command": [
            "sh",
            "-lc",
            "printf '%s\n' \"$CODE\" > main.go && go run main.go"
        ],
    },
    "ruby": {
        "image": "ruby:3.3-alpine",
        "command": [
            "sh",
            "-lc",
            "printf '%s\n' \"$CODE\" > main.rb && ruby main.rb"
        ],
    },
    "rust": {
    "image": "rust:1.82",
    "command": [
        "bash",
        "-lc",
        "printf '%s\n' \"$CODE\" > main.rs && "
        "rustc main.rs -O -o main && ./main"
    ],


    },
    "csharp": {
    "image": "mcr.microsoft.com/dotnet/sdk:9.0",
    "command": [
        "bash",
        "-lc",
        # 1) create console project in ./app
        # 2) overwrite Program.cs with your code
        # 3) cd into app and run it
        "dotnet new console -n App -o app >/dev/null 2>&1 && "
        "printf '%s\n' \"$CODE\" > app/Program.cs && "
        "cd app && dotnet run --no-restore"
    ],



    },

    "kotlin": {
    "image": "zenika/kotlin",
    "command": [
        "sh",
        "-lc",
        "printf '%s\\n' \"$CODE\" > Main.kt && "
        "kotlinc Main.kt -include-runtime -d main.jar && "
        "timeout 5s java -jar main.jar"
    ],
},

    # "kotlin": {
    #     "image": "eclipse-temurin:21-jdk",
    #     "command": [
    #         "bash",
    #         "-lc",
    #         "curl -s https://get.sdkman.io | bash >/dev/null 2>&1 && "
    #         "source \"$HOME/.sdkman/bin/sdkman-init.sh\" && "
    #         "sdk install kotlin >/dev/null 2>&1 && "
    #         "printf '%s\n' \"$CODE\" > Main.kt && "
    #         "kotlinc Main.kt -include-runtime -d main.jar && "
    #         "java -jar main.jar"
    #     ],
    # },
    "r": {
        "image": "r-base:latest",
        "command": [
            "bash",
            "-lc",
            "printf '%s\n' \"$CODE\" > main.R && Rscript main.R"
        ],
    },
    "swift": {
        "image": "swift:6.0",
        "command": [
            "bash",
            "-lc",
            "printf '%s\n' \"$CODE\" > main.swift && swift main.swift"
        ],
    },
    # HTML/CSS: just echo back; no real 'run'
    "html": {
        "image": "busybox:latest",
        "command": [
            "sh",
            "-lc",
            "printf '%s\n' \"$CODE\""
        ],
    },
    "css": {
        "image": "busybox:latest",
        "command": [
            "sh",
            "-lc",
            "printf '%s\n' \"$CODE\""
        ],
    },
    # VERY basic assembly (NASM + Linux x86_64, advanced – optional)
    "asm": {
    "image": "gcc:14.2.0",
    "command": [
        "bash",
        "-lc",
        "echo 'ASM TEST:' && printf '%s\n' \"$CODE\""
    ],
},




}


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def code_run(request):
    code = request.data.get('code', '')
    language = request.data.get('language', 'python').lower()

    if not code:
        return Response({'error': 'code is required'}, status=status.HTTP_400_BAD_REQUEST)

    if language not in LANG_CONFIG:
        return Response(
            {'error': f'language \"{language}\" not supported'},
            status=status.HTTP_400_BAD_REQUEST
        )

    session = CodeSession.objects.create(
        user=request.user,
        language=language,
        code=code,
    )

    cfg = LANG_CONFIG[language]
    image = cfg["image"]
    command = cfg["command"]

    client_docker = docker.from_env()

    try:
        env = {"CODE": code}

        container = client_docker.containers.run(
            image,
            command,
            environment=env,
            detach=True,
            stdout=True,
            stderr=True,
            network_disabled=True,
            mem_limit="256m",
            cpu_period=100000,
            cpu_quota=50000,
        )

        result = container.wait(timeout=30)
        logs = container.logs(stdout=True, stderr=True).decode("utf-8", errors="ignore")
        container.remove()

        exit_code = result.get("StatusCode", 1)

        if exit_code == 0:
            session.sandbox_output = logs
            session.sandbox_error = ""
        else:
            session.sandbox_output = ""
            session.sandbox_error = logs

    except Exception as e:
        session.sandbox_output = ""
        session.sandbox_error = f"Sandbox error: {str(e)}"

    session.save()
    return Response(CodeSessionSerializer(session).data, status=status.HTTP_200_OK)


SUPPORTED_LANGS = {
    "python", "c", "cpp", "java", "javascript", "typescript",
    "go", "ruby", "rust", "csharp", "kotlin", "php", "sql"
}

def normalize_language(raw_lang: str) -> str:
    lang = (raw_lang or "python").lower()
    if lang in {"js", "node"}:
        return "javascript"
    if lang in {"c#", "cs"}:
        return "csharp"
    return lang


def build_practice_prompt(
    language: str,
    difficulty: str,
    source: str,
    source_type: str,
    time_limit_minutes: int | None,
    num_questions: int,
) -> str:
    difficulty = difficulty.lower()
    if difficulty not in {"beginner", "medium", "advanced"}:
        difficulty = "beginner"

    # clamp between 5 and 10
    num_questions = max(5, min(10, int(num_questions or 5)))

    time_hint = ""
    if time_limit_minutes:
        time_hint = (
            f"\n- Design each question to be solvable in about "
            f"{time_limit_minutes} minutes for a {difficulty} learner."
        )

    return f"""
You are a coding instructor for {language}.

Using the following {source_type}, generate exactly **{num_questions}**
{language} coding practice questions for a student at **{difficulty}** level.

Format EACH question like this, and repeat for all questions:

=== QUESTION START ===
Title: <short title>
Difficulty: {difficulty}
Topics: <comma separated topics>

Problem:
<problem statement>

Examples:
1) Input: ...
   Output: ...
2) Input: ...
   Output: ...

Constraints:
- ...

SuggestedTimeMinutes: <integer>
=== QUESTION END ===

Rules:
- Use ONLY {language} for any code snippets.
- Do NOT include solutions.
- Generate questions numbered implicitly by these START/END blocks.
- Return ONLY these question blocks, no extra explanation.

Here is the {source_type}:

{source}
"""



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def code_review(request):
    """
    LLM-based code review + related practice questions.
    """
    code = request.data.get('code', '')
    raw_language = request.data.get('language', 'python')
    difficulty = request.data.get('difficulty', 'beginner')
    time_limit = request.data.get('time_limit_minutes')
    num_questions = request.data.get('num_questions', 5)

    if not code:
        return Response({'error': 'code is required'},
                        status=status.HTTP_400_BAD_REQUEST)

    language = normalize_language(raw_language)
    if language not in SUPPORTED_LANGS:
        return Response({'error': f"language '{language}' not supported"},
                        status=status.HTTP_400_BAD_REQUEST)

    session = CodeSession.objects.create(
        user=request.user,
        language=language,
        code=code,
    )

    review_prompt = f"""
You are a senior {language} developer and teacher.

Task: Review the following **{language}** code.
- Do NOT translate it to another language.
- Keep all code examples in {language} only.

Answer in three short sections:
1) Summary: what does this code do?
2) Issues: bugs, edge cases, and performance problems.
3) Improvements: concrete {language}-specific refactors and best practices.

Code ({language}):
{code}
"""

    chat = client.chat.completions.create(
        model="sonar-pro",
        messages=[{"role": "user", "content": review_prompt}],
    )
    review_text = chat.choices[0].message.content

    session.review = review_text
    session.debug_help = review_text

    practice_prompt = build_practice_prompt(
        language=language,
        difficulty=difficulty,
        source=code,
        source_type="code snippet",
        time_limit_minutes=int(time_limit) if time_limit else None,
        num_questions=num_questions,
    )

    practice_chat = client.chat.completions.create(
        model="sonar-pro",
        messages=[{"role": "user", "content": practice_prompt}],
    )
    session.practice_challenge = practice_chat.choices[0].message.content

    if time_limit:
        session.time_limit_minutes = int(time_limit)

    session.save()
    return Response(CodeSessionSerializer(session).data,
                    status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def code_explain(request):
    """
    Beginner-friendly code explanation + related practice questions.
    """
    code = request.data.get('code', '')
    level = request.data.get('level', 'beginner')
    raw_language = request.data.get('language', 'python')
    difficulty = request.data.get('difficulty', level)
    time_limit = request.data.get('time_limit_minutes')
    num_questions = request.data.get('num_questions', 5)

    if not code:
        return Response({'error': 'code is required'},
                        status=status.HTTP_400_BAD_REQUEST)

    language = normalize_language(raw_language)
    if language not in SUPPORTED_LANGS:
        return Response({'error': f"language '{language}' not supported"},
                        status=status.HTTP_400_BAD_REQUEST)

    session = CodeSession.objects.create(
        user=request.user,
        language=language,
        code=code,
    )

    explain_prompt = f"""
You are a friendly {language} tutor.

Explain the following {language} code to a {level} student.
Rules:
- Use simple language.
- Explain step by step.
- Mention what each important line does.
- Keep all code examples and terminology in {language} only.
- Do not translate the code into another programming language.

Code ({language}):
{code}
"""

    chat = client.chat.completions.create(
        model="sonar-pro",
        messages=[{"role": "user", "content": explain_prompt}],
    )
    explanation = chat.choices[0].message.content
    session.explanation = explanation

    practice_prompt = build_practice_prompt(
        language=language,
        difficulty=difficulty,
        source=explanation,
        source_type="explanation",
        time_limit_minutes=int(time_limit) if time_limit else None,
        num_questions=num_questions,
    )

    practice_chat = client.chat.completions.create(
        model="sonar-pro",
        messages=[{"role": "user", "content": practice_prompt}],
    )
    session.practice_challenge = practice_chat.choices[0].message.content

    if time_limit:
        session.time_limit_minutes = int(time_limit)

    session.save()
    return Response(CodeSessionSerializer(session).data,
                    status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def code_generate(request):
    """
    Code / test generation from instruction + related practice questions.
    """
    instruction = request.data.get('instruction', '')
    raw_language = request.data.get('language', 'python')
    base_code = request.data.get('base_code', '')
    difficulty = request.data.get('difficulty', 'beginner')
    time_limit = request.data.get('time_limit_minutes')
    num_questions = request.data.get('num_questions', 5)

    if not instruction:
        return Response({'error': 'instruction is required'},
                        status=status.HTTP_400_BAD_REQUEST)

    language = normalize_language(raw_language)
    if language not in SUPPORTED_LANGS:
        return Response({'error': f"language '{language}' not supported"},
                        status=status.HTTP_400_BAD_REQUEST)

    session = CodeSession.objects.create(
        user=request.user,
        language=language,
        code=base_code,
    )

    gen_prompt = f"""
You are a professional {language} engineer.

Instruction (write {language} code only): {instruction}

If base code is provided, improve or extend it.
Return ONLY {language} code inside one Markdown code block:
- No text before or after the code block.
- No other languages mixed into the code.

Base code (may be empty, in {language}):
{base_code}
"""

    chat = client.chat.completions.create(
        model="sonar-pro",
        messages=[{"role": "user", "content": gen_prompt}],
    )
    generated = chat.choices[0].message.content
    session.generated_code = generated

    practice_source = (
        f"Instruction:\n{instruction}\n\nGenerated {language} code:\n{generated}"
    )
    practice_prompt = build_practice_prompt(
        language=language,
        difficulty=difficulty,
        source=practice_source,
        source_type="instruction and generated code",
        time_limit_minutes=int(time_limit) if time_limit else None,
        num_questions=num_questions,
    )

    practice_chat = client.chat.completions.create(
        model="sonar-pro",
        messages=[{"role": "user", "content": practice_prompt}],
    )
    session.practice_challenge = practice_chat.choices[0].message.content

    if time_limit:
        session.time_limit_minutes = int(time_limit)

    session.save()
    return Response(CodeSessionSerializer(session).data,
                    status=status.HTTP_200_OK)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def code_animate(request):
    """
    Generate a step-by-step execution trace (for visualization)
    for code in any supported language.

    Request JSON:
    {
      "language": "python" | "c" | "java" | ...,
      "code": "...",
      "input_state": { ... },   # optional, language-specific variables
      "max_steps": 30           # optional int
    }

    Response: CodeSession with animation_trace filled (JSON string).
    """
    code = request.data.get('code', '')
    raw_language = request.data.get('language', 'python')
    input_state = request.data.get('input_state', {})   # dict
    max_steps = int(request.data.get('max_steps', 30))

    if not code:
        return Response(
            {"error": "code is required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    language = normalize_language(raw_language)
    if language not in SUPPORTED_LANGS:
        return Response(
            {"error": f"language '{language}' not supported"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Create session
    session = CodeSession.objects.create(
        user=request.user,
        language=language,
        code=code,
    )

    # Minimal schema example for the LLM
    schema_example = {
        "language": language,
        "title": "short algorithm name",
        "variables": ["list", "of", "variable", "names"],
        "steps": [
            {
                "step": 1,
                "line": 3,
                "description": "short text of what happens",
                "state": {"i": 0, "arr": [1, 2, 3], "target": 2},
                "highlight": {"array_index": 0}
            }
        ]
    }

    prompt = f"""
You are an {language} algorithm explainer.

Given the following {language} code and an initial input state,
simulate the code step by step and return an execution trace as JSON.

Language: {language}

Rules:
- Follow the actual semantics of {language}.
- Generate at most {max_steps} steps.
- For each important step, include:
  - step: increasing integer starting from 1
  - line: source line number (1-based)
  - description: 1–2 sentences in simple English
  - state: current values of important variables (JSON object)
  - highlight: optional info for visualization
    (e.g., array_index, left/right pointers, current node id, etc.)
- Do NOT show only the final result; include intermediate steps.
- Use ONLY {language} syntax in any code snippets.
- Return ONLY valid JSON, no markdown, no backticks, no extra text.

JSON schema example (do NOT include comments in output):
{json.dumps(schema_example, indent=2)}

Code ({language}):
{code}

Initial input state (as a JSON object):
{json.dumps(input_state)}
"""

    chat = client.chat.completions.create(
        model="sonar-pro",
        messages=[{"role": "user", "content": prompt}],
    )
    raw_trace = chat.choices[0].message.content

    # Try to parse as JSON for safety; if fails, keep raw text
    try:
        trace_obj = json.loads(raw_trace)
        session.animation_trace = json.dumps(trace_obj)
    except Exception:
        session.animation_trace = raw_trace

    session.save()
    return Response(
        CodeSessionSerializer(session).data,
        status=status.HTTP_200_OK,
    )







@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_interview(request):
    """
    Start an interview session: generate one problem.
    """
    raw_language = request.data.get('language', 'python')
    difficulty = request.data.get('difficulty', 'medium')  # beginner/medium/advanced
    duration_minutes = int(request.data.get('duration_minutes', 45))

    language = normalize_language(raw_language)
    if language not in SUPPORTED_LANGS:
        return Response(
            {"error": f"language '{language}' not supported"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # create empty session
    from django.utils import timezone
    session = CodeSession.objects.create(
        user=request.user,
        language=language,
        is_interview=True,
        interview_difficulty=difficulty,
        interview_started_at=timezone.now(),
    )

    schema_example = {
        "title": "Two Sum",
        "difficulty": difficulty,
        "description": "Clear problem statement...",
        "input_format": "Description of inputs",
        "output_format": "Description of outputs",
        "examples": [
            {"input": "nums = [2,7,11,15], target = 9", "output": "[0,1]"}
        ],
        "constraints": [
            "1 <= n <= 10^5",
            "Time: O(n) or better preferred"
        ],
        "hints": [
            "Use a hash map to store seen numbers."
        ],
        "expected_time_minutes": duration_minutes
    }

    prompt = f"""
You are an interviewer preparing a coding interview question in {language}.

Generate ONE interview-style problem for a candidate at **{difficulty}** level.

Rules:
- The problem must be solvable in about {duration_minutes} minutes.
- Use {language} only for any example code or function signatures.
- Focus on common interview topics: arrays, strings, hash maps, etc. for {difficulty} difficulty.
- Return ONLY valid JSON (no markdown, no backticks) with fields:

{json.dumps(schema_example, indent=2)}

Do NOT include the solution.

Language: {language}
Difficulty: {difficulty}
"""

    chat = client.chat.completions.create(
        model="sonar-pro",
        messages=[{"role": "user", "content": prompt}],
    )
    raw = chat.choices[0].message.content

    try:
        problem = json.loads(raw)
        session.interview_problem = json.dumps(problem)
    except Exception:
        session.interview_problem = raw  # fallback

    session.save()
    return Response(CodeSessionSerializer(session).data,
                    status=status.HTTP_200_OK)





@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_interview_solution(request, session_id):
    """
    Candidate submits solution code for an existing interview session.
    """
    code = request.data.get('code', '')
    if not code:
        return Response({"error": "code is required"},
                        status=status.HTTP_400_BAD_REQUEST)

    try:
        session = CodeSession.objects.get(id=session_id, user=request.user)
    except CodeSession.DoesNotExist:
        return Response({"error": "session not found"},
                        status=status.HTTP_404_NOT_FOUND)

    if not session.is_interview:
        return Response({"error": "not an interview session"},
                        status=status.HTTP_400_BAD_REQUEST)

    session.code = code

    # 1) (optional) run in sandbox via your existing /code/run/ logic
    # here just assume you set sandbox_output/sandbox_error elsewhere

    # 2) reuse review+explain for scoring and hints
    language = session.language

    review_prompt = f"""
You are a senior {language} interviewer.

Evaluate the following solution for the given problem.

Problem:
{session.interview_problem}

Candidate solution ({language}):
{code}

Tasks:
1) Give a brief summary of the approach.
2) List correctness issues or missing edge cases.
3) Comment on time and space complexity.
4) Suggest concrete improvements.

Finally, give an overall SCORE from 0 to 100 and justify it briefly.
"""

    review_chat = client.chat.completions.create(
        model="sonar-pro",
        messages=[{"role": "user", "content": review_prompt}],
    )
    review_text = review_chat.choices[0].message.content
    session.review = review_text
    session.debug_help = review_text

    # Extract numeric score with a small follow-up prompt
    score_prompt = f"""
From the following evaluation text, extract ONLY the overall score
as an integer from 0 to 100. If not found, guess a reasonable score.

Evaluation:
{review_text}
"""
    score_chat = client.chat.completions.create(
        model="sonar-pro",
        messages=[{"role": "user", "content": score_prompt}],
    )
    score_raw = score_chat.choices[0].message.content.strip()
    try:
        score_int = int(''.join(ch for ch in score_raw if ch.isdigit())[:3] or "0")
        if score_int > 100:
            score_int = 100
    except Exception:
        score_int = None

    session.interview_score = score_int

    from django.utils import timezone
    session.interview_ended_at = timezone.now()
    session.save()

    return Response(CodeSessionSerializer(session).data,
                    status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def interview_report(request, session_id):
    """
    Simple report for an interview session.
    """
    try:
        session = CodeSession.objects.get(id=session_id, user=request.user)
    except CodeSession.DoesNotExist:
        return Response({"error": "session not found"},
                        status=status.HTTP_404_NOT_FOUND)

    if not session.is_interview:
        return Response({"error": "not an interview session"},
                        status=status.HTTP_400_BAD_REQUEST)

    from django.utils import timezone
    end_time = session.interview_ended_at or timezone.now()
    duration_seconds = None
    if session.interview_started_at:
        duration_seconds = int((end_time - session.interview_started_at).total_seconds())

    data = {
        "id": session.id,
        "language": session.language,
        "difficulty": session.interview_difficulty,
        "score": session.interview_score,
        "duration_seconds": duration_seconds,
        "problem": session.interview_problem,
        "review": session.review,
        "sandbox_output": session.sandbox_output,
        "sandbox_error": session.sandbox_error,
    }
    return Response(data, status=status.HTTP_200_OK)







# PROJECT PLANNER AGENT
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from django.utils import timezone
# from datetime import timedelta, datetime
# from django.conf import settings
# import requests
# import json

# from .models import ProjectPlan, ProjectTask   # move import to top


# # ----------------- PROJECT PLANNER AGENT -----------------

# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def project_planner(request):
#     """
#     Input JSON:
#     {
#       "project_title": "...",
#       "description": "...",
#       "due_in_days": 21,        # OR "due_date": "YYYY-MM-DD"
#       "hours_per_day": 3,
#       "start_date": "2025-01-01"  # optional
#     }
#     """
#     project_title = (request.data.get("project_title") or "").strip()
#     description = (request.data.get("description") or "").strip()
#     due_in_days = request.data.get("due_in_days")
#     due_date = request.data.get("due_date")
#     hours_per_day = request.data.get("hours_per_day") or 3
#     start_date = request.data.get("start_date")

#     if not project_title:
#         return Response({"error": "project_title is required"}, status=400)
#     if not description:
#         return Response({"error": "description is required"}, status=400)
#     if not due_in_days and not due_date:
#         return Response({"error": "Either due_in_days or due_date is required"}, status=400)

#     today = timezone.now().date()

#     if due_in_days:
#         try:
#             due_in_days = int(due_in_days)
#         except ValueError:
#             return Response({"error": "due_in_days must be integer"}, status=400)
#         end_date = today + timedelta(days=due_in_days)
#     else:
#         try:
#             end_date = datetime.fromisoformat(due_date).date()
#         except Exception:
#             return Response({"error": "Invalid due_date, use YYYY-MM-DD"}, status=400)

#     if not start_date:
#         start_date = today.isoformat()

#     system_msg = (
#         "You are a strict JSON-only project planning assistant. "
#         "You break large student projects into weekly tasks, "
#         "assign realistic deadlines, priorities, and status fields. "
#         "You MUST return ONLY valid JSON, no explanations or extra text."
#     )

#     user_msg = {
#         "project_title": project_title,
#         "description": description,
#         "start_date": start_date,
#         "end_date": end_date.isoformat(),
#         "hours_per_day": hours_per_day,
#         "requirements": [
#             "Break the whole project into phases and tasks.",
#             "Organize tasks week-by-week.",
#             "Mark each task with priority: high / medium / low.",
#             "Include an initial status field: pending.",
#             "Add an estimate_hours for each task.",
#             "Include reminder_dates for each task."
#         ],
#         "output_schema_example": {
#             "project_title": "Example title",
#             "start_date": "YYYY-MM-DD",
#             "end_date": "YYYY-MM-DD",
#             "total_weeks": 3,
#             "weeks": [
#                 {
#                     "week_number": 1,
#                     "week_start": "YYYY-MM-DD",
#                     "week_end": "YYYY-MM-DD",
#                     "tasks": [
#                         {
#                             "task_id": "1.1",
#                             "description": "Task description",
#                             "priority": "high",
#                             "status": "pending",
#                             "estimate_hours": 3,
#                             "deadline": "YYYY-MM-DD",
#                             "reminder_dates": ["YYYY-MM-DD"]
#                         }
#                     ]
#                 }
#             ]
#         }
#     }

#     headers = {
#         "Authorization": f"Bearer {settings.PERPLEXITY_API_KEY}",
#         "Content-Type": "application/json",
#     }

#     payload = {
#         "model": "sonar-pro",
#         "messages": [
#             {"role": "system", "content": system_msg},
#             {"role": "user", "content": json.dumps(user_msg)},
#         ],
#         "temperature": 0.2,
#         "max_tokens": 2000,
#     }

#     try:
#         res = requests.post(
#             "https://api.perplexity.ai/chat/completions",
#             headers=headers,
#             json=payload,
#             timeout=60,
#         )
#         res.raise_for_status()

#         raw = res.json()["choices"][0]["message"]["content"]
#         text = raw.strip()

#         # Handle ```json ... ``` wrappers if present
#         if text.startswith("```"):
#             lines = text.splitlines()
#             if len(lines) >= 2:
#                 text = "\n".join(lines[1:-1]).strip()
#             if text.lower().startswith("json"):
#                 text = text[4:].strip()

#         # Try strict JSON parse first, fallback by trimming at last brace
#         try:
#             plan = json.loads(text)
#         except json.JSONDecodeError:
#             last_brace = text.rfind("}")
#             if last_brace == -1:
#                 raise
#             plan = json.loads(text[: last_brace + 1])

#     except Exception as e:
#         return Response(
#             {"success": False, "error": f"Planner failed: {e}"},
#             status=500,
#         )
    

#         # ===== SAVE PLAN =====

#     proj = ProjectPlan.objects.create(
#         user=request.user,
#         title=plan.get("project_title", "Untitled Project"),
#         raw_plan=plan,
#     )

#     # Calculate dates
#     start_date = datetime.fromisoformat(plan.get("start_date", today.isoformat())).date()
    
#     for w in plan.get("weeks", []):
#         week_start = datetime.fromisoformat(w.get("week_start", start_date.isoformat())).date()
        
#         for t in w.get("tasks", []):
#             try:
#                 deadline_str = t.get("deadline")
#                 if not deadline_str:
#                     continue

#                 deadline = datetime.fromisoformat(deadline_str).date()
                
#                 # Calculate task date - distribute tasks throughout the week
#                 # If task is in week 1 and deadline is early, it might be today
#                 task_index = w.get("tasks", []).index(t)
#                 total_tasks_in_week = len(w.get("tasks", []))
                
#                 # Distribute tasks evenly across the week (Monday-Friday)
#                 # or use the deadline if it's earlier
#                 days_offset = min(task_index, 4)  # Max 5 days spread
#                 suggested_date = week_start + timedelta(days=days_offset)
                
#                 # Use the earlier of suggested date or deadline
#                 task_date = min(suggested_date, deadline)
                
#                 # Don't schedule before start date
#                 if task_date < start_date:
#                     task_date = start_date
                
#                 # Don't schedule before today if project starts today
#                 if task_date < today:
#                     task_date = today

#                 reminder_dates = t.get("reminder_dates") or []
#                 reminder = None
#                 if reminder_dates and len(reminder_dates) > 0:
#                     try:
#                         reminder = datetime.fromisoformat(reminder_dates[0]).date()
#                     except Exception:
#                         reminder = None

#                 ProjectTask.objects.create(
#                     project=proj,
#                     task_id=t.get("task_id", ""),
#                     title=t.get("description", ""),
#                     date=task_date,  # This is when the task should be worked on
#                     deadline=deadline,  # This is the final deadline
#                     priority=t.get("priority", "medium"),
#                     status=t.get("status", "pending"),
#                     estimate_hours=float(t.get("estimate_hours") or 1),
#                     reminder_date=reminder,
#                 )
#             except Exception as e:
#                 print("PLANNER TASK ERROR:", e)

#     return Response({"success": True, "plan": plan}, status=200)



from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta, datetime
from django.conf import settings
import requests
import json

from .models import ProjectPlan, ProjectTask
from .tasks import send_task_reminder_email  # Import the task

# ... your existing imports ...

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def project_planner(request):
    """
    Input JSON:
    {
      "project_title": "...",
      "description": "...",
      "due_in_days": 21,
      "hours_per_day": 3,
      "start_date": "2025-01-01"
    }
    """
    project_title = (request.data.get("project_title") or "").strip()
    description = (request.data.get("description") or "").strip()
    due_in_days = request.data.get("due_in_days")
    due_date = request.data.get("due_date")
    hours_per_day = request.data.get("hours_per_day") or 3
    start_date_str = request.data.get("start_date")
    
    # Get user's email preference
    notification_email = request.data.get("notification_email") or request.user.email

    if not project_title:
        return Response({"error": "project_title is required"}, status=400)
    if not description:
        return Response({"error": "description is required"}, status=400)
    if not due_in_days and not due_date:
        return Response({"error": "Either due_in_days or due_date is required"}, status=400)

    today = timezone.now().date()

    if due_in_days:
        try:
            due_in_days = int(due_in_days)
        except ValueError:
            return Response({"error": "due_in_days must be integer"}, status=400)
        end_date = today + timedelta(days=due_in_days)
    else:
        try:
            end_date = datetime.fromisoformat(due_date).date()
        except Exception:
            return Response({"error": "Invalid due_date, use YYYY-MM-DD"}, status=400)

    if not start_date_str:
        start_date = today
    else:
        start_date = datetime.fromisoformat(start_date_str).date()

    system_msg = (
        "You are a strict JSON-only project planning assistant. "
        "You break large student projects into weekly tasks, "
        "assign realistic deadlines, priorities, and status fields. "
        "You MUST return ONLY valid JSON, no explanations or extra text."
    )

    user_msg = {
        "project_title": project_title,
        "description": description,
        "start_date": start_date.isoformat(),
        "end_date": end_date.isoformat(),
        "hours_per_day": hours_per_day,
        "today": today.isoformat(),
        "requirements": [
            "Break the whole project into phases and tasks.",
            "Organize tasks week-by-week.",
            "Mark each task with priority: high / medium / low.",
            "Include an initial status field: pending.",
            "Add an estimate_hours for each task.",
            "Include reminder_dates for each task (array of dates before deadline).",
            f"IMPORTANT: Schedule first tasks for today ({today.isoformat()}) if project starts immediately.",
            "For high priority tasks, set reminder_dates 2-3 days before deadline.",
            "For medium priority, 1-2 days before.",
            "For low priority, 1 day before or on deadline.",
        ],
        "output_schema_example": {
            "project_title": "Example title",
            "start_date": "YYYY-MM-DD",
            "end_date": "YYYY-MM-DD",
            "total_weeks": 3,
            "weeks": [
                {
                    "week_number": 1,
                    "week_start": "YYYY-MM-DD",
                    "week_end": "YYYY-MM-DD",
                    "tasks": [
                        {
                            "task_id": "1.1",
                            "description": "Task description",
                            "priority": "high",
                            "status": "pending",
                            "estimate_hours": 3,
                            "deadline": "YYYY-MM-DD",
                            "reminder_dates": ["YYYY-MM-DD", "YYYY-MM-DD"]
                        }
                    ]
                }
            ]
        }
    }

    headers = {
        "Authorization": f"Bearer {settings.PERPLEXITY_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": "sonar-pro",
        "messages": [
            {"role": "system", "content": system_msg},
            {"role": "user", "content": json.dumps(user_msg)},
        ],
        "temperature": 0.2,
        "max_tokens": 2000,
    }

    try:
        res = requests.post(
            "https://api.perplexity.ai/chat/completions",
            headers=headers,
            json=payload,
            timeout=60,
        )
        res.raise_for_status()

        raw = res.json()["choices"][0]["message"]["content"]
        text = raw.strip()

        if text.startswith("```"):
            lines = text.splitlines()
            if len(lines) >= 2:
                text = "\n".join(lines[1:-1]).strip()
            if text.lower().startswith("json"):
                text = text[4:].strip()

        try:
            plan = json.loads(text)
        except json.JSONDecodeError:
            last_brace = text.rfind("}")
            if last_brace == -1:
                raise
            plan = json.loads(text[: last_brace + 1])

    except Exception as e:
        return Response(
            {"success": False, "error": f"Planner failed: {e}"},
            status=500,
        )

    # ===== SAVE PLAN =====
    proj = ProjectPlan.objects.create(
        user=request.user,
        title=plan.get("project_title", "Untitled Project"),
        raw_plan=plan,
    )

    created_tasks = []
    
    for w in plan.get("weeks", []):
        week_start = datetime.fromisoformat(w.get("week_start", start_date.isoformat())).date()
        
        for idx, t in enumerate(w.get("tasks", [])):
            try:
                deadline_str = t.get("deadline")
                if not deadline_str:
                    continue

                deadline = datetime.fromisoformat(deadline_str).date()
                
                # Calculate task work date
                days_offset = min(idx, 4)
                suggested_date = week_start + timedelta(days=days_offset)
                task_date = min(suggested_date, deadline)
                if task_date < start_date:
                    task_date = start_date

                # Get reminder dates from AI
                reminder_dates = t.get("reminder_dates") or []
                
                # Use first reminder date or default to 1 day before deadline
                if reminder_dates:
                    try:
                        reminder = datetime.fromisoformat(reminder_dates[0]).date()
                    except:
                        reminder = deadline - timedelta(days=1)
                else:
                    # Auto-calculate based on priority
                    if t.get("priority") == "high":
                        reminder = deadline - timedelta(days=2)
                    elif t.get("priority") == "medium":
                        reminder = deadline - timedelta(days=1)
                    else:
                        reminder = deadline

                task = ProjectTask.objects.create(
                    project=proj,
                    task_id=t.get("task_id", ""),
                    title=t.get("description", ""),
                    date=task_date,
                    deadline=deadline,
                    priority=t.get("priority", "medium"),
                    status=t.get("status", "pending"),
                    estimate_hours=float(t.get("estimate_hours") or 1),
                    reminder_date=reminder,
                    notification_email=notification_email,
                )
                
                created_tasks.append(task)
                
                # Schedule email reminder if reminder_date is in future
                if reminder >= today:
                    # Calculate eta for celery task
                    reminder_datetime = datetime.combine(reminder, datetime.min.time())
                    # Add 9 AM time for morning reminder
                    reminder_datetime = reminder_datetime.replace(hour=9)
                    
                    # Schedule the task
                    send_task_reminder_email.apply_async(
                        args=[task.id],
                        eta=reminder_datetime
                    )
                    task.reminder_scheduled = True
                    task.save(update_fields=['reminder_scheduled'])
                
                # Also schedule immediate reminder if task is for today
                if task_date == today and not task.reminder_sent:
                    send_task_reminder_email.delay(task.id)

            except Exception as e:
                print("PLANNER TASK ERROR:", e)

    return Response({
        "success": True, 
        "plan": plan,
        "tasks_created": len(created_tasks),
        "notification_email": notification_email
    }, status=200)


# Add new endpoint to update notification email
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_notification_email(request):
    """
    Update notification email for user and all their tasks
    """
    email = request.data.get("email")
    if not email:
        return Response({"error": "Email is required"}, status=400)
    
    # Update all pending tasks
    ProjectTask.objects.filter(
        project__user=request.user,
        status__in=["pending", "in_progress"]
    ).update(notification_email=email)
    
    return Response({
        "success": True,
        "message": "Notification email updated",
        "email": email
    })


# Add endpoint to manually trigger reminder
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def send_test_reminder(request, task_id):
    """
    Manually send a test reminder email
    """
    try:
        task = ProjectTask.objects.get(id=task_id, project__user=request.user)
        result = send_task_reminder_email.delay(task.id)
        return Response({
            "success": True,
            "message": "Test reminder sent",
            "task_id": task_id,
            "celery_task_id": result.id
        })
    except ProjectTask.DoesNotExist:
        return Response({"error": "Task not found"}, status=404)



from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from django.db import models
from .models import ProjectTask

from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ProjectTask

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def project_tasks_today(request):
    today = timezone.now().date()

    # Only tasks scheduled for today (using date field)
    tasks = ProjectTask.objects.filter(
    project__user=request.user,
    date=today,
    status__in=["pending", "in_progress"],

    ).order_by("priority")

    data = []
    for t in tasks:
        data.append({
            "id": t.id,
            "project_title": t.project.title,
            "task_id": t.task_id,
            "title": t.title,
            "date": t.date.isoformat(),
            "deadline": t.deadline.isoformat(),
            "priority": t.priority,
            "status": t.status,
            "estimate_hours": t.estimate_hours,
            "reminder_date": t.reminder_date.isoformat() if t.reminder_date else None,
        })

    return Response({"success": True, "tasks": data}, status=200)




@api_view(["POST"])
@permission_classes([IsAuthenticated])
def project_task_complete(request, task_id):
    """Mark a task as completed."""
    try:
        task = ProjectTask.objects.get(id=task_id, project__user=request.user)
    except ProjectTask.DoesNotExist:
        return Response({"success": False, "error": "Task not found"}, status=404)

    task.status = "done"
    task.save(update_fields=["status"])

    return Response(
        {"success": True, "task_id": task.id, "status": task.status},
        status=200
    )



from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta, datetime
from django.conf import settings
import requests
import json

from .models import ProjectPlan, ProjectTask


# ----------------- EXISTING CODE (keep your current project_planner, project_tasks_today, project_task_complete) -----------------


# ----------------- NEW ENDPOINTS TO ADD -----------------

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_projects(request):
    """
    Get all project plans for the current user
    """
    projects = ProjectPlan.objects.filter(user=request.user).order_by('-created_at')
    
    data = []
    for proj in projects:
        # Calculate progress
        total_tasks = ProjectTask.objects.filter(project=proj).count()
        completed_tasks = ProjectTask.objects.filter(project=proj, status='done').count()
        progress = round((completed_tasks / total_tasks * 100), 1) if total_tasks > 0 else 0
        
        data.append({
            "id": proj.id,
            "title": proj.title,
            "created_at": proj.created_at.isoformat(),
            "start_date": proj.raw_plan.get('start_date') if proj.raw_plan else None,
            "end_date": proj.raw_plan.get('end_date') if proj.raw_plan else None,
            "total_weeks": proj.raw_plan.get('total_weeks') if proj.raw_plan else None,
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "progress": progress,
        })
    
    return Response({"success": True, "projects": data}, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_project_detail(request, project_id):
    """
    Get full details of a specific project including all tasks organized by weeks
    """
    try:
        project = ProjectPlan.objects.get(id=project_id, user=request.user)
    except ProjectPlan.DoesNotExist:
        return Response({"success": False, "error": "Project not found"}, status=404)
    
    # Get all tasks for this project from DATABASE (not just raw_plan)
    db_tasks = ProjectTask.objects.filter(project=project)
    
    # Calculate progress from ACTUAL database tasks
    total_tasks = db_tasks.count()
    completed_tasks = db_tasks.filter(status='done').count()
    progress = round((completed_tasks / total_tasks * 100), 1) if total_tasks > 0 else 0
    
    # Build weeks data from raw_plan but use ACTUAL task data from DB
    weeks_data = []
    
    if project.raw_plan and 'weeks' in project.raw_plan:
        raw_weeks = project.raw_plan['weeks']
        
        for week in raw_weeks:
            week_tasks = []
            for task_data in week.get('tasks', []):
                task_id = task_data.get('task_id', '')
                
                # Find actual task in database by task_id
                try:
                    db_task = db_tasks.get(task_id=task_id)
                    week_tasks.append({
                        "id": db_task.id,
                        "task_id": db_task.task_id,
                        "title": db_task.title,  # From DB (stored as description)
                        "description": db_task.title,  # For compatibility
                        "priority": db_task.priority,
                        "status": db_task.status,
                        "estimate_hours": db_task.estimate_hours,
                        "deadline": db_task.deadline.isoformat() if db_task.deadline else None,
                        "date": db_task.date.isoformat() if db_task.date else None,
                        "reminder_date": db_task.reminder_date.isoformat() if db_task.reminder_date else None,
                    })
                except ProjectTask.DoesNotExist:
                    # Fallback to raw data if not in DB
                    week_tasks.append({
                        "id": None,
                        "task_id": task_id,
                        "title": task_data.get('description', ''),  # description becomes title
                        "description": task_data.get('description', ''),
                        "priority": task_data.get('priority', 'medium'),
                        "status": task_data.get('status', 'pending'),
                        "estimate_hours": task_data.get('estimate_hours', 1),
                        "deadline": task_data.get('deadline'),
                        "date": task_data.get('deadline'),  # fallback
                        "reminder_date": task_data.get('reminder_dates', [None])[0] if task_data.get('reminder_dates') else None,
                    })
            
            weeks_data.append({
                "week_number": week['week_number'],
                "week_start": week.get('week_start'),
                "week_end": week.get('week_end'),
                "tasks": week_tasks
            })
    
    plan_data = {
        "id": project.id,
        "project_title": project.title,
        "start_date": project.raw_plan.get('start_date') if project.raw_plan else None,
        "end_date": project.raw_plan.get('end_date') if project.raw_plan else None,
        "total_weeks": len(weeks_data),
        "weeks": weeks_data,
        "total_tasks": total_tasks,  # From DB count
        "completed_tasks": completed_tasks,  # From DB count
        "progress": progress,  # Calculated from DB
        "created_at": project.created_at.isoformat(),
    }
    
    return Response({"success": True, "plan": plan_data}, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_project_tasks(request, project_id):
    """
    Get all tasks for a specific project (all tasks, not just today)
    """
    try:
        project = ProjectPlan.objects.get(id=project_id, user=request.user)
    except ProjectPlan.DoesNotExist:
        return Response({"success": False, "error": "Project not found"}, status=404)
    
    tasks = ProjectTask.objects.filter(project=project).order_by('date', 'deadline')
    
    data = []
    for task in tasks:
        data.append({
            "id": task.id,
            "task_id": task.task_id,
            "title": task.title,
            "date": task.date.isoformat() if task.date else None,
            "deadline": task.deadline.isoformat() if task.deadline else None,
            "priority": task.priority,
            "status": task.status,
            "estimate_hours": task.estimate_hours,
            "reminder_date": task.reminder_date.isoformat() if task.reminder_date else None,
        })
    
    return Response({
        "success": True, 
        "project_title": project.title,
        "tasks": data
    }, status=200)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_project(request, project_id):
    """
    Delete a project and all its tasks
    """
    try:
        project = ProjectPlan.objects.get(id=project_id, user=request.user)
        project.delete()
        return Response({"success": True, "message": "Project deleted"}, status=200)
    except ProjectPlan.DoesNotExist:
        return Response({"success": False, "error": "Project not found"}, status=404)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def debug_project_tasks(request, project_id):
    """
    Debug endpoint to check raw tasks in database
    """
    try:
        project = ProjectPlan.objects.get(id=project_id, user=request.user)
        tasks = ProjectTask.objects.filter(project=project)
        
        data = []
        for t in tasks:
            data.append({
                "id": t.id,
                "task_id": t.task_id,
                "title": t.title,
                "date": str(t.date),
                "deadline": str(t.deadline),
                "status": t.status,
            })
        
        return Response({
            "project_id": project_id,
            "project_title": project.title,
            "task_count": tasks.count(),
            "tasks": data
        })
    except Exception as e:
        return Response({"error": str(e)}, status=500)




# QualityReview agent

from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User

from .models import QualityReview
from .serializers import QualityReviewSerializer
from .utils_quality import extract_text_from_uploaded_file
from .quality_llm import run_quality_llm
from .web_plagiarism_checker import search_web_for_plagiarism

import traceback


# @api_view(["POST"])
# @parser_classes([MultiPartParser, FormParser, JSONParser])
# @permission_classes([IsAuthenticated])
# def quality_review(request):
#     """
#     Quality Review Agent:
#     - Accepts raw text or uploaded file
#     - Runs LLM-based quality analysis
#     - Runs WEB similarity check using Google Custom Search
#     - Returns Turnitin-style report with real internet sources
#     """

#     user = request.user

#     # 1) Get text
#     text = (request.data.get("text") or "").strip()
#     filename = ""
#     if not text:
#         uploaded = request.FILES.get("file")
#         if not uploaded:
#             return Response(
#                 {"error": "Provide 'text' or upload a file"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )
#         text = extract_text_from_uploaded_file(uploaded)
#         filename = uploaded.name

#     if not text or len(text) < 50:
#         return Response(
#             {"error": "Document is too short for meaningful analysis"},
#             status=status.HTTP_400_BAD_REQUEST,
#         )

#     assignment_requirements = request.data.get("requirements", "")

#     # 2) Create DB record
#     review_obj = QualityReview.objects.create(
#         user=user,
#         filename=filename,
#         original_text=text[:50000],
#     )

#     # 3) LLM quality analysis
#     try:
#         quality_data = run_quality_llm(text, assignment_requirements)
#     except Exception as e:
#         traceback.print_exc()
#         return Response(
#             {"error": f"QUALITY_LLM_ERROR: {str(e)}"},
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#         )

#     review_obj.quality_score = int(quality_data.get("overall_score", 0))
#     review_obj.quality_issues = quality_data.get("issues", [])
#     review_obj.overall_feedback = quality_data.get("summary", "")

#     # 4) WEB plagiarism check using Google Search
#     try:
#         web_result = search_web_for_plagiarism(text, max_results=10)
#     except Exception as e:
#         traceback.print_exc()
#         review_obj.save()
#         return Response(
#             {"error": f"WEB_SEARCH_ERROR: {str(e)}"},
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#         )

#     overall_sim = web_result["overall_similarity"]
#     web_matches = web_result["top_matches"]

#     word_count = len(text.split())
#     page_count = max(1, word_count // 450)

#     review_obj.similarity_percent = overall_sim
#     review_obj.word_count = word_count
#     review_obj.page_count = page_count

#     # Match groups
#     review_obj.match_groups = {
#         "internet_sources": overall_sim,
#         "publications": 0,
#         "student_papers": 0,
#     }

#     # Format top sources (Turnitin-style with real URLs)
#     turnitin_style_sources = []
#     for match in web_matches[:10]:
#         turnitin_style_sources.append({
#             "rank": match["rank"],
#             "source_type": "Internet Source",
#             "title": match["title"],
#             "url": match["url"],
#             "snippet": match["snippet"],
#             "similarity": match["similarity"],
#         })

#     review_obj.top_sources = turnitin_style_sources

#     review_obj.raw_plagiarism_report = {
#         "engine": "google_custom_search",
#         "similarity_percent": overall_sim,
#         "top_matches": web_matches,
#     }

#     review_obj.save()

#     serializer = QualityReviewSerializer(review_obj)
#     return Response(serializer.data, status=status.HTTP_200_OK)




# views.py

from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User

from .models import QualityReview
from .serializers import QualityReviewSerializer
from .utils_quality import extract_text_from_uploaded_file
from .quality_llm import run_quality_llm
from .web_plagiarism_checker import search_web_for_plagiarism

import traceback


def deduplicate_issues(issues):
    """Remove duplicate issues based on message content."""
    seen_messages = set()
    unique_issues = []
    
    for issue in issues:
        # Normalize message for comparison
        message = issue.get("message", "").lower().strip()
        # Create a key from type + first 50 chars of message
        key = f"{issue.get('type', 'general')}_{message[:50]}"
        
        if key not in seen_messages and message:
            seen_messages.add(key)
            # Normalize severity values
            severity = issue.get("severity", "low").lower()
            if severity not in ["low", "medium", "high", "critical"]:
                severity = "low"
            # Map critical to high for consistency
            if severity == "critical":
                severity = "high"
                
            unique_issues.append({
                "type": issue.get("type", "general"),
                "severity": severity,
                "message": issue.get("message", "Issue detected"),
                "suggestion": issue.get("suggestion", "Review this section"),
                "location": issue.get("location", {})
            })
    
    return unique_issues


@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def quality_review(request):
    """
    Quality Review Agent:
    - Accepts raw text or uploaded file
    - Runs LLM-based quality analysis
    - Runs WEB similarity check using Google Custom Search
    - Returns Turnitin-style report with real internet sources
    """
    user = request.user

    # 1) Get text from request or file
    text = (request.data.get("text") or "").strip()
    filename = ""
    
    if not text:
        uploaded = request.FILES.get("file")
        if not uploaded:
            return Response(
                {"error": "Provide 'text' or upload a file"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            text = extract_text_from_uploaded_file(uploaded)
            filename = uploaded.name
        except Exception as e:
            return Response(
                {"error": f"Failed to extract text from file: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    # Validate text length
    if not text or len(text) < 50:
        return Response(
            {"error": "Document is too short for meaningful analysis (minimum 50 characters)"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Truncate very long text for LLM processing
    original_text = text
    if len(text) > 15000:
        text = text[:15000]
        print(f"Warning: Text truncated to 15000 characters for LLM processing")

    assignment_requirements = request.data.get("requirements", "")

    # 2) Create DB record
    review_obj = QualityReview.objects.create(
        user=user,
        filename=filename,
        original_text=original_text[:50000],
    )

    # 3) LLM quality analysis
    try:
        quality_data = run_quality_llm(text, assignment_requirements)
    except Exception as e:
        traceback.print_exc()
        review_obj.error_message = str(e)
        review_obj.save()
        return Response(
            {
                "error": "Quality analysis failed",
                "detail": str(e),
                "suggestion": "Please try again with a shorter document or different file format."
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    # Deduplicate and clean issues
    raw_issues = quality_data.get("issues", [])
    clean_issues = deduplicate_issues(raw_issues)

    # Save quality data
    review_obj.quality_score = int(quality_data.get("overall_score", 0))
    review_obj.grammar_score = int(quality_data.get("grammar_score", 0))
    review_obj.style_score = int(quality_data.get("style_score", 0))
    review_obj.citation_score = int(quality_data.get("citation_score", 0))
    review_obj.requirement_match_score = int(quality_data.get("requirement_match_score", 0))
    review_obj.quality_issues = clean_issues  # Save deduplicated issues
    review_obj.overall_feedback = quality_data.get("summary", "")

    # 4) WEB plagiarism check
    try:
        web_result = search_web_for_plagiarism(original_text, max_results=10)
    except Exception as e:
        traceback.print_exc()
        web_result = {
            "overall_similarity": 0.0,
            "top_matches": []
        }

    overall_sim = web_result.get("overall_similarity", 0.0)
    web_matches = web_result.get("top_matches", [])

    # Calculate document stats
    word_count = len(original_text.split())
    page_count = max(1, word_count // 450)

    review_obj.similarity_percent = overall_sim
    review_obj.word_count = word_count
    review_obj.page_count = page_count

    # Match groups
    review_obj.match_groups = {
        "internet_sources": overall_sim,
        "publications": 0,
        "student_papers": 0,
    }

    # Format top sources
    turnitin_style_sources = []
    for match in web_matches[:10]:
        turnitin_style_sources.append({
            "rank": match.get("rank", 0),
            "source_type": "Internet Source",
            "title": match.get("title", "Unknown Source"),
            "url": match.get("url", ""),
            "snippet": match.get("snippet", ""),
            "similarity": match.get("similarity", 0),
        })

    review_obj.top_sources = turnitin_style_sources

    review_obj.raw_plagiarism_report = {
        "engine": "google_custom_search",
        "similarity_percent": overall_sim,
        "top_matches": web_matches,
    }

    review_obj.save()

    serializer = QualityReviewSerializer(review_obj)
    return Response(serializer.data, status=status.HTTP_200_OK)







# EduCrew_Backend/dashboard_views.py
# Add this new file for dashboard functionality
# EduCrew_Backend/dashboard_views.py - COMPLETE FIXED VERSION

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Count, Avg
from django.utils import timezone
from datetime import timedelta, datetime
from collections import defaultdict

from .models import (
    StudyMaterial, Presentation, CodeSession, 
    ProjectPlan, ProjectTask, QualityReview
)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_overview(request):
    user = request.user
    today = timezone.now().date()
    week_ago = today - timedelta(days=7)
    month_ago = today - timedelta(days=30)
    
    study_stats = get_study_stats(user, today, week_ago, month_ago)
    presentation_stats = get_presentation_stats(user, today, week_ago, month_ago)
    code_stats = get_code_stats(user, today, week_ago, month_ago)
    project_stats = get_project_stats(user, today, week_ago, month_ago)
    quality_stats = get_quality_stats(user, today, week_ago, month_ago)
    recent_activity = get_recent_activity(user, limit=10)
    weekly_progress = get_weekly_progress(user)
    skill_distribution = get_skill_distribution(user)
    level = calculate_user_level(user)
    achievements = calculate_achievements(user)
    
    return Response({
        'success': True,
        'user': {
            'username': user.username,
            'email': user.email,
            'joined_date': user.date_joined.isoformat(),
        },
        'summary': {
            'total_study_materials': study_stats['total'],
            'total_presentations': presentation_stats['total'],
            'total_code_sessions': code_stats['total'],
            'total_projects': project_stats['total'],
            'total_quality_reviews': quality_stats['total'],
            'overall_completion_rate': calculate_overall_completion_rate(study_stats, project_stats, code_stats),
        },
        'this_week': {
            'study_materials_created': study_stats['this_week'],
            'presentations_created': presentation_stats['this_week'],
            'code_sessions': code_stats['this_week'],
            'projects_started': project_stats['this_week'],
            'tasks_done': project_stats['tasks_completed_this_week'],
        },
        'study_materials': study_stats,
        'presentations': presentation_stats,
        'code_practice': code_stats,
        'projects': project_stats,
        'quality_reviews': quality_stats,
        'recent_activity': recent_activity,
        'weekly_progress_chart': weekly_progress,
        'skill_distribution': skill_distribution,
        'level': level,
        'achievements': achievements,
    })


def get_study_stats(user, today, week_ago, month_ago):
    materials = StudyMaterial.objects.filter(user=user)
    file_uploads = materials.exclude(file='').count()
    text_based = materials.filter(file='').count()
    this_week = materials.filter(uploaded_at__gte=timezone.make_aware(datetime.combine(week_ago, datetime.min.time()))).count()
    this_month = materials.filter(uploaded_at__gte=timezone.make_aware(datetime.combine(month_ago, datetime.min.time()))).count()
    
    content_types = defaultdict(int)
    for m in materials:
        if m.filename:
            ext = m.filename.split('.')[-1].lower() if '.' in m.filename else 'text'
            content_types[ext] += 1
    
    return {
        'total': materials.count(),
        'this_week': this_week,
        'this_month': this_month,
        'file_uploads': file_uploads,
        'text_based': text_based,
        'content_types': dict(content_types),
        'latest_materials': list(materials.order_by('-uploaded_at')[:5].values('id', 'filename', 'uploaded_at')),
    }


def get_presentation_stats(user, today, week_ago, month_ago):
    presentations = Presentation.objects.filter(user=user)
    this_week = presentations.filter(created_at__date__gte=week_ago).count()
    this_month = presentations.filter(created_at__date__gte=month_ago).count()
    avg_slides = presentations.aggregate(avg=Avg('slides_count'))['avg'] or 0
    
    return {
        'total': presentations.count(),
        'this_week': this_week,
        'this_month': this_month,
        'average_slides': round(avg_slides, 1),
        'with_ai_images': 0,
        'latest_presentations': list(presentations.order_by('-created_at')[:5].values('id', 'title', 'topic', 'slides_count', 'created_at')),
    }


def get_code_stats(user, today, week_ago, month_ago):
    sessions = CodeSession.objects.filter(user=user)
    this_week = sessions.filter(created_at__date__gte=week_ago).count()
    this_month = sessions.filter(created_at__date__gte=month_ago).count()
    language_stats = sessions.values('language').annotate(count=Count('id')).order_by('-count')
    interview_sessions = sessions.filter(is_interview=True)
    interview_count = interview_sessions.count()
    avg_interview_score = interview_sessions.filter(interview_score__isnull=False).aggregate(avg=Avg('interview_score'))['avg']
    successful_runs = sessions.filter(sandbox_error='').count()
    total_runs = sessions.count()
    success_rate = (successful_runs / total_runs * 100) if total_runs > 0 else 0
    
    return {
        'total': sessions.count(),
        'this_week': this_week,
        'this_month': this_month,
        'languages': list(language_stats),
        'interview_sessions': interview_count,
        'average_interview_score': round(avg_interview_score, 1) if avg_interview_score else None,
        'success_rate': round(success_rate, 1),
        'latest_sessions': list(sessions.order_by('-created_at')[:5].values('id', 'language', 'is_interview', 'interview_score', 'created_at')),
    }


def get_project_stats(user, today, week_ago, month_ago):
    projects = ProjectPlan.objects.filter(user=user)
    tasks = ProjectTask.objects.filter(project__user=user)
    
    this_week = projects.filter(created_at__date__gte=week_ago).count()
    this_month = projects.filter(created_at__date__gte=month_ago).count()
    total_tasks = tasks.count()
    completed_tasks = tasks.filter(status='done').count()
    pending_tasks = tasks.filter(status__in=['pending', 'in_progress']).count()
    overdue_tasks = tasks.filter(deadline__lt=today, status__in=['pending', 'in_progress']).count()
    tasks_today = tasks.filter(date=today, status__in=['pending', 'in_progress']).count()
    completion_rate = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
    priority_dist = tasks.values('priority').annotate(count=Count('id'))
    
    # FIXED: Use date instead of updated_at
    tasks_completed_this_week = tasks.filter(status='done', date__gte=week_ago).count()
    
    return {
        'total': projects.count(),
        'this_week': this_week,
        'this_month': this_month,
        'total_tasks': total_tasks,
        'completed_tasks': completed_tasks,
        'pending_tasks': pending_tasks,
        'overdue_tasks': overdue_tasks,
        'tasks_due_today': tasks_today,
        'completion_rate': round(completion_rate, 1),
        'priority_distribution': list(priority_dist),
        'tasks_completed_this_week': tasks_completed_this_week,
        'active_projects': list(projects.filter(tasks__status__in=['pending', 'in_progress']).distinct().order_by('-created_at')[:5].values('id', 'title', 'created_at')),
    }


def get_quality_stats(user, today, week_ago, month_ago):
    reviews = QualityReview.objects.filter(user=user)
    this_week = reviews.filter(created_at__date__gte=week_ago).count()
    this_month = reviews.filter(created_at__date__gte=month_ago).count()
    avg_quality = reviews.aggregate(avg=Avg('quality_score'))['avg']
    avg_similarity = reviews.aggregate(avg=Avg('similarity_percent'))['avg']
    excellent = reviews.filter(quality_score__gte=90).count()
    good = reviews.filter(quality_score__gte=70, quality_score__lt=90).count()
    needs_work = reviews.filter(quality_score__lt=70).count()
    
    return {
        'total': reviews.count(),
        'this_week': this_week,
        'this_month': this_month,
        'average_quality_score': round(avg_quality, 1) if avg_quality else None,
        'average_similarity': round(avg_similarity, 1) if avg_similarity else None,
        'quality_distribution': {'excellent': excellent, 'good': good, 'needs_work': needs_work},
        'latest_reviews': list(reviews.order_by('-created_at')[:5].values('id', 'filename', 'quality_score', 'similarity_percent', 'created_at')),
    }


def calculate_overall_completion_rate(study, projects, code):
    project_completion = projects.get('completion_rate', 0)
    code_success = code.get('success_rate', 0)
    overall = (project_completion * 0.5) + (code_success * 0.3) + (20 if study['total'] > 0 else 0)
    return round(min(overall, 100), 1)


def get_recent_activity(user, limit=10):
    activities = []
    
    for m in StudyMaterial.objects.filter(user=user).order_by('-uploaded_at')[:limit]:
        activities.append({
            'type': 'study_material',
            'title': m.filename or 'Generated Notes',
            'timestamp': m.uploaded_at.isoformat(),
            'detail': "Processed study material" if m.notes else "File uploaded",
        })
    
    for p in Presentation.objects.filter(user=user).order_by('-created_at')[:limit]:
        activities.append({
            'type': 'presentation',
            'title': p.title,
            'timestamp': p.created_at.isoformat(),
            'detail': f"{p.slides_count} slides created",
        })
    
    for c in CodeSession.objects.filter(user=user).order_by('-created_at')[:limit]:
        activities.append({
            'type': 'code_interview' if c.is_interview else 'code_practice',
            'title': f"{c.language.capitalize()} {'Interview' if c.is_interview else 'Practice'}",
            'timestamp': c.created_at.isoformat(),
            'detail': f"Score: {c.interview_score}" if c.is_interview and c.interview_score else "Code executed",
        })
    
    # FIXED: Use date instead of updated_at
    for t in ProjectTask.objects.filter(project__user=user, status='done').order_by('-date')[:limit]:
        activities.append({
            'type': 'task_completed',
            'title': t.title,
            'timestamp': datetime.combine(t.date, datetime.min.time()).isoformat() if t.date else timezone.now().isoformat(),
            'detail': f"Project: {t.project.title}",
        })
    
    for q in QualityReview.objects.filter(user=user).order_by('-created_at')[:limit]:
        activities.append({
            'type': 'quality_review',
            'title': q.filename or 'Document Review',
            'timestamp': q.created_at.isoformat(),
            'detail': f"Quality Score: {q.quality_score}",
        })
    
    activities.sort(key=lambda x: x['timestamp'], reverse=True)
    return activities[:limit]


def get_weekly_progress(user):
    today = timezone.now().date()
    data = []
    
    for i in range(6, -1, -1):
        date = today - timedelta(days=i)
        date_str = date.strftime('%Y-%m-%d')
        
        study_count = StudyMaterial.objects.filter(user=user, uploaded_at__date=date).count()
        pres_count = Presentation.objects.filter(user=user, created_at__date=date).count()
        code_count = CodeSession.objects.filter(user=user, created_at__date=date).count()
        
        # FIXED: Use date field instead of updated_at
        tasks_completed = ProjectTask.objects.filter(project__user=user, status='done', date=date).count()
        
        data.append({
            'date': date_str,
            'day': date.strftime('%a'),
            'study': study_count,
            'presentations': pres_count,
            'code': code_count,
            'tasks_completed': tasks_completed,
            'total': study_count + pres_count + code_count + tasks_completed,
        })
    
    return data


def get_skill_distribution(user):
    sessions = CodeSession.objects.filter(user=user)
    lang_dist = sessions.values('language').annotate(count=Count('id')).order_by('-count')
    difficulty_dist = sessions.filter(is_interview=True).values('interview_difficulty').annotate(count=Count('id'))
    
    return {
        'languages': list(lang_dist),
        'difficulty_levels': list(difficulty_dist),
        'total_practice_hours': sessions.count() * 0.5,
    }


def calculate_user_level(user):
    score = 0
    score += StudyMaterial.objects.filter(user=user).count() * 10
    score += Presentation.objects.filter(user=user).count() * 15
    score += CodeSession.objects.filter(user=user).count() * 5
    score += ProjectPlan.objects.filter(user=user).count() * 20
    score += QualityReview.objects.filter(user=user).count() * 10
    
    level = 1
    while score >= level * 100:
        score -= level * 100
        level += 1
    
    return {
        'level': level,
        'current_xp': score,
        'xp_to_next': level * 100,
        'progress_percent': round(score / (level * 100) * 100, 1),
    }


def calculate_achievements(user):
    achievements = []
    
    study_count = StudyMaterial.objects.filter(user=user).count()
    if study_count >= 1:
        first = StudyMaterial.objects.filter(user=user).first()
        achievements.append({
            'id': 'first_study',
            'title': 'First Steps',
            'description': 'Created your first study material',
            'icon': '📚',
            'unlocked_at': first.uploaded_at.isoformat() if first else None,
        })
    
    code_count = CodeSession.objects.filter(user=user).count()
    if code_count >= 1:
        first = CodeSession.objects.filter(user=user).first()
        achievements.append({
            'id': 'hello_world',
            'title': 'Hello World',
            'description': 'Ran your first code',
            'icon': '💻',
            'unlocked_at': first.created_at.isoformat() if first else None,
        })
    
    interview_count = CodeSession.objects.filter(user=user, is_interview=True).count()
    if interview_count >= 1:
        first = CodeSession.objects.filter(user=user, is_interview=True).first()
        achievements.append({
            'id': 'first_interview',
            'title': 'Interview Ready',
            'description': 'Completed your first mock interview',
            'icon': '🎯',
            'unlocked_at': first.created_at.isoformat() if first else None,
        })
    
    perfect = CodeSession.objects.filter(user=user, is_interview=True, interview_score=100).first()
    if perfect:
        achievements.append({
            'id': 'perfect_score',
            'title': 'Perfect Score',
            'description': 'Scored 100% on a mock interview',
            'icon': '🏆',
            'unlocked_at': perfect.created_at.isoformat(),
        })
    
    project_count = ProjectPlan.objects.filter(user=user).count()
    if project_count >= 1:
        first = ProjectPlan.objects.filter(user=user).first()
        achievements.append({
            'id': 'project_planner',
            'title': 'Project Planner',
            'description': 'Created your first project plan',
            'icon': '📋',
            'unlocked_at': first.created_at.isoformat() if first else None,
        })
    
    quality_count = QualityReview.objects.filter(user=user).count()
    if quality_count >= 1:
        first = QualityReview.objects.filter(user=user).first()
        achievements.append({
            'id': 'quality_first',
            'title': 'Quality Check',
            'description': 'Submitted first document for review',
            'icon': '✅',
            'unlocked_at': first.created_at.isoformat() if first else None,
        })
    
    return achievements










# Add these new API endpoints to your backend views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# ---------------- STUDY MATERIALS ----------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_study_materials(request):
    """Get all study materials for the current user"""
    materials = StudyMaterial.objects.filter(user=request.user).order_by('-uploaded_at')
    data = [{
        'id': m.id,
        'filename': m.filename,
        'uploaded_at': m.uploaded_at.isoformat(),
        'summary': m.summary[:200] if m.summary else '',
        'has_file': bool(m.file),
        'flashcards_count': len(m.flashcards) if m.flashcards else 0,
        'quiz_count': len(m.quiz) if m.quiz else 0,
    } for m in materials]
    return Response({'materials': data})
# ---------------- PRESENTATIONS ----------------
# ==================== PRESENTATION API ====================

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Presentation
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_presentations(request):
    print(f"=== DEBUG ===")
    print(f"User: {request.user}")
    print(f"User ID: {request.user.id}")
    print(f"User username: {request.user.username}")
    print(f"Is authenticated: {request.user.is_authenticated}")
    
    presentations = Presentation.objects.filter(user=request.user).order_by('-created_at')
    print(f"Presentations count: {presentations.count()}")
    print(f"Presentations query: {presentations.query}")
    
    data = []
    for p in presentations:
        print(f"  - Presentation: {p.id}, {p.title}, User: {p.user_id}")
        item = {
            'id': p.id,
            'title': p.title,
            'created_at': p.created_at.isoformat(),
        }
        if hasattr(p, 'topic'):
            item['topic'] = p.topic
        if hasattr(p, 'slides_count'):
            item['slides_count'] = p.slides_count
        elif hasattr(p, 'slide_count'):
            item['slides_count'] = p.slide_count
        else:
            item['slides_count'] = 0
        data.append(item)
    
    print(f"Returning data: {data}")
    return Response({'presentations': data})
# ---------------- CODE SESSIONS ----------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_code_sessions(request):
    """Get all code sessions for the current user"""
    sessions = CodeSession.objects.filter(user=request.user).order_by('-created_at')
    data = [{
        'id': s.id,
        'language': s.language,
        'is_interview': s.is_interview,
        'interview_score': s.interview_score,
        'interview_difficulty': s.interview_difficulty,
        'sandbox_error': s.sandbox_error,
        'created_at': s.created_at.isoformat(),
    } for s in sessions]
    return Response({'sessions': data})

# ---------------- PROJECTS ----------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_projects(request):
    """Get all projects and tasks for the current user"""
    projects = ProjectPlan.objects.filter(user=request.user).order_by('-created_at')
    tasks = ProjectTask.objects.filter(project__user=request.user)
    
    projects_data = []
    for p in projects:
        project_data = {
            'id': p.id,
            'title': p.title,
            'created_at': p.created_at.isoformat(),
        }
        # Only add optional fields if they exist
        if hasattr(p, 'description'):
            project_data['description'] = p.description
        if hasattr(p, 'status'):
            project_data['status'] = p.status
            
        projects_data.append(project_data)
    
    tasks_data = []
    for t in tasks:
        task_data = {
            'id': t.id,
            'project_id': t.project_id,
            'title': t.title,
            'status': t.status,
        }
        # Only add optional fields if they exist
        if hasattr(t, 'priority'):
            task_data['priority'] = t.priority
        if hasattr(t, 'deadline'):
            task_data['deadline'] = t.deadline.isoformat() if t.deadline else None
        if hasattr(t, 'date'):
            task_data['date'] = t.date.isoformat() if t.date else None
            
        tasks_data.append(task_data)
    
    return Response({
        'projects': projects_data,
        'tasks': tasks_data
    })





# EduCrew_Backend/detail_views.py (or add to your existing views)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Prefetch
from rest_framework import status

from .models import (
    StudyMaterial, Presentation, CodeSession, 
    ProjectPlan, ProjectTask, QualityReview
)


# Add this to your views.py - FIXED study material detail

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
import json

from .models import StudyMaterial


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def study_material_detail(request, pk):
    """
    Get detailed study material with notes, flashcards, quiz, flowchart
    """
    material = get_object_or_404(StudyMaterial, pk=pk, user=request.user)
    
    # FIX: Normalize flashcards data structure
    raw_flashcards = material.flashcards or []
    normalized_flashcards = []
    
    for card in raw_flashcards:
        if isinstance(card, dict):
            # Handle different key names from AI
            question = card.get('q') or card.get('question') or 'No question'
            answer = card.get('a') or card.get('answer') or 'No answer'
            
            normalized_flashcards.append({
                'id': card.get('id', len(normalized_flashcards) + 1),
                'question': question.strip(),
                'answer': answer.strip()
            })
    
    # FIX: Normalize quiz data structure
    raw_quiz = material.quiz or []
    normalized_quiz = []
    
    for q in raw_quiz:
        if isinstance(q, dict):
            # Ensure options is a list
            options = q.get('options', [])
            if isinstance(options, str):
                # If options is a string, try to parse or split
                try:
                    options = json.loads(options)
                except:
                    options = [opt.strip() for opt in options.split(',')]
            
            # Normalize answer (uppercase and strip)
            correct_answer = str(q.get('answer', '')).strip().upper()
            
            normalized_quiz.append({
                'id': q.get('id', len(normalized_quiz) + 1),
                'question': q.get('question', 'No question').strip(),
                'options': [str(opt).strip() for opt in options],
                'answer': correct_answer  # Already normalized to uppercase
            })
    
    # Handle file URL
    file_url = None
    if material.file:
        try:
            file_url = request.build_absolute_uri(material.file.url)
        except:
            file_url = str(material.file) if material.file else None
    
    data = {
        'id': material.id,
        'filename': material.filename,
        'uploaded_at': material.uploaded_at.isoformat() if material.uploaded_at else None,
        'notes': material.notes or '',
        'summary': material.summary or '',
        'flowchart': material.flowchart or '',  # ADDED: Include flowchart
        'file': file_url,
        'has_file': bool(material.file),
        'flashcards': normalized_flashcards,
        'flashcards_count': len(normalized_flashcards),
        'quiz': normalized_quiz,
        'quiz_count': len(normalized_quiz),
    }
    
    return Response(data)


# EduCrew_Backend/views.py - FIXED presentation_detail
# Add this to your views.py or dashboard_views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Presentation, PresentationSlide  # Import your models


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def presentation_detail(request, pk):
    """
    Get detailed presentation with actual slides from PresentationSlide model
    """
    # Get presentation with related slides using prefetch_related for efficiency
    presentation = get_object_or_404(
        Presentation.objects.prefetch_related('slides'),  # 'slides' is the related_name
        pk=pk, 
        user=request.user
    )
    
    # Fetch actual slides from PresentationSlide model
    slides_data = []
    
    # Get all slides for this presentation, ordered by slide_number
    slide_queryset = PresentationSlide.objects.filter(
        presentation=presentation
    ).order_by('slide_number')
    
    for slide in slide_queryset:
        # Handle content field (JSONField containing bullets)
        content_list = []
        if slide.content:
            if isinstance(slide.content, list):
                content_list = slide.content
            elif isinstance(slide.content, str):
                # If somehow stored as string, wrap in list
                content_list = [slide.content]
        
        slides_data.append({
            'id': slide.id,
            'slide_number': slide.slide_number,
            'title': slide.title or f'Slide {slide.slide_number}',
            'content': '',  # For HTML content if any
            'bullet_points': content_list,  # The actual bullet points from JSONField
            'slide_type': slide.slide_type or 'content',
            'diagram_type': slide.diagram_type or 'none',
            'image_url': slide.image_url or '',
            'notes': slide.notes if hasattr(slide, 'notes') else '',
        })
    
    # If no slides found in related model, fallback to empty list
    if not slides_data:
        slides_data = []
    
    data = {
        'id': presentation.id,
        'title': presentation.title,
        'topic': presentation.topic,
        'created_at': presentation.created_at.isoformat() if presentation.created_at else None,
        'slides_count': presentation.slides_count or len(slides_data),
        'status': presentation.status,
        'file_url': presentation.pptx_file.url if presentation.pptx_file else None,
        'slides': slides_data,
    }
    
    return Response(data)


# ---------------- CODE SESSION DETAIL ----------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def code_session_detail(request, pk):
    """Get detailed code session with code, output, feedback"""
    session = get_object_or_404(CodeSession, pk=pk, user=request.user)
    
    data = {
        'id': session.id,
        'language': session.language,
        'code': session.code if hasattr(session, 'code') else '',
        'output': session.output if hasattr(session, 'output') else '',
        'sandbox_error': session.sandbox_error if hasattr(session, 'sandbox_error') else '',
        'is_interview': session.is_interview if hasattr(session, 'is_interview') else False,
        'interview_score': session.interview_score if hasattr(session, 'interview_score') else None,
        'interview_difficulty': session.interview_difficulty if hasattr(session, 'interview_difficulty') else None,
        'feedback': session.feedback if hasattr(session, 'feedback') else '',
        'question': session.question if hasattr(session, 'question') else '',
        'created_at': session.created_at.isoformat() if session.created_at else None,
    }
    return Response(data)


# ---------------- PROJECT DETAIL (FIXED) ----------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def project_detail(request, pk):
    """Get detailed project with all tasks"""
    # FIX: Use prefetch_related to avoid RelatedManager issues
    project = get_object_or_404(
        ProjectPlan.objects.prefetch_related('tasks'),  # or 'projecttask_set' if no related_name
        pk=pk, 
        user=request.user
    )
    
    # FIX: Properly serialize tasks - handle both related_name scenarios
    tasks_data = []
    
    # Try different possible related names
    task_queryset = None
    if hasattr(project, 'tasks'):
        task_queryset = project.tasks.all()
    elif hasattr(project, 'projecttask_set'):
        task_queryset = project.projecttask_set.all()
    elif hasattr(project, 'task_set'):
        task_queryset = project.task_set.all()
    
    if task_queryset:
        for t in task_queryset:
            task_dict = {
                'id': t.id,
                'title': t.title,
                'status': t.status,
                'priority': getattr(t, 'priority', 'medium'),
                'deadline': t.deadline.isoformat() if hasattr(t, 'deadline') and t.deadline else None,
                'date': t.date.isoformat() if hasattr(t, 'date') and t.date else None,
                'created_at': t.created_at.isoformat() if hasattr(t, 'created_at') and t.created_at else None,
            }
            tasks_data.append(task_dict)
    
    data = {
        'id': project.id,
        'title': project.title,
        'description': getattr(project, 'description', ''),
        'created_at': project.created_at.isoformat() if project.created_at else None,
        'tasks': tasks_data,
    }
    return Response(data)


# ---------------- TASK MANAGEMENT ----------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_task(request):
    """Create new task for a project"""
    project_id = request.data.get('project')
    project = get_object_or_404(ProjectPlan, pk=project_id, user=request.user)
    
    task = ProjectTask.objects.create(
        project=project,
        title=request.data.get('title', 'Untitled Task'),
        status='pending',
        priority=request.data.get('priority', 'medium'),
        deadline=request.data.get('deadline') or None,
    )
    
    return Response({
        'id': task.id,
        'title': task.title,
        'status': task.status,
        'priority': task.priority,
        'deadline': task.deadline.isoformat() if task.deadline else None,
    }, status=status.HTTP_201_CREATED)


@api_view(['PATCH', 'PUT'])
@permission_classes([IsAuthenticated])
def update_task(request, pk):
    """Update task"""
    task = get_object_or_404(ProjectTask, pk=pk, project__user=request.user)
    
    if 'status' in request.data:
        task.status = request.data['status']
    if 'title' in request.data:
        task.title = request.data['title']
    if 'priority' in request.data:
        task.priority = request.data['priority']
    if 'deadline' in request.data:
        task.deadline = request.data['deadline']
        
    task.save()
    
    return Response({
        'id': task.id,
        'title': task.title,
        'status': task.status,
        'priority': task.priority,
        'deadline': task.deadline.isoformat() if task.deadline else None,
    })




from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import FileResponse, HttpResponse
from django.shortcuts import get_object_or_404
import os
import mimetypes

from .models import Presentation


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download_presentation(request, pk):
    """
    FIXED: Serve PPTX file as proper binary download
    """
    presentation = get_object_or_404(Presentation, pk=pk, user=request.user)
    
    if not presentation.pptx_file:
        return Response({'error': 'File not found'}, status=404)
    
    file_path = presentation.pptx_file.path
    
    # Check if file exists on disk
    if not os.path.exists(file_path):
        return Response({'error': 'File not found on server'}, status=404)
    
    # Open file in binary mode and stream it
    try:
        file = open(file_path, 'rb')
        response = FileResponse(
            file,
            content_type='application/vnd.openxmlformats-officedocument.presentationml.presentation',
            as_attachment=True,
            filename=os.path.basename(file_path)
        )
        response['Content-Disposition'] = f'attachment; filename="{os.path.basename(file_path)}"'
        return response
    except Exception as e:
        return Response({'error': f'Failed to download: {str(e)}'}, status=500)
    






# from django.contrib.auth.models import User
# from rest_framework import status
# from django.contrib.auth.models import User
# from django.contrib.auth.models import User
# import requests
# import re
# import time
# from django.conf import settings
# from rest_framework.response import Response
# from rest_framework.decorators import api_view, permission_classes  # Add permission_classes
# from rest_framework import status
# from rest_framework.permissions import AllowAny  # Add this import

# @api_view(['POST'])
# @permission_classes([AllowAny])  # Add this line - allows anyone to register
# def register_user(request):
#     username = request.data.get('username')
#     email = request.data.get('email')
#     password = request.data.get('password')
#     password2 = request.data.get('password2')
    
#     if password != password2:
#         return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
    
#     if User.objects.filter(username=username).exists():
#         return Response({'username': ['Username already exists']}, status=status.HTTP_400_BAD_REQUEST)
    
#     if User.objects.filter(email=email).exists():
#         return Response({'email': ['Email already exists']}, status=status.HTTP_400_BAD_REQUEST)
    
#     user = User.objects.create_user(username=username, email=email, password=password)
    
#     return Response({
#         'message': 'User created successfully',
#         'username': user.username,
#         'email': user.email
#     }, status=status.HTTP_201_CREATED)



# from django.core.mail import send_mail
# from django.core.mail import get_connection
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response
# from rest_framework import status
# from django.contrib.auth.models import User

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def forgot_password(request):
#     email = request.data.get('email')
    
#     if not email:
#         return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
#     try:
#         user = User.objects.get(email=email)
        
#         # FORCE console backend - ignores settings.py
#         connection = get_connection(
#             backend='django.core.mail.backends.console.EmailBackend',
#             fail_silently=False,
#         )
        
#         send_mail(
#             subject='EduCrew - Password Reset Request',
#             message=f'''Hello {user.username},

# You requested a password reset for your EduCrew account.

# Click the link below to reset your password:
# http://localhost:3000/reset-password?user={user.username}&token=PLACEHOLDER_TOKEN

# If you did not request this, please ignore this email.

# Thanks,
# EduCrew Team''',
#             from_email='noreply@educrew.com',
#             recipient_list=[email],
#             connection=connection,  # This forces console backend
#         )
        
#         # Print to console as well for debugging
#         print(f"\n{'='*50}")
#         print(f"PASSWORD RESET EMAIL SENT TO: {email}")
#         print(f"Username: {user.username}")
#         print(f"{'='*50}\n")
        
#         return Response({
#             'message': 'Password reset instructions sent to your email'
#         }, status=status.HTTP_200_OK)
        
#     except User.DoesNotExist:
#         # Don't reveal if email exists
#         print(f"\nPassword reset requested for non-existent email: {email}\n")
#         return Response({
#             'message': 'Password reset instructions sent to your email'
#         }, status=status.HTTP_200_OK)
    

# from django.contrib.auth.models import User
# from django.contrib.auth.hashers import make_password

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def reset_password(request):
#     username = request.data.get('username')
#     token = request.data.get('token')  # You should validate this token properly
#     password = request.data.get('password')
#     password2 = request.data.get('password2')
    
#     if password != password2:
#         return Response({'error': 'Passwords do not match'}, status=400)
    
#     try:
#         user = User.objects.get(username=username)
#         # TODO: Validate token properly (check if token is valid and not expired)
#         # For now, just reset the password
#         user.password = make_password(password)
#         user.save()
        
#         return Response({'message': 'Password reset successful'})
#     except User.DoesNotExist:
#         return Response({'error': 'Invalid reset link'}, status=400)


# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status


# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status

# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status

# @api_view(['GET', 'PATCH', 'PUT'])
# @permission_classes([IsAuthenticated])
# def profile_view(request):
#     """Handle profile GET and UPDATE"""
#     user = request.user
    
#     if request.method == 'GET':
#         return Response({
#             'id': user.id,
#             'username': user.username,
#             'email': user.email,
#             'first_name': user.first_name,
#             'last_name': user.last_name,
#             'date_joined': user.date_joined,
#         })
    
#     # PATCH or PUT - partial update
#     data = request.data
    
#     # Update user fields (only if provided)
#     if 'username' in data:
#         user.username = data['username']
#     if 'email' in data:
#         user.email = data['email']
#     if 'first_name' in data:
#         user.first_name = data['first_name']
#     if 'last_name' in data:
#         user.last_name = data['last_name']
    
#     try:
#         user.save()
#         return Response({
#             'id': user.id,
#             'username': user.username,
#             'email': user.email,
#             'first_name': user.first_name,
#             'last_name': user.last_name,
#             'date_joined': user.date_joined,
#         })
#     except Exception as e:
#         return Response(
#             {'detail': str(e)}, 
#             status=status.HTTP_400_BAD_REQUEST
#         )
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_profile(request):
#     """Get current user profile"""
#     user = request.user
#     return Response({
#         'username': user.username,
#         'email': user.email,
#         'first_name': user.first_name,
#         'last_name': user.last_name,
#         # Add other fields as needed
#     })

# @api_view(['GET', 'PATCH', 'PUT'])  # Add PATCH here
# @permission_classes([IsAuthenticated])
# def update_profile(request):
#     """Update user profile"""
#     user = request.user
    
#     if request.method == 'GET':
#         return Response({
#             'username': user.username,
#             'email': user.email,
#             'first_name': user.first_name,
#             'last_name': user.last_name,
#         })
    
#     # Handle PATCH/PUT
#     data = request.data
    
#     if 'username' in data:
#         user.username = data['username']
#     if 'email' in data:
#         user.email = data['email']
#     if 'first_name' in data:
#         user.first_name = data['first_name']
#     if 'last_name' in data:
#         user.last_name = data['last_name']
#     if 'bio' in data:
#         user.profile.bio = data['bio']
#         user.profile.save()
    
#     user.save()
#     return Response({
#         'username': user.username,
#         'email': user.email,
#         'first_name': user.first_name,
#         'last_name': user.last_name,
#     })

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def change_password(request):
#     """Change user password"""
#     user = request.user
#     data = request.data
    
#     current_password = data.get('current_password')
#     new_password = data.get('new_password')
    
#     if not user.check_password(current_password):
#         return Response(
#             {'detail': 'Current password is incorrect'}, 
#             status=status.HTTP_400_BAD_REQUEST
#         )
    
#     user.set_password(new_password)
#     user.save()
#     return Response({'detail': 'Password changed successfully'})


# @api_view(['POST'])
# def top_research_papers(request):
#     """
#     Returns top 10 UNIQUE research papers with:
#     - website_url  (normal article page)
#     - pdf_url      (direct PDF when possible)
#     - proper APA citations
#     """
#     topic = request.data.get('topic')
#     sort_by = request.data.get('sort_by', 'recent')
#     if not topic:
#         return Response({'error': 'Topic is required'}, status=400)
#     headers = {
#         "Authorization": f"Bearer {settings.PERPLEXITY_API_KEY}",
#         "Content-Type": "application/json"
#     }
#     if sort_by == 'recent':
#         sort_instruction = "Focus on papers published in the last 10 years (2015-2025)."
#     elif sort_by == 'cited':
#         sort_instruction = "Focus on the most highly-cited, seminal papers."
#     else:
#         sort_instruction = "Focus on papers most relevant to the topic."
#     find_papers_payload = {
#         "model": "sonar",
#         "messages": [
#             {
#                 "role": "system",
#                 "content": f"""You are a research expert. Find and list the top 10 most relevant research papers.
# {sort_instruction}

# Format EXACTLY as follows for each paper:

# **1. Paper Title**
# **Authors:** Author Names
# **Year:** YYYY
# # **URL/DOI:** https://...
# **Significance:** 1-2 sentence explanation

# ---

# Separate each paper with ---. Include the actual paper link/DOI.
# Do NOT include duplicate papers."""
#             },
#             {
#                 "role": "user",
#                 "content": f"""Find the top 10 research papers about: {topic}

# {sort_instruction}

# Requirements:
# - Include paper title, authors, year, and actual URL/DOI
# - Do NOT include duplicate papers
# - Each paper should have a unique URL or title
# - Focus on peer-reviewed papers from conferences or journals
# - Format each paper clearly with --- separator"""
#             }
#         ],
#         "temperature": 0.3,
#         "max_tokens": 3500
#     }

#     papers_text = None
#     max_retries = 2

#     for attempt in range(max_retries):
#         try:
#             print(f"Attempt {attempt + 1} to fetch papers for topic: {topic}")
#             response = requests.post(
#                 "https://api.perplexity.ai/chat/completions",
#                 headers=headers,
#                 json=find_papers_payload,
#                 timeout=60
#             )
#             response.raise_for_status()
#             result = response.json()
#             papers_text = result["choices"][0]["message"]["content"]
#             print("✓ Papers fetched successfully")
#             break

#         except requests.exceptions.Timeout:
#             print(f"✗ Timeout on attempt {attempt + 1}")
#             if attempt < max_retries - 1:
#                 time.sleep(3)
#             else:
#                 return Response({
#                     'success': False,
#                     'error': 'Request timeout. Try again.'
#                 }, status=504)

#         except Exception as e:
#             print(f"✗ Error: {str(e)}")
#             if attempt == max_retries - 1:
#                 return Response({
#                     'success': False,
#                     'error': f'Failed: {str(e)}'
#                 }, status=500)
#             time.sleep(2)

#     if not papers_text:
#         return Response({
#             'success': False,
#             'error': 'No response from API'
#         }, status=500)

#     # ---- Step 2: Parse Papers ----
#     papers = aggressive_parse_papers(papers_text)

#     # ---- Step 3: Remove Duplicates ----
#     papers = remove_duplicate_papers(papers)

#     if not papers:
#         return Response({
#             'success': True,
#             'topic': topic,
#             'message': 'No unique papers found',
#             'papers': [],
#             'bibliography': []
#         })

#     print(f"✓ Parsed {len(papers)} unique papers")

#     # ---- Step 4: Summarize Each Paper + add website_url / pdf_url ----
#     summarized_papers = []
#     bibliography_entries = []

#     for idx, paper in enumerate(papers[:10], 1):
#         title = paper.get('title', 'Unknown')
#         authors = paper.get('authors', 'Unknown')
#         year = paper.get('year', 'Unknown')
#         original_url = paper.get('url', '').strip()
#         significance = paper.get('significance', '')

#         print(f"[{idx}] Processing: {title[:50]}...")

#         # NEW: split into website_url + pdf_url
#         website_url, pdf_url = split_website_and_pdf(original_url)

#         summary_payload = {
#             "model": "sonar",
#             "messages": [
#                 {
#                     "role": "system",
#                     "content": "Summarize concisely. Provide: 1) 2-3 sentence summary, 2) 5 key points with bullets."
#                 },
#                 {
#                     "role": "user",
#                     "content": f"Title: {title}\nAuthors: {authors}\nYear: {year}\nSignificance: {significance}\n\nSummarize this paper."
#                 }
#             ],
#             "temperature": 0.5,
#             "max_tokens": 500
#         }

#         summary = ""
#         key_points = []

#         try:
#             summary_response = requests.post(
#                 "https://api.perplexity.ai/chat/completions",
#                 headers=headers,
#                 json=summary_payload,
#                 timeout=45
#             )
#             summary_response.raise_for_status()
#             summary_result = summary_response.json()
#             summary_text = summary_result["choices"][0]["message"]["content"]
#             summary, key_points = parse_summary_improved(summary_text)

#         except requests.exceptions.Timeout:
#             summary = extract_first_sentences(significance, 2)
#         except Exception as e:
#             summary = extract_first_sentences(significance, 2)

#         # APA citation should use website_url (preferred landing page)
#         apa_citation = generate_proper_apa_citation(
#             authors, year, title, website_url or pdf_url
#         )

#         summarized_papers.append({
#             "id": idx,
#             "title": title,
#             "authors": authors,
#             "year": year,
#             "website_url": website_url,   # ← click title to open website
#             "pdf_url": pdf_url,           # ← click button to open PDF
#             "summary": summary,
#             "key_points": key_points,
#             "apa_citation": apa_citation
#         })

#         bibliography_entries.append(apa_citation)

#     return Response({
#         'success': True,
#         'topic': topic,
#         'sort_by': sort_by,
#         'total_papers': len(summarized_papers),
#         'papers': summarized_papers,
#         'bibliography': bibliography_entries
#     })


# # # --------- NEW HELPER: website_url + pdf_url ---------
# def split_website_and_pdf(url: str):
#     """
#     Derive website_url and pdf_url from a single URL.

#     - arXiv abs  -> website = abs,  pdf = pdf
#     - arXiv pdf  -> website = pdf,  pdf = pdf
#     - direct .pdf -> website = pdf, pdf = pdf
#     - DOI / other publishers -> website only, no pdf_url
#     """
#     if not url:
#         return None, None

#     url = url.strip()

#     # Direct PDF already
#     if url.lower().endswith(".pdf"):
#         return url, url

#     # arXiv abs
#     if "arxiv.org/abs/" in url:
#         arxiv_id = url.split("arxiv.org/abs/")[-1]
#         pdf_url = f"https://arxiv.org/pdf/{arxiv_id}.pdf"
#         return url, pdf_url

#     # arXiv pdf
#     if "arxiv.org/pdf/" in url and url.lower().endswith(".pdf"):
#         return url, url

#     # DOI – treat as canonical website only
#     if "doi.org/" in url:
#         return url, None

#     # Known publisher HTML pages
#     if any(domain in url for domain in [
#         "nature.com", "springer.com", "acm.org", "ieee.org",
#         "sciencedirect.com", "tandfonline.com", "openaccess.thecvf.com"
#     ]):
#         return url, None

#     # Fallback
#     return url, None



# # ---------- EXISTING HELPERS (unchanged) ----------

# def remove_duplicate_papers(papers):
#     """Remove duplicate papers based on URL or title+year combo."""
#     seen_urls = set()
#     seen_titles = set()
#     unique_papers = []
#     for paper in papers:
#         url = paper.get('url', '').strip()
#         title = paper.get('title', '').strip()
#         year = paper.get('year', '').strip()
#         if not title:
#             continue
#         url_id = url if url else None
#         title_year_id = f"{title.lower()}_{year}"
#         if url_id and url_id in seen_urls:
#             print(f"  ✗ Duplicate URL: {title}")
#             continue
#         if title_year_id in seen_titles:
#             print(f"  ✗ Duplicate Title+Year: {title}")
#             continue
#         if url_id:
#             seen_urls.add(url_id)
#         seen_titles.add(title_year_id)
#         unique_papers.append(paper)
#         print(f"  ✓ Added: {title}")
#     return unique_papers


# def aggressive_parse_papers(text):
#     """Parse papers from text."""
#     papers = []
#     sections = text.split('---')

#     if len(sections) <= 1:
#         sections = text.split('\n\n')

#     for section in sections:
#         section = section.strip()
#         if not section or len(section) < 20:
#             continue

#         paper = {
#             'title': '',
#             'authors': '',
#             'year': '',
#             'url': '',
#             'significance': ''
#         }

#         lines = section.split('\n')

#         for line in lines:
#             line = line.strip()
#             if not line:
#                 continue

#             if re.match(r'^[\*]*\*?\d+[\.\)]\s*', line):
#                 title = re.sub(r'^[\*]*\*?\d+[\.\)]\s*[\*]*\*?', '', line).replace('**', '')
#                 if title:
#                     paper['title'] = title.strip()

#             elif 'author' in line.lower():
#                 authors = re.sub(r'^\*?\*?authors?:\*?\*?\s*', '', line, flags=re.IGNORECASE)
#                 if authors and authors.lower() != 'not specified':
#                     paper['authors'] = authors.strip()

#             elif 'year' in line.lower():
#                 year_match = re.search(r'\d{4}', line)
#                 if year_match:
#                     paper['year'] = year_match.group()

#             elif 'url' in line.lower() or 'doi' in line.lower():
#                 url_match = re.search(r'https?://\S+', line)
#                 if url_match:
#                     paper['url'] = url_match.group().rstrip(',;.)')

#             elif 'significance' in line.lower():
#                 significance = re.sub(r'^\*?\*?significance:\*?\*?\s*', '', line, flags=re.IGNORECASE)
#                 if significance:
#                     paper['significance'] = significance.strip()

#         if paper['title'] and paper['url']:
#             papers.append(paper)

#     return papers


# def parse_summary_improved(text):
#     """Extract summary and key points."""
#     summary = ""
#     key_points = []

#     lines = text.split('\n')
#     summary_lines = []

#     for line in lines:
#         line = line.strip()
#         if not line:
#             continue

#         if 'summary' in line.lower() or 'key point' in line.lower():
#             continue

#         if re.match(r'^[-•\*\d\.]\s*', line):
#             key_point = re.sub(r'^[-•\*]\s*|\d+[\.\)]\s*', '', line).strip()
#             key_point = key_point.replace('**', '')
#             if key_point and len(key_points) < 5:
#                 key_points.append(key_point)
#         else:
#             summary_lines.append(line)

#     summary = ' '.join(summary_lines).strip()
#     if len(summary) > 300:
#         summary = summary[:297] + "..."

#     return summary, key_points


# def extract_first_sentences(text, num_sentences=2):
#     """Extract first N sentences."""
#     if not text:
#         return ""

#     sentences = re.split(r'(?<=[.!?])\s+', text)
#     result = ' '.join(sentences[:num_sentences])
#     return result[:300]


# def generate_proper_apa_citation(authors, year, title, url):
#     """
#     Generate proper APA citation WITHOUT URL duplication.
#     Handles different URL types (DOI, arXiv, etc.)
#     """
#     if url and 'doi.org' in url:
#         doi = url.replace('https://doi.org/', '').replace('http://doi.org/', '')
#         return f"{authors} ({year}). {title}. https://doi.org/{doi}"

#     elif url and 'arxiv' in url:
#         arxiv_id = url.split('/')[-1]
#         return f"{authors} ({year}). {title}. arXiv:{arxiv_id}"

#     elif url and any(domain in url for domain in ['sagepub', 'tandfonline', 'informs', 'emerald']):
#         return f"{authors} ({year}). {title}. Retrieved from {url}"

#     elif url and 'ncbi.nlm.nih.gov' in url:
#         return f"{authors} ({year}). {title}. Retrieved from {url}"

#     elif url and url.endswith('.pdf'):
#         return f"{authors} ({year}). {title}. Retrieved from {url}"

#     elif url:
#         return f"{authors} ({year}). {title}. Retrieved from {url}"

#     else:
#         return f"{authors} ({year}). {title}."




# # EduCrew_Backend/views.py
# import json
# import requests
# import PyPDF2
# from io import BytesIO

# from django.contrib.auth.models import User
# from django.conf import settings
# from django.http import JsonResponse
# from django.utils import timezone

# from rest_framework.decorators import api_view, parser_classes, permission_classes
# from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework.permissions import IsAuthenticated
# from .models import StudyMaterial
# PERPLEXITY_URL = "https://api.perplexity.ai/chat/completions"
# MODEL = "sonar"
# def perplexity_call(prompt: str) -> str:
#     """Safe Perplexity API wrapper with debug logging."""
#     headers = {
#         "Authorization": f"Bearer {settings.PERPLEXITY_API_KEY}",
#         "Content-Type": "application/json",
#     }
#     payload = {
#         "model": MODEL,
#         "messages": [{"role": "user", "content": prompt}],
#         "max_tokens": 3000,
#     }
#     resp = requests.post(PERPLEXITY_URL, json=payload, headers=headers)
#     print("PERPLEXITY STATUS:", resp.status_code)
#     print("PERPLEXITY RESPONSE:", resp.text[:400])
#     if resp.status_code != 200:
#         return f"Perplexity API error (status {resp.status_code}): {resp.text[:200]}"
#     try:
#         data = resp.json()
#         return data["choices"][0]["message"]["content"]
#     except Exception as e:
#         return f"Error parsing Perplexity response: {str(e)}"


# # ------------------------- MAIN API -------------------------
# @api_view(['POST'])
# @parser_classes([MultiPartParser, FormParser])
# @permission_classes([IsAuthenticated])
# def upload_and_process(request):
#     user = request.user
#     user_text = request.data.get("text", "").strip()
#     if user_text and "file" not in request.FILES:
#         material = StudyMaterial.objects.create(
#             user=user,
#             filename=f"notes_{timezone.now().strftime('%Y%m%d_%H%M%S')}.txt",
#         )
#         notes_prompt = f"""
# Write clear, simple, student-friendly notes based ONLY on the text given below.

# Rules:
# - No citations, no bracketed numbers, no links.
# - Do not use markdown symbols like ##, **, ---, or code blocks.
# - Use clean headings written normally (for example: Introduction, Key Concepts).
# - Use paragraphs.
# - Language must be easy for school or college students.
# - Use bullet points only when necessary.
# - Do not add extra knowledge beyond the provided text.
# - Do not mention that the text was provided.

# Follow this structure:
# 1. Introduction
# 2. Definition
# 3. Basic Components
# 4. Key Concepts Explained
# 5. Key Terms with simple definitions
# 6. Step-by-step Explanation (if applicable)
# 7. Real-life Examples
# 8. Types (if applicable)
# 9. Key Applications
# 10. Advantages
# 11. Important Points to Remember

# TEXT START
# {user_text}
# TEXT END

# Write the notes like a clear chapter for students.
# """

#         summary_prompt = f"Write a short 3-paragraph summary of these notes:\n\n{user_text}"

#         flowchart_prompt = f"""
# Create a Mermaid flowchart for the topic:
# "{user_text}"

# Rules:
# - Use 'flowchart TD;'
# - Only Mermaid syntax
# - No backticks
# - No explanations
# """

#         flashcard_quiz_prompt = f"""
# Create flashcards and MCQ quiz in JSON format ONLY based on:
# "{user_text}"

# JSON format:
# {{
#   "flashcards": [
#     {{ "q": "question", "a": "answer" }}
#   ],
#   "quiz": [
#     {{
#       "question": "question",
#       "options": ["A","B","C","D"],
#       "answer": "A"
#     }}
#   ]
# }}
# """

#         notes = perplexity_call(notes_prompt)
#         summary = perplexity_call(summary_prompt)
#         flowchart = perplexity_call(flowchart_prompt).replace("```", "").replace("mermaid", "").strip()
#         raw_json = perplexity_call(flashcard_quiz_prompt)

#         try:
#             parsed = json.loads(raw_json.replace("```json", "").replace("```", "").strip())
#         except:
#             parsed = {"flashcards": [], "quiz": []}

#         # Save
#         material.notes = notes
#         material.summary = summary
#         material.flowchart = flowchart
#         material.flashcards = parsed.get("flashcards", [])
#         material.quiz = parsed.get("quiz", [])
#         material.save()

#         return JsonResponse({
#             "status": "success",
#             "mode": "notes_generated",
#             "notes": notes,
#             "summary": summary,
#             "flowchart": flowchart,
#             "flashcards": parsed.get("flashcards", []),
#             "quiz": parsed.get("quiz", [])
#         })

#     # ---------------- CASE 2: FILE UPLOAD ----------------
#     files = request.FILES.getlist("file")
#     if not files:
#         return JsonResponse({"error": "No file uploaded"}, status=400)

#     results = []

#     for file_obj in files:
#         print(f"🔍 RAW FILE INFO: name='{file_obj.name}', size={file_obj.size}, content_type='{file_obj.content_type}'")
        
#         # ✅ DYNAMIC: Use logged-in user
#         material = StudyMaterial.objects.create(
#             user=user,
#             file=file_obj,
#             filename=file_obj.name
#         )

#         # ULTRA-ROBUST TEXT EXTRACTION
#         text = ""
        
#         # Method 1: Try as TEXT file first
#         try:
#             file_obj.seek(0)
#             raw_bytes = file_obj.read()
#             print(f"📦 RAW BYTES: {len(raw_bytes)}")
            
#             text = raw_bytes.decode('utf-8', errors='ignore')
#             print(f"✅ UTF-8 DECODED: {len(text)} chars")
#             print(f"📄 FIRST 300 CHARS: {repr(text[:300])}")
#         except:
#             text = "UTF-8 decode failed"
        
#         # Method 2: If still empty, try PDF specifically
#         if len(text.strip()) < 10:
#             try:
#                 file_obj.seek(0)
#                 pdf_reader = PyPDF2.PdfReader(BytesIO(file_obj.read()))
#                 text = ""
#                 for i, page in enumerate(pdf_reader.pages[:3]):
#                     page_text = page.extract_text() or ""
#                     text += page_text + "\n\n"
#                 print(f"✅ PDF EXTRACTED: {len(text)} chars")
#             except Exception as pdf_error:
#                 print(f"PDF failed: {pdf_error}")
#                 text = "PDF extraction failed"
        
#         # Final cleanup
#         text = ' '.join(text.split()).strip()[:6000]
        
#         if len(text) < 20:
#             text = f"❌ NO TEXT FOUND in {file_obj.name} ({len(raw_bytes)} bytes)"
        
#         print(f"🎯 FINAL TEXT LENGTH: {len(text)} chars")
#         print(f"📝 FINAL PREVIEW: {text[:200]}...")

#         # SIMPLE PROMPTS THAT WORK
#         notes_prompt = f"""
#     Write clear, simple, student-friendly notes based ONLY on the text given below.

#     Rules:
#     - No citations, no bracketed numbers, no links.
#     - Do not use markdown symbols like ##, **, ---, or code blocks.
#     - Use clean headings written normally (for example: Introduction, Key Concepts).
#     - Use paragraphs.
#     - Language must be easy for school or college students.
#     - Use bullet points only when necessary.
#     - Do not add extra knowledge beyond the provided text.
#     - Do not mention that the text was provided.

#     Follow this structure:
#     1. Introduction
#     2. Definition
#     3. Basic Components
#     4. Key Concepts Explained
#     5. Key Terms with simple definitions
#     6. Step-by-step Explanation (if applicable)
#     7. Real-life Examples
#     8. Types (if applicable)
#     9. Key Applications
#     10. Advantages
#     11. Important Points to Remember

#     TEXT START
#     {text}
#     TEXT END

#     Write the notes like a clear chapter for students.
#     """

#         summary_prompt = f"""3-paragraph summary of ONLY this text:

#     {text[:3000]}"""

#         flowchart_prompt = f"""Create a Mermaid flowchart for the topic:

#     {text}

#     Rules:
#     - Use 'flowchart TD;'
#     - Only Mermaid syntax
#     - No backticks"""

#         flashcard_prompt = f"""JSON flashcards from ONLY this text:

#     {text[:2500]}

#     {{
#     "flashcards": [{{"q":"?", "a":"?"}}],
#     "quiz": [{{"question":"?", "options":["A","B","C","D"], "answer":"A"}}]
#     }}"""

#         # AI CALLS
#         notes = perplexity_call(notes_prompt)
#         summary = perplexity_call(summary_prompt)
#         flowchart = perplexity_call(flowchart_prompt).replace("```mermaid", "").replace("```", "").strip()
#         flashcards_raw = perplexity_call(flashcard_prompt)

#         try:
#             flashcards = json.loads(flashcards_raw.replace("```json", "").replace("```", "").strip())
#         except:
#             flashcards = {"flashcards": [], "quiz": []}

#         # SAVE
#         material.notes = notes
#         material.summary = summary
#         material.content_text = text
#         material.flowchart = flowchart
#         material.flashcards = flashcards.get("flashcards", [])
#         material.quiz = flashcards.get("quiz", [])
#         material.save()

#         results.append({
#             "filename": file_obj.name,
#             "extracted_chars": len(text),
#             "preview": text[:200],
#             "notes": notes,
#             "summary": summary,
#             "flowchart": flowchart,
#             "flashcards": flashcards.get("flashcards", []),
#             "quiz": flashcards.get("quiz", [])
#         })

#     return JsonResponse({"results": results})

# #     # ---------------- CASE 2: FILE UPLOAD ----------------
# #     files = request.FILES.getlist("file")
# #     if not files:
# #         return JsonResponse({"error": "No file uploaded"}, status=400)

# #     results = []

# #     for file in files:
# #         material = StudyMaterial.objects.create(
# #             user=default_user,
# #             file=file,
# #             filename=file.name
# #         )

# #         # Extract text
# #         text = ""
# #         if file.name.lower().endswith(".pdf"):
# #             pdf_reader = PyPDF2.PdfReader(file)
# #             for page in pdf_reader.pages:
# #                 text += page.extract_text() or ""
# #         else:
# #             text = file.read().decode("utf-8", errors="ignore")

# #         # AI prompts
# #         summary_prompt = f"Summarize this in simple language:\n\n{text}"

# #         flowchart_prompt = f"""
# # Create a Mermaid flowchart for this content:

# # {text}

# # Use:
# # flowchart TD;
# # No backticks.
# # """

# #         flashcard_quiz_prompt = f"""
# # Create flashcards and MCQs based on the following text:

# # {text}

# # JSON ONLY:
# # {{
# #   "flashcards": [
# #     {{ "q": "question", "a": "answer" }}
# #   ],
# #   "quiz": [
# #     {{
# #       "question": "question",
# #       "options": ["A","B","C","D"],
# #       "answer": "A"
# #     }}
# #   ]
# # }}
# # """

# #         # AI calls
# #         summary = perplexity_call(summary_prompt)
# #         flowchart = perplexity_call(flowchart_prompt).replace("```", "").strip()
# #         raw_json = perplexity_call(flashcard_quiz_prompt)

# #         try:
# #             parsed = json.loads(raw_json.replace("```json", "").replace("```", ""))
# #         except:
# #             parsed = {"flashcards": [], "quiz": []}

# #         # Save
# #         material.summary = summary
# #         material.flowchart = flowchart
# #         material.flashcards = parsed.get("flashcards", [])
# #         material.quiz = parsed.get("quiz", [])
# #         material.save()

# #         results.append({
# #             "filename": file.name,
# #             "material_id": material.id,
# #             "summary": summary,
# #             "flowchart": flowchart,
# #             "flashcards": parsed.get("flashcards", []),
# #             "quiz": parsed.get("quiz", [])
# #         })

# #     return JsonResponse({"results": results})





# from rest_framework import viewsets, status
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from django.core.files.base import ContentFile
# from django.conf import settings
# from django.db import transaction
# from rest_framework.permissions import IsAuthenticated

# from .models import Presentation, PresentationSlide
# from .serializers import PresentationSerializer
# from .presentations.ai_service import AIContentGenerator
# from .presentations.image_generator_smart import ImageGenerator
# from .presentations.pptx_professional import PowerPointGenerator

# import os
# import time
# import logging

# logger = logging.getLogger(__name__)


# class PresentationViewSet(viewsets.ModelViewSet):
#     """
#     API ViewSet for generating professional college-ready presentations
#     """
#     permission_classes = [IsAuthenticated]
#     queryset = Presentation.objects.all()
#     serializer_class = PresentationSerializer

#     def get_queryset(self):
#         return Presentation.objects.filter(user=self.request.user)

#     # ============================================================
#     # HELPER METHODS
#     # ============================================================

#     def _convert_content_to_bullets(self, slides):
#         logger.info(f"[CONVERT] Converting {len(slides)} slides")

#         for s in slides:
#             if 'content' in s:
#                 content = s.pop('content', [])
#                 if isinstance(content, list):
#                     s['bullets'] = content
#                 elif isinstance(content, str):
#                     s['bullets'] = [content]
#                 else:
#                     s['bullets'] = []

#             if 'bullets' not in s:
#                 s['bullets'] = []

#             if 'image_url' not in s:
#                 s['image_url'] = ''

#             # Preserve optional AI metadata
#             s['slide_type'] = s.get('slide_type', 'content')
#             s['diagram_type'] = s.get('diagram_type', 'none')

#         return slides

#     def _apply_college_structure(
#         self,
#         topic,
#         slides,
#         presenter_name,
#         presentation_date,
#         subject_name,
#     ):
#         logger.info(f"[STRUCT] Applying college structure to {len(slides)} slides")

#         final_slides = []

#         for i, slide in enumerate(slides):
#             final_slides.append({
#                 "slide_number": i + 1,
#                 "title": slide.get('title', f'Slide {i+1}'),
#                 "bullets": slide.get('bullets', [])[:5],
#                 "image_url": slide.get('image_url', ''),
#                 "slide_type": slide.get('slide_type', 'content'),
#                 "diagram_type": slide.get('diagram_type', 'none'),
#             })

#         return final_slides

#     def _generate_images(self, slides, topic, use_ai):
#         logger.info(f"[IMAGES] Starting image generation for {len(slides)} slides")

#         try:
#             if not use_ai:
#                 for slide in slides:
#                     slide['image_url'] = ''
#                 return slides

#             gen = ImageGenerator()
#             updated_slides = gen.generate_for_slides(slides, topic, use_ai=True)

#             return updated_slides

#         except Exception as e:
#             logger.error(f"[IMAGES] Error: {e}", exc_info=True)
#             for slide in slides:
#                 slide['image_url'] = ''
#             return slides

#     # ============================================================
#     # SAVE PRESENTATION
#     # ============================================================

#     def _save_ppt(self, request, presentation_data, topic, content_provided):
#         logger.info("[SAVE] Saving presentation")

#         try:
#             timestamp = int(time.time())
#             filename = f"{topic.replace(' ', '_')[:20]}_{timestamp}.pptx"
#             output_path = os.path.join(settings.MEDIA_ROOT, 'presentations', filename)
#             os.makedirs(os.path.dirname(output_path), exist_ok=True)

#             # Generate PPT
#             ppt_gen = PowerPointGenerator(output_path)
#             ppt_gen.generate(presentation_data)

#             with transaction.atomic():
#                 # Create Presentation record
#                 presentation = Presentation.objects.create(
#                     user=request.user,
#                     title=presentation_data.get('title', topic),
#                     topic=topic,
#                     content_provided=content_provided,
#                     status='completed',
#                     slides_count=len(presentation_data.get('slides', []))
#                 )

#                 # Save slides
#                 for slide_data in presentation_data.get('slides', []):
#                     PresentationSlide.objects.create(
#                         presentation=presentation,
#                         slide_number=slide_data.get('slide_number', 1),
#                         title=slide_data.get('title', ''),
#                         content=slide_data.get('bullets', []),  # JSONField (correct)
#                         slide_type=slide_data.get('slide_type', 'content'),
#                         diagram_type=slide_data.get('diagram_type', 'none'),
#                         image_url=slide_data.get('image_url')
#                     )

#                 # Save PPT file
#                 with open(output_path, 'rb') as f:
#                     presentation.pptx_file.save(
#                         filename,
#                         ContentFile(f.read()),
#                         save=False
#                     )
#                     presentation.save()

#             images_in_data = sum(1 for s in presentation_data.get('slides', []) if s.get('image_url'))

#             return Response({
#                 'message': 'Professional college presentation generated successfully',
#                 'presentation_id': presentation.id,
#                 'title': presentation.title,
#                 'file_url': presentation.pptx_file.url,
#                 'total_slides': presentation.slides_count,
#                 'images_count': images_in_data
#             }, status=status.HTTP_201_CREATED)

#         except Exception as e:
#             logger.error(f"[SAVE] Error saving presentation: {e}", exc_info=True)
#             return Response(
#                 {'error': 'Failed to save presentation'},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )

#     # ============================================================
#     # API ENDPOINTS
#     # ============================================================

#     @action(detail=False, methods=['post'])
#     def generate_from_topic(self, request):
#         try:
#             topic = request.data.get('topic')
#             num_slides = int(request.data.get('num_slides', 8))
#             presenter_name = request.data.get('presenter_name', 'Student Name')
#             subject = request.data.get('subject', topic)
#             presentation_date = request.data.get('date', 'Academic Year 2024-25')
#             use_ai_images = request.data.get('use_ai_images', True)

#             if not topic:
#                 return Response({'error': 'Topic is required'}, status=status.HTTP_400_BAD_REQUEST)

#             ai_gen = AIContentGenerator()
#             ai_data = ai_gen.generate_from_topic(topic, num_slides)

#             if not ai_data.get('slides'):
#                 return Response({'error': 'AI returned no slides'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#             presentation_data = {
#                 'title': topic,
#                 'presenter_name': presenter_name,
#                 'subject': subject,
#                 'presentation_date': presentation_date,
#                 'slides': ai_data.get('slides', [])
#             }

#             presentation_data['slides'] = self._convert_content_to_bullets(presentation_data['slides'])
#             presentation_data['slides'] = self._apply_college_structure(
#                 topic, presentation_data['slides'], presenter_name, presentation_date, subject
#             )
#             presentation_data['slides'] = self._generate_images(
#                 presentation_data['slides'], topic, use_ai_images
#             )

#             return self._save_ppt(request, presentation_data, topic, False)

#         except Exception as e:
#             logger.error(f"[API] Error in generate_from_topic: {e}", exc_info=True)
#             return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     @action(detail=False, methods=['post'])
#     def generate_from_content(self, request):
#         try:
#             topic = request.data.get('topic')
#             content = request.data.get('content')
#             num_slides = int(request.data.get('num_slides', 8))
#             presenter_name = request.data.get('presenter_name', 'Student Name')
#             subject = request.data.get('subject', topic)
#             presentation_date = request.data.get('date', 'Academic Year 2024-25')
#             use_ai_images = request.data.get('use_ai_images', True)

#             if not topic or not content:
#                 return Response({'error': 'Topic and content are required'}, status=status.HTTP_400_BAD_REQUEST)

#             ai_gen = AIContentGenerator()
#             ai_data = ai_gen.generate_from_content(topic, content, num_slides)

#             if not ai_data.get('slides'):
#                 return Response({'error': 'AI returned no slides'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#             presentation_data = {
#                 'title': topic,
#                 'presenter_name': presenter_name,
#                 'subject': subject,
#                 'presentation_date': presentation_date,
#                 'slides': ai_data.get('slides', [])
#             }

#             presentation_data['slides'] = self._convert_content_to_bullets(presentation_data['slides'])
#             presentation_data['slides'] = self._apply_college_structure(
#                 topic, presentation_data['slides'], presenter_name, presentation_date, subject
#             )
#             presentation_data['slides'] = self._generate_images(
#                 presentation_data['slides'], topic, use_ai_images
#             )

#             return self._save_ppt(request, presentation_data, topic, True)

#         except Exception as e:
#             logger.error(f"[API] Error in generate_from_content: {e}", exc_info=True)
#             return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     @action(detail=True, methods=['get'])
#     def download(self, request, pk=None):
#         try:
#             presentation = self.get_object()

#             if not presentation.pptx_file:
#                 return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)

#             return Response({
#                 'file_url': presentation.pptx_file.url,
#                 'title': presentation.title,
#                 'presentation_id': presentation.id
#             })

#         except Exception as e:
#             logger.error(f"[DOWNLOAD] Error: {e}", exc_info=True)
#             return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # In your PresentationViewSet, FIX the _save_ppt method:

# def _save_ppt(self, request, presentation_data, topic, content_provided):
#     logger.info("[SAVE] Saving presentation")

#     try:
#         timestamp = int(time.time())
#         filename = f"{topic.replace(' ', '_')[:20]}_{timestamp}.pptx"
        
#         # Use temporary path first
#         temp_dir = os.path.join(settings.MEDIA_ROOT, 'temp')
#         os.makedirs(temp_dir, exist_ok=True)
#         temp_path = os.path.join(temp_dir, filename)
        
#         # Generate PPT
#         ppt_gen = PowerPointGenerator(temp_path)
#         ppt_gen.generate(presentation_data)
        
#         # Verify file was created and is valid
#         if not os.path.exists(temp_path) or os.path.getsize(temp_path) == 0:
#             raise Exception("PPT generation failed - file is empty")
        
#         # Read file content BEFORE creating DB record
#         with open(temp_path, 'rb') as f:
#             file_content = f.read()
        
#         with transaction.atomic():
#             # Create Presentation record
#             presentation = Presentation.objects.create(
#                 user=request.user,
#                 title=presentation_data.get('title', topic),
#                 topic=topic,
#                 content_provided=content_provided,
#                 status='completed',
#                 slides_count=len(presentation_data.get('slides', []))
#             )

#             # Save slides to PresentationSlide model
#             for slide_data in presentation_data.get('slides', []):
#                 PresentationSlide.objects.create(
#                     presentation=presentation,
#                     slide_number=slide_data.get('slide_number', 1),
#                     title=slide_data.get('title', ''),
#                     content=slide_data.get('bullets', []),
#                     slide_type=slide_data.get('slide_type', 'content'),
#                     diagram_type=slide_data.get('diagram_type', 'none'),
#                     image_url=slide_data.get('image_url', '')
#                 )

#             # Save PPT file from memory (already read)
#             from django.core.files.base import ContentFile
#             presentation.pptx_file.save(
#                 filename,
#                 ContentFile(file_content),
#                 save=True
#             )
            
#             presentation.save()
        
#         # Clean up temp file
#         try:
#             os.remove(temp_path)
#         except:
#             pass

#         return Response({
#             'message': 'Presentation generated successfully',
#             'presentation_id': presentation.id,
#             'title': presentation.title,
#             'file_url': request.build_absolute_uri(presentation.pptx_file.url),
#             'total_slides': presentation.slides_count,
#         }, status=status.HTTP_201_CREATED)

#     except Exception as e:
#         logger.error(f"[SAVE] Error: {e}", exc_info=True)
#         return Response(
#             {'error': f'Failed to save: {str(e)}'},
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )


# # code mentor agent
# import os
# from dotenv import load_dotenv
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status
# import docker
# from .models import CodeSession
# from .serializers import CodeSessionSerializer
# from openai import OpenAI
# from .models import CodeSession


# load_dotenv()

# OPENAI_API_KEY = os.getenv("PERPLEXITY_API_KEY")
# client = OpenAI(api_key=OPENAI_API_KEY, base_url="https://api.perplexity.ai")



# LANG_CONFIG = {

    
#     "python": {
#         "image": "python:3.12-slim",
#         "command": ["bash", "-lc", "printf '%s\\n' \"$CODE\" > main.py && python main.py"],
#     },
#     "javascript": {
#         "image": "node:20-alpine", 
#         "command": ["sh", "-lc", "printf '%s\\n' \"$CODE\" > main.js && node main.js"],
#     },
# "java": {
#     "image": "eclipse-temurin:21-jdk",
#     "command": [
#         "bash",
#         "-lc",
#         "printf '%s\\n' \"$CODE\" > Main.java && javac Main.java && timeout 5s java Main"
#     ],






    

#     },
#     "cpp": {
#         "image": "gcc:13",
#         "command": ["bash", "-lc", "printf '%s\\n' \"$CODE\" > main.cpp && g++ main.cpp -O2 -std=c++17 -o main && ./main"],
#     },
#     "sql": {
#         "image": "sqlite:latest",  # ✅ Fixed
#         "command": ["sh", "-lc", "printf '%s\\n' \"$CODE\" | sqlite3 -column -header :memory:"],
#     },





#     # "python": {
#     #     "image": "educrew-python-sandbox",  # your custom image
#     #     "command": [
#     #         "bash",
#     #         "-lc",
#     #         "printf '%s\n' \"$CODE\" > main.py && python main.py"
#     #     ],
#     # },


#     # "javascript": {  # JS via Node
#     #     "image": "node:22-alpine",
#     #     "command": [
#     #         "sh",
#     #         "-lc",
#     #         "printf '%s\n' \"$CODE\" > main.js && node main.js"
#     #     ],
#     # },



#     "typescript": {
#     "image": "node:22-alpine",
#     "command": [
#         "sh",
#         "-lc",
#         "printf '%s\n' \"$CODE\" > main.ts && "
#         "echo 'TypeScript compile step disabled in sandbox; running as JavaScript:' >&2 && "
#         "node -e \"require('fs').readFileSync('main.ts','utf8')\""
#     ],
    

#     },
#     "c": {
#         "image": "gcc:14.2.0",
#         "command": [
#             "bash",
#             "-lc",
#             "printf '%s\n' \"$CODE\" > main.c && "
#             "gcc main.c -O2 -std=c17 -o main.out && ./main.out"
#         ],
#     },
#     # "cpp": {  # C++
#     #     "image": "gcc:14.2.0",
#     #     "command": [
#     #         "bash",
#     #         "-lc",
#     #         "printf '%s\n' \"$CODE\" > main.cpp && "
#     #         "g++ main.cpp -O2 -std=c++17 -o main.out && ./main.out"
#     #     ],
#     # },
#     # "java": {
#     #     "image": "eclipse-temurin:21-jdk",
#     #     "command": [
#     #         "bash",
#     #         "-lc",
#     #         "printf '%s\n' \"$CODE\" > Main.java && "
#     #         "javac Main.java && java Main"
#     #     ],
#     # },
#     "php": {
#         "image": "php:8.3-cli",
#         "command": [
#             "sh",
#             "-lc",
#             "printf '%s\n' \"$CODE\" > main.php && php main.php"
#         ],
#     # },
#     # "sql": {
#     # "image": "educrew-sqlite-sandbox",
#     # "command": [
#     #     "bash",
#     #     "-lc",
#     #     "printf '%s\n' \"$CODE\" | sqlite3 -cmd '.headers on' -cmd '.mode column' :memory:"
#     # ],
# },

# "go": {
#         "image": "golang:1.23-alpine",
#         "command": [
#             "sh",
#             "-lc",
#             "printf '%s\n' \"$CODE\" > main.go && go run main.go"
#         ],
#     },
#     "ruby": {
#         "image": "ruby:3.3-alpine",
#         "command": [
#             "sh",
#             "-lc",
#             "printf '%s\n' \"$CODE\" > main.rb && ruby main.rb"
#         ],
#     },
#     "rust": {
#     "image": "rust:1.82",
#     "command": [
#         "bash",
#         "-lc",
#         "printf '%s\n' \"$CODE\" > main.rs && "
#         "rustc main.rs -O -o main && ./main"
#     ],


#     },
#     "csharp": {
#     "image": "mcr.microsoft.com/dotnet/sdk:9.0",
#     "command": [
#         "bash",
#         "-lc",
#         # 1) create console project in ./app
#         # 2) overwrite Program.cs with your code
#         # 3) cd into app and run it
#         "dotnet new console -n App -o app >/dev/null 2>&1 && "
#         "printf '%s\n' \"$CODE\" > app/Program.cs && "
#         "cd app && dotnet run --no-restore"
#     ],



#     },

#     "kotlin": {
#     "image": "zenika/kotlin",
#     "command": [
#         "sh",
#         "-lc",
#         "printf '%s\\n' \"$CODE\" > Main.kt && "
#         "kotlinc Main.kt -include-runtime -d main.jar && "
#         "timeout 5s java -jar main.jar"
#     ],
# },

#     # "kotlin": {
#     #     "image": "eclipse-temurin:21-jdk",
#     #     "command": [
#     #         "bash",
#     #         "-lc",
#     #         "curl -s https://get.sdkman.io | bash >/dev/null 2>&1 && "
#     #         "source \"$HOME/.sdkman/bin/sdkman-init.sh\" && "
#     #         "sdk install kotlin >/dev/null 2>&1 && "
#     #         "printf '%s\n' \"$CODE\" > Main.kt && "
#     #         "kotlinc Main.kt -include-runtime -d main.jar && "
#     #         "java -jar main.jar"
#     #     ],
#     # },
#     "r": {
#         "image": "r-base:latest",
#         "command": [
#             "bash",
#             "-lc",
#             "printf '%s\n' \"$CODE\" > main.R && Rscript main.R"
#         ],
#     },
#     "swift": {
#         "image": "swift:6.0",
#         "command": [
#             "bash",
#             "-lc",
#             "printf '%s\n' \"$CODE\" > main.swift && swift main.swift"
#         ],
#     },
#     # HTML/CSS: just echo back; no real 'run'
#     "html": {
#         "image": "busybox:latest",
#         "command": [
#             "sh",
#             "-lc",
#             "printf '%s\n' \"$CODE\""
#         ],
#     },
#     "css": {
#         "image": "busybox:latest",
#         "command": [
#             "sh",
#             "-lc",
#             "printf '%s\n' \"$CODE\""
#         ],
#     },
#     # VERY basic assembly (NASM + Linux x86_64, advanced – optional)
#     "asm": {
#     "image": "gcc:14.2.0",
#     "command": [
#         "bash",
#         "-lc",
#         "echo 'ASM TEST:' && printf '%s\n' \"$CODE\""
#     ],
# },




# }


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def code_run(request):
#     code = request.data.get('code', '')
#     language = request.data.get('language', 'python').lower()
#     if not code:
#         return Response({'error': 'code is required'}, status=status.HTTP_400_BAD_REQUEST)
#     if language not in LANG_CONFIG:
#         return Response(
#             {'error': f'language \"{language}\" not supported'},
#             status=status.HTTP_400_BAD_REQUEST
#         )
#     session = CodeSession.objects.create(
#         user=request.user,
#         language=language,
#         code=code,
#     )
#     cfg = LANG_CONFIG[language]
#     image = cfg["image"]
#     command = cfg["command"]
#     client_docker = docker.from_env()
#     try:
#         env = {"CODE": code}
#         container = client_docker.containers.run(
#             image,
#             command,
#             environment=env,
#             detach=True,
#             stdout=True,
#             stderr=True,
#             network_disabled=True,
#             mem_limit="256m",
#             cpu_period=100000,
#             cpu_quota=50000,
#         )

#         result = container.wait(timeout=30)
#         logs = container.logs(stdout=True, stderr=True).decode("utf-8", errors="ignore")
#         container.remove()

#         exit_code = result.get("StatusCode", 1)

#         if exit_code == 0:
#             session.sandbox_output = logs
#             session.sandbox_error = ""
#         else:
#             session.sandbox_output = ""
#             session.sandbox_error = logs

#     except Exception as e:
#         session.sandbox_output = ""
#         session.sandbox_error = f"Sandbox error: {str(e)}"

#     session.save()
#     return Response(CodeSessionSerializer(session).data, status=status.HTTP_200_OK)


# SUPPORTED_LANGS = {
#     "python", "c", "cpp", "java", "javascript", "typescript",
#     "go", "ruby", "rust", "csharp", "kotlin", "php", "sql"
# }

# def normalize_language(raw_lang: str) -> str:
#     lang = (raw_lang or "python").lower()
#     if lang in {"js", "node"}:
#         return "javascript"
#     if lang in {"c#", "cs"}:
#         return "csharp"
#     return lang


# def build_practice_prompt(
#     language: str,
#     difficulty: str,
#     source: str,
#     source_type: str,
#     time_limit_minutes: int | None,
#     num_questions: int,
# ) -> str:
#     difficulty = difficulty.lower()
#     if difficulty not in {"beginner", "medium", "advanced"}:
#         difficulty = "beginner"

#     # clamp between 5 and 10
#     num_questions = max(5, min(10, int(num_questions or 5)))

#     time_hint = ""
#     if time_limit_minutes:
#         time_hint = (
#             f"\n- Design each question to be solvable in about "
#             f"{time_limit_minutes} minutes for a {difficulty} learner."
#         )

#     return f"""
# You are a coding instructor for {language}.

# Using the following {source_type}, generate exactly **{num_questions}**
# {language} coding practice questions for a student at **{difficulty}** level.

# Format EACH question like this, and repeat for all questions:

# === QUESTION START ===
# Title: <short title>
# Difficulty: {difficulty}
# Topics: <comma separated topics>

# Problem:
# <problem statement>

# Examples:
# 1) Input: ...
#    Output: ...
# 2) Input: ...
#    Output: ...

# Constraints:
# - ...

# SuggestedTimeMinutes: <integer>
# === QUESTION END ===

# Rules:
# - Use ONLY {language} for any code snippets.
# - Do NOT include solutions.
# - Generate questions numbered implicitly by these START/END blocks.
# - Return ONLY these question blocks, no extra explanation.

# Here is the {source_type}:

# {source}
# """



# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def code_review(request):
#     """
#     LLM-based code review + related practice questions.
#     """
#     code = request.data.get('code', '')
#     raw_language = request.data.get('language', 'python')
#     difficulty = request.data.get('difficulty', 'beginner')
#     time_limit = request.data.get('time_limit_minutes')
#     num_questions = request.data.get('num_questions', 5)
#     if not code:
#         return Response({'error': 'code is required'},
#                         status=status.HTTP_400_BAD_REQUEST)

#     language = normalize_language(raw_language)
#     if language not in SUPPORTED_LANGS:
#         return Response({'error': f"language '{language}' not supported"},
#                         status=status.HTTP_400_BAD_REQUEST)
#     session = CodeSession.objects.create(
#         user=request.user,
#         language=language,
#         code=code,
#     )
#     review_prompt = f"""
# You are a senior {language} developer and teacher.

# Task: Review the following **{language}** code.
# - Do NOT translate it to another language.
# - Keep all code examples in {language} only.

# Answer in three short sections:
# 1) Summary: what does this code do?
# 2) Issues: bugs, edge cases, and performance problems.
# 3) Improvements: concrete {language}-specific refactors and best practices.

# Code ({language}):
# {code}
# """

#     chat = client.chat.completions.create(
#         model="sonar-pro",
#         messages=[{"role": "user", "content": review_prompt}],
#     )
#     review_text = chat.choices[0].message.content

#     session.review = review_text
#     session.debug_help = review_text

#     practice_prompt = build_practice_prompt(
#         language=language,
#         difficulty=difficulty,
#         source=code,
#         source_type="code snippet",
#         time_limit_minutes=int(time_limit) if time_limit else None,
#         num_questions=num_questions,
#     )

#     practice_chat = client.chat.completions.create(
#         model="sonar-pro",
#         messages=[{"role": "user", "content": practice_prompt}],
#     )
#     session.practice_challenge = practice_chat.choices[0].message.content

#     if time_limit:
#         session.time_limit_minutes = int(time_limit)

#     session.save()
#     return Response(CodeSessionSerializer(session).data,
#                     status=status.HTTP_200_OK)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def code_explain(request):
#     """
#     Beginner-friendly code explanation + related practice questions.
#     """
#     code = request.data.get('code', '')
#     level = request.data.get('level', 'beginner')
#     raw_language = request.data.get('language', 'python')
#     difficulty = request.data.get('difficulty', level)
#     time_limit = request.data.get('time_limit_minutes')
#     num_questions = request.data.get('num_questions', 5)

#     if not code:
#         return Response({'error': 'code is required'},
#                         status=status.HTTP_400_BAD_REQUEST)

#     language = normalize_language(raw_language)
#     if language not in SUPPORTED_LANGS:
#         return Response({'error': f"language '{language}' not supported"},
#                         status=status.HTTP_400_BAD_REQUEST)

#     session = CodeSession.objects.create(
#         user=request.user,
#         language=language,
#         code=code,
#     )

#     explain_prompt = f"""
# You are a friendly {language} tutor.

# Explain the following {language} code to a {level} student.
# Rules:
# - Use simple language.
# - Explain step by step.
# - Mention what each important line does.
# - Keep all code examples and terminology in {language} only.
# - Do not translate the code into another programming language.

# Code ({language}):
# {code}
# """

#     chat = client.chat.completions.create(
#         model="sonar-pro",
#         messages=[{"role": "user", "content": explain_prompt}],
#     )
#     explanation = chat.choices[0].message.content
#     session.explanation = explanation

#     practice_prompt = build_practice_prompt(
#         language=language,
#         difficulty=difficulty,
#         source=explanation,
#         source_type="explanation",
#         time_limit_minutes=int(time_limit) if time_limit else None,
#         num_questions=num_questions,
#     )

#     practice_chat = client.chat.completions.create(
#         model="sonar-pro",
#         messages=[{"role": "user", "content": practice_prompt}],
#     )
#     session.practice_challenge = practice_chat.choices[0].message.content

#     if time_limit:
#         session.time_limit_minutes = int(time_limit)

#     session.save()
#     return Response(CodeSessionSerializer(session).data,
#                     status=status.HTTP_200_OK)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def code_generate(request):
#     instruction = request.data.get('instruction', '')
#     raw_language = request.data.get('language', 'python')
#     base_code = request.data.get('base_code', '')
#     difficulty = request.data.get('difficulty', 'beginner')
#     time_limit = request.data.get('time_limit_minutes')
#     num_questions = request.data.get('num_questions', 5)
#     if not instruction:
#         return Response({'error': 'instruction is required'},
#                         status=status.HTTP_400_BAD_REQUEST)

#     language = normalize_language(raw_language)
#     if language not in SUPPORTED_LANGS:
#         return Response({'error': f"language '{language}' not supported"},
#                         status=status.HTTP_400_BAD_REQUEST)
#     session = CodeSession.objects.create(
#         user=request.user,
#         language=language,
#         code=base_code,
#     )

#     gen_prompt = f"""
# You are a professional {language} engineer.

# Instruction (write {language} code only): {instruction}

# If base code is provided, improve or extend it.
# Return ONLY {language} code inside one Markdown code block:
# - No text before or after the code block.
# - No other languages mixed into the code.

# Base code (may be empty, in {language}):
# {base_code}
# """

#     chat = client.chat.completions.create(
#         model="sonar-pro",
#         messages=[{"role": "user", "content": gen_prompt}],
#     )
#     generated = chat.choices[0].message.content
#     session.generated_code = generated

#     practice_source = (
#         f"Instruction:\n{instruction}\n\nGenerated {language} code:\n{generated}"
#     )
#     practice_prompt = build_practice_prompt(
#         language=language,
#         difficulty=difficulty,
#         source=practice_source,
#         source_type="instruction and generated code",
#         time_limit_minutes=int(time_limit) if time_limit else None,
#         num_questions=num_questions,
#     )

#     practice_chat = client.chat.completions.create(
#         model="sonar-pro",
#         messages=[{"role": "user", "content": practice_prompt}],
#     )
#     session.practice_challenge = practice_chat.choices[0].message.content

#     if time_limit:
#         session.time_limit_minutes = int(time_limit)

#     session.save()
#     return Response(CodeSessionSerializer(session).data,
#                     status=status.HTTP_200_OK)




# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def code_animate(request):
#     """
#     Generate a step-by-step execution trace (for visualization)
#     for code in any supported language.

#     Request JSON:
#     {
#       "language": "python" | "c" | "java" | ...,
#       "code": "...",
#       "input_state": { ... },   # optional, language-specific variables
#       "max_steps": 30           # optional int
#     }

#     Response: CodeSession with animation_trace filled (JSON string).
#     """
#     code = request.data.get('code', '')
#     raw_language = request.data.get('language', 'python')
#     input_state = request.data.get('input_state', {})   # dict
#     max_steps = int(request.data.get('max_steps', 30))

#     if not code:
#         return Response(
#             {"error": "code is required"},
#             status=status.HTTP_400_BAD_REQUEST,
#         )

#     language = normalize_language(raw_language)
#     if language not in SUPPORTED_LANGS:
#         return Response(
#             {"error": f"language '{language}' not supported"},
#             status=status.HTTP_400_BAD_REQUEST,
#         )

#     # Create session
#     session = CodeSession.objects.create(
#         user=request.user,
#         language=language,
#         code=code,
#     )

#     # Minimal schema example for the LLM
#     schema_example = {
#         "language": language,
#         "title": "short algorithm name",
#         "variables": ["list", "of", "variable", "names"],
#         "steps": [
#             {
#                 "step": 1,
#                 "line": 3,
#                 "description": "short text of what happens",
#                 "state": {"i": 0, "arr": [1, 2, 3], "target": 2},
#                 "highlight": {"array_index": 0}
#             }
#         ]
#     }

#     prompt = f"""
# You are an {language} algorithm explainer.

# Given the following {language} code and an initial input state,
# simulate the code step by step and return an execution trace as JSON.

# Language: {language}

# Rules:
# - Follow the actual semantics of {language}.
# - Generate at most {max_steps} steps.
# - For each important step, include:
#   - step: increasing integer starting from 1
#   - line: source line number (1-based)
#   - description: 1–2 sentences in simple English
#   - state: current values of important variables (JSON object)
#   - highlight: optional info for visualization
#     (e.g., array_index, left/right pointers, current node id, etc.)
# - Do NOT show only the final result; include intermediate steps.
# - Use ONLY {language} syntax in any code snippets.
# - Return ONLY valid JSON, no markdown, no backticks, no extra text.

# JSON schema example (do NOT include comments in output):
# {json.dumps(schema_example, indent=2)}

# Code ({language}):
# {code}

# Initial input state (as a JSON object):
# {json.dumps(input_state)}
# """

#     chat = client.chat.completions.create(
#         model="sonar-pro",
#         messages=[{"role": "user", "content": prompt}],
#     )
#     raw_trace = chat.choices[0].message.content

#     # Try to parse as JSON for safety; if fails, keep raw text
#     try:
#         trace_obj = json.loads(raw_trace)
#         session.animation_trace = json.dumps(trace_obj)
#     except Exception:
#         session.animation_trace = raw_trace

#     session.save()
#     return Response(
#         CodeSessionSerializer(session).data,
#         status=status.HTTP_200_OK,
#     )







# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def start_interview(request):
#     raw_language = request.data.get('language', 'python')
#     difficulty = request.data.get('difficulty', 'medium')  # beginner/medium/advanced
#     duration_minutes = int(request.data.get('duration_minutes', 45))
#     language = normalize_language(raw_language)
#     if language not in SUPPORTED_LANGS:
#         return Response(
#             {"error": f"language '{language}' not supported"},
#             status=status.HTTP_400_BAD_REQUEST,
#         )
#     from django.utils import timezone
#     session = CodeSession.objects.create(
#         user=request.user,
#         language=language,
#         is_interview=True,
#         interview_difficulty=difficulty,
#         interview_started_at=timezone.now(),
#     )

#     schema_example = {
#         "title": "Two Sum",
#         "difficulty": difficulty,
#         "description": "Clear problem statement...",
#         "input_format": "Description of inputs",
#         "output_format": "Description of outputs",
#         "examples": [
#             {"input": "nums = [2,7,11,15], target = 9", "output": "[0,1]"}
#         ],
#         "constraints": [
#             "1 <= n <= 10^5",
#             "Time: O(n) or better preferred"
#         ],
#         "hints": [
#             "Use a hash map to store seen numbers."
#         ],
#         "expected_time_minutes": duration_minutes
#     }

#     prompt = f"""
# You are an interviewer preparing a coding interview question in {language}.

# Generate ONE interview-style problem for a candidate at **{difficulty}** level.

# Rules:
# - The problem must be solvable in about {duration_minutes} minutes.
# - Use {language} only for any example code or function signatures.
# - Focus on common interview topics: arrays, strings, hash maps, etc. for {difficulty} difficulty.
# - Return ONLY valid JSON (no markdown, no backticks) with fields:

# {json.dumps(schema_example, indent=2)}

# Do NOT include the solution.

# Language: {language}
# Difficulty: {difficulty}
# """

#     chat = client.chat.completions.create(
#         model="sonar-pro",
#         messages=[{"role": "user", "content": prompt}],
#     )
#     raw = chat.choices[0].message.content

#     try:
#         problem = json.loads(raw)
#         session.interview_problem = json.dumps(problem)
#     except Exception:
#         session.interview_problem = raw  # fallback

#     session.save()
#     return Response(CodeSessionSerializer(session).data,
#                     status=status.HTTP_200_OK)





# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def submit_interview_solution(request, session_id):
#     """
#     Candidate submits solution code for an existing interview session.
#     """
#     code = request.data.get('code', '')
#     if not code:
#         return Response({"error": "code is required"},
#                         status=status.HTTP_400_BAD_REQUEST)

#     try:
#         session = CodeSession.objects.get(id=session_id, user=request.user)
#     except CodeSession.DoesNotExist:
#         return Response({"error": "session not found"},
#                         status=status.HTTP_404_NOT_FOUND)

#     if not session.is_interview:
#         return Response({"error": "not an interview session"},
#                         status=status.HTTP_400_BAD_REQUEST)

#     session.code = code

#     # 1) (optional) run in sandbox via your existing /code/run/ logic
#     # here just assume you set sandbox_output/sandbox_error elsewhere

#     # 2) reuse review+explain for scoring and hints
#     language = session.language

#     review_prompt = f"""
# You are a senior {language} interviewer.

# Evaluate the following solution for the given problem.

# Problem:
# {session.interview_problem}

# Candidate solution ({language}):
# {code}

# Tasks:
# 1) Give a brief summary of the approach.
# 2) List correctness issues or missing edge cases.
# 3) Comment on time and space complexity.
# 4) Suggest concrete improvements.

# Finally, give an overall SCORE from 0 to 100 and justify it briefly.
# """

#     review_chat = client.chat.completions.create(
#         model="sonar-pro",
#         messages=[{"role": "user", "content": review_prompt}],
#     )
#     review_text = review_chat.choices[0].message.content
#     session.review = review_text
#     session.debug_help = review_text

#     # Extract numeric score with a small follow-up prompt
#     score_prompt = f"""
# From the following evaluation text, extract ONLY the overall score
# as an integer from 0 to 100. If not found, guess a reasonable score.

# Evaluation:
# {review_text}
# """
#     score_chat = client.chat.completions.create(
#         model="sonar-pro",
#         messages=[{"role": "user", "content": score_prompt}],
#     )
#     score_raw = score_chat.choices[0].message.content.strip()
#     try:
#         score_int = int(''.join(ch for ch in score_raw if ch.isdigit())[:3] or "0")
#         if score_int > 100:
#             score_int = 100
#     except Exception:
#         score_int = None

#     session.interview_score = score_int

#     from django.utils import timezone
#     session.interview_ended_at = timezone.now()
#     session.save()

#     return Response(CodeSessionSerializer(session).data,
#                     status=status.HTTP_200_OK)



# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def interview_report(request, session_id):
#     """
#     Simple report for an interview session.
#     """
#     try:
#         session = CodeSession.objects.get(id=session_id, user=request.user)
#     except CodeSession.DoesNotExist:
#         return Response({"error": "session not found"},
#                         status=status.HTTP_404_NOT_FOUND)

#     if not session.is_interview:
#         return Response({"error": "not an interview session"},
#                         status=status.HTTP_400_BAD_REQUEST)

#     from django.utils import timezone
#     end_time = session.interview_ended_at or timezone.now()
#     duration_seconds = None
#     if session.interview_started_at:
#         duration_seconds = int((end_time - session.interview_started_at).total_seconds())

#     data = {
#         "id": session.id,
#         "language": session.language,
#         "difficulty": session.interview_difficulty,
#         "score": session.interview_score,
#         "duration_seconds": duration_seconds,
#         "problem": session.interview_problem,
#         "review": session.review,
#         "sandbox_output": session.sandbox_output,
#         "sandbox_error": session.sandbox_error,
#     }
#     return Response(data, status=status.HTTP_200_OK)







# # PROJECT PLANNER AGENT
# # from rest_framework.decorators import api_view, permission_classes
# # from rest_framework.permissions import IsAuthenticated
# # from rest_framework.response import Response
# # from django.utils import timezone
# # from datetime import timedelta, datetime
# # from django.conf import settings
# # import requests
# # import json

# # from .models import ProjectPlan, ProjectTask   # move import to top


# # # ----------------- PROJECT PLANNER AGENT -----------------

# # @api_view(["POST"])
# # @permission_classes([IsAuthenticated])
# # def project_planner(request):
# #     """
# #     Input JSON:
# #     {
# #       "project_title": "...",
# #       "description": "...",
# #       "due_in_days": 21,        # OR "due_date": "YYYY-MM-DD"
# #       "hours_per_day": 3,
# #       "start_date": "2025-01-01"  # optional
# #     }
# #     """
# #     project_title = (request.data.get("project_title") or "").strip()
# #     description = (request.data.get("description") or "").strip()
# #     due_in_days = request.data.get("due_in_days")
# #     due_date = request.data.get("due_date")
# #     hours_per_day = request.data.get("hours_per_day") or 3
# #     start_date = request.data.get("start_date")

# #     if not project_title:
# #         return Response({"error": "project_title is required"}, status=400)
# #     if not description:
# #         return Response({"error": "description is required"}, status=400)
# #     if not due_in_days and not due_date:
# #         return Response({"error": "Either due_in_days or due_date is required"}, status=400)

# #     today = timezone.now().date()

# #     if due_in_days:
# #         try:
# #             due_in_days = int(due_in_days)
# #         except ValueError:
# #             return Response({"error": "due_in_days must be integer"}, status=400)
# #         end_date = today + timedelta(days=due_in_days)
# #     else:
# #         try:
# #             end_date = datetime.fromisoformat(due_date).date()
# #         except Exception:
# #             return Response({"error": "Invalid due_date, use YYYY-MM-DD"}, status=400)

# #     if not start_date:
# #         start_date = today.isoformat()

# #     system_msg = (
# #         "You are a strict JSON-only project planning assistant. "
# #         "You break large student projects into weekly tasks, "
# #         "assign realistic deadlines, priorities, and status fields. "
# #         "You MUST return ONLY valid JSON, no explanations or extra text."
# #     )

# #     user_msg = {
# #         "project_title": project_title,
# #         "description": description,
# #         "start_date": start_date,
# #         "end_date": end_date.isoformat(),
# #         "hours_per_day": hours_per_day,
# #         "requirements": [
# #             "Break the whole project into phases and tasks.",
# #             "Organize tasks week-by-week.",
# #             "Mark each task with priority: high / medium / low.",
# #             "Include an initial status field: pending.",
# #             "Add an estimate_hours for each task.",
# #             "Include reminder_dates for each task."
# #         ],
# #         "output_schema_example": {
# #             "project_title": "Example title",
# #             "start_date": "YYYY-MM-DD",
# #             "end_date": "YYYY-MM-DD",
# #             "total_weeks": 3,
# #             "weeks": [
# #                 {
# #                     "week_number": 1,
# #                     "week_start": "YYYY-MM-DD",
# #                     "week_end": "YYYY-MM-DD",
# #                     "tasks": [
# #                         {
# #                             "task_id": "1.1",
# #                             "description": "Task description",
# #                             "priority": "high",
# #                             "status": "pending",
# #                             "estimate_hours": 3,
# #                             "deadline": "YYYY-MM-DD",
# #                             "reminder_dates": ["YYYY-MM-DD"]
# #                         }
# #                     ]
# #                 }
# #             ]
# #         }
# #     }

# #     headers = {
# #         "Authorization": f"Bearer {settings.PERPLEXITY_API_KEY}",
# #         "Content-Type": "application/json",
# #     }

# #     payload = {
# #         "model": "sonar-pro",
# #         "messages": [
# #             {"role": "system", "content": system_msg},
# #             {"role": "user", "content": json.dumps(user_msg)},
# #         ],
# #         "temperature": 0.2,
# #         "max_tokens": 2000,
# #     }

# #     try:
# #         res = requests.post(
# #             "https://api.perplexity.ai/chat/completions",
# #             headers=headers,
# #             json=payload,
# #             timeout=60,
# #         )
# #         res.raise_for_status()

# #         raw = res.json()["choices"][0]["message"]["content"]
# #         text = raw.strip()

# #         # Handle ```json ... ``` wrappers if present
# #         if text.startswith("```"):
# #             lines = text.splitlines()
# #             if len(lines) >= 2:
# #                 text = "\n".join(lines[1:-1]).strip()
# #             if text.lower().startswith("json"):
# #                 text = text[4:].strip()

# #         # Try strict JSON parse first, fallback by trimming at last brace
# #         try:
# #             plan = json.loads(text)
# #         except json.JSONDecodeError:
# #             last_brace = text.rfind("}")
# #             if last_brace == -1:
# #                 raise
# #             plan = json.loads(text[: last_brace + 1])

# #     except Exception as e:
# #         return Response(
# #             {"success": False, "error": f"Planner failed: {e}"},
# #             status=500,
# #         )
    

# #         # ===== SAVE PLAN =====

# #     proj = ProjectPlan.objects.create(
# #         user=request.user,
# #         title=plan.get("project_title", "Untitled Project"),
# #         raw_plan=plan,
# #     )

# #     # Calculate dates
# #     start_date = datetime.fromisoformat(plan.get("start_date", today.isoformat())).date()
    
# #     for w in plan.get("weeks", []):
# #         week_start = datetime.fromisoformat(w.get("week_start", start_date.isoformat())).date()
        
# #         for t in w.get("tasks", []):
# #             try:
# #                 deadline_str = t.get("deadline")
# #                 if not deadline_str:
# #                     continue

# #                 deadline = datetime.fromisoformat(deadline_str).date()
                
# #                 # Calculate task date - distribute tasks throughout the week
# #                 # If task is in week 1 and deadline is early, it might be today
# #                 task_index = w.get("tasks", []).index(t)
# #                 total_tasks_in_week = len(w.get("tasks", []))
                
# #                 # Distribute tasks evenly across the week (Monday-Friday)
# #                 # or use the deadline if it's earlier
# #                 days_offset = min(task_index, 4)  # Max 5 days spread
# #                 suggested_date = week_start + timedelta(days=days_offset)
                
# #                 # Use the earlier of suggested date or deadline
# #                 task_date = min(suggested_date, deadline)
                
# #                 # Don't schedule before start date
# #                 if task_date < start_date:
# #                     task_date = start_date
                
# #                 # Don't schedule before today if project starts today
# #                 if task_date < today:
# #                     task_date = today

# #                 reminder_dates = t.get("reminder_dates") or []
# #                 reminder = None
# #                 if reminder_dates and len(reminder_dates) > 0:
# #                     try:
# #                         reminder = datetime.fromisoformat(reminder_dates[0]).date()
# #                     except Exception:
# #                         reminder = None

# #                 ProjectTask.objects.create(
# #                     project=proj,
# #                     task_id=t.get("task_id", ""),
# #                     title=t.get("description", ""),
# #                     date=task_date,  # This is when the task should be worked on
# #                     deadline=deadline,  # This is the final deadline
# #                     priority=t.get("priority", "medium"),
# #                     status=t.get("status", "pending"),
# #                     estimate_hours=float(t.get("estimate_hours") or 1),
# #                     reminder_date=reminder,
# #                 )
# #             except Exception as e:
# #                 print("PLANNER TASK ERROR:", e)

# #     return Response({"success": True, "plan": plan}, status=200)



# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from django.utils import timezone
# from datetime import timedelta, datetime
# from django.conf import settings
# import requests
# import json

# from .models import ProjectPlan, ProjectTask
# from .tasks import send_task_reminder_email  # Import the task

# # ... your existing imports ...

# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def project_planner(request):
#     project_title = (request.data.get("project_title") or "").strip()
#     description = (request.data.get("description") or "").strip()
#     due_in_days = request.data.get("due_in_days")
#     due_date = request.data.get("due_date")
#     hours_per_day = request.data.get("hours_per_day") or 3
#     start_date_str = request.data.get("start_date")
#     notification_email = request.data.get("notification_email") or request.user.email
#     if not project_title:
#         return Response({"error": "project_title is required"}, status=400)
#     if not description:
#         return Response({"error": "description is required"}, status=400)
#     if not due_in_days and not due_date:
#         return Response({"error": "Either due_in_days or due_date is required"}, status=400)
#     today = timezone.now().date()
#     if due_in_days:
#         try:
#             due_in_days = int(due_in_days)
#         except ValueError:
#             return Response({"error": "due_in_days must be integer"}, status=400)
#         end_date = today + timedelta(days=due_in_days)
#     else:
#         try:
#             end_date = datetime.fromisoformat(due_date).date()
#         except Exception:
#             return Response({"error": "Invalid due_date, use YYYY-MM-DD"}, status=400)

#     if not start_date_str:
#         start_date = today
#     else:
#         start_date = datetime.fromisoformat(start_date_str).date()

#     system_msg = (
#         "You are a strict JSON-only project planning assistant. "
#         "You break large student projects into weekly tasks, "
#         "assign realistic deadlines, priorities, and status fields. "
#         "You MUST return ONLY valid JSON, no explanations or extra text."
#     )

#     user_msg = {
#         "project_title": project_title,
#         "description": description,
#         "start_date": start_date.isoformat(),
#         "end_date": end_date.isoformat(),
#         "hours_per_day": hours_per_day,
#         "today": today.isoformat(),
#         "requirements": [
#             "Break the whole project into phases and tasks.",
#             "Organize tasks week-by-week.",
#             "Mark each task with priority: high / medium / low.",
#             "Include an initial status field: pending.",
#             "Add an estimate_hours for each task.",
#             "Include reminder_dates for each task (array of dates before deadline).",
#             f"IMPORTANT: Schedule first tasks for today ({today.isoformat()}) if project starts immediately.",
#             "For high priority tasks, set reminder_dates 2-3 days before deadline.",
#             "For medium priority, 1-2 days before.",
#             "For low priority, 1 day before or on deadline.",
#         ],
#         "output_schema_example": {
#             "project_title": "Example title",
#             "start_date": "YYYY-MM-DD",
#             "end_date": "YYYY-MM-DD",
#             "total_weeks": 3,
#             "weeks": [
#                 {
#                     "week_number": 1,
#                     "week_start": "YYYY-MM-DD",
#                     "week_end": "YYYY-MM-DD",
#                     "tasks": [
#                         {
#                             "task_id": "1.1",
#                             "description": "Task description",
#                             "priority": "high",
#                             "status": "pending",
#                             "estimate_hours": 3,
#                             "deadline": "YYYY-MM-DD",
#                             "reminder_dates": ["YYYY-MM-DD", "YYYY-MM-DD"]
#                         }
#                     ]
#                 }
#             ]
#         }
#     }

#     headers = {
#         "Authorization": f"Bearer {settings.PERPLEXITY_API_KEY}",
#         "Content-Type": "application/json",
#     }

#     payload = {
#         "model": "sonar-pro",
#         "messages": [
#             {"role": "system", "content": system_msg},
#             {"role": "user", "content": json.dumps(user_msg)},
#         ],
#         "temperature": 0.2,
#         "max_tokens": 2000,
#     }

#     try:
#         res = requests.post(
#             "https://api.perplexity.ai/chat/completions",
#             headers=headers,
#             json=payload,
#             timeout=60,
#         )
#         res.raise_for_status()

#         raw = res.json()["choices"][0]["message"]["content"]
#         text = raw.strip()

#         if text.startswith("```"):
#             lines = text.splitlines()
#             if len(lines) >= 2:
#                 text = "\n".join(lines[1:-1]).strip()
#             if text.lower().startswith("json"):
#                 text = text[4:].strip()

#         try:
#             plan = json.loads(text)
#         except json.JSONDecodeError:
#             last_brace = text.rfind("}")
#             if last_brace == -1:
#                 raise
#             plan = json.loads(text[: last_brace + 1])

#     except Exception as e:
#         return Response(
#             {"success": False, "error": f"Planner failed: {e}"},
#             status=500,
#         )

#     # ===== SAVE PLAN =====
#     proj = ProjectPlan.objects.create(
#         user=request.user,
#         title=plan.get("project_title", "Untitled Project"),
#         raw_plan=plan,
#     )

#     created_tasks = []
    
#     for w in plan.get("weeks", []):
#         week_start = datetime.fromisoformat(w.get("week_start", start_date.isoformat())).date()
        
#         for idx, t in enumerate(w.get("tasks", [])):
#             try:
#                 deadline_str = t.get("deadline")
#                 if not deadline_str:
#                     continue

#                 deadline = datetime.fromisoformat(deadline_str).date()
                
#                 # Calculate task work date
#                 days_offset = min(idx, 4)
#                 suggested_date = week_start + timedelta(days=days_offset)
#                 task_date = min(suggested_date, deadline)
#                 if task_date < start_date:
#                     task_date = start_date

#                 # Get reminder dates from AI
#                 reminder_dates = t.get("reminder_dates") or []
                
#                 # Use first reminder date or default to 1 day before deadline
#                 if reminder_dates:
#                     try:
#                         reminder = datetime.fromisoformat(reminder_dates[0]).date()
#                     except:
#                         reminder = deadline - timedelta(days=1)
#                 else:
#                     # Auto-calculate based on priority
#                     if t.get("priority") == "high":
#                         reminder = deadline - timedelta(days=2)
#                     elif t.get("priority") == "medium":
#                         reminder = deadline - timedelta(days=1)
#                     else:
#                         reminder = deadline

#                 task = ProjectTask.objects.create(
#                     project=proj,
#                     task_id=t.get("task_id", ""),
#                     title=t.get("description", ""),
#                     date=task_date,
#                     deadline=deadline,
#                     priority=t.get("priority", "medium"),
#                     status=t.get("status", "pending"),
#                     estimate_hours=float(t.get("estimate_hours") or 1),
#                     reminder_date=reminder,
#                     notification_email=notification_email,
#                 )
                
#                 created_tasks.append(task)
                
#                 # Schedule email reminder if reminder_date is in future
#                 if reminder >= today:
#                     # Calculate eta for celery task
#                     reminder_datetime = datetime.combine(reminder, datetime.min.time())
#                     # Add 9 AM time for morning reminder
#                     reminder_datetime = reminder_datetime.replace(hour=9)
                    
#                     # Schedule the task
#                     send_task_reminder_email.apply_async(
#                         args=[task.id],
#                         eta=reminder_datetime
#                     )
#                     task.reminder_scheduled = True
#                     task.save(update_fields=['reminder_scheduled'])
                
#                 # Also schedule immediate reminder if task is for today
#                 if task_date == today and not task.reminder_sent:
#                     send_task_reminder_email.delay(task.id)

#             except Exception as e:
#                 print("PLANNER TASK ERROR:", e)

#     return Response({
#         "success": True, 
#         "plan": plan,
#         "tasks_created": len(created_tasks),
#         "notification_email": notification_email
#     }, status=200)


# # Add new endpoint to update notification email
# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def update_notification_email(request):
#     """
#     Update notification email for user and all their tasks
#     """
#     email = request.data.get("email")
#     if not email:
#         return Response({"error": "Email is required"}, status=400)
    
#     # Update all pending tasks
#     ProjectTask.objects.filter(
#         project__user=request.user,
#         status__in=["pending", "in_progress"]
#     ).update(notification_email=email)
    
#     return Response({
#         "success": True,
#         "message": "Notification email updated",
#         "email": email
#     })


# # Add endpoint to manually trigger reminder
# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def send_test_reminder(request, task_id):
#     """
#     Manually send a test reminder email
#     """
#     try:
#         task = ProjectTask.objects.get(id=task_id, project__user=request.user)
#         result = send_task_reminder_email.delay(task.id)
#         return Response({
#             "success": True,
#             "message": "Test reminder sent",
#             "task_id": task_id,
#             "celery_task_id": result.id
#         })
#     except ProjectTask.DoesNotExist:
#         return Response({"error": "Task not found"}, status=404)



# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from django.utils import timezone
# from django.db import models
# from .models import ProjectTask

# from django.utils import timezone
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from .models import ProjectTask

# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def project_tasks_today(request):
#     today = timezone.now().date()

#     # Only tasks scheduled for today (using date field)
#     tasks = ProjectTask.objects.filter(
#     project__user=request.user,
#     date=today,
#     status__in=["pending", "in_progress"],

#     ).order_by("priority")

#     data = []
#     for t in tasks:
#         data.append({
#             "id": t.id,
#             "project_title": t.project.title,
#             "task_id": t.task_id,
#             "title": t.title,
#             "date": t.date.isoformat(),
#             "deadline": t.deadline.isoformat(),
#             "priority": t.priority,
#             "status": t.status,
#             "estimate_hours": t.estimate_hours,
#             "reminder_date": t.reminder_date.isoformat() if t.reminder_date else None,
#         })

#     return Response({"success": True, "tasks": data}, status=200)




# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def project_task_complete(request, task_id):
#     """Mark a task as completed."""
#     try:
#         task = ProjectTask.objects.get(id=task_id, project__user=request.user)
#     except ProjectTask.DoesNotExist:
#         return Response({"success": False, "error": "Task not found"}, status=404)

#     task.status = "done"
#     task.save(update_fields=["status"])

#     return Response(
#         {"success": True, "task_id": task.id, "status": task.status},
#         status=200
#     )



# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from django.utils import timezone
# from datetime import timedelta, datetime
# from django.conf import settings
# import requests
# import json

# from .models import ProjectPlan, ProjectTask


# # ----------------- EXISTING CODE (keep your current project_planner, project_tasks_today, project_task_complete) -----------------


# # ----------------- NEW ENDPOINTS TO ADD -----------------

# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def get_user_projects(request):
#     """
#     Get all project plans for the current user
#     """
#     projects = ProjectPlan.objects.filter(user=request.user).order_by('-created_at')
    
#     data = []
#     for proj in projects:
#         # Calculate progress
#         total_tasks = ProjectTask.objects.filter(project=proj).count()
#         completed_tasks = ProjectTask.objects.filter(project=proj, status='done').count()
#         progress = round((completed_tasks / total_tasks * 100), 1) if total_tasks > 0 else 0
        
#         data.append({
#             "id": proj.id,
#             "title": proj.title,
#             "created_at": proj.created_at.isoformat(),
#             "start_date": proj.raw_plan.get('start_date') if proj.raw_plan else None,
#             "end_date": proj.raw_plan.get('end_date') if proj.raw_plan else None,
#             "total_weeks": proj.raw_plan.get('total_weeks') if proj.raw_plan else None,
#             "total_tasks": total_tasks,
#             "completed_tasks": completed_tasks,
#             "progress": progress,
#         })
    
#     return Response({"success": True, "projects": data}, status=200)


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def get_project_detail(request, project_id):
#     """
#     Get full details of a specific project including all tasks organized by weeks
#     """
#     try:
#         project = ProjectPlan.objects.get(id=project_id, user=request.user)
#     except ProjectPlan.DoesNotExist:
#         return Response({"success": False, "error": "Project not found"}, status=404)
    
#     # Get all tasks for this project from DATABASE (not just raw_plan)
#     db_tasks = ProjectTask.objects.filter(project=project)
    
#     # Calculate progress from ACTUAL database tasks
#     total_tasks = db_tasks.count()
#     completed_tasks = db_tasks.filter(status='done').count()
#     progress = round((completed_tasks / total_tasks * 100), 1) if total_tasks > 0 else 0
    
#     # Build weeks data from raw_plan but use ACTUAL task data from DB
#     weeks_data = []
    
#     if project.raw_plan and 'weeks' in project.raw_plan:
#         raw_weeks = project.raw_plan['weeks']
        
#         for week in raw_weeks:
#             week_tasks = []
#             for task_data in week.get('tasks', []):
#                 task_id = task_data.get('task_id', '')
                
#                 # Find actual task in database by task_id
#                 try:
#                     db_task = db_tasks.get(task_id=task_id)
#                     week_tasks.append({
#                         "id": db_task.id,
#                         "task_id": db_task.task_id,
#                         "title": db_task.title,  # From DB (stored as description)
#                         "description": db_task.title,  # For compatibility
#                         "priority": db_task.priority,
#                         "status": db_task.status,
#                         "estimate_hours": db_task.estimate_hours,
#                         "deadline": db_task.deadline.isoformat() if db_task.deadline else None,
#                         "date": db_task.date.isoformat() if db_task.date else None,
#                         "reminder_date": db_task.reminder_date.isoformat() if db_task.reminder_date else None,
#                     })
#                 except ProjectTask.DoesNotExist:
#                     # Fallback to raw data if not in DB
#                     week_tasks.append({
#                         "id": None,
#                         "task_id": task_id,
#                         "title": task_data.get('description', ''),  # description becomes title
#                         "description": task_data.get('description', ''),
#                         "priority": task_data.get('priority', 'medium'),
#                         "status": task_data.get('status', 'pending'),
#                         "estimate_hours": task_data.get('estimate_hours', 1),
#                         "deadline": task_data.get('deadline'),
#                         "date": task_data.get('deadline'),  # fallback
#                         "reminder_date": task_data.get('reminder_dates', [None])[0] if task_data.get('reminder_dates') else None,
#                     })
            
#             weeks_data.append({
#                 "week_number": week['week_number'],
#                 "week_start": week.get('week_start'),
#                 "week_end": week.get('week_end'),
#                 "tasks": week_tasks
#             })
    
#     plan_data = {
#         "id": project.id,
#         "project_title": project.title,
#         "start_date": project.raw_plan.get('start_date') if project.raw_plan else None,
#         "end_date": project.raw_plan.get('end_date') if project.raw_plan else None,
#         "total_weeks": len(weeks_data),
#         "weeks": weeks_data,
#         "total_tasks": total_tasks,  # From DB count
#         "completed_tasks": completed_tasks,  # From DB count
#         "progress": progress,  # Calculated from DB
#         "created_at": project.created_at.isoformat(),
#     }
    
#     return Response({"success": True, "plan": plan_data}, status=200)


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def get_project_tasks(request, project_id):
#     """
#     Get all tasks for a specific project (all tasks, not just today)
#     """
#     try:
#         project = ProjectPlan.objects.get(id=project_id, user=request.user)
#     except ProjectPlan.DoesNotExist:
#         return Response({"success": False, "error": "Project not found"}, status=404)
    
#     tasks = ProjectTask.objects.filter(project=project).order_by('date', 'deadline')
    
#     data = []
#     for task in tasks:
#         data.append({
#             "id": task.id,
#             "task_id": task.task_id,
#             "title": task.title,
#             "date": task.date.isoformat() if task.date else None,
#             "deadline": task.deadline.isoformat() if task.deadline else None,
#             "priority": task.priority,
#             "status": task.status,
#             "estimate_hours": task.estimate_hours,
#             "reminder_date": task.reminder_date.isoformat() if task.reminder_date else None,
#         })
    
#     return Response({
#         "success": True, 
#         "project_title": project.title,
#         "tasks": data
#     }, status=200)


# @api_view(["DELETE"])
# @permission_classes([IsAuthenticated])
# def delete_project(request, project_id):
#     """
#     Delete a project and all its tasks
#     """
#     try:
#         project = ProjectPlan.objects.get(id=project_id, user=request.user)
#         project.delete()
#         return Response({"success": True, "message": "Project deleted"}, status=200)
#     except ProjectPlan.DoesNotExist:
#         return Response({"success": False, "error": "Project not found"}, status=404)


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def debug_project_tasks(request, project_id):
#     """
#     Debug endpoint to check raw tasks in database
#     """
#     try:
#         project = ProjectPlan.objects.get(id=project_id, user=request.user)
#         tasks = ProjectTask.objects.filter(project=project)
        
#         data = []
#         for t in tasks:
#             data.append({
#                 "id": t.id,
#                 "task_id": t.task_id,
#                 "title": t.title,
#                 "date": str(t.date),
#                 "deadline": str(t.deadline),
#                 "status": t.status,
#             })
        
#         return Response({
#             "project_id": project_id,
#             "project_title": project.title,
#             "task_count": tasks.count(),
#             "tasks": data
#         })
#     except Exception as e:
#         return Response({"error": str(e)}, status=500)




# # QualityReview agent

# from rest_framework.decorators import api_view, parser_classes, permission_classes
# from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status

# from django.contrib.auth.models import User

# from .models import QualityReview
# from .serializers import QualityReviewSerializer
# from .utils_quality import extract_text_from_uploaded_file
# from .quality_llm import run_quality_llm
# from .web_plagiarism_checker import search_web_for_plagiarism

# import traceback


# # @api_view(["POST"])
# # @parser_classes([MultiPartParser, FormParser, JSONParser])
# # @permission_classes([IsAuthenticated])
# # def quality_review(request):
# #     """
# #     Quality Review Agent:
# #     - Accepts raw text or uploaded file
# #     - Runs LLM-based quality analysis
# #     - Runs WEB similarity check using Google Custom Search
# #     - Returns Turnitin-style report with real internet sources
# #     """

# #     user = request.user

# #     # 1) Get text
# #     text = (request.data.get("text") or "").strip()
# #     filename = ""
# #     if not text:
# #         uploaded = request.FILES.get("file")
# #         if not uploaded:
# #             return Response(
# #                 {"error": "Provide 'text' or upload a file"},
# #                 status=status.HTTP_400_BAD_REQUEST,
# #             )
# #         text = extract_text_from_uploaded_file(uploaded)
# #         filename = uploaded.name

# #     if not text or len(text) < 50:
# #         return Response(
# #             {"error": "Document is too short for meaningful analysis"},
# #             status=status.HTTP_400_BAD_REQUEST,
# #         )

# #     assignment_requirements = request.data.get("requirements", "")

# #     # 2) Create DB record
# #     review_obj = QualityReview.objects.create(
# #         user=user,
# #         filename=filename,
# #         original_text=text[:50000],
# #     )

# #     # 3) LLM quality analysis
# #     try:
# #         quality_data = run_quality_llm(text, assignment_requirements)
# #     except Exception as e:
# #         traceback.print_exc()
# #         return Response(
# #             {"error": f"QUALITY_LLM_ERROR: {str(e)}"},
# #             status=status.HTTP_500_INTERNAL_SERVER_ERROR,
# #         )

# #     review_obj.quality_score = int(quality_data.get("overall_score", 0))
# #     review_obj.quality_issues = quality_data.get("issues", [])
# #     review_obj.overall_feedback = quality_data.get("summary", "")

# #     # 4) WEB plagiarism check using Google Search
# #     try:
# #         web_result = search_web_for_plagiarism(text, max_results=10)
# #     except Exception as e:
# #         traceback.print_exc()
# #         review_obj.save()
# #         return Response(
# #             {"error": f"WEB_SEARCH_ERROR: {str(e)}"},
# #             status=status.HTTP_500_INTERNAL_SERVER_ERROR,
# #         )

# #     overall_sim = web_result["overall_similarity"]
# #     web_matches = web_result["top_matches"]

# #     word_count = len(text.split())
# #     page_count = max(1, word_count // 450)

# #     review_obj.similarity_percent = overall_sim
# #     review_obj.word_count = word_count
# #     review_obj.page_count = page_count

# #     # Match groups
# #     review_obj.match_groups = {
# #         "internet_sources": overall_sim,
# #         "publications": 0,
# #         "student_papers": 0,
# #     }

# #     # Format top sources (Turnitin-style with real URLs)
# #     turnitin_style_sources = []
# #     for match in web_matches[:10]:
# #         turnitin_style_sources.append({
# #             "rank": match["rank"],
# #             "source_type": "Internet Source",
# #             "title": match["title"],
# #             "url": match["url"],
# #             "snippet": match["snippet"],
# #             "similarity": match["similarity"],
# #         })

# #     review_obj.top_sources = turnitin_style_sources

# #     review_obj.raw_plagiarism_report = {
# #         "engine": "google_custom_search",
# #         "similarity_percent": overall_sim,
# #         "top_matches": web_matches,
# #     }

# #     review_obj.save()

# #     serializer = QualityReviewSerializer(review_obj)
# #     return Response(serializer.data, status=status.HTTP_200_OK)




# # views.py

# from rest_framework.decorators import api_view, parser_classes, permission_classes
# from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status

# from django.contrib.auth.models import User

# from .models import QualityReview
# from .serializers import QualityReviewSerializer
# from .utils_quality import extract_text_from_uploaded_file
# from .quality_llm import run_quality_llm
# from .web_plagiarism_checker import search_web_for_plagiarism

# import traceback


# def deduplicate_issues(issues):
#     """Remove duplicate issues based on message content."""
#     seen_messages = set()
#     unique_issues = []
    
#     for issue in issues:
#         # Normalize message for comparison
#         message = issue.get("message", "").lower().strip()
#         # Create a key from type + first 50 chars of message
#         key = f"{issue.get('type', 'general')}_{message[:50]}"
        
#         if key not in seen_messages and message:
#             seen_messages.add(key)
#             # Normalize severity values
#             severity = issue.get("severity", "low").lower()
#             if severity not in ["low", "medium", "high", "critical"]:
#                 severity = "low"
#             # Map critical to high for consistency
#             if severity == "critical":
#                 severity = "high"
                
#             unique_issues.append({
#                 "type": issue.get("type", "general"),
#                 "severity": severity,
#                 "message": issue.get("message", "Issue detected"),
#                 "suggestion": issue.get("suggestion", "Review this section"),
#                 "location": issue.get("location", {})
#             })
    
#     return unique_issues


# @api_view(["POST"])
# @parser_classes([MultiPartParser, FormParser, JSONParser])
# @permission_classes([IsAuthenticated])
# def quality_review(request):
#     user = request.user
#     text = (request.data.get("text") or "").strip()
#     filename = ""
#     if not text:
#         uploaded = request.FILES.get("file")
#         if not uploaded:
#             return Response(
#                 {"error": "Provide 'text' or upload a file"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )
#         try:
#             text = extract_text_from_uploaded_file(uploaded)
#             filename = uploaded.name
#         except Exception as e:
#             return Response(
#                 {"error": f"Failed to extract text from file: {str(e)}"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )
#     if not text or len(text) < 50:
#         return Response(
#             {"error": "Document is too short for meaningful analysis (minimum 50 characters)"},
#             status=status.HTTP_400_BAD_REQUEST,
#         )

#     # Truncate very long text for LLM processing
#     original_text = text
#     if len(text) > 15000:
#         text = text[:15000]
#         print(f"Warning: Text truncated to 15000 characters for LLM processing")

#     assignment_requirements = request.data.get("requirements", "")

#     # 2) Create DB record
#     review_obj = QualityReview.objects.create(
#         user=user,
#         filename=filename,
#         original_text=original_text[:50000],
#     )

#     # 3) LLM quality analysis
#     try:
#         quality_data = run_quality_llm(text, assignment_requirements)
#     except Exception as e:
#         traceback.print_exc()
#         review_obj.error_message = str(e)
#         review_obj.save()
#         return Response(
#             {
#                 "error": "Quality analysis failed",
#                 "detail": str(e),
#                 "suggestion": "Please try again with a shorter document or different file format."
#             },
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#         )

#     # Deduplicate and clean issues
#     raw_issues = quality_data.get("issues", [])
#     clean_issues = deduplicate_issues(raw_issues)

#     # Save quality data
#     review_obj.quality_score = int(quality_data.get("overall_score", 0))
#     review_obj.grammar_score = int(quality_data.get("grammar_score", 0))
#     review_obj.style_score = int(quality_data.get("style_score", 0))
#     review_obj.citation_score = int(quality_data.get("citation_score", 0))
#     review_obj.requirement_match_score = int(quality_data.get("requirement_match_score", 0))
#     review_obj.quality_issues = clean_issues  # Save deduplicated issues
#     review_obj.overall_feedback = quality_data.get("summary", "")

#     # 4) WEB plagiarism check
#     try:
#         web_result = search_web_for_plagiarism(original_text, max_results=10)
#     except Exception as e:
#         traceback.print_exc()
#         web_result = {
#             "overall_similarity": 0.0,
#             "top_matches": []
#         }

#     overall_sim = web_result.get("overall_similarity", 0.0)
#     web_matches = web_result.get("top_matches", [])

#     # Calculate document stats
#     word_count = len(original_text.split())
#     page_count = max(1, word_count // 450)

#     review_obj.similarity_percent = overall_sim
#     review_obj.word_count = word_count
#     review_obj.page_count = page_count

#     # Match groups
#     review_obj.match_groups = {
#         "internet_sources": overall_sim,
#         "publications": 0,
#         "student_papers": 0,
#     }

#     # Format top sources
#     turnitin_style_sources = []
#     for match in web_matches[:10]:
#         turnitin_style_sources.append({
#             "rank": match.get("rank", 0),
#             "source_type": "Internet Source",
#             "title": match.get("title", "Unknown Source"),
#             "url": match.get("url", ""),
#             "snippet": match.get("snippet", ""),
#             "similarity": match.get("similarity", 0),
#         })

#     review_obj.top_sources = turnitin_style_sources

#     review_obj.raw_plagiarism_report = {
#         "engine": "google_custom_search",
#         "similarity_percent": overall_sim,
#         "top_matches": web_matches,
#     }

#     review_obj.save()

#     serializer = QualityReviewSerializer(review_obj)
#     return Response(serializer.data, status=status.HTTP_200_OK)







# # EduCrew_Backend/dashboard_views.py
# # Add this new file for dashboard functionality
# # EduCrew_Backend/dashboard_views.py - COMPLETE FIXED VERSION

# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from django.db.models import Count, Avg
# from django.utils import timezone
# from datetime import timedelta, datetime
# from collections import defaultdict

# from .models import (
#     StudyMaterial, Presentation, CodeSession, 
#     ProjectPlan, ProjectTask, QualityReview
# )


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def dashboard_overview(request):
#     user = request.user
#     today = timezone.now().date()
#     week_ago = today - timedelta(days=7)
#     month_ago = today - timedelta(days=30)
#     study_stats = get_study_stats(user, today, week_ago, month_ago)
#     presentation_stats = get_presentation_stats(user, today, week_ago, month_ago)
#     code_stats = get_code_stats(user, today, week_ago, month_ago)
#     project_stats = get_project_stats(user, today, week_ago, month_ago)
#     quality_stats = get_quality_stats(user, today, week_ago, month_ago)
#     recent_activity = get_recent_activity(user, limit=10)
#     weekly_progress = get_weekly_progress(user)
#     skill_distribution = get_skill_distribution(user)
#     level = calculate_user_level(user)
#     achievements = calculate_achievements(user)
    
#     return Response({
#         'success': True,
#         'user': {
#             'username': user.username,
#             'email': user.email,
#             'joined_date': user.date_joined.isoformat(),
#         },
#         'summary': {
#             'total_study_materials': study_stats['total'],
#             'total_presentations': presentation_stats['total'],
#             'total_code_sessions': code_stats['total'],
#             'total_projects': project_stats['total'],
#             'total_quality_reviews': quality_stats['total'],
#             'overall_completion_rate': calculate_overall_completion_rate(study_stats, project_stats, code_stats),
#         },
#         'this_week': {
#             'study_materials_created': study_stats['this_week'],
#             'presentations_created': presentation_stats['this_week'],
#             'code_sessions': code_stats['this_week'],
#             'projects_started': project_stats['this_week'],
#             'tasks_done': project_stats['tasks_completed_this_week'],
#         },
#         'study_materials': study_stats,
#         'presentations': presentation_stats,
#         'code_practice': code_stats,
#         'projects': project_stats,
#         'quality_reviews': quality_stats,
#         'recent_activity': recent_activity,
#         'weekly_progress_chart': weekly_progress,
#         'skill_distribution': skill_distribution,
#         'level': level,
#         'achievements': achievements,
#     })


# def get_study_stats(user, today, week_ago, month_ago):
#     materials = StudyMaterial.objects.filter(user=user)
#     file_uploads = materials.exclude(file='').count()
#     text_based = materials.filter(file='').count()
#     this_week = materials.filter(uploaded_at__gte=timezone.make_aware(datetime.combine(week_ago, datetime.min.time()))).count()
#     this_month = materials.filter(uploaded_at__gte=timezone.make_aware(datetime.combine(month_ago, datetime.min.time()))).count()
    
#     content_types = defaultdict(int)
#     for m in materials:
#         if m.filename:
#             ext = m.filename.split('.')[-1].lower() if '.' in m.filename else 'text'
#             content_types[ext] += 1
    
#     return {
#         'total': materials.count(),
#         'this_week': this_week,
#         'this_month': this_month,
#         'file_uploads': file_uploads,
#         'text_based': text_based,
#         'content_types': dict(content_types),
#         'latest_materials': list(materials.order_by('-uploaded_at')[:5].values('id', 'filename', 'uploaded_at')),
#     }


# def get_presentation_stats(user, today, week_ago, month_ago):
#     presentations = Presentation.objects.filter(user=user)
#     this_week = presentations.filter(created_at__date__gte=week_ago).count()
#     this_month = presentations.filter(created_at__date__gte=month_ago).count()
#     avg_slides = presentations.aggregate(avg=Avg('slides_count'))['avg'] or 0
    
#     return {
#         'total': presentations.count(),
#         'this_week': this_week,
#         'this_month': this_month,
#         'average_slides': round(avg_slides, 1),
#         'with_ai_images': 0,
#         'latest_presentations': list(presentations.order_by('-created_at')[:5].values('id', 'title', 'topic', 'slides_count', 'created_at')),
#     }


# def get_code_stats(user, today, week_ago, month_ago):
#     sessions = CodeSession.objects.filter(user=user)
#     this_week = sessions.filter(created_at__date__gte=week_ago).count()
#     this_month = sessions.filter(created_at__date__gte=month_ago).count()
#     language_stats = sessions.values('language').annotate(count=Count('id')).order_by('-count')
#     interview_sessions = sessions.filter(is_interview=True)
#     interview_count = interview_sessions.count()
#     avg_interview_score = interview_sessions.filter(interview_score__isnull=False).aggregate(avg=Avg('interview_score'))['avg']
#     successful_runs = sessions.filter(sandbox_error='').count()
#     total_runs = sessions.count()
#     success_rate = (successful_runs / total_runs * 100) if total_runs > 0 else 0
    
#     return {
#         'total': sessions.count(),
#         'this_week': this_week,
#         'this_month': this_month,
#         'languages': list(language_stats),
#         'interview_sessions': interview_count,
#         'average_interview_score': round(avg_interview_score, 1) if avg_interview_score else None,
#         'success_rate': round(success_rate, 1),
#         'latest_sessions': list(sessions.order_by('-created_at')[:5].values('id', 'language', 'is_interview', 'interview_score', 'created_at')),
#     }


# def get_project_stats(user, today, week_ago, month_ago):
#     projects = ProjectPlan.objects.filter(user=user)
#     tasks = ProjectTask.objects.filter(project__user=user)
    
#     this_week = projects.filter(created_at__date__gte=week_ago).count()
#     this_month = projects.filter(created_at__date__gte=month_ago).count()
#     total_tasks = tasks.count()
#     completed_tasks = tasks.filter(status='done').count()
#     pending_tasks = tasks.filter(status__in=['pending', 'in_progress']).count()
#     overdue_tasks = tasks.filter(deadline__lt=today, status__in=['pending', 'in_progress']).count()
#     tasks_today = tasks.filter(date=today, status__in=['pending', 'in_progress']).count()
#     completion_rate = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
#     priority_dist = tasks.values('priority').annotate(count=Count('id'))
    
#     # FIXED: Use date instead of updated_at
#     tasks_completed_this_week = tasks.filter(status='done', date__gte=week_ago).count()
    
#     return {
#         'total': projects.count(),
#         'this_week': this_week,
#         'this_month': this_month,
#         'total_tasks': total_tasks,
#         'completed_tasks': completed_tasks,
#         'pending_tasks': pending_tasks,
#         'overdue_tasks': overdue_tasks,
#         'tasks_due_today': tasks_today,
#         'completion_rate': round(completion_rate, 1),
#         'priority_distribution': list(priority_dist),
#         'tasks_completed_this_week': tasks_completed_this_week,
#         'active_projects': list(projects.filter(tasks__status__in=['pending', 'in_progress']).distinct().order_by('-created_at')[:5].values('id', 'title', 'created_at')),
#     }


# def get_quality_stats(user, today, week_ago, month_ago):
#     reviews = QualityReview.objects.filter(user=user)
#     this_week = reviews.filter(created_at__date__gte=week_ago).count()
#     this_month = reviews.filter(created_at__date__gte=month_ago).count()
#     avg_quality = reviews.aggregate(avg=Avg('quality_score'))['avg']
#     avg_similarity = reviews.aggregate(avg=Avg('similarity_percent'))['avg']
#     excellent = reviews.filter(quality_score__gte=90).count()
#     good = reviews.filter(quality_score__gte=70, quality_score__lt=90).count()
#     needs_work = reviews.filter(quality_score__lt=70).count()
    
#     return {
#         'total': reviews.count(),
#         'this_week': this_week,
#         'this_month': this_month,
#         'average_quality_score': round(avg_quality, 1) if avg_quality else None,
#         'average_similarity': round(avg_similarity, 1) if avg_similarity else None,
#         'quality_distribution': {'excellent': excellent, 'good': good, 'needs_work': needs_work},
#         'latest_reviews': list(reviews.order_by('-created_at')[:5].values('id', 'filename', 'quality_score', 'similarity_percent', 'created_at')),
#     }


# def calculate_overall_completion_rate(study, projects, code):
#     project_completion = projects.get('completion_rate', 0)
#     code_success = code.get('success_rate', 0)
#     overall = (project_completion * 0.5) + (code_success * 0.3) + (20 if study['total'] > 0 else 0)
#     return round(min(overall, 100), 1)


# def get_recent_activity(user, limit=10):
#     activities = []
    
#     for m in StudyMaterial.objects.filter(user=user).order_by('-uploaded_at')[:limit]:
#         activities.append({
#             'type': 'study_material',
#             'title': m.filename or 'Generated Notes',
#             'timestamp': m.uploaded_at.isoformat(),
#             'detail': "Processed study material" if m.notes else "File uploaded",
#         })
    
#     for p in Presentation.objects.filter(user=user).order_by('-created_at')[:limit]:
#         activities.append({
#             'type': 'presentation',
#             'title': p.title,
#             'timestamp': p.created_at.isoformat(),
#             'detail': f"{p.slides_count} slides created",
#         })
    
#     for c in CodeSession.objects.filter(user=user).order_by('-created_at')[:limit]:
#         activities.append({
#             'type': 'code_interview' if c.is_interview else 'code_practice',
#             'title': f"{c.language.capitalize()} {'Interview' if c.is_interview else 'Practice'}",
#             'timestamp': c.created_at.isoformat(),
#             'detail': f"Score: {c.interview_score}" if c.is_interview and c.interview_score else "Code executed",
#         })
    
#     # FIXED: Use date instead of updated_at
#     for t in ProjectTask.objects.filter(project__user=user, status='done').order_by('-date')[:limit]:
#         activities.append({
#             'type': 'task_completed',
#             'title': t.title,
#             'timestamp': datetime.combine(t.date, datetime.min.time()).isoformat() if t.date else timezone.now().isoformat(),
#             'detail': f"Project: {t.project.title}",
#         })
    
#     for q in QualityReview.objects.filter(user=user).order_by('-created_at')[:limit]:
#         activities.append({
#             'type': 'quality_review',
#             'title': q.filename or 'Document Review',
#             'timestamp': q.created_at.isoformat(),
#             'detail': f"Quality Score: {q.quality_score}",
#         })
    
#     activities.sort(key=lambda x: x['timestamp'], reverse=True)
#     return activities[:limit]


# def get_weekly_progress(user):
#     today = timezone.now().date()
#     data = []
    
#     for i in range(6, -1, -1):
#         date = today - timedelta(days=i)
#         date_str = date.strftime('%Y-%m-%d')
        
#         study_count = StudyMaterial.objects.filter(user=user, uploaded_at__date=date).count()
#         pres_count = Presentation.objects.filter(user=user, created_at__date=date).count()
#         code_count = CodeSession.objects.filter(user=user, created_at__date=date).count()
        
#         # FIXED: Use date field instead of updated_at
#         tasks_completed = ProjectTask.objects.filter(project__user=user, status='done', date=date).count()
        
#         data.append({
#             'date': date_str,
#             'day': date.strftime('%a'),
#             'study': study_count,
#             'presentations': pres_count,
#             'code': code_count,
#             'tasks_completed': tasks_completed,
#             'total': study_count + pres_count + code_count + tasks_completed,
#         })
    
#     return data


# def get_skill_distribution(user):
#     sessions = CodeSession.objects.filter(user=user)
#     lang_dist = sessions.values('language').annotate(count=Count('id')).order_by('-count')
#     difficulty_dist = sessions.filter(is_interview=True).values('interview_difficulty').annotate(count=Count('id'))
    
#     return {
#         'languages': list(lang_dist),
#         'difficulty_levels': list(difficulty_dist),
#         'total_practice_hours': sessions.count() * 0.5,
#     }


# def calculate_user_level(user):
#     score = 0
#     score += StudyMaterial.objects.filter(user=user).count() * 10
#     score += Presentation.objects.filter(user=user).count() * 15
#     score += CodeSession.objects.filter(user=user).count() * 5
#     score += ProjectPlan.objects.filter(user=user).count() * 20
#     score += QualityReview.objects.filter(user=user).count() * 10
    
#     level = 1
#     while score >= level * 100:
#         score -= level * 100
#         level += 1
    
#     return {
#         'level': level,
#         'current_xp': score,
#         'xp_to_next': level * 100,
#         'progress_percent': round(score / (level * 100) * 100, 1),
#     }


# def calculate_achievements(user):
#     achievements = []
    
#     study_count = StudyMaterial.objects.filter(user=user).count()
#     if study_count >= 1:
#         first = StudyMaterial.objects.filter(user=user).first()
#         achievements.append({
#             'id': 'first_study',
#             'title': 'First Steps',
#             'description': 'Created your first study material',
#             'icon': '📚',
#             'unlocked_at': first.uploaded_at.isoformat() if first else None,
#         })
    
#     code_count = CodeSession.objects.filter(user=user).count()
#     if code_count >= 1:
#         first = CodeSession.objects.filter(user=user).first()
#         achievements.append({
#             'id': 'hello_world',
#             'title': 'Hello World',
#             'description': 'Ran your first code',
#             'icon': '💻',
#             'unlocked_at': first.created_at.isoformat() if first else None,
#         })
    
#     interview_count = CodeSession.objects.filter(user=user, is_interview=True).count()
#     if interview_count >= 1:
#         first = CodeSession.objects.filter(user=user, is_interview=True).first()
#         achievements.append({
#             'id': 'first_interview',
#             'title': 'Interview Ready',
#             'description': 'Completed your first mock interview',
#             'icon': '🎯',
#             'unlocked_at': first.created_at.isoformat() if first else None,
#         })
    
#     perfect = CodeSession.objects.filter(user=user, is_interview=True, interview_score=100).first()
#     if perfect:
#         achievements.append({
#             'id': 'perfect_score',
#             'title': 'Perfect Score',
#             'description': 'Scored 100% on a mock interview',
#             'icon': '🏆',
#             'unlocked_at': perfect.created_at.isoformat(),
#         })
    
#     project_count = ProjectPlan.objects.filter(user=user).count()
#     if project_count >= 1:
#         first = ProjectPlan.objects.filter(user=user).first()
#         achievements.append({
#             'id': 'project_planner',
#             'title': 'Project Planner',
#             'description': 'Created your first project plan',
#             'icon': '📋',
#             'unlocked_at': first.created_at.isoformat() if first else None,
#         })
    
#     quality_count = QualityReview.objects.filter(user=user).count()
#     if quality_count >= 1:
#         first = QualityReview.objects.filter(user=user).first()
#         achievements.append({
#             'id': 'quality_first',
#             'title': 'Quality Check',
#             'description': 'Submitted first document for review',
#             'icon': '✅',
#             'unlocked_at': first.created_at.isoformat() if first else None,
#         })
    
#     return achievements










# # Add these new API endpoints to your backend views.py

# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response

# # ---------------- STUDY MATERIALS ----------------
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def my_study_materials(request):
#     """Get all study materials for the current user"""
#     materials = StudyMaterial.objects.filter(user=request.user).order_by('-uploaded_at')
#     data = [{
#         'id': m.id,
#         'filename': m.filename,
#         'uploaded_at': m.uploaded_at.isoformat(),
#         'summary': m.summary[:200] if m.summary else '',
#         'has_file': bool(m.file),
#         'flashcards_count': len(m.flashcards) if m.flashcards else 0,
#         'quiz_count': len(m.quiz) if m.quiz else 0,
#     } for m in materials]
#     return Response({'materials': data})
# # ---------------- PRESENTATIONS ----------------
# # ==================== PRESENTATION API ====================

# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from .models import Presentation
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def my_presentations(request):
#     print(f"=== DEBUG ===")
#     print(f"User: {request.user}")
#     print(f"User ID: {request.user.id}")
#     print(f"User username: {request.user.username}")
#     print(f"Is authenticated: {request.user.is_authenticated}")
    
#     presentations = Presentation.objects.filter(user=request.user).order_by('-created_at')
#     print(f"Presentations count: {presentations.count()}")
#     print(f"Presentations query: {presentations.query}")
    
#     data = []
#     for p in presentations:
#         print(f"  - Presentation: {p.id}, {p.title}, User: {p.user_id}")
#         item = {
#             'id': p.id,
#             'title': p.title,
#             'created_at': p.created_at.isoformat(),
#         }
#         if hasattr(p, 'topic'):
#             item['topic'] = p.topic
#         if hasattr(p, 'slides_count'):
#             item['slides_count'] = p.slides_count
#         elif hasattr(p, 'slide_count'):
#             item['slides_count'] = p.slide_count
#         else:
#             item['slides_count'] = 0
#         data.append(item)
    
#     print(f"Returning data: {data}")
#     return Response({'presentations': data})
# # ---------------- CODE SESSIONS ----------------
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def my_code_sessions(request):
#     """Get all code sessions for the current user"""
#     sessions = CodeSession.objects.filter(user=request.user).order_by('-created_at')
#     data = [{
#         'id': s.id,
#         'language': s.language,
#         'is_interview': s.is_interview,
#         'interview_score': s.interview_score,
#         'interview_difficulty': s.interview_difficulty,
#         'sandbox_error': s.sandbox_error,
#         'created_at': s.created_at.isoformat(),
#     } for s in sessions]
#     return Response({'sessions': data})

# # ---------------- PROJECTS ----------------
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def my_projects(request):
#     """Get all projects and tasks for the current user"""
#     projects = ProjectPlan.objects.filter(user=request.user).order_by('-created_at')
#     tasks = ProjectTask.objects.filter(project__user=request.user)
    
#     projects_data = []
#     for p in projects:
#         project_data = {
#             'id': p.id,
#             'title': p.title,
#             'created_at': p.created_at.isoformat(),
#         }
#         # Only add optional fields if they exist
#         if hasattr(p, 'description'):
#             project_data['description'] = p.description
#         if hasattr(p, 'status'):
#             project_data['status'] = p.status
            
#         projects_data.append(project_data)
    
#     tasks_data = []
#     for t in tasks:
#         task_data = {
#             'id': t.id,
#             'project_id': t.project_id,
#             'title': t.title,
#             'status': t.status,
#         }
#         # Only add optional fields if they exist
#         if hasattr(t, 'priority'):
#             task_data['priority'] = t.priority
#         if hasattr(t, 'deadline'):
#             task_data['deadline'] = t.deadline.isoformat() if t.deadline else None
#         if hasattr(t, 'date'):
#             task_data['date'] = t.date.isoformat() if t.date else None
            
#         tasks_data.append(task_data)
    
#     return Response({
#         'projects': projects_data,
#         'tasks': tasks_data
#     })





# # EduCrew_Backend/detail_views.py (or add to your existing views)

# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from django.shortcuts import get_object_or_404
# from django.db.models import Prefetch
# from rest_framework import status

# from .models import (
#     StudyMaterial, Presentation, CodeSession, 
#     ProjectPlan, ProjectTask, QualityReview
# )


# # Add this to your views.py - FIXED study material detail

# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from django.shortcuts import get_object_or_404
# import json

# from .models import StudyMaterial


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def study_material_detail(request, pk):
#     """
#     Get detailed study material with notes, flashcards, quiz, flowchart
#     """
#     material = get_object_or_404(StudyMaterial, pk=pk, user=request.user)
    
#     # FIX: Normalize flashcards data structure
#     raw_flashcards = material.flashcards or []
#     normalized_flashcards = []
    
#     for card in raw_flashcards:
#         if isinstance(card, dict):
#             # Handle different key names from AI
#             question = card.get('q') or card.get('question') or 'No question'
#             answer = card.get('a') or card.get('answer') or 'No answer'
            
#             normalized_flashcards.append({
#                 'id': card.get('id', len(normalized_flashcards) + 1),
#                 'question': question.strip(),
#                 'answer': answer.strip()
#             })
    
#     # FIX: Normalize quiz data structure
#     raw_quiz = material.quiz or []
#     normalized_quiz = []
    
#     for q in raw_quiz:
#         if isinstance(q, dict):
#             # Ensure options is a list
#             options = q.get('options', [])
#             if isinstance(options, str):
#                 # If options is a string, try to parse or split
#                 try:
#                     options = json.loads(options)
#                 except:
#                     options = [opt.strip() for opt in options.split(',')]
            
#             # Normalize answer (uppercase and strip)
#             correct_answer = str(q.get('answer', '')).strip().upper()
            
#             normalized_quiz.append({
#                 'id': q.get('id', len(normalized_quiz) + 1),
#                 'question': q.get('question', 'No question').strip(),
#                 'options': [str(opt).strip() for opt in options],
#                 'answer': correct_answer  # Already normalized to uppercase
#             })
    
#     # Handle file URL
#     file_url = None
#     if material.file:
#         try:
#             file_url = request.build_absolute_uri(material.file.url)
#         except:
#             file_url = str(material.file) if material.file else None
    
#     data = {
#         'id': material.id,
#         'filename': material.filename,
#         'uploaded_at': material.uploaded_at.isoformat() if material.uploaded_at else None,
#         'notes': material.notes or '',
#         'summary': material.summary or '',
#         'flowchart': material.flowchart or '',  # ADDED: Include flowchart
#         'file': file_url,
#         'has_file': bool(material.file),
#         'flashcards': normalized_flashcards,
#         'flashcards_count': len(normalized_flashcards),
#         'quiz': normalized_quiz,
#         'quiz_count': len(normalized_quiz),
#     }
    
#     return Response(data)


# # EduCrew_Backend/views.py - FIXED presentation_detail
# # Add this to your views.py or dashboard_views.py

# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from django.shortcuts import get_object_or_404

# from .models import Presentation, PresentationSlide  # Import your models


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def presentation_detail(request, pk):
#     """
#     Get detailed presentation with actual slides from PresentationSlide model
#     """
#     # Get presentation with related slides using prefetch_related for efficiency
#     presentation = get_object_or_404(
#         Presentation.objects.prefetch_related('slides'),  # 'slides' is the related_name
#         pk=pk, 
#         user=request.user
#     )
    
#     # Fetch actual slides from PresentationSlide model
#     slides_data = []
    
#     # Get all slides for this presentation, ordered by slide_number
#     slide_queryset = PresentationSlide.objects.filter(
#         presentation=presentation
#     ).order_by('slide_number')
    
#     for slide in slide_queryset:
#         # Handle content field (JSONField containing bullets)
#         content_list = []
#         if slide.content:
#             if isinstance(slide.content, list):
#                 content_list = slide.content
#             elif isinstance(slide.content, str):
#                 # If somehow stored as string, wrap in list
#                 content_list = [slide.content]
        
#         slides_data.append({
#             'id': slide.id,
#             'slide_number': slide.slide_number,
#             'title': slide.title or f'Slide {slide.slide_number}',
#             'content': '',  # For HTML content if any
#             'bullet_points': content_list,  # The actual bullet points from JSONField
#             'slide_type': slide.slide_type or 'content',
#             'diagram_type': slide.diagram_type or 'none',
#             'image_url': slide.image_url or '',
#             'notes': slide.notes if hasattr(slide, 'notes') else '',
#         })
    
#     # If no slides found in related model, fallback to empty list
#     if not slides_data:
#         slides_data = []
    
#     data = {
#         'id': presentation.id,
#         'title': presentation.title,
#         'topic': presentation.topic,
#         'created_at': presentation.created_at.isoformat() if presentation.created_at else None,
#         'slides_count': presentation.slides_count or len(slides_data),
#         'status': presentation.status,
#         'file_url': presentation.pptx_file.url if presentation.pptx_file else None,
#         'slides': slides_data,
#     }
    
#     return Response(data)


# # ---------------- CODE SESSION DETAIL ----------------
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def code_session_detail(request, pk):
#     """Get detailed code session with code, output, feedback"""
#     session = get_object_or_404(CodeSession, pk=pk, user=request.user)
    
#     data = {
#         'id': session.id,
#         'language': session.language,
#         'code': session.code if hasattr(session, 'code') else '',
#         'output': session.output if hasattr(session, 'output') else '',
#         'sandbox_error': session.sandbox_error if hasattr(session, 'sandbox_error') else '',
#         'is_interview': session.is_interview if hasattr(session, 'is_interview') else False,
#         'interview_score': session.interview_score if hasattr(session, 'interview_score') else None,
#         'interview_difficulty': session.interview_difficulty if hasattr(session, 'interview_difficulty') else None,
#         'feedback': session.feedback if hasattr(session, 'feedback') else '',
#         'question': session.question if hasattr(session, 'question') else '',
#         'created_at': session.created_at.isoformat() if session.created_at else None,
#     }
#     return Response(data)


# # ---------------- PROJECT DETAIL (FIXED) ----------------
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def project_detail(request, pk):
#     """Get detailed project with all tasks"""
#     # FIX: Use prefetch_related to avoid RelatedManager issues
#     project = get_object_or_404(
#         ProjectPlan.objects.prefetch_related('tasks'),  # or 'projecttask_set' if no related_name
#         pk=pk, 
#         user=request.user
#     )
    
#     # FIX: Properly serialize tasks - handle both related_name scenarios
#     tasks_data = []
    
#     # Try different possible related names
#     task_queryset = None
#     if hasattr(project, 'tasks'):
#         task_queryset = project.tasks.all()
#     elif hasattr(project, 'projecttask_set'):
#         task_queryset = project.projecttask_set.all()
#     elif hasattr(project, 'task_set'):
#         task_queryset = project.task_set.all()
    
#     if task_queryset:
#         for t in task_queryset:
#             task_dict = {
#                 'id': t.id,
#                 'title': t.title,
#                 'status': t.status,
#                 'priority': getattr(t, 'priority', 'medium'),
#                 'deadline': t.deadline.isoformat() if hasattr(t, 'deadline') and t.deadline else None,
#                 'date': t.date.isoformat() if hasattr(t, 'date') and t.date else None,
#                 'created_at': t.created_at.isoformat() if hasattr(t, 'created_at') and t.created_at else None,
#             }
#             tasks_data.append(task_dict)
    
#     data = {
#         'id': project.id,
#         'title': project.title,
#         'description': getattr(project, 'description', ''),
#         'created_at': project.created_at.isoformat() if project.created_at else None,
#         'tasks': tasks_data,
#     }
#     return Response(data)


# # ---------------- TASK MANAGEMENT ----------------
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_task(request):
#     """Create new task for a project"""
#     project_id = request.data.get('project')
#     project = get_object_or_404(ProjectPlan, pk=project_id, user=request.user)
    
#     task = ProjectTask.objects.create(
#         project=project,
#         title=request.data.get('title', 'Untitled Task'),
#         status='pending',
#         priority=request.data.get('priority', 'medium'),
#         deadline=request.data.get('deadline') or None,
#     )
    
#     return Response({
#         'id': task.id,
#         'title': task.title,
#         'status': task.status,
#         'priority': task.priority,
#         'deadline': task.deadline.isoformat() if task.deadline else None,
#     }, status=status.HTTP_201_CREATED)


# @api_view(['PATCH', 'PUT'])
# @permission_classes([IsAuthenticated])
# def update_task(request, pk):
#     """Update task"""
#     task = get_object_or_404(ProjectTask, pk=pk, project__user=request.user)
    
#     if 'status' in request.data:
#         task.status = request.data['status']
#     if 'title' in request.data:
#         task.title = request.data['title']
#     if 'priority' in request.data:
#         task.priority = request.data['priority']
#     if 'deadline' in request.data:
#         task.deadline = request.data['deadline']
        
#     task.save()
    
#     return Response({
#         'id': task.id,
#         'title': task.title,
#         'status': task.status,
#         'priority': task.priority,
#         'deadline': task.deadline.isoformat() if task.deadline else None,
#     })




# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from django.http import FileResponse, HttpResponse
# from django.shortcuts import get_object_or_404
# import os
# import mimetypes

# from .models import Presentation


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def download_presentation(request, pk):
#     """
#     FIXED: Serve PPTX file as proper binary download
#     """
#     presentation = get_object_or_404(Presentation, pk=pk, user=request.user)
    
#     if not presentation.pptx_file:
#         return Response({'error': 'File not found'}, status=404)
    
#     file_path = presentation.pptx_file.path
    
#     # Check if file exists on disk
#     if not os.path.exists(file_path):
#         return Response({'error': 'File not found on server'}, status=404)
    
#     # Open file in binary mode and stream it
#     try:
#         file = open(file_path, 'rb')
#         response = FileResponse(
#             file,
#             content_type='application/vnd.openxmlformats-officedocument.presentationml.presentation',
#             as_attachment=True,
#             filename=os.path.basename(file_path)
#         )
#         response['Content-Disposition'] = f'attachment; filename="{os.path.basename(file_path)}"'
#         return response
#     except Exception as e:
#         return Response({'error': f'Failed to download: {str(e)}'}, status=500)
    



