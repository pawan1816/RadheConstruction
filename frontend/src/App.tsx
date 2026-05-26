import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ServicesPage from './pages/Services';
import { ServiceDetailPage } from './pages/ServiceDetail';
import ProjectsPage from './pages/Projects';
import { ProjectDetailPage } from './pages/ProjectDetail';
import BookingPage from './pages/Booking';
import QuotationPage from './pages/Quotation';
import BlogPage from './pages/Blog';
import ContactPage from './pages/Contact';
import LoginPage from './pages/Login';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function AppLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/quotation" element={<QuotationPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout />
        <Toaster position="top-right" toastOptions={{ style: { background: '#1a1a2e', color: '#fff' } }} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}