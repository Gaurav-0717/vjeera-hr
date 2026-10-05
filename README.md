# Vjeera HR

A modern full-stack **Human Resources, Recruitment, Training, and Corporate Services Platform** built with **React, Node.js, Express.js, and MongoDB**.

Vjeera HR provides a professional public-facing website for HR and corporate services along with a secure admin panel for managing **jobs, courses, applications, enrollments, contact enquiries, and corporate enquiries**.

---

## 🚀 Live Deployment

### 🌐 Frontend

**Live Website:**  
https://vjeera-hr.vercel.app

### ⚙️ Backend API

**Live Backend:**  
https://vjeera-hr.onrender.com

### ❤️ Backend Health Check

https://vjeera-hr.onrender.com/api/health

---

## ✨ Features

### 👥 Public Website

- Professional responsive homepage
- About Us section
- HR and recruitment services
- Training and courses section
- Career and job opportunities
- Corporate services
- Client section
- Contact form
- Corporate enquiry form
- Course enrollment
- Job application submission
- Responsive design for desktop, tablet, and mobile devices

### 🔐 Admin Panel

Secure admin authentication using **JWT**.

Administrators can:

- Login securely
- View dashboard statistics
- Manage job postings
- Create, update, and delete jobs
- Manage courses
- Create, update, and delete courses
- View job applications
- View course enrollments
- View contact enquiries
- View corporate enquiries
- Logout securely

### 🛡️ Security

The backend includes:

- JWT-based authentication
- Password hashing using bcrypt
- Protected admin routes
- Request validation
- Rate limiting for login
- Helmet security headers
- CORS configuration
- Environment-based configuration
- MongoDB data validation
- Centralized error handling
- Sensitive credentials excluded from Git

---

## 🏗️ Project Architecture

```text
Vjeera HR
│
├── Client/                    # React + Vite Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   ├── vercel.json
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Express + MongoDB Backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── utils/
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
