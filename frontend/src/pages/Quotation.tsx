import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileAlt, FaCheck, FaWhatsapp, FaMapMarkerAlt, FaTimes, FaImage, FaFilePdf } from 'react-icons/fa';
import { endpoints } from '../api';
import { Link } from 'react-router-dom';
import type { Service } from '../types';

const STEPS = ['Your Details', 'Project & Service', 'Specifications', 'Upload Plans', 'Review & Submit'];

const PROJECT_TYPES = [
  'Residential House', 'Apartment/Flat', 'Villa', 'Commercial Building',
  'Office Space', 'Shopping Complex', 'Hospital', 'School/College',
  'Renovation', 'Interior Design', 'Warehouse/Factory', 'Temple/Church',
];

const BUDGET_RANGES = [
  'Below ₹25 Lakhs', '₹25-50 Lakhs', '₹50 Lakhs - ₹1 Crore',
  '₹1-2 Crore', '₹2-5 Crore', 'Above ₹5 Crore',
];

const LOCATIONS = [
  'Ranchi', 'Dhurva', 'Morabadi', 'Lalpur', 'Harmu', 'Bariatu',
  'Kanke', 'Booty More', 'Ratu Road', 'Main Road', 'Doranda',
  'Kokar', 'Ashok Nagar', 'Argora', 'Birla Area', 'Other',
];

const inputCls = 'w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-gold-500 transition-colors';
const labelCls = 'block text-white text-sm font-medium mb-2';
const selectCls = 'w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-gold-500 transition-colors';

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface UploadFile {
  file: File;
  type: 'document' | 'image';
  preview?: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: number | '';
  project_type: string;
  budget_range: string;
  location: string;
  area_sqft: string;
  floors: string;
  rooms: string;
  requirements: string;
}

export default function QuotationPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploads, setUploads] = useState<UploadFile[]>([]);
  const docInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', service: '',
    project_type: '', budget_range: '', location: '',
    area_sqft: '', floors: '1', rooms: '3', requirements: '',
  });

  useEffect(() => {
    endpoints.getServices().then((res) => {
      const data = res.data.results || res.data;
      setServices(Array.isArray(data) ? data : []);
    }).catch(() => {});
  }, []);

  const update = (field: keyof FormState, value: string | number) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  const validateStep = (): boolean => {
    const errs: Record<string, string> = {};
    if (step === 0) {
      if (!form.name.trim()) errs.name = 'Name is required';
      if (!form.phone.trim()) errs.phone = 'Phone number is required';
      else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ''))) errs.phone = 'Enter a valid 10-digit phone number';
    }
    if (step === 1) {
      if (!form.project_type) errs.project_type = 'Select a project type';
      if (!form.service) errs.service = 'Select a service';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => Math.min(s + 1, 4)); };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const addFiles = useCallback((files: FileList, type: 'document' | 'image') => {
    const newFiles: UploadFile[] = Array.from(files).map((file) => {
      const entry: UploadFile = { file, type };
      if (type === 'image' && file.type.startsWith('image/')) {
        entry.preview = URL.createObjectURL(file);
      }
      return entry;
    });
    setUploads((prev) => [...prev, ...newFiles]);
  }, []);

  const removeFile = (index: number) => {
    setUploads((prev) => {
      const item = prev[index];
      if (item.preview) URL.revokeObjectURL(item.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('phone', form.phone);
      fd.append('email', form.email || '');
      fd.append('project_type', form.project_type);
      fd.append('budget_range', form.budget_range || '');
      if (form.area_sqft) fd.append('area_sqft', form.area_sqft);
      if (form.floors) fd.append('floors', form.floors);
      if (form.rooms) fd.append('rooms', form.rooms);
      fd.append('requirements', [form.requirements, form.location ? `Location: ${form.location}` : ''].filter(Boolean).join('\n'));
      if (form.service) fd.append('service', String(form.service));

      uploads.forEach((u) => {
        if (u.type === 'document') fd.append('doc_files', u.file);
        else fd.append('img_files', u.file);
      });

      await endpoints.createQuotation(fd);
      setSubmitted(true);
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again or contact us on WhatsApp.' });
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Drag & Drop Zone ── */
  const DropZone = ({ type, icon, title, subtitle }: {
    type: 'document' | 'image'; icon: React.ReactNode; title: string; subtitle: string;
  }) => {
    const [dragging, setDragging] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const onDrop = (e: React.DragEvent) => {
      e.preventDefault(); setDragging(false);
      if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files, type);
        };
        const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
        const onDragLeave = () => setDragging(false);

        return (
          <div
            ref={ref}
            onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
            onClick={() => (type === 'document' ? docInputRef.current?.click() : imgInputRef.current?.click())}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              dragging ? 'border-gold-500 bg-gold-500/5' : 'border-dark-600 hover:border-dark-500 bg-dark-800/30'
            }`}
          >
            <div className="text-3xl text-dark-400 mb-3 flex justify-center">{icon}</div>
            <p className="text-white font-medium">{title}</p>
            <p className="text-dark-500 text-sm mt-1">{subtitle}</p>
          </div>
        );
      };

  /* ── Success ── */
  if (submitted) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-dark-900">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-8 max-w-md">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheck className="text-green-400 text-3xl" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">Quotation Requested!</h2>
          <p className="text-dark-400 mb-2">Thank you, <span className="text-gold-400">{form.name}</span>. Our team will prepare a detailed quotation within 24-48 hours.</p>
          <p className="text-dark-500 text-sm mb-6">We'll contact you at <span className="text-white">{form.phone}</span>{form.email ? ` / ${form.email}` : ''}.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="px-6 py-3 bg-gold-500 text-dark-900 rounded-xl font-bold hover:bg-gold-400 transition-colors">Back to Home</Link>
            <a href={`https://wa.me/916203277096?text=${encodeURIComponent('Hi, I just submitted a quotation request. Name: ' + form.name)}`}
              target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-500 transition-colors flex items-center justify-center gap-2">
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── Step indicator ── */
  const StepIndicator = () => (
    <div className="flex justify-center gap-1 sm:gap-2 mt-8 flex-wrap">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center gap-1 sm:gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i <= step ? 'bg-gold-500 text-dark-900' : 'bg-dark-700 text-dark-400'}`}>
            {i < step ? <FaCheck className="text-xs" /> : i + 1}
          </div>
          <span className={`text-xs sm:text-sm hidden sm:inline ${i <= step ? 'text-gold-400' : 'text-dark-500'}`}>{s}</span>
          {i < STEPS.length - 1 && <div className={`w-4 sm:w-8 h-0.5 ${i < step ? 'bg-gold-500' : 'bg-dark-700'}`} />}
        </div>
      ))}
    </div>
  );

  const FieldError = ({ field }: { field: string }) =>
    errors[field] ? <p className="text-red-400 text-xs mt-1">{errors[field]}</p> : null;

  const selectedService = form.service ? services.find((s) => s.id === form.service) : null;
  const docFiles = uploads.filter((u) => u.type === 'document');
  const imgFiles = uploads.filter((u) => u.type === 'image');

  /* ── Form ── */
  return (
    <div className="pt-24">
      {/* Hidden file inputs */}
      <input ref={docInputRef} type="file" multiple accept=".pdf,.doc,.docx,.dwg,.dxf" className="hidden"
        onChange={(e) => e.target.files && addFiles(e.target.files, 'document')} />
      <input ref={imgInputRef} type="file" multiple accept="image/*" className="hidden"
        onChange={(e) => e.target.files && addFiles(e.target.files, 'image')} />

      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <FaFileAlt className="text-gold-500 text-4xl mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">Get a Free Quotation</h1>
            <p className="text-dark-400 mt-3">Tell us about your dream project — our experts will send a detailed estimate within 24-48 hours.</p>
          </motion.div>
          <StepIndicator />
        </div>
      </section>

      {/* Body */}
      <section className="py-12 sm:py-16 bg-dark-900">
        <div className="max-w-2xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {/* Step 0 — Contact details */}
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
                <h3 className="text-lg font-display font-semibold text-white mb-1">Your Details</h3>
                <p className="text-dark-400 text-sm mb-4">So we can reach you with the quotation.</p>
                <div>
                  <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
                  <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Pawan Kumar" className={inputCls} />
                  <FieldError field="name" />
                </div>
                <div>
                  <label className={labelCls}>Phone Number <span className="text-red-400">*</span></label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-dark-700 border border-r-0 border-dark-700 rounded-l-xl text-dark-400 text-sm">+91</span>
                    <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="7258021382" className={`${inputCls} rounded-l-none`} maxLength={10} />
                  </div>
                  <FieldError field="phone" />
                </div>
                <div>
                  <label className={labelCls}>Email <span className="text-dark-500 text-xs">(optional)</span></label>
                  <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Location / Area</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
                    <select value={form.location} onChange={(e) => update('location', e.target.value)} className={`${selectCls} pl-9`}>
                      <option value="">Select your area</option>
                      {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 1 — Project type & service */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
                <h3 className="text-lg font-display font-semibold text-white mb-1">Project & Service</h3>
                <p className="text-dark-400 text-sm mb-4">What are you looking to build?</p>
                <div>
                  <label className={labelCls}>Type of Project <span className="text-red-400">*</span></label>
                  <select value={form.project_type} onChange={(e) => update('project_type', e.target.value)} className={selectCls}>
                    <option value="">Select project type</option>
                    {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <FieldError field="project_type" />
                </div>
                <div>
                  <label className={labelCls}>Service Required <span className="text-red-400">*</span></label>
                  <select value={form.service} onChange={(e) => update('service', e.target.value ? Number(e.target.value) : '')} className={selectCls}>
                    <option value="">Select a service</option>
                    {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                  <FieldError field="service" />
                  {selectedService && (
                    <p className="text-gold-400 text-xs mt-2">{selectedService.short_description}</p>
                  )}
                </div>
                <div>
                  <label className={labelCls}>Estimated Budget</label>
                  <select value={form.budget_range} onChange={(e) => update('budget_range', e.target.value)} className={selectCls}>
                    <option value="">Select budget range</option>
                    {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 2 — Specifications */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
                <h3 className="text-lg font-display font-semibold text-white mb-1">Specifications</h3>
                <p className="text-dark-400 text-sm mb-4">Help us estimate accurately.</p>
                <div>
                  <label className={labelCls}>Total Area (sq.ft.)</label>
                  <input type="number" value={form.area_sqft} onChange={(e) => update('area_sqft', e.target.value)} placeholder="e.g. 1500" className={inputCls} min="0" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Floors</label>
                    <input type="number" value={form.floors} onChange={(e) => update('floors', e.target.value)} className={inputCls} min="1" max="50" />
                  </div>
                  <div>
                    <label className={labelCls}>Rooms</label>
                    <input type="number" value={form.rooms} onChange={(e) => update('rooms', e.target.value)} className={inputCls} min="1" max="100" />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Project Requirements & Details</label>
                  <textarea rows={5} value={form.requirements} onChange={(e) => update('requirements', e.target.value)}
                    placeholder="Describe your requirements — rooms needed, style preferences, special features, materials, timeline, etc."
                    className={`${inputCls} resize-none`} />
                </div>
              </motion.div>
            )}

            {/* Step 3 — Upload Plans */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
                <h3 className="text-lg font-display font-semibold text-white mb-1">Upload Plans & References</h3>
                <p className="text-dark-400 text-sm mb-4">Upload site plans, blueprints, floor plans, or reference images. <span className="text-dark-500">(optional)</span></p>

                {/* Documents drop zone */}
                <DropZone
                  type="document"
                  icon={<FaFilePdf />}
                  title="Upload Documents"
                  subtitle="PDF, DOC, DWG, DXF — site plans, blueprints, approvals"
                />

                {docFiles.length > 0 && (
                  <div className="space-y-2">
                    {docFiles.map((u, i) => (
                      <div key={`d-${i}`} className="flex items-center gap-3 p-3 bg-dark-800 rounded-xl border border-dark-700">
                        <FaFilePdf className="text-red-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm truncate">{u.file.name}</p>
                          <p className="text-dark-500 text-xs">{formatSize(u.file.size)}</p>
                        </div>
                        <button onClick={() => removeFile(uploads.indexOf(u))} className="text-dark-500 hover:text-red-400 transition-colors">
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Images drop zone */}
                <DropZone
                  type="image"
                  icon={<FaImage />}
                  title="Upload Reference Images"
                  subtitle="JPG, PNG, WEBP — inspiration photos, site photos, reference designs"
                />

                {imgFiles.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {imgFiles.map((u, i) => (
                      <div key={`img-${i}`} className="relative group aspect-square rounded-xl overflow-hidden border border-dark-700">
                        {u.preview && <img src={u.preview} alt={u.file.name} className="w-full h-full object-cover" />}
                        <button onClick={() => removeFile(uploads.indexOf(u))}
                          className="absolute top-1 right-1 w-6 h-6 bg-dark-900/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <FaTimes className="text-xs" />
                        </button>
                        <div className="absolute bottom-0 inset-x-0 bg-dark-900/80 px-2 py-1">
                          <p className="text-white text-xs truncate">{u.file.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {uploads.length === 0 && (
                  <p className="text-dark-600 text-sm text-center py-2">No files uploaded yet — skip this step if you don't have files ready.</p>
                )}
              </motion.div>
            )}

            {/* Step 4 — Review */}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <h3 className="text-lg font-display font-semibold text-white mb-4">Review Your Request</h3>
                <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 space-y-4">
                  {/* Contact */}
                  <div>
                    <p className="text-dark-500 text-xs uppercase tracking-wider mb-2">Contact</p>
                    <p className="text-white font-medium">{form.name}</p>
                    <p className="text-dark-300 text-sm">+91 {form.phone}{form.email ? ` · ${form.email}` : ''}</p>
                    {form.location && <p className="text-dark-400 text-sm flex items-center gap-1 mt-1"><FaMapMarkerAlt className="text-gold-500" /> {form.location}</p>}
                  </div>
                  <hr className="border-dark-700" />
                  {/* Project */}
                  <div>
                    <p className="text-dark-500 text-xs uppercase tracking-wider mb-2">Project</p>
                    <p className="text-white">{form.project_type}</p>
                    {selectedService && <p className="text-gold-400 text-sm">Service: {selectedService.name}</p>}
                    {form.budget_range && <p className="text-dark-300 text-sm">Budget: {form.budget_range}</p>}
                  </div>
                  <hr className="border-dark-700" />
                  {/* Specs */}
                  <div>
                    <p className="text-dark-500 text-xs uppercase tracking-wider mb-2">Specifications</p>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div><span className="text-dark-500">Area</span><p className="text-white">{form.area_sqft ? `${form.area_sqft} sq.ft.` : '—'}</p></div>
                      <div><span className="text-dark-500">Floors</span><p className="text-white">{form.floors || '—'}</p></div>
                      <div><span className="text-dark-500">Rooms</span><p className="text-white">{form.rooms || '—'}</p></div>
                    </div>
                  </div>
                  {form.requirements && (
                    <><hr className="border-dark-700" />
                    <div>
                      <p className="text-dark-500 text-xs uppercase tracking-wider mb-2">Requirements</p>
                      <p className="text-dark-300 text-sm whitespace-pre-line">{form.requirements}</p>
                    </div></>
                  )}
                  {/* Uploads summary */}
                  {uploads.length > 0 && (
                    <><hr className="border-dark-700" />
                    <div>
                      <p className="text-dark-500 text-xs uppercase tracking-wider mb-2">Attachments ({uploads.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {uploads.map((u, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-dark-700 rounded-lg text-xs text-dark-300">
                            {u.type === 'image' ? <FaImage className="text-blue-400" /> : <FaFilePdf className="text-red-400" />}
                            {u.file.name}
                          </span>
                        ))}
                      </div>
                    </div></>
                  )}
                </div>
                {errors.submit && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-red-400 text-sm">{errors.submit}</p>
                    <a href={`https://wa.me/916203277096?text=${encodeURIComponent('Hi, I need a quotation. Name: ' + form.name + ', Phone: ' + form.phone)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-green-400 text-sm hover:underline">
                      <FaWhatsapp /> Contact us on WhatsApp instead
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex gap-4 mt-10">
            {step > 0 && (
              <button onClick={prev} className="flex-1 py-3 bg-dark-800 text-white rounded-xl font-bold hover:bg-dark-700 transition-colors border border-dark-700">
                Previous
              </button>
            )}
            {step < 4 ? (
              <button onClick={next} className="flex-1 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl font-bold hover:opacity-90 transition-opacity">
                Next Step
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting}
                className="flex-1 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
                {submitting ? (
                  <><span className="w-4 h-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin" /> Submitting…</>
                ) : 'Submit Quotation Request'}
              </button>
            )}
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-6 text-center">
            <p className="text-dark-500 text-sm">Prefer to talk directly?</p>
            <a href="https://wa.me/916203277096?text=Hi%2C%20I%20need%20a%20construction%20quotation."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 font-medium mt-1 hover:text-green-300 transition-colors text-sm">
              <FaWhatsapp className="text-lg" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}