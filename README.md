# 🚀 EduCrew – AI-Powered Learning & Project Assistance Platform  

EduCrew is a Full-Stack AI-powered educational platform designed to enhance student productivity, streamline academic workflows, and automate project development using intelligent Multi-Agent AI architecture.

It integrates LLM-based content generation, secure code execution, plagiarism detection, structured project planning, and learning analytics into one unified ecosystem.

---

## 🏗 System Architecture

Frontend (React.js)  
⬇  
Django REST APIs  
⬇  
AI Processing Layer (LLM + Similarity Engine)  
⬇  
Secure Sandbox & Celery Workers  
⬇  
Database (SQLite → PostgreSQL Scalable)

---

## 🤖 Multi-Agent AI Architecture

EduCrew implements a modular multi-agent AI system where each agent handles a specialized academic domain:

### 📚 Research Agent
- Topic exploration  
- Research summarization  
- Academic structuring  

### 🧠 Study Guidance Agent
- Concept explanations  
- Flashcards generation  
- Flowcharts and notes  
- Summaries  

### 💻 Code Intelligence Agent
- AI-based code generation  
- Debugging support  
- Interview preparation  
- Code explanation  

### 📅 Project Planning Agent
- Converts complex projects into structured tasks  
- Day-wise & week-wise scheduling  
- Progress tracking  
- Email reminders (Celery-based)  

### 📊 Quality Review Agent
- Plagiarism detection  
- Similarity scoring  
- Structured academic feedback  

---

## 🌟 Key Features

### 🔐 Authentication & Security
- JWT-based authentication (SimpleJWT)
- Secure password reset
- Protected API routes
- Environment variable configuration (.env)

---

### 💻 AI Code Intelligence System
- Code generation & debugging
- Topic-based practice questions
- Coding interview assistance
- Secure Docker-based sandbox execution
- Multi-language runtime support

---

### 🔍 Intelligent Plagiarism Detection
- Web scraping-based similarity detection
- Custom similarity engine
- Structured similarity scoring

---

### 📊 AI Code Quality Analyzer
- Structural evaluation
- Performance suggestions
- Readability analysis
- Improvement recommendations

---

### 📚 Smart Learning Toolkit
- Flashcards generation
- Flowcharts & summaries
- Research paper recommendations
- Academic content structuring

---

### 📅 AI Project Planner
- Task breakdown system
- Scheduling dashboard
- Email reminders via Celery
- Progress tracking analytics

---

### 📊 Dashboard & Analytics
- Learning progress tracking
- Project history overview
- Performance insights visualization

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
- Multi-Agent AI Architecture
- Large Language Model (DeepSeek / Gemini)
- NLP-based structured output generation


### 🔐 Secure Code Execution
- Docker-based sandbox
- Isolated multi-language runtime
- SQLite sandbox environment

### 🗄 Database
- SQLite (Development)
- PostgreSQL (Production Ready)

### 📂 File Handling
- PDF processing
- PPTX generation (python-pptx)
- File streaming APIs

### 📧 Background Processing
- Celery Scheduler
- Email notification system

### 🧰 Development Tools
- Git & GitHub
- VS Code
- Postman
- npm
- pip

---

## 🚀 Installation Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/khushboo12vishwakarma/EduCrew.git
cd EduCrew
```

---

## ⚙️ Backend Setup

```bash
cd educrew-backend
python -m venv venv
```

### Activate Virtual Environment

Windows:
```bash
venv\Scripts\activate
```

Mac/Linux:
```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Create `.env` File inside `educrew-backend`

```
PERPLEXITY_API_KEY=your_api_key
EMAIL_HOST_USER=your_email
EMAIL_HOST_PASSWORD=your_app_password
```

### Apply Migrations

```bash
python manage.py migrate
```

### Run Backend Server

```bash
python manage.py runserver
```

---

## 🎨 Frontend Setup

```bash
cd ../educrew-frontend
npm install
npm start
```

---

## 🔐 Security Implementation

- Token-based authentication
- Protected REST endpoints
- Docker-based sandbox isolation
- Environment variable protection
- Secure code execution limits

---

## 📈 Future Improvements

- Kubernetes deployment
- Redis caching
- Advanced AI orchestration layer
- Real-time collaboration features
- AI-powered performance analytics

---

## 🎯 Project Impact

EduCrew demonstrates:

- Scalable AI system design  
- Multi-agent architecture implementation  
- Secure sandbox engineering  
- Asynchronous background processing  
- Applied NLP in academic automation  
- Full-stack production-ready development  

---

