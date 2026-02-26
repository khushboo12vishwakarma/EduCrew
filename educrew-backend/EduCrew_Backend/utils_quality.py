# utils_quality.py

import PyPDF2


def extract_text_from_uploaded_file(django_file):
    name = django_file.name.lower()
    if name.endswith(".pdf"):
        reader = PyPDF2.PdfReader(django_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text
    else:
        return django_file.read().decode("utf-8", errors="ignore")
