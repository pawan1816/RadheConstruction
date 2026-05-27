import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle 401, refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          localStorage.setItem('access_token', data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return api(originalRequest);
        } catch {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;

// API endpoint functions
export const endpoints = {
  // Auth
  login: (data: { email: string; password: string }) => api.post('/auth/login/', data),
  register: (data: Record<string, unknown>) => api.post('/auth/register/', data),
  getProfile: () => api.get('/auth/profile/'),

  // Services
  getServices: (params?: Record<string, unknown>) => api.get('/services/', { params }),
  getService: (slug: string) => api.get(`/services/${slug}/`),

  // Projects
  getProjects: (params?: Record<string, unknown>) => api.get('/projects/', { params }),
  getProject: (slug: string) => api.get(`/projects/${slug}/`),

  // Testimonials
  getTestimonials: (params?: Record<string, unknown>) => api.get('/testimonials/', { params }),

  // Blog
  getBlogPosts: (params?: Record<string, unknown>) => api.get('/blog/', { params }),
  getBlogPost: (slug: string) => api.get(`/blog/${slug}/`),
  getFeaturedPosts: () => api.get('/blog/featured/'),

  // Bookings
  getBookings: () => api.get('/bookings/'),
  createBooking: (data: Record<string, unknown>) => api.post('/bookings/', data),
  cancelBooking: (id: number) => api.post(`/bookings/${id}/cancel/`),

  // Quotations
  getQuotations: () => api.get('/quotations/'),
  createQuotation: (data: Record<string, unknown> | FormData) => api.post('/quotations/', data, {
    headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
  }),

  // Leads
  createLead: (data: Record<string, unknown>) => api.post('/leads/', data),

  // Contact
  submitContact: (data: Record<string, string>) => api.post('/core/contact/', data),

  // FAQ
  getFAQs: () => api.get('/core/faqs/'),

  // Team
  getTeam: () => api.get('/core/team/'),

  // Company
  getCompany: () => api.get('/core/company/'),

  // Dashboard
  getDashboardStats: () => api.get('/analytics/dashboard/'),

  // Chatbot
  sendChatMessage: (data: { message: string; session_id?: string }) => api.post('/chatbot/message/', data),

  // Careers
  submitApplication: (data: FormData) => api.post('/careers/', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};