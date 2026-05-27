import { motion } from 'framer-motion';
import { FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SECTION_CLS = 'mb-10';
const HEADING_CLS = 'text-xl font-display font-bold text-white mb-3';
const BODY_CLS = 'text-dark-300 text-sm leading-relaxed space-y-3';
const LIST_CLS = 'list-disc list-inside text-dark-300 text-sm leading-relaxed space-y-1 ml-2';

export default function PrivacyPolicy() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <FaShieldAlt className="text-gold-500 text-4xl mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">Privacy Policy</h1>
            <p className="text-dark-400 mt-3">Effective Date: January 1, 2025 &nbsp;|&nbsp; Last Updated: May 27, 2025</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4">

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>1. Introduction</h2>
            <div className={BODY_CLS}>
              <p>BuildRanchi Pro ("we," "our," or "us") is a construction, real estate, and project management platform operated from Dhurva, Ranchi, Jharkhand, India. We are committed to protecting the privacy and personal data of every individual who interacts with our website, mobile applications, and offline services.</p>
              <p>This Privacy Policy describes how we collect, use, store, share, and safeguard your information when you visit <strong>buildranchipro.com</strong>, use our quotation tools, booking system, chatbot, or engage with our construction and consulting services in Ranchi and surrounding areas of Jharkhand.</p>
              <p>This policy is published in compliance with the <strong>Information Technology Act, 2000</strong>, the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>, and the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> of India.</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>2. Information We Collect</h2>
            <div className={BODY_CLS}>
              <p><strong>2.1 Information You Provide Directly</strong></p>
              <ul className={LIST_CLS}>
                <li><strong>Identity Data:</strong> Full name, date of birth, government-issued ID (Aadhaar, PAN, Voter ID) — collected only when required for property registration, labour compliance, or RERA documentation.</li>
                <li><strong>Contact Data:</strong> Phone number, email address, postal address, WhatsApp number.</li>
                <li><strong>Project Data:</strong> Property location, land area, construction type, budget range, floor plans, blueprints, site photographs, and architectural drawings you upload through our quotation or booking forms.</li>
                <li><strong>Financial Data:</strong> Payment instrument details processed through Razorpay — we <strong>do not</strong> store card numbers, CVV, or UPI PINs on our servers.</li>
                <li><strong>Communication Data:</strong> Chat messages exchanged with our AI chatbot, emails, SMS, and WhatsApp messages related to your projects.</li>
                <li><strong>Feedback & Reviews:</strong> Testimonials, ratings, and reviews you choose to submit.</li>
              </ul>

              <p className="mt-4"><strong>2.2 Information Collected Automatically</strong></p>
              <ul className={LIST_CLS}>
                <li><strong>Device & Usage Data:</strong> IP address, browser type, operating system, screen resolution, pages visited, time spent on pages, click patterns, and referring URL.</li>
                <li><strong>Location Data:</strong> Approximate city-level location inferred from IP address for serving Ranchi-relevant content. We do not track GPS coordinates unless you explicitly grant permission through our mobile app.</li>
                <li><strong>Cookies & Local Storage:</strong> Session tokens for authentication, preference cookies for language/theme, and analytics cookies (see Section 7).</li>
              </ul>

              <p className="mt-4"><strong>2.3 Information from Third Parties</strong></p>
              <ul className={LIST_CLS}>
                <li>Payment gateways (Razorpay) — transaction confirmation and status.</li>
                <li>Google Maps API — location data for site visit bookings and project mapping.</li>
                <li>WhatsApp Business API — message delivery receipts and opt-in status.</li>
                <li>Government databases — RERA registration verification and municipal approval status (where legally permitted).</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>3. How We Use Your Information</h2>
            <div className={BODY_CLS}>
              <p>We process your personal data only for lawful, specific, and clearly communicated purposes:</p>
              <ul className={LIST_CLS}>
                <li>To provide construction cost estimates, project quotations, and booking confirmations.</li>
                <li>To match you with suitable engineers, architects, and contractors in the Ranchi region.</li>
                <li>To process payments through Razorpay and maintain GST-compliant financial records.</li>
                <li>To send project updates, milestone notifications, and completion reports via SMS, email, or WhatsApp.</li>
                <li>To respond to your inquiries through our chatbot, contact form, or customer support channels.</li>
                <li>To generate anonymous, aggregated analytics that help us improve our platform and services.</li>
                <li>To comply with legal obligations under Jharkhand Building Bye-Laws, RERA Jharkhand, GST regulations, and the Indian Contract Act, 1872.</li>
                <li>To detect, prevent, and address fraud, unauthorized access, and security threats.</li>
                <li>To send promotional communications about new services, offers, or projects — only with your prior opt-in consent, and always with a clear unsubscribe option.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>4. Legal Basis for Processing (DPDP Act, 2023)</h2>
            <div className={BODY_CLS}>
              <p>Under the Digital Personal Data Protection Act, 2023, we process your data based on:</p>
              <ul className={LIST_CLS}>
                <li><strong>Consent:</strong> When you voluntarily provide information through our forms, upload documents, or opt in to communications.</li>
                <li><strong>Legitimate Interest:</strong> To operate our platform securely, provide requested services, and improve user experience.</li>
                <li><strong>Legal Obligation:</strong> To comply with RERA, GST, labour laws, municipal regulations, and court orders applicable in Jharkhand.</li>
                <li><strong>Contractual Necessity:</strong> To fulfil construction agreements, consultation bookings, and project commitments you have entered into with us.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>5. Data Sharing & Disclosure</h2>
            <div className={BODY_CLS}>
              <p>We <strong>do not sell, rent, or trade</strong> your personal information to any third party for their independent marketing purposes. Your data is shared only in the following limited circumstances:</p>
              <ul className={LIST_CLS}>
                <li><strong>Service Providers:</strong> Razorpay (payments), WhatsApp Business API (messaging), Google Maps (location), and hosting providers — all contractually obligated to handle data securely.</li>
                <li><strong>Project Partners:</strong> Architects, structural engineers, and contractors assigned to your project — only the information strictly necessary for project execution (site address, floor plans, contact number).</li>
                <li><strong>Legal & Regulatory Bodies:</strong> RERA Jharkhand, Ranchi Municipal Corporation, GST authorities, courts, or law enforcement — when mandated by law, court order, or government directive.</li>
                <li><strong>Business Transfer:</strong> In the event of a merger, acquisition, or sale of assets, we will notify you via email before any transfer of personal data to a successor entity.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>6. Data Retention</h2>
            <div className={BODY_CLS}>
              <ul className={LIST_CLS}>
                <li><strong>Active project data:</strong> Retained for the duration of the project plus 7 years after completion, as required by GST audit and RERA compliance requirements.</li>
                <li><strong>Quotation & booking data:</strong> Retained for 3 years from the date of submission.</li>
                <li><strong>Marketing consent records:</strong> Retained until you withdraw consent, plus 2 years for audit purposes.</li>
                <li><strong>Chatbot conversations:</strong> Automatically anonymized after 12 months.</li>
                <li><strong>Account data:</strong> If you request account deletion, your personal data is purged within 30 days, except where retention is required by law.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>7. Cookies & Tracking Technologies</h2>
            <div className={BODY_CLS}>
              <p>Our website uses the following types of cookies:</p>
              <ul className={LIST_CLS}>
                <li><strong>Essential Cookies:</strong> Session authentication, CSRF protection, and load balancing — these cannot be disabled.</li>
                <li><strong>Functional Cookies:</strong> Language preference, theme preference, and recently viewed projects.</li>
                <li><strong>Analytics Cookies:</strong> We use privacy-respecting analytics to understand traffic patterns. No personally identifiable data is shared with analytics providers.</li>
              </ul>
              <p>You may manage cookie preferences through your browser settings. Disabling essential cookies may affect the functionality of our quotation and booking tools.</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>8. Data Security Measures</h2>
            <div className={BODY_CLS}>
              <p>We implement industry-standard security practices to protect your data:</p>
              <ul className={LIST_CLS}>
                <li>All data in transit is encrypted using TLS 1.3.</li>
                <li>Passwords are hashed using bcrypt — we never store plaintext passwords.</li>
                <li>JWT tokens with short-lived access tokens (15 minutes) and secure refresh tokens.</li>
                <li>Database access restricted to authenticated API endpoints — no direct public database access.</li>
                <li>File uploads (blueprints, documents) are stored in isolated, access-controlled storage.</li>
                <li>Regular security audits, vulnerability scanning, and access log monitoring.</li>
                <li>Employee access to personal data is restricted on a need-to-know basis with audit trails.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>9. Your Rights Under Indian Law</h2>
            <div className={BODY_CLS}>
              <p>Under the DPDP Act, 2023 and IT Act Rules, you have the right to:</p>
              <ul className={LIST_CLS}>
                <li><strong>Access:</strong> Request a copy of all personal data we hold about you.</li>
                <li><strong>Correction:</strong> Update or correct inaccurate personal information at any time through your account dashboard.</li>
                <li><strong>Erasure:</strong> Request deletion of your data, subject to legal retention requirements.</li>
                <li><strong>Data Portability:</strong> Receive your data in a machine-readable format.</li>
                <li><strong>Withdraw Consent:</strong> Opt out of marketing communications at any time via email, WhatsApp reply, or account settings.</li>
                <li><strong>Grievance Redressal:</strong> File a complaint with our Data Protection Officer or with the Data Protection Board of India.</li>
              </ul>
              <p>To exercise any of these rights, contact our Data Protection Officer at <strong>paikpawan18@gmail.com</strong> or write to us at <strong>Dhurva, Ranchi, Jharkhand 834009</strong>.</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>10. Children's Privacy</h2>
            <div className={BODY_CLS}>
              <p>Our services are not directed at individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that we have inadvertently collected data from a person under 18, we will promptly delete it. Parents or guardians who believe their child has provided personal information to us may contact us at <strong>paikpawan18@gmail.com</strong>.</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>11. Third-Party Links</h2>
            <div className={BODY_CLS}>
              <p>Our website may contain links to external websites such as government portals (RERA Jharkhand, Ranchi Municipal Corporation), payment partners (Razorpay), and social media platforms. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>12. International Users</h2>
            <div className={BODY_CLS}>
              <p>Our primary operations and data processing occur within India. If you access our website from outside India, please be aware that your data will be transferred to and processed on servers located in India. By using our services, you consent to this transfer. We ensure that any cross-border data transfer complies with the DPDP Act, 2023.</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>13. Changes to This Policy</h2>
            <div className={BODY_CLS}>
              <p>We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. We will notify you of significant changes by:</p>
              <ul className={LIST_CLS}>
                <li>Posting a prominent notice on our website homepage.</li>
                <li>Sending an email to registered users.</li>
                <li>Updating the "Last Updated" date at the top of this page.</li>
              </ul>
              <p>Continued use of our services after changes take effect constitutes acceptance of the revised policy.</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>14. Grievance Officer</h2>
            <div className={BODY_CLS}>
              <p>As required under Rule 11 of the IT (Reasonable Security Practices) Rules, 2011, our Grievance Officer can be contacted at:</p>
              <div className="mt-3 p-4 bg-dark-800 rounded-xl border border-dark-700 text-sm">
                <p className="text-white font-semibold">BuildRanchi Pro — Grievance Officer</p>
                <p className="text-dark-300 mt-1">Dhurva, Ranchi, Jharkhand 834009, India</p>
                <p className="text-dark-300">Email: <strong className="text-gold-400">paikpawan18@gmail.com</strong></p>
                <p className="text-dark-300">Phone: <strong className="text-gold-400">+91 7258021382</strong></p>
                <p className="text-dark-300 mt-1">Response time: Within 30 working days of receiving a complaint.</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-dark-700">
            <Link to="/terms" className="px-6 py-3 bg-dark-800 text-gold-400 rounded-xl font-bold hover:bg-dark-700 transition-colors border border-dark-700 text-center">
              Read Terms &amp; Conditions →
            </Link>
            <Link to="/contact" className="px-6 py-3 bg-dark-800 text-white rounded-xl font-bold hover:bg-dark-700 transition-colors border border-dark-700 text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}