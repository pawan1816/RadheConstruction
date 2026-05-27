import { motion } from 'framer-motion';
import { FaGavel } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SECTION_CLS = 'mb-10';
const HEADING_CLS = 'text-xl font-display font-bold text-white mb-3';
const BODY_CLS = 'text-dark-300 text-sm leading-relaxed space-y-3';
const LIST_CLS = 'list-disc list-inside text-dark-300 text-sm leading-relaxed space-y-1 ml-2';

export default function TermsConditions() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <FaGavel className="text-gold-500 text-4xl mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">Terms &amp; Conditions</h1>
            <p className="text-dark-400 mt-3">Effective Date: January 1, 2025 &nbsp;|&nbsp; Last Updated: May 27, 2025</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4">

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>1. Acceptance of Terms</h2>
            <div className={BODY_CLS}>
              <p>Welcome to BuildRanchi Pro. These Terms and Conditions ("Terms") govern your use of our website, mobile applications, and all related construction, real estate, and consulting services provided by BuildRanchi Pro, operating from Dhurva, Ranchi, Jharkhand 834009, India.</p>
              <p>By accessing our website, submitting a quotation request, booking a consultation, or engaging our construction services, you acknowledge that you have read, understood, and agree to be bound by these Terms along with our <Link to="/privacy" className="text-gold-400 underline">Privacy Policy</Link>.</p>
              <p>If you do not agree with any part of these Terms, you must discontinue use of our services immediately. These Terms constitute a legally binding agreement between you ("Customer," "Client," or "User") and BuildRanchi Pro ("Company," "we," "our," or "us").</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>2. Eligibility</h2>
            <div className={BODY_CLS}>
              <p>You must be at least 18 years of age and capable of entering into legally binding contracts under the Indian Contract Act, 1872 to use our services. If you are accessing the platform on behalf of a business entity, you represent and warrant that you have the authority to bind that entity to these Terms.</p>
              <p>Our services are primarily available to residents and property owners in Jharkhand, particularly Ranchi and surrounding districts. While users from other regions may browse the website, project execution is currently limited to Jharkhand.</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>3. Services Overview</h2>
            <div className={BODY_CLS}>
              <p>BuildRanchi Pro offers the following services in and around Ranchi, Jharkhand:</p>
              <ul className={LIST_CLS}>
                <li>Residential construction (houses, apartments, villas)</li>
                <li>Commercial construction (offices, shopping complexes, hospitals, schools)</li>
                <li>Interior design and renovation</li>
                <li>Architecture planning and building plan approvals</li>
                <li>Turnkey project management</li>
                <li>Construction cost estimation and quotation services</li>
                <li>Site visit scheduling and consultation booking</li>
                <li>Project progress monitoring through our digital platform</li>
              </ul>
              <p>All content, cost estimates, and quotations displayed on the website constitute an <strong>"invitation to offer"</strong> and do not constitute a binding contract. A legally binding agreement is formed only upon mutual execution of a construction contract or service agreement after personal consultation, site inspection, and payment of the agreed advance.</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>4. Quotations & Cost Estimates</h2>
            <div className={BODY_CLS}>
              <ul className={LIST_CLS}>
                <li><strong>Online estimates</strong> provided through our quotation form or AI cost estimator are indicative and preliminary. They are based on the information you provide and prevailing market rates for construction materials and labour in Ranchi.</li>
                <li><strong>Detailed quotations</strong> are prepared after a physical site inspection by our engineer and are valid for 30 days from the date of issue, unless otherwise stated.</li>
                <li>Material prices, labour costs, and government fees may fluctuate. BuildRanchi Pro reserves the right to revise quotations if there are significant changes in input costs, government taxes, or municipal charges.</li>
                <li>Any discrepancy between the online estimate and the final detailed quotation shall be resolved in favour of the detailed quotation after site inspection.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>5. Booking & Consultation</h2>
            <div className={BODY_CLS}>
              <ul className={LIST_CLS}>
                <li>Site visits and consultations can be booked through our website or by calling <strong>+91 7258021382</strong>.</li>
                <li>A confirmed booking requires mutual agreement on date, time, and location within the Ranchi metropolitan area.</li>
                <li>We offer the first consultation visit free of charge within Ranchi city limits. Visits to locations outside city limits may incur a nominal travel fee, which will be communicated before confirmation.</li>
                <li>Cancellations or rescheduling must be communicated at least 24 hours in advance. Repeated no-shows may result in future bookings requiring an advance fee.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>6. Construction Agreements</h2>
            <div className={BODY_CLS}>
              <p>Upon mutual agreement to proceed with a construction project, a separate <strong>Construction Agreement</strong> will be executed between you and BuildRanchi Pro. This agreement will detail:</p>
              <ul className={LIST_CLS}>
                <li>Scope of work, specifications, and materials to be used</li>
                <li>Project timeline with milestone-linked payment schedule</li>
                <li>Quality standards and warranty terms</li>
                <li>Change order process for any modifications to the original scope</li>
                <li>Dispute resolution mechanism specific to the project</li>
              </ul>
              <p>The Construction Agreement takes precedence over these general Terms &amp; Conditions for the specific project it covers.</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>7. Payments</h2>
            <div className={BODY_CLS}>
              <ul className={LIST_CLS}>
                <li>All payments are processed securely through <strong>Razorpay</strong> — a PCI-DSS compliant payment gateway. BuildRanchi Pro does not store your card number, CVV, or UPI PIN.</li>
                <li>Construction payments follow a milestone-based schedule as outlined in the Construction Agreement. Advance payments are required before commencement of work at each stage.</li>
                <li>GST at applicable rates (currently 18% for construction services) will be charged on all invoices. GST input credit, where applicable, will be passed on to the customer.</li>
                <li>Payment receipts and tax invoices will be provided within 7 business days of payment confirmation.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>8. Cancellation & Refund Policy</h2>
            <div className={BODY_CLS}>
              <p>We strive to deliver every project on time and to specification. However, we understand that circumstances may change. Our cancellation and refund policy is as follows:</p>

              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm border border-dark-700 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-dark-800">
                      <th className="text-left p-3 text-gold-400 font-semibold">Stage</th>
                      <th className="text-left p-3 text-gold-400 font-semibold">Cancellation Timing</th>
                      <th className="text-left p-3 text-gold-400 font-semibold">Refund</th>
                    </tr>
                  </thead>
                  <tbody className="text-dark-300">
                    <tr className="border-t border-dark-700">
                      <td className="p-3">Consultation / Site Visit</td>
                      <td className="p-3">Before site visit</td>
                      <td className="p-3">100% (if any advance was collected)</td>
                    </tr>
                    <tr className="border-t border-dark-700">
                      <td className="p-3">Design &amp; Planning Phase</td>
                      <td className="p-3">Within 7 days of advance payment</td>
                      <td className="p-3">Full refund minus design fees (₹5,000 or 5% of advance, whichever is higher)</td>
                    </tr>
                    <tr className="border-t border-dark-700">
                      <td className="p-3">Design &amp; Planning Phase</td>
                      <td className="p-3">After 7 days but before construction starts</td>
                      <td className="p-3">50% of advance payment</td>
                    </tr>
                    <tr className="border-t border-dark-700">
                      <td className="p-3">Construction Phase</td>
                      <td className="p-3">After construction has commenced</td>
                      <td className="p-3">No refund. Customer is liable for completed work and materials purchased.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-3">Refunds, when applicable, will be processed within 10–15 business days to the original payment method. No cash refunds will be made.</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>9. Intellectual Property</h2>
            <div className={BODY_CLS}>
              <ul className={LIST_CLS}>
                <li>All content on the BuildRanchi Pro website — including but not limited to text, graphics, logos, icons, images, photographs, floor plans, architectural designs, software code, and the overall look and feel — is the intellectual property of BuildRanchi Pro and is protected under the Indian Copyright Act, 1957.</li>
                <li>You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any content from our website without prior written consent.</li>
                <li>The "BuildRanchi Pro" name, logo, and tagline are trademarks of the Company. Unauthorized use is prohibited.</li>
                <li>Customer-submitted floor plans, blueprints, and photographs remain the intellectual property of the customer. By uploading them to our platform, you grant BuildRanchi Pro a limited, non-exclusive license to use them solely for the purpose of preparing your quotation and executing your project.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>10. User-Generated Content & Reviews</h2>
            <div className={BODY_CLS}>
              <ul className={LIST_CLS}>
                <li>When you submit reviews, testimonials, or feedback, you grant BuildRanchi Pro a non-exclusive, royalty-free, perpetual license to use, display, and distribute that content for marketing and promotional purposes.</li>
                <li>You represent that your reviews are truthful and based on genuine experience with our services.</li>
                <li>BuildRanchi Pro reserves the right to remove reviews that are defamatory, offensive, or factually inaccurate.</li>
                <li>Fabricated negative reviews or attempted reputational harm may result in legal action under applicable law.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>11. Project Timelines & Force Majeure</h2>
            <div className={BODY_CLS}>
              <ul className={LIST_CLS}>
                <li>Project timelines quoted are estimates based on normal working conditions and may be affected by weather (monsoon season in Jharkhand: June–September), availability of materials, labour conditions, and government approvals.</li>
                <li>BuildRanchi Pro is not liable for delays caused by <strong>force majeure</strong> events including but not limited to: natural disasters, floods, epidemics, government-imposed lockdowns, strikes, civil disturbances, or disruption in material supply chains.</li>
                <li>In the event of a force majeure delay, we will notify you promptly and revise the timeline accordingly.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>12. Quality Standards & Warranty</h2>
            <div className={BODY_CLS}>
              <ul className={LIST_CLS}>
                <li>All construction work is carried out in compliance with the National Building Code of India, IS (Indian Standard) codes, and Jharkhand Building Bye-Laws.</li>
                <li>We provide a <strong>5-year structural warranty</strong> from the date of project handover, covering defects in structural elements (foundation, columns, beams, slabs).</li>
                <li>A <strong>1-year workmanship warranty</strong> covers plumbing, electrical, finishing, and fixture-related issues.</li>
                <li>Warranty does not cover damage caused by natural calamities, misuse, unauthorized modifications, or normal wear and tear.</li>
                <li>Warranty claims must be submitted in writing to <strong>paikpawan18@gmail.com</strong> with photographic evidence.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>13. RERA Compliance</h2>
            <div className={BODY_CLS}>
              <p>Where applicable, our projects comply with the <strong>Real Estate (Regulation and Development) Act, 2016 (RERA)</strong> and the <strong>Jharkhand Real Estate Regulatory Authority</strong>. Applicable RERA registration numbers will be displayed on project-specific pages and documentation.</p>
              <p>Customers investing in RERA-registered projects are entitled to all protections provided under the Act, including dispute resolution through the Jharkhand RERA authority.</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>14. Limitation of Liability</h2>
            <div className={BODY_CLS}>
              <ul className={LIST_CLS}>
                <li>The website and its content are provided on an "as is" and "as available" basis. We do not warrant that the website will be uninterrupted, error-free, or free from viruses.</li>
                <li>Online cost estimates are indicative only and shall not be construed as a binding quote. BuildRanchi Pro shall not be held liable for decisions made solely based on online estimates.</li>
                <li>To the maximum extent permitted under Indian law, our total aggregate liability arising from any claim related to our services shall not exceed the total amount paid by you for the specific service in question.</li>
                <li>We shall not be liable for any indirect, incidental, special, or consequential damages, including loss of profits, revenue, or opportunity.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>15. Indemnification</h2>
            <div className={BODY_CLS}>
              <p>You agree to indemnify, defend, and hold harmless BuildRanchi Pro, its directors, employees, engineers, contractors, and agents from any claims, liabilities, losses, damages, costs (including legal fees), or expenses arising out of:</p>
              <ul className={LIST_CLS}>
                <li>Your breach of these Terms.</li>
                <li>Any misinformation or false details provided by you regarding property ownership, land titles, or building approvals.</li>
                <li>Your violation of any applicable law, including Jharkhand municipal regulations and environmental norms.</li>
                <li>Any third-party claim arising from content you submitted to our platform.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>16. Account & Security</h2>
            <div className={BODY_CLS}>
              <ul className={LIST_CLS}>
                <li>If you create an account on our platform, you are responsible for maintaining the confidentiality of your login credentials.</li>
                <li>You must notify us immediately at <strong>paikpawan18@gmail.com</strong> if you suspect unauthorized use of your account.</li>
                <li>BuildRanchi Pro shall not be liable for any loss or damage arising from unauthorized access to your account due to your failure to protect your credentials.</li>
                <li>We reserve the right to suspend accounts that violate these Terms or engage in fraudulent activity.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>17. Prohibited Activities</h2>
            <div className={BODY_CLS}>
              <p>You agree not to:</p>
              <ul className={LIST_CLS}>
                <li>Use our platform for any unlawful purpose or to violate any applicable law of India or the State of Jharkhand.</li>
                <li>Submit false quotation requests, fake bookings, or fraudulent enquiries.</li>
                <li>Attempt to gain unauthorized access to our systems, databases, or other users' accounts.</li>
                <li>Use automated tools (bots, scrapers) to extract data from our website without permission.</li>
                <li>Post or transmit content that is defamatory, obscene, threatening, or infringes on intellectual property rights.</li>
                <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
                <li>Interfere with or disrupt our services, servers, or networks.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>18. Modifications to Terms</h2>
            <div className={BODY_CLS}>
              <p>BuildRanchi Pro reserves the right to modify these Terms at any time. Changes will be communicated through:</p>
              <ul className={LIST_CLS}>
                <li>A prominent notice on our website.</li>
                <li>Email notification to registered users.</li>
                <li>An updated "Last Updated" date on this page.</li>
              </ul>
              <p>Continued use of our services after changes take effect constitutes acceptance of the revised Terms. If you disagree with the changes, you must stop using our services and, if applicable, request termination of your active contracts.</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>19. Termination</h2>
            <div className={BODY_CLS}>
              <p>Either party may terminate these Terms at any time:</p>
              <ul className={LIST_CLS}>
                <li><strong>By You:</strong> By discontinuing use of our website and services. Active construction projects will be governed by the separate Construction Agreement.</li>
                <li><strong>By Us:</strong> We may suspend or terminate your access to our platform immediately, without prior notice, if you breach these Terms or engage in conduct that is harmful to our business, reputation, or other users.</li>
              </ul>
              <p>Termination of these Terms does not affect any accrued rights, obligations, or ongoing Construction Agreements between the parties.</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>20. Governing Law & Dispute Resolution</h2>
            <div className={BODY_CLS}>
              <ul className={LIST_CLS}>
                <li>These Terms shall be governed by and construed in accordance with the laws of India.</li>
                <li>All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in <strong>Ranchi, Jharkhand</strong>.</li>
                <li>Before initiating litigation, both parties agree to attempt amicable resolution through good-faith negotiation for a period of 30 days.</li>
                <li>If negotiation fails, disputes shall be referred to arbitration in accordance with the <strong>Arbitration and Conciliation Act, 1996</strong>. The arbitration shall be conducted by a sole arbitrator appointed by mutual consent, and proceedings shall take place in Ranchi, Jharkhand.</li>
                <li>The arbitrator's award shall be final and binding on both parties.</li>
              </ul>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>21. Severability</h2>
            <div className={BODY_CLS}>
              <p>If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction in Ranchi, the remaining provisions shall continue in full force and effect. The invalid provision shall be replaced with a valid provision that most closely matches the intent of the original.</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>22. Entire Agreement</h2>
            <div className={BODY_CLS}>
              <p>These Terms, together with our <Link to="/privacy" className="text-gold-400 underline">Privacy Policy</Link> and any applicable Construction Agreement, constitute the entire agreement between you and BuildRanchi Pro. They supersede all prior communications, representations, or agreements, whether oral or written.</p>
            </div>
          </div>

          <div className={SECTION_CLS}>
            <h2 className={HEADING_CLS}>23. Contact Information</h2>
            <div className={BODY_CLS}>
              <p>For any questions, concerns, or grievances related to these Terms, please contact us:</p>
              <div className="mt-3 p-4 bg-dark-800 rounded-xl border border-dark-700 text-sm">
                <p className="text-white font-semibold">BuildRanchi Pro</p>
                <p className="text-dark-300 mt-1">Dhurva, Ranchi, Jharkhand 834009, India</p>
                <p className="text-dark-300">Phone: <strong className="text-gold-400">+91 7258021382</strong> / <strong className="text-gold-400">+91 6203277096</strong></p>
                <p className="text-dark-300">Email: <strong className="text-gold-400">paikpawan18@gmail.com</strong></p>
                <p className="text-dark-300">WhatsApp: <a href="https://wa.me/916203277096" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">wa.me/916203277096</a></p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-dark-700">
            <Link to="/privacy" className="px-6 py-3 bg-dark-800 text-gold-400 rounded-xl font-bold hover:bg-dark-700 transition-colors border border-dark-700 text-center">
              ← Read Privacy Policy
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