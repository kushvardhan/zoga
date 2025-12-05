"use client";

import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { Mail, Phone, MapPin, Search } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import Navbar from "@/components/Navbar";



// --- Icon Definitions (Inline SVGs) ---
const IconCode: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

const IconFeather: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 17h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4"/>
    <path d="M18 13V9"/>
    <path d="M13 18h-4"/>
  </svg>
);

const IconLayout: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
);

const IconVideo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 8.5-6 4.5 6 4.5V8.5z"/>
    <path d="M2 17.5V6.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 0 0 1-2-2z"/>
  </svg>
);

const IconWriting: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
  </svg>
);

const IconChevronDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

// --- Data Definitions ---
interface Service {
  id: number;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  description: string;
}

const servicesData: Service[] = [
  { id: 1, name: "Web Development", icon: IconCode, color: "text-indigo-400", description: "Building modern websites and apps using React, Next.js, and backend APIs." },
  { id: 2, name: "App Development", icon: IconLayout, color: "text-cyan-400", description: "Creating mobile apps for iOS and Android with smooth UI/UX." },
  { id: 3, name: "UI/UX Design", icon: IconFeather, color: "text-rose-400", description: "Designing interfaces and experiences that delight users." },
  { id: 4, name: "Video Production", icon: IconVideo, color: "text-yellow-400", description: "High-quality corporate and social media videos from concept to final cut." },
  { id: 5, name: "Content Writing", icon: IconWriting, color: "text-purple-400", description: "SEO-friendly content that engages and converts visitors." }
];

interface FAQ {
  q: string;
  a: string;
}

const faqsData: FAQ[] = [
  { q: "How do I start a project with you?", a: "You can reach out via the contact form or social media. We'll schedule a call to discuss your needs." },
  { q: "Do you provide post-launch support?", a: "Yes! We offer ongoing support and maintenance to ensure your digital product runs smoothly." },
  { q: "What platforms and technologies do you use?", a: "We use React, Next.js, Node.js, and modern design tools like Figma. For mobile, we use React Native and Flutter." },
  { q: "Can you help with my existing website?", a: "Absolutely! We can improve, migrate, or optimize your existing digital assets." },
  { q: "How do you handle revisions?", a: "We integrate your feedback at every stage, ensuring your vision is fully realized." }
];

// --- Form State ---
interface FormState {
  name: string;
  email: string;
  service: string;
  message: string;
  errors: { [key: string]: string | undefined };
}

const initialFormState: FormState = {
  name: "",
  email: "",
  service: servicesData[0].name,
  message: "",
  errors: {}
};

// --- Components ---
interface ServiceCardProps { service: Service }
const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = service.icon;
  return (
    <div className="p-6 rounded-2xl shadow-2xl backdrop-blur-sm bg-gray-800/60 border border-transparent hover:border-indigo-500 transition-all duration-500 ease-in-out transform hover:scale-[1.03] hover:shadow-indigo-500/20 cursor-pointer">
      <div className={`p-3 rounded-full inline-block mb-4 ${service.color} bg-gray-700/50 transition duration-500 hover:rotate-12`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
      <p className="text-gray-400 text-sm">{service.description}</p>
    </div>
  );
};

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, onToggle }) => (
  <div className="border-b border-gray-700/50 overflow-hidden cursor-pointer group transition-all duration-300 rounded-lg hover:bg-gray-800/50 mb-2" onClick={onToggle}>
    <div className="flex justify-between items-center p-4 sm:p-6">
      <h4 className={`text-lg font-semibold transition-colors duration-300 ${isOpen ? "text-indigo-400" : "text-white"}`}>{faq.q}</h4>
      <div className={`p-1 rounded-full bg-gray-800/50 text-indigo-400 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
        <IconChevronDown className="w-5 h-5" />
      </div>
    </div>
    <div className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100 p-4 sm:p-6 pt-0" : "max-h-0 opacity-0 p-0"}`}>
      <p className="text-gray-400 leading-relaxed border-l-4 border-indigo-500 pl-4">{faq.a}</p>
    </div>
  </div>
);

// --- Main App ---
const App: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value, errors: { ...prev.errors, [name]: undefined } }));
  }, []);

  const validate = useCallback(() => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email address is invalid.";
    if (!formData.message.trim()) errors.message = "Please describe your project.";

    setFormData(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted:", formData);
      setSubmitStatus("success");
      setTimeout(() => {
        setFormData(initialFormState);
        setSubmitStatus(null);
      }, 3000);
    } else {
      setSubmitStatus("error");
    }
  }, [formData, validate]);

  const toggleFAQ = useCallback((index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  }, [activeFAQ]);

  const filteredFAQs = React.useMemo(() => {
    if (!searchTerm.trim()) return faqsData;
    const term = searchTerm.toLowerCase();
    return faqsData.filter(faq => faq.q.toLowerCase().includes(term) || faq.a.toLowerCase().includes(term));
  }, [searchTerm]);

  const BackgroundEffect: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-gray-950"></div>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-500/10 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-2/3 h-1/2 bg-cyan-500/10 rounded-full blur-3xl opacity-20 animate-pulse-slow delay-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans relative pt-20">
      

      <main className="container mx-auto px-4 py-12 space-y-24 relative z-10">
        {/* HERO */}
        <Navbar />

      {/* HERO */}
      <section className="text-center max-w-4xl mx-auto px-4 py-16 relative z-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 animate-fadeInUp">
          Get in Touch With Our Team
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-6 animate-fadeIn delay-300">
          Have a project in mind? Fill out the form and we will help you bring it to life. We respond within 24 hours.
        </p>
      </section>

        {/* CONTACT FORM */}
        <section className="grid md:grid-cols-2 gap-12 items-start bg-gray-900/70 p-8 sm:p-12 rounded-3xl shadow-3xl border border-gray-800 backdrop-blur-md">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-white">
              Start Your <span className="text-indigo-400">Query</span>
            </h2>
            <p className="text-gray-400 mb-8 border-l-4 border-cyan-400 pl-4">
              Use the form to describe your needs. We aim to respond within 24 hours.
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Email Us</h3>
                  <p className="text-gray-400 hover:text-cyan-400 transition-colors">hello@zoga-agency.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Call Us</h3>
                  <p className="text-gray-400 hover:text-cyan-400 transition-colors">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaWhatsapp className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white">WhatsApp</h3>
                  <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">Chat with us</a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Global Office</h3>
                  <p className="text-gray-400">123 Digital Way, Suite 404, Tech City, TX 78701</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full p-3 rounded-xl bg-gray-700/80 border transition-all duration-300 focus:outline-none ${
                  formData.errors.name ? "border-rose-500" : "border-transparent focus:border-indigo-500 group-hover:border-gray-600"
                } text-white`}
              />
              {formData.errors.name && <p className="text-rose-400 text-xs mt-1">{formData.errors.name}</p>}
            </div>

            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@company.com"
                className={`w-full p-3 rounded-xl bg-gray-700/80 border transition-all duration-300 focus:outline-none ${
                  formData.errors.email ? "border-rose-500" : "border-transparent focus:border-indigo-500 group-hover:border-gray-600"
                } text-white`}
              />
              {formData.errors.email && <p className="text-rose-400 text-xs mt-1">{formData.errors.email}</p>}
            </div>

            <div className="group">
              <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">Interested Service *</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-700/80 border border-transparent focus:border-indigo-500 text-white"
              >
                {servicesData.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>

            <div className="group">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Project Details *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your project, challenges, and goals."
                rows={5}
                className={`w-full p-3 rounded-xl bg-gray-700/80 border transition-all duration-300 focus:outline-none ${
                  formData.errors.message ? "border-rose-500" : "border-transparent focus:border-indigo-500 group-hover:border-gray-600"
                } text-white`}
              ></textarea>
              {formData.errors.message && <p className="text-rose-400 text-xs mt-1">{formData.errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={submitStatus === "success"}
              className="w-full py-3 px-6 rounded-xl text-lg font-bold text-white transition-all duration-300 shadow-lg
                bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 transform hover:scale-[1.01]
                disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center space-x-2"
            >
              {submitStatus === "success" ? (
                <>
                  <span className="animate-pulse">✓</span>
                  <span>Message Sent! We&apos;ll talk soon.</span>
                </>
              ) : <span>Send Inquiry</span>}
            </button>

            {submitStatus === "error" && (
              <p className="text-center text-rose-400 text-sm mt-3">Please fill out all required fields correctly before submitting.</p>
            )}
          </form>
        </section>

        {/* SERVICES */}
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">We Help With <span className="text-cyan-400">Everything Digital</span></h2>
          <p className="text-gray-400 mb-12 max-w-4xl mx-auto">
            Our services cover the entire digital lifecycle, from concept to long-term support.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {servicesData.map(service => <ServiceCard key={service.id} service={service} />)}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Frequently Asked <span className="text-indigo-400">Questions</span></h2>
            <p className="text-gray-400 max-w-3xl mx-auto">Use the search bar to quickly find answers to your questions.</p>
          </div>
          <div className="max-w-3xl mx-auto mb-8 relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 rounded-full bg-gray-800 border border-transparent focus:border-indigo-500 transition duration-300 text-white placeholder-gray-400 shadow-xl"
            />
            <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
          </div>
          <div className="max-w-5xl mx-auto">
            {filteredFAQs.length > 0 ? filteredFAQs.map((faq, index) => (
              <FAQItem key={index} faq={faq} isOpen={activeFAQ === index} onToggle={() => toggleFAQ(index)} />
            )) : (
              <div className="text-center py-12 bg-gray-900/50 rounded-xl">
                <h3 className="text-xl text-yellow-400">No results found for "{searchTerm}&quot;</h3>
                <p className="text-gray-400">Try another keyword or contact us directly.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 bg-gray-900/50 border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-gray-400 text-lg">
            Ready to start? <a href="#" className="text-indigo-400 hover:text-cyan-400 font-bold transition-colors">Book a Free Consultation</a> or send us a message.
          </p>
          <div className="flex justify-center space-x-6 text-gray-400">
            <Link href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer"><FaWhatsapp className="w-6 h-6 hover:text-green-400 transition-colors" /></Link>
            <Link href="#"><FaInstagram className="w-6 h-6 hover:text-pink-500 transition-colors" /></Link>
            <Link href="#"><FaTwitter className="w-6 h-6 hover:text-blue-400 transition-colors" /></Link>
            <Link href="#"><FaLinkedin className="w-6 h-6 hover:text-blue-600 transition-colors" /></Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
