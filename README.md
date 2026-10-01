# Vjeera HR

A modern full-stack Human Resources, Recruitment, Training, and Corporate Services platform built with React, Node.js, Express, and MongoDB.

Vjeera HR provides a professional public-facing website for HR services while also providing an authenticated admin panel for managing job openings, courses, applications, enrollments, contact enquiries, and corporate enquiries.

---

## 🚀 Live Project

Frontend: Add your deployed frontend URL here

Backend API: Add your deployed backend URL here

GitHub Repository:
https://github.com/Gaurav-0717/vjeera-hr

---

## 📌 Project Overview

Vjeera HR is designed as a complete HR management and corporate services platform.

The system has two major areas:

### Public Website

Visitors can:

- Explore HR services
- Learn about the organization
- Browse available courses
- Enroll in courses
- Browse job opportunities
- Apply for jobs
- Submit corporate enquiries
- Contact the organization
- View client information

### Admin Panel

Authenticated administrators can:

- Login securely
- View dashboard information
- Manage job openings
- Manage courses
- View contact submissions
- Manage course enrollments
- Review job applications
- Manage corporate enquiries
- Update application/enquiry statuses
- Logout securely

---

# ✨ Features

## 🌐 Public Website

### Home
Professional landing page introducing Vjeera HR and its services.

### About Us
Provides information about the organization and its purpose.

### Services
Displays the HR and corporate services offered by the organization.

### Courses
Displays available training courses retrieved from the backend.

Users can:

- Browse courses
- View course information
- Submit enrollment requests

### Career

Displays available job opportunities from the backend.

Users can:

- Browse open positions
- View job details
- Apply for positions

### Corporate

Provides corporate services and an enquiry form for organizations.

### Our Clients

Displays available client/company information without relying on fabricated statistics or testimonials.

### Contact

Provides a contact form for visitors to submit enquiries.

---

# 🔐 Admin Authentication

Vjeera HR includes an administrator authentication system using JWT.

### Authentication Flow

```text
Admin
  ↓
Admin Login
  ↓
POST /api/auth/login
  ↓
JWT Token
  ↓
Protected Admin Routes
  ↓
Admin Dashboard
