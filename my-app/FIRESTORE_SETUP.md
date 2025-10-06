# Firestore Security Rules Setup

## Overview
This document provides the Firestore security rules needed for the blog app's user interactions (likes, saves, comments).

## Security Rules

Copy and paste the following rules into your Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function authed() { return request.auth != null; }

    match /likes/{docId} {
      allow read: if true;
      allow create, delete: if authed() && request.resource.data.userId == request.auth.uid;
      allow update: if false;
    }

    match /saves/{docId} {
      allow read: if authed() && request.auth.uid == resource.data.userId;
      allow create, delete: if authed() && request.resource.data.userId == request.auth.uid;
      allow update: if false;
    }

    match /comments/{commentId} {
      allow read: if true;
      allow create: if authed() && request.resource.data.userId == request.auth.uid;
      allow update, delete: if authed() && request.auth.uid == resource.data.userId;
    }
  }
}
```

## Setup Steps

1. **Enable Firestore Database**:
   - Go to Firebase Console → Firestore Database
   - Click "Create database"
   - Choose "Start in test mode" for development
   - Select a location for your database

2. **Set Security Rules**:
   - Go to Firestore Database → Rules tab
   - Replace the default rules with the rules above
   - Click "Publish"

3. **Create Indexes (Optional)**:
   - For better performance, create composite indexes for:
     - `comments` collection: `postId` (Ascending), `createdAt` (Ascending)
     - `saves` collection: `userId` (Ascending), `createdAt` (Descending)

## Data Structure

### Collections

#### `likes`
- **Document ID**: `${postId}_${userId}`
- **Fields**:
  - `postId` (string): The blog post ID
  - `userId` (string): The user's Firebase Auth UID
  - `createdAt` (timestamp): When the like was created

#### `saves`
- **Document ID**: `${postId}_${userId}`
- **Fields**:
  - `postId` (string): The blog post ID
  - `userId` (string): The user's Firebase Auth UID
  - `createdAt` (timestamp): When the post was saved

#### `comments`
- **Document ID**: Auto-generated
- **Fields**:
  - `postId` (string): The blog post ID
  - `userId` (string): The user's Firebase Auth UID
  - `userName` (string): Display name of the user
  - `userPhoto` (string|null): User's profile photo URL
  - `text` (string): Comment content
  - `createdAt` (timestamp): When the comment was created

## Security Notes

- **Likes**: Anyone can read likes (for public like counts), but only authenticated users can create/delete their own likes
- **Saves**: Only the user who saved a post can read their saves (private)
- **Comments**: Anyone can read comments, but only authenticated users can create comments, and only comment authors can edit/delete their comments

## Production Considerations

For production deployment, consider:
1. Adding rate limiting rules
2. Implementing content moderation for comments
3. Adding more granular permissions
4. Setting up proper indexes for better performance
5. Implementing data validation rules
