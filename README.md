# 🚀 EduCrew – AI-Powered Multi-Agent Academic Assistance Platform

EduCrew is a Full-Stack AI-powered educational platform designed to enhance student productivity, learning efficiency, and project development through intelligent automation and AI-driven tools.

The platform integrates Large Language Model (LLM) capabilities, secure code execution, plagiarism detection, structured project planning, and learning analytics into a unified academic workflow system.

---


## 🤖 Multi-Agent AI Architecture

EduCrew implements a modular **Multi-Agent AI Architecture** powered by Applied Natural Language Processing through Large Language Model (LLM) integration.
Each intelligent agent is responsible for a specific academic domain, enabling structured, contextual, and task-oriented execution.

### 📚 Research Agent
- Topic exploration  
- Research summarization  
- Structured academic content organization  

### 🧠 Study Guidance Agent
- Concept explanations  
- Flashcards generation  
- Flowcharts and summaries  
- Academic notes structuring  

### 💻 Code Intelligence Agent
- AI-driven code generation  
- Debugging and optimization support  
- Code explanation  
- Interview preparation assistance  

### 📅 Project Planning Agent
- Converts complex projects into structured tasks  
- Day-wise and week-wise scheduling  
- Progress tracking  
- Email reminders (Celery-based asynchronous processing)  

### 📊 Quality Review Agent
- Plagiarism detection  
- Similarity scoring  
- Structured academic feedback  

All agents operate within a unified backend architecture to deliver coordinated academic assistance.

---

## 🌟 Key Features

### 🔐 Authentication & Security
- JWT-based authentication (SimpleJWT)
- Secure password reset
- Protected REST APIs
- Environment variable configuration (.env)
- Docker-based secure execution

### 💻 AI Code Intelligence System
- Code generation & debugging
- Topic-based practice questions
- Interview preparation support
- Multi-language runtime execution
- Secure Docker sandbox

### 🔍 Intelligent Plagiarism Detection
- Web scraping-based similarity detection
- Custom similarity engine
- Structured similarity scoring

### 📊 Code Quality Analyzer
- Structural evaluation
- Performance suggestions
- Readability analysis
- Improvement recommendations

### 📚 Smart Learning Toolkit
- Flashcards & summary generation
- Flowchart creation
- Research paper recommendations
- Academic content structuring

### 📅 AI Project Planner
- Task breakdown system
- Scheduling dashboard
- Email reminders via Celery
- Progress tracking analytics

### 📊 Dashboard & Analytics
- Learning progress tracking
- Project history overview
- Performance insights visualization

---

## 🏗 System Architecture

Frontend (React.js)  
⬇  
Django REST API Layer  
⬇  
AI Processing Layer (LLM + Similarity Engine)  
⬇  
Docker Sandbox & Celery Task Queue  
⬇  
Database (SQLite / PostgreSQL scalable)

---

## 🛠 Tech Stack

### 🎨 Frontend
- React.js  
- Tailwind CSS  
- Context API  
- Axios  
- React Router  

### ⚙️ Backend
- Python  
- Django  
- Django REST Framework  
- JWT Authentication (SimpleJWT)  
- Celery (Asynchronous Task Processing)  

### 🤖 AI & NLP
- Large Language Model Integration (DeepSeek / Gemini)  
- Applied NLP via LLM APIs  
- AI-based code generation & summarization  

### 🧪 Secure Execution
- Docker-based sandbox  
- Multi-language runtime execution  
- SQLite isolated execution environment  

### 🗄 Database
- SQLite (Development)  
- PostgreSQL (Production-ready scalable architecture)  

---

## 🎯 Project Impact

EduCrew demonstrates:

- Practical implementation of a Multi-Agent AI system  
- Integration of LLM APIs in a real-world academic platform  
- Secure sandbox-based code execution  
- Asynchronous task processing using Celery  
- Full-stack scalable architecture design  

The platform reduces academic workflow fragmentation and improves productivity through intelligent automation.

---

## ⚙️ Installation Guide

### 🔹 Prerequisites

Ensure the following are installed on your system:

- Python 3.9 or higher  
- Node.js (v16+ recommended)  
- npm  
- Git  

---

### 🚀 Setup Steps

```bash
# ===============================
# 1️⃣ Clone the Repository
# ===============================

git clone https://github.com/khushboo12vishwakarma/EduCrew.git
cd EduCrew


# ===============================
# 2️⃣ Backend Setup (Django)
# ===============================

cd educrew-backend

# Create Virtual Environment
python -m venv venv

# Activate Virtual Environment (Windows)
venv\Scripts\activate

# For Mac/Linux use:
# source venv/bin/activate

# Install Required Dependencies
pip install -r requirements.txt

# --------------------------------
# Create a .env file inside the 
# educrew-backend directory and add:
#
# PERPLEXITY_API_KEY=your_api_key
# EMAIL_HOST_USER=your_email
# EMAIL_HOST_PASSWORD=your_app_password
# --------------------------------

# Apply Database Migrations
python manage.py migrate

# Start Backend Server
python manage.py runserver


# ===============================
# 3️⃣ Frontend Setup (React)
# ===============================

cd ../educrew-frontend

# Install Frontend Dependencies
npm install

# Start Frontend Development Server
npm start
```

---

### 🌐 Application Access

After successful setup:

- Frontend → http://localhost:3000  
- Backend API → http://127.0.0.1:8000  

---
  


### 🚀 Setup Steps

```bash
# Clone Repository
git clone https://github.com/khushboo12vishwakarma/EduCrew.git
cd EduCrew

# ================= Backend Setup =================
cd educrew-backend
python -m venv venv
venv\Scripts\activate     # Windows
# source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt

# Create .env file inside educrew-backend and add:
# PERPLEXITY_API_KEY=your_api_key
# EMAIL_HOST_USER=your_email
# EMAIL_HOST_PASSWORD=your_app_password

python manage.py migrate
python manage.py runserver

# ================= Frontend Setup =================
cd ../educrew-frontend
npm install
npm start
```

---



