import axios from 'axios';

// Axios instance with JWT or session cookies
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  // JWT or session cookie configuration will be implemented here
});

export default api;
