# BuildRanchi Pro — Database Schema

## Core Models

### accounts.User (extends AbstractUser)
- id, email, phone, role (admin/staff/engineer/customer)
- first_name, last_name, avatar, address, city, state, pincode
- is_verified, otp_secret, company_name, gst_number
- created_at, updated_at

### accounts.EngineerProfile
- id, user (FK→User), specialization, experience_years
- certifications, projects_completed, rating, bio, availability

### services.ServiceCategory
- id, name, slug, icon, description, sort_order

### services.Service
- id, category (FK→ServiceCategory), name, slug
- short_description, description, features (JSON)
- price_range_min, price_range_max, price_unit
- hero_image, gallery (JSON), process_steps (JSON)
- is_featured, is_active, sort_order
- meta_title, meta_description, meta_keywords
- created_at, updated_at

### services.ServiceFAQ
- id, service (FK→Service), question, answer, sort_order

### projects.ProjectCategory
- id, name, slug, description

### projects.Project
- id, category (FK→ProjectCategory), title, slug
- client (FK→User, nullable), engineer (FK→User, nullable)
- location, city, state, area_sqft, budget_range
- description, features (JSON), status (planning/ongoing/completed)
- start_date, end_date, completion_percentage
- is_featured, is_active
- meta_title, meta_description
- created_at, updated_at

### projects.ProjectImage
- id, project (FK→Project), image, caption, image_type (progress/before/after/gallery)
- sort_order

### projects.ProjectProgress
- id, project (FK→Project), title, description, date, image, percentage

### bookings.Booking
- id, user (FK→User), service (FK→Service, nullable)
- engineer (FK→User, nullable), project (FK→Project, nullable)
- booking_type (consultation/site_visit/design_review)
- date, start_time, end_time
- status (pending/confirmed/completed/cancelled/rescheduled)
- notes, meeting_link, location
- created_at, updated_at

### bookings.SiteVisit
- id, booking (FK→Booking), project (FK→Project, nullable)
- address, visit_date, visit_time, status, notes, feedback

### quotations.Quotation
- id, user (FK→User), service (FK→Service, nullable)
- project_type, budget_range, area_sqft, floors, rooms
- requirements, documents (JSON), images (JSON)
- status (draft/submitted/reviewed/approved/rejected)
- estimated_cost_min, estimated_cost_max
- admin_notes, pdf_file
- created_at, updated_at

### quotations.QuotationItem
- id, quotation (FK→Quotation), name, description, quantity, unit, unit_price, total

### leads.Lead
- id, name, email, phone, source (website/whatsapp/referral/ads/direct)
- service_interest, budget_range, location, message
- status (new/contacted/qualified/proposal/negotiation/won/lost)
- assigned_to (FK→User, nullable), score
- notes, next_follow_up, created_at, updated_at

### leads.LeadNote
- id, lead (FK→Lead), user (FK→User), note, created_at

### leads.LeadFollowUp
- id, lead (FK→Lead), user (FK→User), follow_up_date, type, notes, completed

### blog.BlogCategory
- id, name, slug, description

### blog.BlogTag
- id, name, slug

### blog.BlogPost
- id, author (FK→User), category (FK→BlogCategory), tags (M2M→BlogTag)
- title, slug, excerpt, content, featured_image
- is_published, is_featured, published_at
- meta_title, meta_description, meta_keywords
- views_count, reading_time
- created_at, updated_at

### testimonials.Testimonial
- id, client_name, client_photo, designation, company
- content, rating (1-5), video_url, project (FK→Project, nullable)
- is_featured, is_active, created_at

### payments.Payment
- id, user (FK→User), booking (FK→Booking, nullable), quotation (FK→Quotation, nullable)
- amount, currency, payment_method, transaction_id
- status (pending/completed/failed/refunded)
- invoice_number, invoice_pdf, gst_amount, gst_percentage
- created_at, updated_at

### notifications.Notification
- id, user (FK→User), title, message, type (email/sms/push/whatsapp)
- is_read, link, created_at

### analytics.AnalyticsEvent
- id, user (FK→User, nullable), event_type, event_data (JSON)
- page_url, referrer, ip_address, user_agent, created_at

### chatbot.ChatMessage
- id, session_id, user (FK→User, nullable), message, response
- message_type (user/bot), created_at

### core.ContactQuery
- id, name, email, phone, subject, message, source_page
- is_resolved, created_at

### core.FAQ
- id, question, answer, category, sort_order, is_active

### core.TeamMember
- id, name, designation, photo, bio, experience
- specializations (JSON), social_links (JSON), sort_order

### core.CompanyInfo
- id, name, tagline, description, logo, address, phone, email
- whatsapp_number, social_links (JSON), stats (JSON)