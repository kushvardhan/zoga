"use client";

import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { Mail, Phone, MapPin, Search } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- Icon Definitions ---
const IconCode: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

const IconFeather: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 17h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4"/>
    <path d="M18 13V9"/>
    <path d="M13 18h-4"/>
  </svg>
);

const IconLayout: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
);

const IconVideo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 8.5-6 4.5 6 4.5V8.5z"/>
    <path d="M2 17.5V6.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 0 0 1-2-2z"/>
  </svg>
);

const IconWriting: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
  </svg>
);

const IconChevronDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  message: string;
  talkSwitch: boolean;
  errors: { [key: string]: string | undefined };
}

const initialFormState: FormState = {
  name: "",
  email: "",
  message: "",
  talkSwitch: false,
  errors: {}
};

// --- Components ---
interface ServiceCardProps { service: Service }
const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = service.icon;
  return (
    <div className="p-6 rounded-2xl shadow-2xl backdrop-blur-sm bg-white/10 dark:bg-gray-800/60 border border-transparent hover:border-indigo-500 transition-all duration-500 ease-in-out transform hover:scale-[1.03] hover:shadow-indigo-500/20 cursor-pointer">
      <div className={`p-3 rounded-full inline-block mb-4 ${service.color} bg-gray-100/20 dark:bg-gray-700/40 transition duration-500 hover:rotate-12`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.name}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{service.description}</p>
    </div>
  );
};

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, onToggle }) => (
  <div className="border-b border-gray-300/20 dark:border-gray-700 overflow-hidden cursor-pointer group transition-all duration-300 rounded-lg hover:bg-gray-100/20 dark:hover:bg-gray-800/50 mb-2" onClick={onToggle}>
    <div className="flex justify-between items-center p-4 sm:p-6">
      <h4 className={`text-lg font-semibold transition-colors duration-300 ${isOpen ? "text-indigo-500 dark:text-cyan-400" : "text-gray-900 dark:text-white"}`}>{faq.q}</h4>
      <div className={`p-1 rounded-full bg-gray-100/20 dark:bg-gray-800/50 text-indigo-500 dark:text-cyan-400 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
        <IconChevronDown className="w-5 h-5" />
      </div>
    </div>
    <div className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100 p-4 sm:p-6 pt-0" : "max-h-0 opacity-0 p-0"}`}>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-indigo-500 dark:border-cyan-400 pl-4">{faq.a}</p>
    </div>
  </div>
);

// --- Main App ---
const App: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

const [talkAboutServices, setTalkAboutServices] = useState(false);

  // --- Form state for simple query ---
  const [simpleForm, setSimpleForm] = useState({
    name: "",
    email: "",
    message: "",
    errors: {} as { [key: string]: string },
  });

  // --- Form state for services form ---
  const [serviceForm, setServiceForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [otherService, setOtherService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const servicesList = ["Web Development", "App Development", "UI/UX Design", "Video Production", "Content Writing", "Other"];

  // --- Handlers ---
  const handleSimpleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  setSimpleForm(prev => {
    const updatedErrors = { ...prev.errors };
    delete updatedErrors[name];

    return { ...prev, [name]: value, errors: updatedErrors };
  });
};


  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setServiceForm(prev => ({ ...prev, [name]: value }));
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  // --- Submit Handlers ---
  const handleSimpleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate
    const errors: { [key: string]: string } = {};
    if (!simpleForm.name.trim()) errors.name = "Name is required";
    if (!simpleForm.email.trim()) errors.email = "Email is required";
    if (!simpleForm.message.trim()) errors.message = "Message is required";

    if (Object.keys(errors).length) {
      setSimpleForm(prev => ({ ...prev, errors }));
      return;
    }

    console.log("Simple Query Submitted:", simpleForm);
    setSimpleForm({ name: "", email: "", message: "", errors: {} });
  };

  const handleServiceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const services = selectedServices.includes("Other")
      ? [...selectedServices.filter(s => s !== "Other"), otherService].join(", ")
      : selectedServices.join(", ");

    const payload = {
      name: `${serviceForm.firstName} ${serviceForm.lastName}`.trim(),
      email: serviceForm.email,
      phone: serviceForm.phone,
      message: serviceForm.message,
      services,
    };

    console.log("Service Form Submitted:", payload);
    setIsSubmitting(false);
    setServiceForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    setSelectedServices([]);
    setOtherService("");
  };


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
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-950"></div>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-2/3 h-1/2 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl opacity-20 animate-pulse-slow delay-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white relative font-sans pt-20">

      <main className="container mx-auto px-4 py-12 space-y-24 relative z-10">
        <Navbar />

        {/* HERO */}
        <section className="text-center max-w-4xl mx-auto px-4 py-16 relative z-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400 animate-fadeInUp">
            Get in Touch With Our Team
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 animate-fadeIn delay-300">
            Have a project in mind? Fill out the form and we will help you bring it to life. We respond within 24 hours.
          </p>
        </section>

        <section className="container mx-auto px-4 py-16">
  <div className="grid md:grid-cols-2 gap-12 items-start">

    {/* LEFT — CONTACT INFO */}
    <div className="p-8 rounded-3xl shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
        Start Your <span className="text-indigo-500 dark:text-cyan-400">Query</span>
      </h2>

      <p className="text-gray-600 dark:text-gray-300 border-l-4 border-indigo-500 dark:border-cyan-400 pl-4">
        Use the form to describe your needs. We aim to respond within 24 hours.
      </p>

      <div className="space-y-6">

        {/* EMAIL */}
        <div className="flex items-center gap-4">
          <Mail className="w-7 h-7 text-indigo-500 dark:text-cyan-400" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Us</h3>
            <p className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-cyan-400 transition">
              hello@zoga-agency.com
            </p>
          </div>
        </div>

        {/* PHONE */}
        <div className="flex items-center gap-4">
          <Phone className="w-7 h-7 text-indigo-500 dark:text-cyan-400" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Call Us</h3>
            <p className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-cyan-400 transition">
              +1 (555) 123-4567
            </p>
          </div>
        </div>

        {/* WHATSAPP */}
        <div className="flex items-center gap-4">
          <FaWhatsapp className="w-7 h-7 text-green-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">WhatsApp</h3>
            <Link
              href="https://wa.me/15551234567"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition"
            >
              Chat with us
            </Link>
          </div>
        </div>

        {/* LOCATION */}
        <div className="flex items-center gap-4">
          <MapPin className="w-7 h-7 text-indigo-500 dark:text-cyan-400" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Global Office</h3>
            <p className="text-gray-600 dark:text-gray-300">
              123 Digital Way, Suite 404, Tech City, TX 78701
            </p>
          </div>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-4 pt-4">
          <Link
            href="https://wa.me/15551234567"
            target="_blank"
            className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition"
          >
            <FaWhatsapp className="w-6 h-6" />
          </Link>
          <Link
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-pink-500 transition"
          >
            <FaInstagram className="w-6 h-6" />
          </Link>
          <Link
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-400 transition"
          >
            <FaTwitter className="w-6 h-6" />
          </Link>
          <Link
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
          >
            <FaLinkedin className="w-6 h-6" />
          </Link>
        </div>

      </div>
    </div>

    {/* RIGHT — FORMS WITH SWITCH */}
    <div className="w-full">
      <h2 className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        {talkAboutServices ? "Talk About Services" : "Have a Question?"}
      </h2>

      {/* SWITCH BUTTONS */}
      <div className="text-center mb-10">
        <button
          onClick={() => setTalkAboutServices(false)}
          className={`px-6 py-2 rounded-xl mr-4 text-sm font-semibold transition
            ${
              !talkAboutServices
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
            }`}
        >
          General Query
        </button>

        <button
          onClick={() => setTalkAboutServices(true)}
          className={`px-6 py-2 rounded-xl text-sm font-semibold transition
            ${
              talkAboutServices
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
            }`}
        >
          Talk About Services
        </button>
      </div>

      {/* FORM AREA */}
      <div className="max-w-xl mx-auto">
        {talkAboutServices ? (
          /** SERVICE FORM **/
          <form
            onSubmit={handleServiceSubmit}
            className="space-y-6 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" name="firstName" value={serviceForm.firstName} onChange={handleServiceChange} className="p-3 rounded-xl border w-full" required />
              <input type="text" placeholder="Last Name" name="lastName" value={serviceForm.lastName} onChange={handleServiceChange} className="p-3 rounded-xl border w-full" />
            </div>

            <input type="email" placeholder="Email" name="email" value={serviceForm.email} onChange={handleServiceChange} className="p-3 rounded-xl border w-full" required />
            <input type="tel" placeholder="Phone" name="phone" value={serviceForm.phone} onChange={handleServiceChange} className="p-3 rounded-xl border w-full" />

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Services</label>
              {servicesList.map(service => (
                <label key={service} className="flex items-center gap-2">
                  <input type="checkbox" checked={selectedServices.includes(service)} onChange={() => toggleService(service)} />
                  <span>{service}</span>
                </label>
              ))}
              {selectedServices.includes("Other") && (
                <input type="text" placeholder="Specify your service" value={otherService} onChange={(e) => setOtherService(e.target.value)} className="p-3 rounded-xl border w-full mt-2" />
              )}
            </div>

            <textarea placeholder="Tell us about your project..." name="message" value={serviceForm.message} onChange={handleServiceChange} rows={4} className="p-3 rounded-xl border w-full" />

            <button type="submit" className="w-full py-3 bg-indigo-500 text-white rounded-xl font-semibold" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        ) : (
          /** SIMPLE QUERY FORM **/
          <form
            onSubmit={handleSimpleSubmit}
            className="space-y-6 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800"
          >
            <input type="text" placeholder="Full Name" name="name" value={simpleForm.name} onChange={handleSimpleChange} className="p-3 rounded-xl border w-full" required />
            <input type="email" placeholder="Email" name="email" value={simpleForm.email} onChange={handleSimpleChange} className="p-3 rounded-xl border w-full" required />
            <textarea placeholder="Your message" name="message" value={simpleForm.message} onChange={handleSimpleChange} rows={4} className="p-3 rounded-xl border w-full" required />

            <button type="submit" className="w-full py-3 bg-indigo-500 text-white rounded-xl font-semibold">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>

  </div>
</section>


        {/* SERVICES */}
        <section className="text-center max-w-6xl mx-auto px-4 py-16 space-y-12 relative z-10">
          <h2 className="text-4xl font-bold mb-8">Our <span className="text-indigo-500 dark:text-cyan-400">Services</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-6 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-8">Frequently Asked <span className="text-indigo-500 dark:text-cyan-400">Questions</span></h2>
          <div className="mb-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search FAQs..."
                className="w-full p-3 pl-10 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <Search className="absolute top-3 left-3 w-5 h-5 text-gray-400 dark:text-gray-300" />
            </div>
          </div>
          <div className="space-y-2">
            {filteredFAQs.map((faq, index) => (
              <FAQItem key={index} faq={faq} isOpen={activeFAQ === index} onToggle={() => toggleFAQ(index)} />
            ))}
          </div>
        </section>
        
      </main>
      <Footer/>
    </div>
  );
};

export default App;

