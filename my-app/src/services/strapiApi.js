import axios from 'axios';
import { config } from '../config/environment';

// Strapi API configuration
const STRAPI_URL = config.STRAPI_URL;
const API_URL = config.API_URL;

// Create axios instance
const strapiApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to get image URL from Strapi
const getImageUrl = (image) => {
  if (!image) return null;
  if (typeof image === 'string') return image;
  
  // Handle direct image object (Strapi v5)
  if (image.url) {
    return image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
  }
  
  // Handle nested image data (Strapi v4)
  if (image.data && image.data.url) {
    return image.data.url.startsWith('http') ? image.data.url : `${STRAPI_URL}${image.data.url}`;
  }
  
  return null;
};

// Helper function to convert Strapi rich text to HTML
const convertRichTextToHtml = (content) => {
  if (!content) return '';
  
  // If it's already a string, return it
  if (typeof content === 'string') return content;
  
  // If it's an array of rich text blocks, convert to HTML
  if (Array.isArray(content)) {
    return content.map(block => {
      if (block.type === 'paragraph') {
        const text = block.children?.map(child => {
          if (child.type === 'text') {
            let textContent = child.text || '';
            // Handle bold text
            if (child.bold) {
              textContent = `<strong>${textContent}</strong>`;
            }
            // Handle italic text
            if (child.italic) {
              textContent = `<em>${textContent}</em>`;
            }
            return textContent;
          }
          return '';
        }).join('') || '';
        return `<p>${text}</p>`;
      }
      
      if (block.type === 'heading') {
        const level = block.level || 1;
        const text = block.children?.map(child => {
          if (child.type === 'text') {
            return child.text || '';
          }
          return '';
        }).join('') || '';
        return `<h${level}>${text}</h${level}>`;
      }
      
      if (block.type === 'list') {
        const listItems = block.children?.map(item => {
          if (item.type === 'list-item') {
            const text = item.children?.map(child => {
              if (child.type === 'text') {
                return child.text || '';
              }
              return '';
            }).join('') || '';
            return `<li>${text}</li>`;
          }
          return '';
        }).join('') || '';
        const listTag = block.format === 'ordered' ? 'ol' : 'ul';
        return `<${listTag}>${listItems}</${listTag}>`;
      }
      
      // Add more block types as needed
      return '';
    }).join('');
  }
  
  return '';
};

// Helper function to format Strapi post data
const formatPost = (post) => {
  // Add safety checks for undefined data
  if (!post) {
    console.warn('Invalid post data:', post);
    return null;
  }

  // Handle both Strapi v4 (with attributes) and v5 (direct fields) formats
  const attributes = post.attributes || post;

  return {
    id: post.id,
    title: attributes.Title || 'Untitled',
    slug: attributes.Slug || '',
    description: attributes.Description || '',
    content: convertRichTextToHtml(attributes.Content),
    type: attributes.Type || 'General',
    author: attributes.Author || 'Unknown Author',
    date: attributes.Date || new Date().toISOString().split('T')[0],
    readTime: attributes.readTime || '5 min read',
    image: getImageUrl(attributes.Image),
    publishedAt: attributes.publishedAt,
    createdAt: attributes.createdAt,
    updatedAt: attributes.updatedAt,
  };
};

// API functions
export const strapiService = {
  // Get all published posts
  async getAllPosts() {
    try {
      const response = await strapiApi.get('/posts?populate=Image&sort=publishedAt:desc');
      console.log('Strapi API Response:', response.data);
      
      if (!response.data || !response.data.data) {
        console.warn('No data received from Strapi API');
        return [];
      }
      
      const formattedPosts = response.data.data.map(formatPost).filter(post => post !== null);
      console.log('Formatted posts:', formattedPosts);
      return formattedPosts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // Get posts by category/type
  async getPostsByType(type) {
    try {
      const response = await strapiApi.get(`/posts?filters[Type][$eq]=${type}&populate=Image&sort=publishedAt:desc`);
      if (!response.data || !response.data.data) {
        return [];
      }
      return response.data.data.map(formatPost).filter(post => post !== null);
    } catch (error) {
      console.error(`Error fetching posts for type ${type}:`, error);
      throw error;
    }
  },

  // Get single post by ID
  async getPostById(id) {
    try {
      // For Strapi v5, we need to use the documentId or fetch from the list and filter
      // Let's try the documentId approach first
      const response = await strapiApi.get(`/posts?filters[id][$eq]=${id}&populate=Image`);
      console.log('Single post API Response:', response.data);
      
      if (!response.data || !response.data.data || response.data.data.length === 0) {
        console.warn('No data received for post ID:', id);
        return null;
      }
      
      return formatPost(response.data.data[0]);
    } catch (error) {
      console.error(`Error fetching post with id ${id}:`, error);
      throw error;
    }
  },

  // Get single post by slug
  async getPostBySlug(slug) {
    try {
      const response = await strapiApi.get(`/posts?filters[Slug][$eq]=${slug}&populate=Image`);
      if (response.data && response.data.data && response.data.data.length > 0) {
        return formatPost(response.data.data[0]);
      }
      return null;
    } catch (error) {
      console.error(`Error fetching post with slug ${slug}:`, error);
      throw error;
    }
  },

  // Search posts by title or description
  async searchPosts(query) {
    try {
      const response = await strapiApi.get(`/posts?filters[$or][0][Title][$containsi]=${query}&filters[$or][1][Description][$containsi]=${query}&populate=Image&sort=publishedAt:desc`);
      if (!response.data || !response.data.data) {
        return [];
      }
      return response.data.data.map(formatPost).filter(post => post !== null);
    } catch (error) {
      console.error(`Error searching posts with query ${query}:`, error);
      throw error;
    }
  },

  // Get all available post types/categories
  async getPostTypes() {
    try {
      const response = await strapiApi.get('/posts?fields[0]=Type');
      const types = [...new Set(response.data.data.map(post => post.attributes.Type))];
      return types;
    } catch (error) {
      console.error('Error fetching post types:', error);
      throw error;
    }
  },

  // Get featured posts (you can customize this based on your needs)
  async getFeaturedPosts(limit = 3) {
    try {
      const response = await strapiApi.get(`/posts?populate=Image&sort=publishedAt:desc&pagination[limit]=${limit}`);
      return response.data.data.map(formatPost);
    } catch (error) {
      console.error('Error fetching featured posts:', error);
      throw error;
    }
  }
};

export default strapiService;
