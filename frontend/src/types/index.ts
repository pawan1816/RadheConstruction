// Common types for the BuildRanchi Pro platform

export interface User {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
  phone: string
  role: 'admin' | 'staff' | 'engineer' | 'customer'
  avatar: string | null
  city: string
  is_verified: boolean
}

export interface Service {
  id: number
  name: string
  slug: string
  short_description: string
  description: string
  category: number | null
  category_name: string
  features: string[]
  price_range_min: number | null
  price_range_max: number | null
  price_unit: string
  hero_image: string | null
  gallery: string[]
  process_steps: { step?: number; title: string; description: string }[]
  is_featured: boolean
  meta_title: string
  meta_description: string
  faqs?: ServiceFAQ[]
}

export interface ServiceFAQ {
  id: number
  question: string
  answer: string
}

export interface Project {
  id: number
  title: string
  slug: string
  category: number | null
  category_name: string
  location: string
  city: string
  area_sqft: number | null
  budget_range: string
  status: 'planning' | 'ongoing' | 'completed' | 'on_hold'
  completion_percentage: number
  is_featured: boolean
  description: string
  features: string[]
  images?: ProjectImage[]
  progress_updates?: ProjectProgress[]
  thumbnail?: string | null
  meta_title: string
  meta_description: string
}

export interface ProjectImage {
  id: number
  image: string
  caption: string
  image_type: string
}

export interface ProjectProgress {
  id: number
  title: string
  description: string
  date: string
  percentage: number
}

export interface Testimonial {
  id: number
  client_name: string
  client_photo: string | null
  designation: string
  company: string
  content: string
  rating: number
  video_url: string
  is_featured: boolean
  project_title: string
}

export interface FAQ {
  id: number
  question: string
  answer: string
  category: string
}

export interface TeamMember {
  id: number
  name: string
  designation: string
  photo: string | null
  bio: string
  experience: number
  specializations: string[]
  social_links: Record<string, string>
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string | null
  author_name: string
  category_name: string
  is_featured: boolean
  published_at: string
  views_count: number
  reading_time: number
  meta_title: string
  meta_description: string
}

export interface CompanyInfo {
  id: number
  name: string
  tagline: string
  description: string
  logo: string | null
  address: string
  phone: string
  email: string
  whatsapp_number: string
  social_links: Record<string, string>
  stats: {
    projects_completed?: number
    happy_clients?: number
    years_experience?: number
    engineers?: number
  }
}

export interface Booking {
  id: number
  service: number | null
  service_name: string
  engineer: number | null
  engineer_name: string
  booking_type: string
  date: string
  start_time: string
  end_time: string
  status: string
  notes: string
  meeting_link: string
  location: string
}

export interface Lead {
  id: number
  name: string
  email: string
  phone: string
  source: string
  service_interest: string
  message: string
  status: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}