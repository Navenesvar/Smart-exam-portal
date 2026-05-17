# 🧠 Smart Exam Portal

A full-stack **Smart Exam Management System** built using **React (Frontend)** and **Django (Backend)**.  
It allows students to take MCQ-based exams with timers, automatic scoring, and exam tracking.

---

## 🚀 Features

### 👨‍🎓 Student Features
- Login & signup system
- Take MCQ-based exams
- Real-time exam timer ⏱️
- Auto-submit when time ends
- Instant result & scoring
- View Leaderboard

### 👨‍🏫 Admin Features
- Create and manage exams
- Add MCQ questions
- Set exam duration
- View student performance
- Manage exam data

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- HTML, CSS, JavaScript

### Backend
- Django / Django REST Framework
- Python
- REST APIs

### Database
- SQLite (default)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/smart-exam-portal.git
cd smart-exam-portal

Backend setup

cd backend
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

pip install -r requirements.txt

python manage.py migrate
python manage.py runserver

Backend runs at:
http://127.0.0.1:8000/

Frontend setup

cd frontend
npm install
npm start

Frontend runs at:
http://localhost:3000/
