
# Plog App (React + Strapi)

## Overview

**Plog App** is a blogging platform built with **React** (frontend) and **Strapi** (backend CMS).
It allows admins to create and manage blog posts, while users can interact with content by signing up, commenting, liking, and saving posts to their personal collection.



## Features

* **Content Management with Strapi**

  * Admin can create, edit, and publish blog posts with fields:
    `title`, `slug`, `description`, `content`, `type`, `author`, `date`, `readTime`, `image`, `status`.
* **User Authentication**

  * Users can sign up, log in, and manage their profiles.
* **User Interactions**

  * Add comments to posts.
  * Like/unlike posts.
  * Save/bookmark posts for later.
* **User Dashboard**

  * Dedicated page where each user can see:

    * Posts they liked.
    * Posts they saved/bookmarked.
    * Comments they have written.

---

## Tech Stack

* **Frontend:** React, React Router, Axios
* **Backend:** Strapi (Headless CMS)
* **Auth & User Data:** Firebase Authentication + Firestore
* **Database (Strapi):** SQLite (development), PostgreSQL/MySQL (production)
* **Media:** Strapi Media Library

---

## Project Structure

```
plogapp/
├─ cms/          # Strapi backend
├─ my-app/       # React frontend
├─ README.md
```

---

## Prerequisites

* Node.js >= 16
* npm or yarn
* Firebase project (for Auth + Firestore)
* Git (optional)

---

## Getting Started

### 1. Clone the project

```bash
git clone https://github.com/your-username/plogapp.git
cd plogapp
```

### 2. Setup Strapi (Backend)

```bash
cd cms
npm install
npm run develop
```

* Visit `http://localhost:1337/admin`
* Create the **first admin account**.
* Use the **Content-Type Builder** to create `Post` with the fields listed above.
* Go to **Settings → Roles → Public**, enable `find` and `findOne` for posts.

### 3. Setup React (Frontend)

```bash
cd ../my-app
npm install
npm start
```

React app runs on `http://localhost:3000`.

### 4. Setup Firebase

* Create a project at [Firebase Console](https://console.firebase.google.com/).
* Enable **Authentication** (Email/Password, Google).
* Enable **Firestore Database**.
* Copy Firebase config into `my-app/.env`:

```env
REACT_APP_FIREBASE_API_KEY=xxxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxxx
REACT_APP_FIREBASE_PROJECT_ID=xxxx
REACT_APP_FIREBASE_STORAGE_BUCKET=xxxx
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxxx
REACT_APP_FIREBASE_APP_ID=xxxx
REACT_APP_STRAPI_URL=http://localhost:1337
```

---

## Available Commands

### Strapi

```bash
cd cms
npm run develop   # start backend in dev mode
npm run start     # production mode
```

### React

```bash
cd my-app
npm start         # start frontend
npm run build     # build for production
```

---

## Deployment

* **Backend (Strapi):** Deploy to Render, Railway, Heroku, or any Node server.
* **Frontend (React):** Deploy to Netlify, Vercel, or Firebase Hosting.
* **Database:** For production, replace SQLite with PostgreSQL or MySQL.
* **Firebase:** Auth & Firestore are already cloud-based.

---

## Future Improvements

* Rich text editor for comments.
* Notifications for likes/comments.
* SEO optimizations for posts.
* User profile customization.

---

## License

MIT License © 2025 Hamza Naeem




