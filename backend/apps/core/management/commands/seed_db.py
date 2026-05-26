"""Seed the database with sample data for BuildRanchi Pro."""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.core.models import CompanyInfo, FAQ, TeamMember
from apps.services.models import ServiceCategory, Service, ServiceFAQ
from apps.projects.models import ProjectCategory, Project
from apps.testimonials.models import Testimonial
from apps.blog.models import BlogCategory, BlogTag, BlogPost
from apps.leads.models import SalesStage

User = get_user_model()


class Command(BaseCommand):
    help = 'Seed the database with initial data for BuildRanchi Pro'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...\n')

        # Create superuser
        if not User.objects.filter(email='admin@buildranchi.com').exists():
            admin = User.objects.create_superuser(
                username='admin',
                email='admin@buildranchi.com',
                password='admin123456',
                first_name='Admin',
                last_name='BuildRanchi',
                role='admin',
                is_verified=True,
                phone='+91 98765 43210',
                city='Ranchi',
                state='Jharkhand',
            )
            self.stdout.write('  ✓ Admin user created (admin@buildranchi.com / admin123456)')

        # Create demo customer
        if not User.objects.filter(email='customer@example.com').exists():
            User.objects.create_user(
                username='customer1',
                email='customer@example.com',
                password='customer123',
                first_name='Rahul',
                last_name='Sharma',
                role='customer',
                phone='+91 99999 88888',
                city='Ranchi',
            )
            self.stdout.write('  ✓ Demo customer created')

        # Create demo engineer
        if not User.objects.filter(email='engineer@example.com').exists():
            eng = User.objects.create_user(
                username='engineer1',
                email='engineer@example.com',
                password='engineer123',
                first_name='Amit',
                last_name='Kumar',
                role='engineer',
                phone='+91 88888 77777',
                city='Ranchi',
            )
            from apps.accounts.models import EngineerProfile
            EngineerProfile.objects.create(
                user=eng, specialization='Structural Engineering',
                experience_years=12, projects_completed=85,
                rating=4.80, bio='Senior structural engineer with 12+ years of experience.',
                availability=True,
            )
            self.stdout.write('  ✓ Demo engineer created')

        # Company Info
        CompanyInfo.objects.get_or_create(
            defaults={
                'tagline': 'Building Dreams, Constructing Reality',
                'description': 'BuildRanchi Pro is the premier construction and real estate company in Ranchi, Jharkhand. We specialize in residential, commercial, and turnkey construction projects with over 15 years of experience serving the region.',
                'address': 'Main Road, Near Firayalal Chowk, Ranchi, Jharkhand 834001, India',
                'phone': '+91 98765 43210',
                'email': 'info@buildranchi.com',
                'whatsapp_number': '919876543210',
                'social_links': {
                    'facebook': 'https://facebook.com/buildranchi',
                    'instagram': 'https://instagram.com/buildranchi',
                    'youtube': 'https://youtube.com/@buildranchi',
                    'linkedin': 'https://linkedin.com/company/buildranchi',
                },
                'stats': {
                    'projects_completed': 500,
                    'happy_clients': 450,
                    'years_experience': 15,
                    'engineers': 35,
                },
            }
        )
        self.stdout.write('  ✓ Company info created')

        # Service Categories
        categories_data = [
            ('Residential Construction', 'residential-construction', '🏠', 'Complete residential construction solutions in Ranchi'),
            ('Commercial Construction', 'commercial-construction', '🏢', 'Commercial building construction and development'),
            ('Interior Design', 'interior-design', '🎨', 'Premium interior design and decoration services'),
            ('Renovation', 'renovation', '🔧', 'Home and building renovation services'),
            ('Architecture Planning', 'architecture-planning', '📐', 'Architectural design and planning services'),
            ('Turnkey Projects', 'turnkey-projects', '🏗️', 'Complete turnkey construction solutions'),
            ('Villa Construction', 'villa-construction', '🏡', 'Luxury villa construction in Ranchi'),
            ('Building Planning', 'building-planning', '📋', 'Building approval and planning consultancy'),
        ]
        for name, slug, icon, desc in categories_data:
            ServiceCategory.objects.get_or_create(slug=slug, defaults={'name': name, 'icon': icon, 'description': desc})
        self.stdout.write('  ✓ Service categories created')

        # Services
        services_data = [
            {
                'name': 'Residential Construction', 'slug': 'residential-construction',
                'short_description': 'Build your dream home with expert construction services in Ranchi.',
                'description': '<h3>Premium Residential Construction in Ranchi</h3><p>We build beautiful, durable homes that stand the test of time. Our residential construction services cover everything from foundation to finishing, ensuring quality at every step.</p><ul><li>Individual Houses</li><li>Row Houses</li><li>Apartments</li><li>Duplex Homes</li><li>Farm Houses</li></ul>',
                'price_range_min': 1800, 'price_range_max': 2500,
                'features': ['Foundation & Structure', 'Plumbing & Electrical', 'Flooring & Tiling', 'Painting & Finishing', 'Kitchen & Bathroom', 'Landscaping'],
                'process_steps': [{'step': 1, 'title': 'Consultation', 'description': 'Discuss your requirements and budget'}, {'step': 2, 'title': 'Design', 'description': 'Create architectural plans and 3D designs'}, {'step': 3, 'title': 'Approval', 'description': 'Get building approvals and permits'}, {'step': 4, 'title': 'Construction', 'description': 'Begin construction with regular updates'}, {'step': 5, 'title': 'Handover', 'description': 'Final inspection and project handover'}],
                'is_featured': True,
            },
            {
                'name': 'Commercial Construction', 'slug': 'commercial-construction',
                'short_description': 'Professional commercial building construction services.',
                'description': '<h3>Commercial Construction Solutions</h3><p>From office buildings to shopping complexes, we deliver commercial construction projects that meet the highest standards of quality and safety.</p>',
                'price_range_min': 2200, 'price_range_max': 3500,
                'features': ['Office Buildings', 'Shopping Complexes', 'Warehouses', 'Hotels & Resorts', 'Hospitals', 'Educational Institutions'],
                'process_steps': [{'step': 1, 'title': 'Site Analysis', 'description': 'Evaluate the construction site'}, {'step': 2, 'title': 'Planning', 'description': 'Detailed project planning and scheduling'}, {'step': 3, 'title': 'Construction', 'description': 'Execute construction with quality control'}, {'step': 4, 'title': 'Completion', 'description': 'Final touches and handover'}],
                'is_featured': True,
            },
            {
                'name': 'Interior Design', 'slug': 'interior-design',
                'short_description': 'Transform your spaces with our premium interior design services.',
                'description': '<h3>Luxury Interior Design</h3><p>Our expert interior designers create stunning spaces that reflect your personality and lifestyle.</p>',
                'price_range_min': 800, 'price_range_max': 3000,
                'features': ['Living Room Design', 'Bedroom Design', 'Kitchen Design', 'Bathroom Design', 'Office Interior', 'False Ceiling', 'Modular Kitchen', 'Wardrobe Design'],
                'process_steps': [{'step': 1, 'title': 'Design Consultation', 'description': 'Understand your style and preferences'}, {'step': 2, 'title': '3D Visualization', 'description': 'Create realistic 3D renders of your space'}, {'step': 3, 'title': 'Material Selection', 'description': 'Choose premium materials and finishes'}, {'step': 4, 'title': 'Execution', 'description': 'Professional installation and setup'}],
                'is_featured': True,
            },
            {
                'name': 'Villa Construction', 'slug': 'villa-construction',
                'short_description': 'Luxury villa construction with world-class amenities.',
                'description': '<h3>Luxury Villa Construction</h3><p>Build your dream villa with premium materials, modern design, and world-class amenities in the heart of Jharkhand.</p>',
                'price_range_min': 2500, 'price_range_max': 5000,
                'features': ['Swimming Pool', 'Landscaped Garden', 'Smart Home', 'Home Theater', 'Gymnasium', 'Modular Kitchen'],
                'process_steps': [{'step': 1, 'title': 'Concept Design', 'description': 'Create villa concept and layout'}, {'step': 2, 'title': 'Detailed Planning', 'description': 'Architectural drawings and 3D models'}, {'step': 3, 'title': 'Construction', 'description': 'Premium construction with quality materials'}, {'step': 4, 'title': 'Interior & Landscaping', 'description': 'Interior finishing and outdoor landscaping'}, {'step': 5, 'title': 'Handover', 'description': 'Final walkthrough and handover'}],
                'is_featured': True,
            },
            {
                'name': 'Renovation', 'slug': 'renovation',
                'short_description': 'Complete home renovation and remodeling services.',
                'description': '<h3>Home Renovation Services</h3><p>Transform your existing home with our comprehensive renovation services. From kitchen remodeling to complete home makeovers.</p>',
                'price_range_min': 500, 'price_range_max': 2000,
                'features': ['Kitchen Renovation', 'Bathroom Renovation', 'Floor Replacement', 'Wall Renovation', 'Electrical Upgrades', 'Plumbing Updates'],
                'process_steps': [{'step': 1, 'title': 'Assessment', 'description': 'Evaluate current condition'}, {'step': 2, 'title': 'Design', 'description': 'Create renovation plans'}, {'step': 3, 'title': 'Renovation', 'description': 'Execute renovation work'}, {'step': 4, 'title': 'Completion', 'description': 'Final inspection and cleanup'}],
            },
            {
                'name': 'Architecture Planning', 'slug': 'architecture-planning',
                'short_description': 'Expert architectural design and planning services.',
                'description': '<h3>Architecture & Planning</h3><p>Our experienced architects create innovative designs that maximize space, natural light, and aesthetic appeal.</p>',
                'price_range_min': 30, 'price_range_max': 80,
                'price_unit': 'per sq.ft. (design only)',
                'features': ['Floor Plans', '3D Elevation', 'Structural Design', 'Vastu Compliant', 'Green Building', 'MEP Design'],
                'process_steps': [{'step': 1, 'title': 'Requirements', 'description': 'Gather detailed requirements'}, {'step': 2, 'title': 'Concept', 'description': 'Create initial concept designs'}, {'step': 3, 'title': 'Development', 'description': 'Develop detailed architectural drawings'}, {'step': 4, 'title': 'Approval', 'description': 'Get necessary building approvals'}],
            },
            {
                'name': 'Turnkey Projects', 'slug': 'turnkey-projects',
                'short_description': 'Complete turnkey construction from design to handover.',
                'description': '<h3>Turnkey Construction Solutions</h3><p>One-stop solution for all your construction needs. We handle everything from design to final handover.</p>',
                'price_range_min': 2000, 'price_range_max': 4000,
                'features': ['Design to Handover', 'Fixed Timeline', 'Budget Guarantee', 'Quality Assurance', 'Regular Updates', 'Post-Construction Support'],
                'process_steps': [{'step': 1, 'title': 'Project Scope', 'description': 'Define complete project scope and budget'}, {'step': 2, 'title': 'Design & Approval', 'description': 'Complete design and government approvals'}, {'step': 3, 'title': 'Construction', 'description': 'Full construction with project management'}, {'step': 4, 'title': 'Interior & Finishing', 'description': 'Complete interior work and finishing'}, {'step': 5, 'title': 'Handover', 'description': 'Final walkthrough and project handover'}],
            },
            {
                'name': 'Building Planning & Approvals', 'slug': 'building-planning',
                'short_description': 'Building approval and planning consultancy services.',
                'description': '<h3>Building Approvals & Planning</h3><p>Navigate the complex process of building approvals with our expert consultancy services. We handle all paperwork and government liaisons.</p>',
                'price_range_min': 50000, 'price_range_max': 200000,
                'price_unit': 'per project',
                'features': ['Building Plan Approval', 'Municipal Approvals', 'Environmental Clearance', 'Fire Safety NOC', 'Completion Certificate', 'Occupancy Certificate'],
                'process_steps': [{'step': 1, 'title': 'Documentation', 'description': 'Prepare all required documents'}, {'step': 2, 'title': 'Submission', 'description': 'Submit plans to authorities'}, {'step': 3, 'title': 'Follow-up', 'description': 'Regular follow-up with departments'}, {'step': 4, 'title': 'Approval', 'description': 'Obtain final approval certificates'}],
            },
        ]
        for svc_data in services_data:
            cat = ServiceCategory.objects.filter(slug=svc_data['slug']).first()
            Service.objects.get_or_create(
                slug=svc_data['slug'],
                defaults={
                    **svc_data,
                    'category': cat,
                    'meta_title': f"{svc_data['name']} in Ranchi | BuildRanchi Pro",
                    'meta_description': svc_data['short_description'],
                }
            )
        self.stdout.write('  ✓ Services created')

        # Project Categories
        proj_cats = [
            ('Residential', 'residential'),
            ('Commercial', 'commercial'),
            ('Villa', 'villa'),
            ('Renovation', 'renovation'),
            ('Interior', 'interior'),
        ]
        for name, slug in proj_cats:
            ProjectCategory.objects.get_or_create(slug=slug, defaults={'name': name})
        self.stdout.write('  ✓ Project categories created')

        # Sample Projects
        admin = User.objects.get(email='admin@buildranchi.com')
        engineer_user = User.objects.filter(role='engineer').first()
        projects_data = [
            {'title': 'Luxury Villa in Morabadi', 'slug': 'luxury-villa-morabadi', 'category': 'villa', 'location': 'Morabadi, Ranchi', 'area_sqft': 3500, 'budget_range': '₹80L - ₹1.2Cr', 'status': 'completed', 'completion': 100, 'is_featured': True, 'description': 'A stunning 4BHK luxury villa with swimming pool, landscaped garden, and smart home features.'},
            {'title': 'Modern Apartment Complex - Bariatu', 'slug': 'modern-apartment-bariatu', 'category': 'residential', 'location': 'Bariatu, Ranchi', 'area_sqft': 12000, 'budget_range': '₹3Cr - ₹4Cr', 'status': 'completed', 'completion': 100, 'is_featured': True, 'description': 'A modern 24-unit apartment complex with amenities including parking, garden, and community hall.'},
            {'title': 'Corporate Office Building - Lalpur', 'slug': 'corporate-office-lalpur', 'category': 'commercial', 'location': 'Lalpur, Ranchi', 'area_sqft': 8000, 'budget_range': '₹2Cr - ₹3Cr', 'status': 'ongoing', 'completion': 65, 'is_featured': True, 'description': 'A state-of-the-art 5-story corporate office building with modern facilities and green building features.'},
            {'title': 'Heritage Home Renovation - Doranda', 'slug': 'heritage-home-renovation-doranda', 'category': 'renovation', 'location': 'Doranda, Ranchi', 'area_sqft': 2500, 'budget_range': '₹25L - ₹40L', 'status': 'completed', 'completion': 100, 'description': 'Complete renovation of a heritage-style home, preserving its character while modernizing amenities.'},
            {'title': 'Shopping Complex - Main Road', 'slug': 'shopping-complex-main-road', 'category': 'commercial', 'location': 'Main Road, Ranchi', 'area_sqft': 15000, 'budget_range': '₹5Cr - ₹7Cr', 'status': 'ongoing', 'completion': 40, 'description': 'A modern shopping complex with retail stores, food court, and multiplex cinema.'},
            {'title': 'Premium 3BHK Flat - Harmu', 'slug': 'premium-3bhk-harmu', 'category': 'residential', 'location': 'Harmu, Ranchi', 'area_sqft': 1800, 'budget_range': '₹35L - ₹50L', 'status': 'completed', 'completion': 100, 'description': 'A beautifully designed 3BHK flat with modular kitchen, premium flooring, and modern fittings.'},
            {'title': 'Farmhouse Project - Kanke', 'slug': 'farmhouse-kanke', 'category': 'villa', 'location': 'Kanke, Ranchi', 'area_sqft': 5000, 'budget_range': '₹1Cr - ₹1.5Cr', 'status': 'ongoing', 'completion': 55, 'is_featured': True, 'description': 'A luxurious farmhouse with organic garden, swimming pool, and outdoor entertainment area.'},
            {'title': 'Hospital Building - Booty More', 'slug': 'hospital-building-booty', 'category': 'commercial', 'location': 'Booty More, Ranchi', 'area_sqft': 20000, 'budget_range': '₹8Cr - ₹12Cr', 'status': 'planning', 'completion': 10, 'description': 'A 100-bed multi-specialty hospital with modern medical facilities and helipad.'},
        ]
        for proj_data in projects_data:
            cat = ProjectCategory.objects.filter(slug=proj_data.pop('category')).first()
            completion = proj_data.pop('completion')
            Project.objects.get_or_create(
                slug=proj_data['slug'],
                defaults={**proj_data, 'category': cat, 'client': admin, 'engineer': engineer_user,
                          'completion_percentage': completion, 'city': 'Ranchi', 'state': 'Jharkhand'}
            )
        self.stdout.write('  ✓ Sample projects created')

        # FAQs
        faqs = [
            ('What is the cost of construction in Ranchi?', 'The cost of construction in Ranchi varies from ₹1,500 to ₹5,000 per sq.ft. depending on the quality of materials, design complexity, and project type. Basic construction starts at ₹1,500/sq.ft., standard at ₹1,800-2,500/sq.ft., and premium/luxury at ₹2,500-5,000/sq.ft.', 'pricing'),
            ('How long does it take to build a house in Ranchi?', 'A standard 1,500 sq.ft. house typically takes 8-12 months for construction. This includes 1-2 months for planning and approvals, and 6-10 months for actual construction. Larger or more complex projects may take longer.', 'general'),
            ('Do you handle building approvals?', 'Yes, we handle all types of building approvals including municipal approvals, environmental clearance, fire safety NOC, and completion certificates. Our team manages the entire process for you.', 'services'),
            ('What materials do you use?', 'We use only premium quality materials from trusted brands including Tata Steel, ACC Cement, Ultratech, and more. All materials are tested and certified as per Indian standards.', 'construction'),
            ('Do you provide warranties?', 'Yes, we provide a 10-year structural warranty and a 2-year warranty for finishing work including plumbing, electrical, and painting.', 'general'),
            ('Can I visit ongoing projects?', 'Absolutely! We encourage site visits. You can book a site visit through our website or call us to schedule one. We provide regular progress updates with photos and videos.', 'booking'),
        ]
        for q, a, cat in faqs:
            FAQ.objects.get_or_create(question=q, defaults={'answer': a, 'category': cat})
        self.stdout.write('  ✓ FAQs created')

        # Team Members
        team_data = [
            ('Rajesh Kumar Singh', 'Founder & CEO', '25+ years of experience in construction industry. Visionary leader behind BuildRanchi Pro.', 25, ['Project Management', 'Business Strategy']),
            ('Priya Sharma', 'Chief Architect', 'Award-winning architect with expertise in sustainable and modern design.', 18, ['Architecture', 'Sustainable Design', '3D Modeling']),
            ('Vikram Mehta', 'Head of Construction', 'Expert in structural engineering with 20+ years in large-scale construction.', 20, ['Structural Engineering', 'Quality Control']),
            ('Sunita Devi', 'Interior Design Lead', 'Specializes in luxury residential and commercial interior design.', 15, ['Interior Design', 'Space Planning']),
            ('Arun Thakur', 'Project Manager', 'PMP certified project manager ensuring timely delivery of all projects.', 12, ['Project Management', 'Agile Methodology']),
        ]
        for i, (name, designation, bio, exp, specs) in enumerate(team_data):
            TeamMember.objects.get_or_create(
                name=name, defaults={
                    'designation': designation, 'bio': bio, 'experience': exp,
                    'specializations': specs, 'sort_order': i,
                    'social_links': {'linkedin': '#'},
                }
            )
        self.stdout.write('  ✓ Team members created')

        # Testimonials
        testimonials = [
            ('Sanjay Gupta', 'Business Owner', 'BuildRanchi Pro built our dream home in Morabadi. The quality of construction is outstanding and they delivered on time. Highly recommended!', 5, True),
            ('Meena Devi', 'Retired Teacher', 'We got our house renovated by BuildRanchi Pro and the transformation is incredible. Their attention to detail is remarkable.', 5, True),
            ('Dr. Rakesh Oraon', 'Doctor', 'From design to completion, the entire experience was seamless. The team was professional and communicative throughout.', 5, True),
            ('Neha Kumari', 'IT Professional', 'We chose BuildRanchi Pro for our commercial office space and they exceeded our expectations. The modern design is exactly what we wanted.', 4, False),
            ('Arun Mahato', 'Industrialist', 'The villa construction project was handled with utmost professionalism. The finishing quality is premium and the project was delivered within budget.', 5, True),
        ]
        for name, designation, content, rating, featured in testimonials:
            Testimonial.objects.get_or_create(
                client_name=name, defaults={
                    'designation': designation, 'content': content,
                    'rating': rating, 'is_featured': featured,
                }
            )
        self.stdout.write('  ✓ Testimonials created')

        # Blog Categories & Posts
        blog_cats = [
            ('Construction Tips', 'construction-tips'),
            ('Design Ideas', 'design-ideas'),
            ('Real Estate', 'real-estate'),
            ('Industry News', 'industry-news'),
            ('Ranchi Updates', 'ranchi-updates'),
        ]
        for name, slug in blog_cats:
            BlogCategory.objects.get_or_create(slug=slug, defaults={'name': name})

        blog_tags = ['construction', 'ranchi', 'interior-design', 'architecture', 'renovation', 'villa', 'cost-estimation', 'building-tips']
        for tag in blog_tags:
            BlogTag.objects.get_or_create(slug=tag, defaults={'name': tag.replace('-', ' ').title()})

        posts_data = [
            {
                'title': 'Top 10 Construction Tips for Building Your Dream Home in Ranchi',
                'slug': 'top-10-construction-tips-ranchi',
                'excerpt': 'Essential tips for anyone planning to build a home in Ranchi, Jharkhand.',
                'content': '<h3>Building Your Dream Home in Ranchi</h3><p>Building a home is one of the biggest investments you will make. Here are our top 10 tips to ensure a smooth construction process in Ranchi:</p><ol><li><strong>Choose the Right Location</strong> - Consider proximity to schools, hospitals, and markets.</li><li><strong>Plan Your Budget</strong> - Include a 10-15% contingency buffer.</li><li><strong>Hire Experienced Professionals</strong> - Work with licensed architects and contractors.</li><li><strong>Get Proper Approvals</strong> - Ensure all building permits are in place.</li><li><strong>Focus on Foundation</strong> - A strong foundation is crucial for Ranchi\'s soil conditions.</li><li><strong>Choose Quality Materials</strong> - Opt for branded cement, steel, and fixtures.</li><li><strong>Plan for Natural Light</strong> - Maximize windows for energy efficiency.</li><li><strong>Consider Vastu</strong> - Many homeowners in Ranchi prefer Vastu-compliant designs.</li><li><strong>Regular Site Visits</strong> - Monitor progress regularly.</li><li><strong>Document Everything</strong> - Keep records of all expenses and changes.</li></ol>',
                'category_slug': 'construction-tips',
                'is_featured': True,
            },
            {
                'title': 'Construction Cost in Ranchi 2025: Complete Guide',
                'slug': 'construction-cost-ranchi-2025',
                'excerpt': 'A detailed breakdown of construction costs in Ranchi, Jharkhand for 2025.',
                'content': '<h3>Construction Cost Guide for Ranchi 2025</h3><p>Understanding construction costs is essential for budgeting your dream project. Here is a comprehensive breakdown:</p><h4>Cost Per Sq.Ft. (Basic to Premium)</h4><ul><li>Basic Construction: ₹1,500 - ₹1,800/sq.ft.</li><li>Standard Construction: ₹1,800 - ₹2,500/sq.ft.</li><li>Premium Construction: ₹2,500 - ₹3,500/sq.ft.</li><li>Luxury Construction: ₹3,500 - ₹5,000/sq.ft.</li></ul><h4>Cost Breakdown</h4><ul><li>Foundation & Structure: 35-40%</li><li>Finishing (Flooring, Painting): 20-25%</li><li>Plumbing & Electrical: 10-15%</li><li>Doors, Windows & Fixtures: 10-15%</li><li>Labor: 15-20%</li></ul>',
                'category_slug': 'real-estate',
                'is_featured': True,
            },
            {
                'title': 'Modern Interior Design Trends for Indian Homes',
                'slug': 'modern-interior-design-trends-india',
                'excerpt': 'Explore the latest interior design trends transforming Indian homes in 2025.',
                'content': '<h3>Interior Design Trends 2025</h3><p>Indian homes are embracing a beautiful blend of traditional and modern design elements. Here are the top trends:</p><ul><li><strong>Minimalist Design</strong> - Clean lines and clutter-free spaces.</li><li><strong>Sustainable Materials</strong> - Eco-friendly and locally sourced materials.</li><li><strong>Smart Home Integration</strong> - Automated lighting, security, and climate control.</li><li><strong>Biophilic Design</strong> - Indoor plants and natural elements.</li><li><strong>Multifunctional Spaces</strong> - Rooms that serve multiple purposes.</li></ul>',
                'category_slug': 'design-ideas',
            },
        ]
        for post_data in posts_data:
            cat = BlogCategory.objects.filter(slug=post_data.pop('category_slug')).first()
            BlogPost.objects.get_or_create(
                slug=post_data['slug'],
                defaults={
                    **post_data,
                    'category': cat,
                    'author': admin,
                    'is_published': True,
                    'meta_title': post_data['title'],
                    'meta_description': post_data['excerpt'],
                }
            )
        self.stdout.write('  ✓ Blog posts created')

        # Sales Stages
        stages = [
            ('New Lead', 'new', 1, '#3B82F6'),
            ('Contacted', 'contacted', 2, '#F59E0B'),
            ('Qualified', 'qualified', 3, '#10B981'),
            ('Proposal Sent', 'proposal', 4, '#8B5CF6'),
            ('Negotiation', 'negotiation', 5, '#EF4444'),
            ('Won', 'won', 6, '#059669'),
            ('Lost', 'lost', 7, '#6B7280'),
        ]
        for name, slug, order, color in stages:
            SalesStage.objects.get_or_create(slug=slug, defaults={'name': name, 'sort_order': order, 'color': color})
        self.stdout.write('  ✓ Sales stages created')

        # Update CORS for preview URL
        from django.conf import settings
        preview_url = os.getenv('SITE_URL', '')
        if preview_url:
            cors_origins = list(settings.CORS_ALLOWED_ORIGINS)
            if preview_url not in cors_origins:
                cors_origins.append(preview_url)
                settings.CORS_ALLOWED_ORIGINS = cors_origins

        self.stdout.write(self.style.SUCCESS('\n✅ Database seeded successfully!'))