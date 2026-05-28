import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const FOOTER_LINKS = {
  Services: [
    { label: 'Residential Construction', path: '/services/residential-construction' },
    { label: 'Commercial Construction', path: '/services/commercial-construction' },
    { label: 'Interior Design', path: '/services/interior-design' },
    { label: 'Villa Construction', path: '/services/villa-construction' },
    { label: 'Renovation', path: '/services/renovation' },
    { label: 'Architecture Planning', path: '/services/architecture-planning' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Our Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
    { label: 'Careers', path: '/careers' },
  ],
  'Quick Links': [
    { label: 'Get Free Quote', path: '/quotation' },
    { label: 'Book Consultation', path: '/booking' },
    { label: 'FAQs', path: '/contact#faqs' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms & Conditions', path: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-700/50 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center font-bold text-dark-900 text-lg font-display">
                B
              </div>
              <span className="text-2xl font-bold font-display text-white">
                Build<span className="text-gold-500">Ranchi</span>
              </span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed mb-6 max-w-sm">
              Building Dreams, Constructing Reality. Premium construction and real estate services in Ranchi, Jharkhand since 2009.
            </p>
            <div className="flex flex-col gap-2 text-sm text-dark-400">
              <a href="tel:+917258021382" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <FaPhone className="text-gold-500" /> +91 7258021382 / +91 6203277096
              </a>
              <a href="mailto:paikpawan18@gmail.com" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <FaEnvelope className="text-gold-500" /> paikpawan18@gmail.com
              </a>
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-gold-500 mt-1" />
                <span>Dhurva, Ranchi, Jharkhand</span>
              </div>
            </div>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-dark-800 hover:bg-gold-500 rounded-lg flex items-center justify-center text-dark-400 hover:text-dark-900 transition-all">
                  <Icon size={16} />
                </a>
              ))}
              <a href="https://wa.me/916203277096" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-800 hover:bg-green-600 rounded-lg flex items-center justify-center text-dark-400 hover:text-white transition-all">
                <FaWhatsapp size={16} />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-dark-400 hover:text-gold-400 text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm">
            © {new Date().getFullYear()} BuildRanchi Pro. All rights reserved.
          </p>
          <p className="text-dark-600 text-xs">
            Premium Construction & Real Estate • Ranchi, Jharkhand, India
          </p>
        </div>
      </div>
    </footer>
  );
}