// Test script to verify Strapi connection
import { strapiService } from '../services/strapiApi';

export const testStrapiConnection = async () => {
  try {
    console.log('Testing Strapi connection...');
    
    // Test basic connection
    const posts = await strapiService.getAllPosts();
    console.log('✅ Successfully connected to Strapi!');
    console.log(`📝 Found ${posts.length} posts`);
    
    if (posts.length > 0) {
      console.log('📄 Sample post:', {
        id: posts[0].id,
        title: posts[0].title,
        type: posts[0].type,
        hasImage: !!posts[0].image
      });
    }
    
    return { success: true, postsCount: posts.length };
  } catch (error) {
    console.error('❌ Failed to connect to Strapi:', error.message);
    console.error('Make sure Strapi is running on http://localhost:1337');
    return { success: false, error: error.message };
  }
};

// Auto-test on import (for development)
if (import.meta.env?.DEV) {
  // Uncomment the line below to auto-test on page load
  // testStrapiConnection();
}
