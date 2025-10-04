// Environment configuration
// For Vite, use import.meta.env instead of process.env
const STRAPI_URL = import.meta.env?.VITE_STRAPI_URL || 'http://localhost:1337';

export const config = {
  STRAPI_URL: STRAPI_URL,
  API_URL: `${STRAPI_URL}/api`,
};

export default config;
