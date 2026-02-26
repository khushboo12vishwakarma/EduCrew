# 🚀 EduCrew – AI-Powered Learning & Project Assistance Platform

EduCrew is a Full-Stack AI-powered educational platform designed to enhance student productivity, learning efficiency, and project development through intelligent automation and AI-driven tools.

The platform integrates LLM-based content generation, code quality analysis, plagiarism detection, sandbox execution, structured project planning, and learning analytics into a single unified system.

---

## 📌 Problem Overview
In today’s academic environment, students face information overload, poor study organization, and limited access to personalized academic support. Learning resources are scattered across multiple platforms for research, coding, study planning, project management, and assignment review. These tools operate independently and lack integration.
As a result, students are forced to switch between platforms, repeat tasks, and manually track their progress. This leads to wasted time, confusion, poor time management, increased stress, and missed deadlines. Most existing solutions focus on solving a single isolated problem rather than supporting the entire learning lifecycle from start to submission.

EduCrew solves these challenges using AI-driven automation and structured learning workflows.

---

## 🚀 EduCrew Solution

EduCrew addresses these academic challenges by implementing a **Multi-Agent AI Architecture** powered by **Applied Natural Language Processing (via LLM Integration)**.

Instead of relying on isolated tools, EduCrew builds a coordinated ecosystem of specialized AI agents that work together as an intelligent academic support system.

Each AI agent is responsible for a specific domain:

- 📚 **Research Agent** – Assists in discovering, summarizing, and structuring research materials.
- 🧠 **Study Guidance Agent** – Explains complex concepts, generates notes, summaries, flashcards, and flowcharts.
- 💻 **Code Intelligence Agent** – Generates code, debugs errors, explains logic, and supports interview preparation.
- 📅 **Project Planning Agent** – Breaks complex projects into structured tasks with day-wise and week-wise planning, reminders, and progress tracking.
- 📊 **Quality Review Agent** – Performs plagiarism analysis, document evaluation, and structured feedback generation.

These agents leverage LLM-driven NLP capabilities to understand user input, interpret academic context, generate structured outputs, and provide intelligent recommendations.

Rather than functioning independently, the agents operate within a unified backend architecture where:

- User input is processed via REST APIs.
- AI tasks are handled through LLM integration.
- Background jobs (e.g., reminders, scheduled tasks) are managed using Celery.
- Secure execution environments (Docker-based sandbox) safely run user code.
- Analytical modules evaluate content quality and similarity.

This coordinated system transforms fragmented academic tools into a cohesive AI-powered learning platform.

By combining automation, intelligent reasoning, and structured workflow management, EduCrew:

- Reduces cognitive overload  
- Saves time through automation  
- Improves learning efficiency  
- Enhances code quality  
- Prevents plagiarism  
- Supports better academic planning  

The result is a scalable, intelligent, and productivity-focused academic ecosystem that improves student performance while reducing stress.

---


## 🌟 Key Features

### 🔐 Authentication & Security
- JWT-based authentication
- Secure password reset
- Protected API routes
- Environment variable protection

---

### 💻 AI Code Intelligence System
- AI-based code generation
- Debugging and improvement suggestions
- Topic-based coding practice questions
- Coding interview preparation assistance
- Animated explanations for better understanding
- Secure Docker-based sandbox execution

---

### 📊 AI Code Quality Analyzer
- Structural code evaluation
- Performance suggestions
- Readability analysis
- Improvement recommendations

---

### 🔍 Intelligent Plagiarism Detection
- Web scraping-based similarity detection
- AI-powered originality insights
- Structured similarity scoring

---

### 🧠 AI Presentation Generator
- Automated slide content creation
- Structured academic formatting
- Topic-based presentation generation

---

### 📚 Smart Learning Toolkit
- Generate flowcharts, summaries, flashcards, and notes
- Research topic exploration
- Top 10 global research paper recommendations

---

### 📅 AI Project Planner
- Convert complex projects into simplified task plans
- Day-wise and week-wise scheduling
- Progress tracking dashboard
- Email reminders for task completion

---

### 📊 Dashboard & Analytics
- Learning progress tracking
- Project history overview
- Performance insights visualization

---

## 🛠 Tech Stack & Technologies Used


---

### 🎨 Frontend
- React.js
- Tailwind CSS
- Context API
- Axios
- React Router

---

### ⚙️ Backend
- Python
- Django
- Django REST Framework
- JWT Authentication (SimpleJWT)
- Celery (Asynchronous Task Processing)

---

### 🤖 AI & NLP Technologies
- Multi-Agent AI Architecture
- Large Language Model (DeepSeek / Gemini)
- Natural Language Processing (NLP)
- AI-based Code Generation & Debugging
- AI Document Summarization
- AI Interview Evaluation System

---

### 🔍 Analysis & Processing
- Custom Similarity Engine
- Web Scraping (for plagiarism detection)
- Code Quality Analyzer
- Code Animation Engine

---

### 🧪 Secure Code Execution
- Docker-based Sandbox
- Multi-language Runtime Execution
- SQLite Sandbox Environment

---

### 🗄 Database
- SQLite (Development)
- Scalable to PostgreSQL (Production Ready)

---

### 📂 File & Document Handling
- PDF Processing
- PPTX Generation (python-pptx)
- File Streaming & Download APIs

---

### 📧 Background & Automation
- Celery Scheduler
- Email Notification System
- Scheduled Task Reminders

---

### 🔐 Security & Authentication
- JWT-based Authentication
- Password Reset System
- Environment Variable Configuration (.env)

---

### 🧰 Development Tools
- Git & GitHub
- VS Code
- Postman (API Testing)
- npm
- pip

---


## 🏗 System Architecture

Frontend (React)  
⬇  
REST APIs (Django REST Framework)  
⬇  
AI Processing Layer (LLM + Similarity Engine)  
⬇  
Sandbox & Background Tasks (Celery)  
⬇  
Database (SQLite / Scalable to PostgreSQL)

---

## 🎯 Project Impact

EduCrew demonstrates the practical implementation of a scalable AI-powered multi-agent system integrating backend engineering, asynchronous processing, secure sandbox execution, and applied NLP to solve real-world academic productivity challenges.

---
## ⚙️ Installation

### 1️⃣ Clone the Repository
git clone https://github.com/khushboo12vishwakarma/EduCrew.git
cd EduCrew



### 2️⃣ Backend Setup


cd educrew-backend

### Create Virtual Environment
python -m venv venv

### Activate Virtual Environment (Windows)
venv\Scripts\activate

### For Mac/Linux use:
### source venv/bin/activate

### Install Required Dependencies
pip install -r requirements.txt


### Create .env file inside educrew-backend folder
### Add the following inside .env file:

### PERPLEXITY_API_KEY=your_api_key
### EMAIL_HOST_USER=your_email
### EMAIL_HOST_PASSWORD=your_app_password


### Apply Database Migrations
python manage.py migrate

### Run Backend Server
python manage.py runserver



### 3️⃣ Frontend Setup


cd ../educrew-frontend

### Install Frontend Dependencies
npm install

### Start Frontend Server
npm start