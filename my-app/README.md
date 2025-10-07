
# 📰 Plog App (React + Material UI (MUI) + Strapi + Firebase)

## 🌟 Overview

**Plog App** is a modern blogging platform built with **React** (frontend), **Strapi** (backend CMS), and **Firebase** for user authentication and real-time data.

It allows users to register, log in (via email or Google), browse posts, like and save them, and add comments — all managed seamlessly through a clean, responsive interface.

---

## 🚀 Features

### 🧩 Content Management – **Strapi CMS**

* Admins can create, edit, and publish blog posts.
* Core post fields:

  ```
  title, slug, description, content, type, author, date, readTime, image, status
  ```
* Public access configured under
  `Settings → Roles → Public → Permissions (find, findOne)`.

---

### 🔐 Authentication – **Firebase Auth**

* Sign up and log in using **Email & Password**.
* One-click login with **Google Authentication**.
* Automatic sync of user info (name, email, avatar).
* Persistent user sessions handled via `onAuthStateChanged`.

---

### 💬 User Interactions *(Coming Soon)*

* Like / Unlike posts.
* Save or bookmark posts.
* Comment on posts (stored per user).
* Dedicated user dashboard for:

  * Liked posts
  * Saved posts
  * Written comments

---

### 🏠 User Interface

* Fully responsive and designed using **Material UI (MUI)**.
* Dynamic **AppBar** showing the logged-in user’s name or profile image.
* Automatic redirect to the homepage after sign-up or login.

---

## 🧱 Tech Stack

| Component                | Technology                                           |
| ------------------------ | ---------------------------------------------------- |
| **Frontend**             | React + React Router + Axios + MUI                   |
| **Backend**              | Strapi CMS                                           |
| **Auth & Realtime Data** | Firebase Authentication + Firestore                  |
| **Database (CMS)**       | SQLite (Development) → PostgreSQL/MySQL (Production) |
| **Media Storage**        | Strapi Media Library                                 |

---

## 📂 Project Structure

```
plogapp/
├── cms/               # Strapi backend
│   ├── .tmp/          # Local SQLite database
│   └── ...
├── my-app/            # React frontend
│   ├── src/
│   │   ├── config/    # firebase.js + environment.js
│   │   ├── context/   # AuthContext.jsx
│   │   ├── pages/     # Home, Login, Register, Profile, BlogDetail
│   │   └── components/# AppAppBar, etc.
│   └── .env           # Firebase + Strapi configuration
└── README.md
```

---

## ⚙️ Setup Guide

### 1️⃣ Clone the project

```bash
git clone https://github.com/HamzaSoftwear/plog-App.git
cd plogapp
```

### 2️⃣ Set up Strapi (Backend)

```bash
cd cms
npm install
npm run develop
```

Then:

* Visit `http://localhost:1337/admin`
* Create your **admin account**
* Enable public API access (`find`, `findOne`) for the **Post** content type

---

### 3️⃣ Set up React (Frontend)

```bash
cd ../my-app
npm install
npm run dev
```

Runs on `http://localhost:5173`

---

### 4️⃣ Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project
3. Enable:

   * **Email/Password Authentication**
   * **Google Authentication**
   * **Firestore Database**
4. Copy your config into `my-app/.env.local`:

```env
VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx
VITE_FIREBASE_PROJECT_ID=xxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxx
VITE_FIREBASE_APP_ID=xxxx
VITE_STRAPI_URL=http://localhost:1337
```

---

## 🧠 Available Commands

### Strapi

```bash
cd cms
npm run develop   # development mode
npm run start     # production mode
```

### React

```bash
cd my-app
npm run dev       # start frontend
npm run build     # build for production
```

---

## 🌍 Deployment

| Component            | Recommended Platform                |
| -------------------- | ----------------------------------- |
| **Frontend**         | Firebase Hosting / Netlify / Vercel |
| **Backend**          | Render / Railway / Heroku           |
| **Database**         | PostgreSQL / MySQL (Production)     |
| **Auth & Firestore** | Firebase Cloud Services             |

---

## 🔮 Future Enhancements

* Full **like**, **bookmark**, and **comment** system using Firestore
* User dashboard for saved and liked posts
* SEO improvements and analytics
* Multilingual support (English / Arabic)
* Notifications for comments and likes

---

## 👨‍💻 Contributors

Developed by **Hamza Naeem**
with technical support from **GPT-5 AI Development Partner** 🤝

---
##🌍 Demo
you can try from here:
 https://plog-app-ec1be.web.app
غ

## 📜 License

MIT License © 2025 **Hamza Naeem**

