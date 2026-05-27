import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaRupeeSign, FaChevronDown, FaWhatsapp, FaEnvelope, FaCheck, FaCloudUploadAlt, FaFilePdf, FaTimes } from 'react-icons/fa';
import { endpoints } from '../api';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'senior-civil-engineer',
    title: 'Senior Civil Engineer',
    department: 'Engineering',
    location: 'Ranchi, Jharkhand',
    type: 'Full-time',
    experience: '5–10 years',
    salary: '₹6,00,000 – ₹10,00,000 / year',
    description: 'Lead structural design and site execution for residential and commercial construction projects across Ranchi. Oversee quality control, material testing, and compliance with IS codes and Jharkhand Building Bye-Laws.',
    requirements: [
      'B.Tech / M.Tech in Civil Engineering from a recognized institution',
      '5+ years of experience in building construction (residential/commercial)',
      'Strong knowledge of IS 456, IS 875, NBC norms, and local municipal regulations',
      'Proficiency in AutoCAD, STAAD Pro, and project management tools',
      'Excellent team leadership and on-site coordination skills',
      'Willingness to travel across Ranchi and nearby districts',
    ],
    benefits: [
      'Competitive salary with annual performance review',
      'Health insurance for self and family',
      'Company vehicle for site visits',
      'Professional development and training sponsorship',
    ],
  },
  {
    id: 'site-supervisor',
    title: 'Site Supervisor',
    department: 'Construction',
    location: 'Ranchi, Jharkhand',
    type: 'Full-time',
    experience: '3–7 years',
    salary: '₹3,50,000 – ₹5,50,000 / year',
    description: 'Manage day-to-day construction activities at project sites in Ranchi. Ensure work quality, labour productivity, material usage, and timeline adherence under the guidance of the project engineer.',
    requirements: [
      'Diploma in Civil Engineering or equivalent experience',
      '3+ years supervising active construction sites',
      'Knowledge of building materials, mixing ratios, and curing processes',
      'Ability to read and interpret construction drawings',
      'Strong communication skills in Hindi and basic English',
      'Experience managing labour teams of 15+ workers',
    ],
    benefits: [
      'Steady full-time employment with overtime compensation',
      'On-site accommodation support for outstation projects',
      'Safety gear and equipment provided',
      'Annual bonus based on project performance',
    ],
  },
  {
    id: 'interior-designer',
    title: 'Interior Designer',
    department: 'Design',
    location: 'Ranchi, Jharkhand',
    type: 'Full-time',
    experience: '2–5 years',
    salary: '₹3,00,000 – ₹6,00,000 / year',
    description: 'Design functional and aesthetic interior spaces for residential and commercial projects in Ranchi. Create 2D/3D layouts, material palettes, and coordinate with contractors for execution.',
    requirements: [
      'Degree/Diploma in Interior Design or Architecture',
      '2+ years of professional interior design experience',
      'Proficiency in SketchUp, 3ds Max, V-Ray, and Adobe Creative Suite',
      'Strong portfolio demonstrating residential and commercial projects',
      'Knowledge of materials, finishes, furniture, and lighting design',
      'Client presentation and vendor coordination experience',
    ],
    benefits: [
      'Creative freedom with diverse project types',
      'Software subscriptions covered by the company',
      'Flexible work arrangements for design phases',
      'Project completion bonuses',
    ],
  },
  {
    id: 'architect',
    title: 'Architect',
    department: 'Architecture',
    location: 'Ranchi, Jharkhand',
    type: 'Full-time',
    experience: '3–8 years',
    salary: '₹4,50,000 – ₹8,00,000 / year',
    description: 'Develop architectural designs, building plans, and elevation concepts for construction projects. Handle municipal approval documentation and ensure compliance with Ranchi Building Bye-Laws.',
    requirements: [
      'B.Arch from a COA-recognized institution',
      '3+ years of professional architectural practice',
      'Expert in AutoCAD, Revit, SketchUp, and rendering software',
      'Experience with municipal building approvals and RERA documentation',
      'Strong design sensibility and understanding of spatial planning',
      'Knowledge of sustainable and Vastu-compliant design principles',
    ],
    benefits: [
      'Lead architect role on marquee projects',
      'Professional license renewal fee covered',
      'Conference and workshop sponsorship',
      'Performance-linked annual increment',
    ],
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    department: 'Operations',
    location: 'Ranchi, Jharkhand',
    type: 'Full-time',
    experience: '7–12 years',
    salary: '₹8,00,000 – ₹14,00,000 / year',
    description: 'Oversee end-to-end delivery of construction projects from foundation to handover. Manage budgets, subcontractors, client communications, and ensure timely completion with quality standards.',
    requirements: [
      'B.Tech / M.Tech in Civil Engineering or Construction Management',
      '7+ years in construction project management',
      'PMP or equivalent certification preferred',
      'Experience managing projects valued at ₹1 Cr and above',
      'Strong financial planning and vendor negotiation skills',
      'Familiarity with Jharkhand labour regulations and GST compliance',
    ],
    benefits: [
      'Senior leadership role with decision-making authority',
      'Company vehicle and fuel allowance',
      'Profit-sharing on successfully completed projects',
      'Annual retreat and team-building events',
    ],
  },
  {
    id: 'sales-executive',
    title: 'Sales & Business Development Executive',
    department: 'Sales',
    location: 'Ranchi, Jharkhand',
    type: 'Full-time',
    experience: '1–4 years',
    salary: '₹2,50,000 – ₹4,00,000 / year + incentives',
    description: 'Generate and nurture leads for construction, renovation, and interior design projects in Ranchi and Jharkhand. Conduct site visits, prepare proposals, and convert enquiries into signed contracts.',
    requirements: [
      'Graduate in any discipline (MBA preferred)',
      '1+ year of experience in real estate, construction, or B2B sales',
      'Excellent communication in Hindi and English',
      'Two-wheeler with valid driving license (required for site visits)',
      'Knowledge of Ranchi geography and property market',
      'Comfortable with CRM tools and digital communication platforms',
    ],
    benefits: [
      'Attractive incentive structure — no cap on earnings',
      'Fuel and mobile reimbursement',
      'Sales training and mentorship program',
      'Fast-track growth to Sales Manager role',
    ],
  },
  {
    id: 'draftsman',
    title: 'Civil Draftsman',
    department: 'Engineering',
    location: 'Ranchi, Jharkhand',
    type: 'Full-time',
    experience: '2–5 years',
    salary: '₹2,00,000 – ₹3,50,000 / year',
    description: 'Prepare detailed construction drawings, shop drawings, and municipal submission plans based on architect and engineer specifications.',
    requirements: [
      'ITI / Diploma in Civil Draftsmanship',
      '2+ years of professional drafting experience',
      'Expert in AutoCAD (2D mandatory, 3D preferred)',
      'Experience with municipal plan submission process in Jharkhand',
      'Attention to detail and ability to work under deadlines',
    ],
    benefits: [
      'Steady workflow with diverse project types',
      'Software training provided',
      'Overtime compensation',
      'Annual performance bonus',
    ],
  },
  {
    id: 'marketing-intern',
    title: 'Digital Marketing Intern',
    department: 'Marketing',
    location: 'Ranchi, Jharkhand (Hybrid)',
    type: 'Internship (3–6 months)',
    experience: 'Freshers welcome',
    salary: '₹8,000 – ₹12,000 / month',
    description: 'Support our marketing team with social media management, content creation, SEO, Google Ads, and lead generation campaigns targeted at the Ranchi and Jharkhand market.',
    requirements: [
      'Pursuing or recently completed a degree in Marketing, Communications, or related field',
      'Basic knowledge of social media platforms (Instagram, Facebook, YouTube)',
      'Familiarity with Canva or basic graphic design tools',
      'Good written communication skills in Hindi and English',
      'Enthusiasm for the construction and real estate industry',
    ],
    benefits: [
      'Hands-on experience in a growing startup',
      'Certificate of completion and letter of recommendation',
      'Possibility of full-time conversion based on performance',
      'Flexible hours for college students',
    ],
  },
];

const departments = [...new Set(JOB_OPENINGS.map((j) => j.department))];

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [filterDept, setFilterDept] = useState('All');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', message: '' });

  const filteredJobs = filterDept === 'All' ? JOB_OPENINGS : JOB_OPENINGS.filter((j) => j.department === filterDept);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeError('');
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) {
      setResumeError('Only PDF, DOC, DOCX files are accepted.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setResumeError('File must be under 5 MB.');
      return;
    }
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setResumeError('Please upload your resume.');
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('position', form.position);
      fd.append('cover_note', form.message);
      fd.append('resume', resumeFile);
      await endpoints.submitApplication(fd);
      setSubmitted(true);
    } catch {
      setResumeError('Something went wrong. Please try again or email your resume to paikpawan18@gmail.com');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <FaBriefcase className="text-gold-500 text-5xl mx-auto mb-6" />
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">Build Your Career with Us</h1>
            <p className="text-dark-300 text-lg max-w-2xl mx-auto">Join Ranchi's fastest-growing construction and real estate platform. We're looking for passionate engineers, architects, designers, and professionals who want to shape the skyline of Jharkhand.</p>
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-gold-400">50+</p>
                <p className="text-dark-400 text-sm">Open Positions</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-gold-400">8+</p>
                <p className="text-dark-400 text-sm">Departments</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-gold-400">200+</p>
                <p className="text-dark-400 text-sm">Team Members</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-gold-400">Ranchi</p>
                <p className="text-dark-400 text-sm">Headquarters</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-dark-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white text-center mb-12">Why BuildRanchi Pro?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Real Impact', desc: 'Your work directly shapes homes, offices, and landmarks across Ranchi and Jharkhand.' },
              { title: 'Growth Path', desc: 'Clear career progression from site engineer to project manager to leadership roles.' },
              { title: 'Skill Development', desc: 'Regular training, certifications, and hands-on experience with modern construction technology.' },
              { title: 'People First', desc: 'Supportive team culture, health benefits, fair compensation, and work-life balance.' },
            ].map((item) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="p-6 rounded-2xl bg-dark-800 border border-dark-700 text-center hover:border-gold-500/30 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-dark-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white text-center mb-4">Open Positions</h2>
          <p className="text-dark-400 text-center mb-8">{JOB_OPENINGS.length} roles across {departments.length} departments</p>

          {/* Department filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['All', ...departments].map((dept) => (
              <button key={dept} onClick={() => setFilterDept(dept)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterDept === dept ? 'bg-gold-500 text-dark-900' : 'bg-dark-800 text-dark-300 hover:bg-dark-700 border border-dark-700'
                }`}>
                {dept}
              </button>
            ))}
          </div>

          {/* Job cards */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredJobs.map((job) => (
                <motion.div key={job.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden hover:border-dark-600 transition-colors">
                  {/* Header — always visible */}
                  <button onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-dark-400">
                        <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-gold-500" /> {job.location}</span>
                        <span className="flex items-center gap-1"><FaClock className="text-gold-500" /> {job.type}</span>
                        <span className="flex items-center gap-1"><FaRupeeSign className="text-gold-500" /> {job.salary}</span>
                      </div>
                    </div>
                    <FaChevronDown className={`text-dark-400 transition-transform ${expandedJob === job.id ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {expandedJob === job.id && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                        className="overflow-hidden">
                        <div className="px-6 pb-6 space-y-5 border-t border-dark-700 pt-5">
                          <div>
                            <p className="text-dark-500 text-xs uppercase tracking-wider mb-1">Experience Required</p>
                            <p className="text-dark-300 text-sm">{job.experience}</p>
                          </div>
                          <div>
                            <p className="text-dark-500 text-xs uppercase tracking-wider mb-2">Role Description</p>
                            <p className="text-dark-300 text-sm">{job.description}</p>
                          </div>
                          <div>
                            <p className="text-dark-500 text-xs uppercase tracking-wider mb-2">Requirements</p>
                            <ul className="space-y-1">
                              {job.requirements.map((r, i) => (
                                <li key={i} className="text-dark-300 text-sm flex items-start gap-2">
                                  <FaCheck className="text-gold-500 mt-1 flex-shrink-0 text-xs" /> {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-dark-500 text-xs uppercase tracking-wider mb-2">What We Offer</p>
                            <ul className="space-y-1">
                              {job.benefits.map((b, i) => (
                                <li key={i} className="text-dark-300 text-sm flex items-start gap-2">
                                  <span className="text-green-400 mt-0.5">✦</span> {b}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button onClick={() => { setExpandedJob(null); document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' }); setForm((f) => ({ ...f, position: job.title })); }}
                              className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl font-bold hover:opacity-90 transition-opacity">
                              Apply Now
                            </button>
                            <a href={`https://wa.me/916203277096?text=${encodeURIComponent(`Hi, I'm interested in the ${job.title} position at BuildRanchi Pro.`)}`}
                              target="_blank" rel="noopener noreferrer"
                              className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-500 transition-colors flex items-center justify-center gap-2">
                              <FaWhatsapp /> Enquire on WhatsApp
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-dark-800/50" id="apply-form">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-white text-center mb-2">Apply Now</h2>
          <p className="text-dark-400 text-center mb-8">Fill in your details and we'll get back to you within 48 hours.</p>

          {submitted ? (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-12">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="text-green-400 text-2xl" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">Application Received!</h3>
              <p className="text-dark-400 mb-6">Thank you for your interest. Our HR team will review your application and contact you at <strong className="text-white">{form.email || form.phone}</strong> within 48 hours.</p>
              <a href={`https://wa.me/916203277096?text=${encodeURIComponent('Hi, I just submitted a job application for ' + form.position + '. Name: ' + form.name)}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-500 transition-colors">
                <FaWhatsapp /> Follow up on WhatsApp
              </a>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Full Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-gold-500" />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-gold-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Phone *</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-dark-700 border border-r-0 border-dark-700 rounded-l-xl text-dark-400 text-sm">+91</span>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="7258021382" maxLength={10}
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-r-xl text-white placeholder-dark-500 focus:outline-none focus:border-gold-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Position *</label>
                  <select required value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-gold-500">
                    <option value="">Select a position</option>
                    {JOB_OPENINGS.map((j) => <option key={j.id} value={j.title}>{j.title}</option>)}
                    <option value="Other">Other / General Application</option>
                  </select>
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">Resume / CV * <span className="text-dark-500 text-xs">(PDF, DOC, DOCX — max 5 MB)</span></label>
                <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileSelect} />
                {resumeFile ? (
                  <div className="flex items-center gap-3 p-4 bg-dark-800 border border-dark-700 rounded-xl">
                    <FaFilePdf className="text-red-400 text-2xl flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{resumeFile.name}</p>
                      <p className="text-dark-500 text-xs">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button type="button" onClick={() => { setResumeFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                      className="text-dark-500 hover:text-red-400 transition-colors p-1">
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="w-full p-6 border-2 border-dashed border-dark-600 rounded-xl text-center hover:border-dark-500 bg-dark-800/30 transition-colors">
                    <FaCloudUploadAlt className="text-3xl text-dark-400 mx-auto mb-2" />
                    <p className="text-white font-medium">Upload your resume</p>
                    <p className="text-dark-500 text-sm mt-1">Click to browse — PDF, DOC, DOCX (max 5 MB)</p>
                  </button>
                )}
                {resumeError && <p className="text-red-400 text-xs mt-1">{resumeError}</p>}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Cover Note <span className="text-dark-500">(optional)</span></label>
                <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us briefly about your experience, skills, and why you'd like to join BuildRanchi Pro."
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-gold-500 resize-none" />
              </div>
              <button type="submit" disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
                {submitting ? (
                  <><span className="w-4 h-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin" /> Submitting…</>
                ) : 'Submit Application'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-dark-500 text-sm">Or send your resume directly to</p>
            <a href="mailto:paikpawan18@gmail.com?subject=Job Application - BuildRanchi Pro"
              className="inline-flex items-center gap-2 text-gold-400 font-medium mt-1 hover:text-gold-300 transition-colors text-sm">
              <FaEnvelope /> paikpawan18@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-dark-400 text-sm">Didn't find a matching role? We're always looking for talented people.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <a href="mailto:paikpawan18@gmail.com?subject=General Application - BuildRanchi Pro"
              className="px-6 py-3 bg-dark-800 text-white rounded-xl font-bold hover:bg-dark-700 transition-colors border border-dark-700 flex items-center justify-center gap-2">
              <FaEnvelope /> Send Open Application
            </a>
            <a href="https://wa.me/916203277096?text=Hi, I'm interested in career opportunities at BuildRanchi Pro."
              target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-500 transition-colors flex items-center justify-center gap-2">
              <FaWhatsapp /> Chat with HR
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}