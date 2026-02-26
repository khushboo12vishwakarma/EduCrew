# web_plagiarism_checker.py

import requests
from django.conf import settings
from typing import List, Dict


def search_web_for_plagiarism(text: str, max_results: int = 10) -> Dict:
    """
    Search the web for content similar to the given text.
    Returns top matching URLs with similarity estimates.
    
    Uses Google Custom Search API (free tier: 100 queries/day)
    Get API key: https://developers.google.com/custom-search/v1/overview
    """
    
    # Extract key phrases from text (first 200 words)
    words = text.split()[:200]
    query = " ".join(words)
    
    # Truncate to max query length
    if len(query) > 500:
        query = query[:500]
    
    # Google Custom Search API
    GOOGLE_API_KEY = settings.GOOGLE_SEARCH_API_KEY
    GOOGLE_CX = settings.GOOGLE_SEARCH_CX  # Custom Search Engine ID
    
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": GOOGLE_API_KEY,
        "cx": GOOGLE_CX,
        "q": query,
        "num": max_results,
    }
    
    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
    except Exception as e:
        print(f"Web search error: {e}")
        return {
            "overall_similarity": 0.0,
            "top_matches": [],
        }
    
    # Parse results
    items = data.get("items", [])
    matches = []
    
    for idx, item in enumerate(items, 1):
        title = item.get("title", "Unknown")
        url = item.get("link", "")
        snippet = item.get("snippet", "")
        
        # Estimate similarity based on snippet overlap
        # (Real plagiarism APIs would fetch full page and compute TF-IDF)
        snippet_words = set(snippet.lower().split())
        text_words = set(text[:500].lower().split())
        overlap = len(snippet_words & text_words)
        
        # Rough similarity estimate (0-100%)
        similarity = min(100.0, (overlap / max(len(snippet_words), 1)) * 100)
        
        if similarity > 1.0:  # Only keep meaningful matches
            matches.append({
                "rank": idx,
                "url": url,
                "title": title,
                "snippet": snippet,
                "similarity": round(similarity, 2),
            })
    
    # Sort by similarity
    matches = sorted(matches, key=lambda x: x["similarity"], reverse=True)
    
    # Re-rank after sorting
    for idx, m in enumerate(matches, 1):
        m["rank"] = idx
    
    overall_sim = matches[0]["similarity"] if matches else 0.0
    
    return {
        "overall_similarity": overall_sim,
        "top_matches": matches[:10],
    }
