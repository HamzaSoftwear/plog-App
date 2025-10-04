# Strapi Integration Guide

This document explains how the React frontend has been integrated with the Strapi CMS backend.

## 🚀 What's Been Implemented

### 1. API Service (`src/services/strapiApi.js`)
- **Complete Strapi API wrapper** with all necessary functions
- **Image URL handling** for Strapi media files
- **Data formatting** to match frontend expectations
- **Error handling** for robust API calls

**Available Functions:**
- `getAllPosts()` - Fetch all published posts
- `getPostsByType(type)` - Filter posts by category
- `getPostById(id)` - Get single post by ID
- `getPostBySlug(slug)` - Get single post by slug
- `searchPosts(query)` - Search posts by title/description
- `getPostTypes()` - Get all available categories
- `getFeaturedPosts(limit)` - Get featured posts

### 2. Updated Components

#### Features Component (`src/components/Features.jsx`)
- ✅ **Fetches posts from Strapi** instead of static data
- ✅ **Loading states** with spinner
- ✅ **Error handling** with user-friendly messages
- ✅ **Category filtering** works with Strapi data
- ✅ **Fallback images** for posts without images

#### Hero Component (`src/components/Hero.jsx`)
- ✅ **Search functionality** integrated with Strapi API
- ✅ **Loading states** during search
- ✅ **Error handling** for failed searches

#### BlogDetail Component (`src/pages/BlogDetail.jsx`)
- ✅ **Fetches individual posts** from Strapi by ID
- ✅ **Loading and error states**
- ✅ **Comments system** (stored in localStorage)
- ✅ **Image handling** for Strapi media
- ✅ **Rich content rendering**

### 3. Configuration
- **Environment config** (`src/config/environment.js`)
- **Test utilities** (`src/utils/testStrapiConnection.js`)

## 🔧 Setup Instructions

### 1. Start Strapi Backend
```bash
cd cms
npm run develop
```
Strapi will run on `http://localhost:1337`

### 2. Configure Strapi Content Types
Make sure your Strapi has the `Post` content type with these fields:
- `Title` (Text)
- `Slug` (UID, target: Title)
- `Description` (Textarea)
- `Content` (Rich Text/Blocks)
- `Type` (Enumeration: Technology, Startup, Lifestyle, Finance)
- `Author` (Text)
- `Date` (Date)
- `readTime` (Text)
- `Image` (Media, single file)

### 3. Set Permissions
In Strapi Admin (`http://localhost:1337/admin`):
1. Go to **Settings → Roles → Public**
2. Enable `find` and `findOne` for Posts
3. Enable `find` for Upload (for images)

### 4. Create Sample Content
1. Go to **Content Manager → Posts**
2. Create a few sample posts with different types
3. Upload images for each post
4. Publish the posts

### 5. Start React Frontend
```bash
cd my-app
npm start
```
React will run on `http://localhost:3000`

## 🧪 Testing the Integration

### Manual Testing
1. **Home Page**: Should display posts from Strapi
2. **Category Filtering**: Click category buttons to filter posts
3. **Search**: Use the search bar to find posts
4. **Post Details**: Click on any post to view full content
5. **Comments**: Add comments (stored locally)
6. **Like/Bookmark**: Use the action buttons

### Automated Testing
```javascript
// In browser console or component
import { testStrapiConnection } from './src/utils/testStrapiConnection';
testStrapiConnection();
```

## 🔍 Troubleshooting

### Common Issues

1. **"Failed to load blog posts"**
   - Check if Strapi is running on `http://localhost:1337`
   - Verify Strapi permissions are set correctly
   - Check browser network tab for API errors

2. **Images not loading**
   - Ensure Strapi upload permissions are enabled
   - Check if images are properly uploaded in Strapi
   - Verify image URLs in browser network tab

3. **Search not working**
   - Check if posts have content in title/description
   - Verify Strapi search API is working
   - Check browser console for errors

4. **Posts not showing**
   - Ensure posts are published in Strapi
   - Check if posts have the required fields filled
   - Verify the Post content type structure

### Debug Mode
Add this to your component to see API responses:
```javascript
// In any component
console.log('Posts:', posts);
console.log('Loading:', loading);
console.log('Error:', error);
```

## 📊 Data Flow

```
Strapi CMS → API Service → React Components → UI
     ↓              ↓              ↓
  Content      Data Format    User Interface
  Management   & Fetching     & Interaction
```

## 🎯 Next Steps

1. **Add Authentication**: Integrate Strapi's user system
2. **Real Comments**: Store comments in Strapi instead of localStorage
3. **User Profiles**: Add user management features
4. **Advanced Search**: Implement more sophisticated search
5. **Caching**: Add API response caching
6. **Pagination**: Handle large numbers of posts
7. **SEO**: Add meta tags and structured data

## 📝 Environment Variables

Since you're using Vite, create a `.env` file in the `my-app` directory:
```env
VITE_STRAPI_URL=http://localhost:1337
```

**Note:** Vite uses `VITE_` prefix instead of `REACT_APP_` for environment variables.

Or modify `src/config/environment.js` directly to change the default URL.

---

**✅ Integration Complete!** Your React app is now fully connected to Strapi CMS.
