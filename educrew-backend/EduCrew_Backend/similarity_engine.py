# similarity_engine.py

from typing import List, Dict
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def compute_similarity(main_text: str, corpus: List[Dict]) -> Dict:
    """
    main_text: student's document
    corpus: [{ "id": 1, "title": "...", "text": "..." }, ...]

    Returns:
      {
        "overall_similarity": float 0-100,
        "top_matches": [
          { "id": ..., "title": "...", "similarity": float 0-100 },
          ...
        ]
      }
    """
    if not corpus:
        return {"overall_similarity": 0.0, "top_matches": []}

    docs = [main_text] + [c["text"] for c in corpus]

    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf = vectorizer.fit_transform(docs)   # [N_docs, N_terms]

    sims = cosine_similarity(tfidf[0:1], tfidf[1:]).flatten()  # similarities
    sims_percent = (sims * 100).tolist()

    matches = []
    for score, item in sorted(zip(sims_percent, corpus), reverse=True):
        matches.append({
            "id": item["id"],
            "title": item.get("title", f"Doc {item['id']}"),
            "similarity": round(score, 2)
        })

    overall_similarity = round(max(sims_percent) if sims_percent else 0.0, 2)

    return {
        "overall_similarity": overall_similarity,
        "top_matches": matches[:5],
    }
