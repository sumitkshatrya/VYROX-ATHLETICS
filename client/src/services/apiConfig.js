// Central API Configuration for VYROX ATHLETICS Client
// Automatically routes requests to Render backend in production or uses proxy in dev

const getApiBaseUrl = () => {
  // If explicitly configured via Vite env (build or runtime)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/+$/, '');
  }

  // In local development, empty string leverages the Vite proxy config in vite.config.js
  if (import.meta.env.DEV) {
    return '';
  }

  // In production builds, default to the official deployed Render server URL
  return 'https://vyrox-athletics-api.onrender.com';
};

export const API_BASE_URL = getApiBaseUrl();

