# Vjeera HR

A modern full-stack **Human Resources, Recruitment, Training, and Corporate Services Platform** built with **React, Node.js, Express.js, and MongoDB**.

Vjeera HR provides a professional public-facing website for HR and corporate services along with a secure admin panel for managing **jobs, courses, applications, enrollments, contact enquiries, and corporate enquiries**.

The project demonstrates a complete full-stack workflow including **REST APIs, MongoDB database management, JWT authentication, role-based access control, request validation, security middleware, responsive UI, and cloud deployment**.

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

### 🔐 Admin Login

https://vjeera-hr.vercel.app/admin/login

---

# 📌 Project Overview

Vjeera HR is designed as a centralized digital platform for an HR and corporate services organization.

The system has two major parts:

### Public Platform

Visitors can:

- Explore HR services
- View available courses
- Browse job opportunities
- Apply for jobs
- Enroll in courses
- Submit contact enquiries
- Submit corporate enquiries
- View company/client information

### Admin Platform

Authorized administrators can:

- Securely login
- View dashboard statistics
- Manage jobs
- Manage courses
- View applications
- View course enrollments
- View contact enquiries
- View corporate enquiries
- Monitor submitted records
- Logout securely

---

# 🎯 Project Objectives

The main objectives of Vjeera HR are:

- Digitize HR and recruitment operations
- Provide a professional online presence
- Centralize job and course management
- Simplify job application submission
- Simplify course enrollment
- Manage enquiries through a centralized dashboard
- Provide secure administrator access
- Store application and enquiry data in MongoDB
- Build a scalable full-stack architecture
- Deploy the complete application to cloud platforms

---

# ✨ Features

## 👥 Public Website

### 🏠 Home

- Professional landing page
- Company introduction
- Services overview
- Course and career highlights
- Responsive layout
- Clear navigation and calls-to-action

### ℹ️ About Us

Provides information about the organization and its purpose.

### 🛠️ Services

Displays HR and corporate services offered by the organization.

### 📚 Courses

Visitors can:

- View available courses
- Read course information
- View course details
- Submit enrollment requests

### 💼 Careers

Visitors can:

- Browse available job openings
- View job descriptions
- View experience requirements
- Submit job applications

### 🏢 Corporate

Provides corporate service information and allows organizations/users to submit enquiries.

### 🤝 Our Clients

Displays client-related information in a professional layout.

### 📩 Contact

Visitors can submit contact enquiries through the website.

---

# 🔐 Admin Panel

The application includes a protected administrator dashboard.

## Admin Authentication

Admin authentication uses:

- JWT
- bcrypt password hashing
- Protected API routes
- Session-based token storage
- Login rate limiting

### Admin Login Flow

```text
Admin
   │
   ▼
Login Page
   │
   ▼
POST /api/auth/login
   │
   ▼
Validate Request
   │
   ▼
Find Admin in MongoDB
   │
   ▼
Compare Password using bcrypt
   │
   ▼
Generate JWT
   │
   ▼
Store Authentication Token
   │
   ▼
Access Protected Admin Routes
