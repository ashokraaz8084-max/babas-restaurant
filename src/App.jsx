import React, { useState, useEffect } from 'react';
import { 
  MapPin, Phone, Clock, Star, Menu as MenuIcon, X, 
  ChevronRight, Instagram, Facebook, Utensils, Calendar, 
  MessageCircle, ArrowRight, Quote, Info
} from 'lucide-react';

// --- DATA ---

const RESTAURANT_INFO = {
  name: "Baba's Restaurant",
  address: "80, DXB Tower, Sheikh Zayed Road (South - 80 Sheikh Zayed Rd - next to Four Points by Sheraton - Dubai - United Arab Emirates)",
  phone: "+971 58 156 8931",
  whatsapp: "971581568931"
};

const MENU_CATEGORIES = [
  {
    title: "Chicken Curries",
    items: [
      { name: "Baba Special Butter Chicken", price: 64, desc: "Our signature creamy tomato and butter gravy." },
      { name: "Kadai Chicken", price: 59, desc: "Spicy chicken cooked with bell peppers and whole spices." },
      { name: "Palak Chicken", price: 59, desc: "Tender chicken simmered in a rich spinach pureé." },
      { name: "Rara Chicken", price: 59, desc: "Flavorful minced chicken and chicken pieces cooked together." },
      { name: "Keema Chicken", price: 59, desc: "Spiced minced chicken delicacy." },
      { name: "Kali Mirchi Chicken", price: 59, desc: "Chicken cooked in a rich black pepper gravy." }
    ]
  },
  {
    title: "Mutton Curries",
    items: [
      { name: "Mutton Rogan Josh", price: 59, desc: "Classic Kashmiri style aromatic lamb curry." }
    ]
  },
  {
    title: "Chicken Starters",
    items: [
      { name: "Non Veg Grill Mix Platter", price: 79, desc: "A royal assortment of our finest grilled meats." },
      { name: "Chicken Seekh Kabab", price: 59 },
      { name: "Baba's Fried Chicken", price: 59 },
      { name: "Chilli Chicken", price: 59 },
      { name: "Chicken Tikka", price: 59 },
      { name: "Chicken Afghani Tikka", price: 59 },
      { name: "Chicken Malai Tikka", price: 59 }
    ]
  },
  {
    title: "Fish & Prawns",
    items: [
      { name: "Baba's Fry Fish", price: 64, desc: "Signature crispy fried fish." },
      { name: "Fish Belle", price: 59 },
      { name: "Tandoori Fish", price: 59, desc: "Fish marinated in spices and yogurt, grilled in tandoor." }
    ]
  },
  {
    title: "Vegetarian Starters",
    items: [
      { name: "Veg Grill Mix Platter", price: 69, desc: "Assorted vegetarian tandoori delicacies." },
      { name: "Dahi Ke Kebab", price: 49 },
      { name: "Paneer Tikka", price: 49 },
      { name: "Soya Afghani", price: 49 },
      { name: "Soya Lemon Chaap", price: 49 },
      { name: "Tandoori Aloo", price: 49 },
      { name: "Beetroot Kebab", price: 49 },
      { name: "Spinach Corn Roll", price: 49 },
      { name: "Soya Malai Chaap", price: 49 },
      { name: "Honey Chilli Potato", price: 49 }
    ]
  },
  {
    title: "Vegetarian Curries",
    items: [
      { name: "Baba Special Butter Paneer", price: 59, desc: "Cottage cheese in our signature buttery tomato gravy." },
      { name: "Dal Makhani", price: 49, desc: "Slow-cooked black lentils, rich and creamy." },
      { name: "Kali Mirchi Paneer", price: 49 },
      { name: "Kadai Paneer", price: 49 },
      { name: "Dal Fry Yellow", price: 44 },
      { name: "Yellow Punjabi Tadka Dal", price: 44 }
    ]
  },
  {
    title: "Rice & Biryani",
    items: [
      { name: "Chicken Firdous Biryani", price: 64, desc: "Aromatic basmati rice cooked with spiced chicken." }
    ]
  },
  {
    title: "Soups & Beverages",
    items: [
      { name: "Non Veg Manchow Soup", price: 34 },
      { name: "Veg Sweet Corn Soup", price: 24 },
      { name: "Tomato Soup", price: 24 },
      { name: "Water", price: 10 }
    ]
  },
  {
    title: "Special Boxes & Rolls",
    items: [
      { name: "Platinum Ramadan Special", price: 199, desc: "The ultimate premium dining experience box." },
      { name: "Golden Ramadan Special Box", price: 99 },
      { name: "Special Biryani Box", price: 34 },
      { name: "Chicken Malai Tikka Roll", price: 34 }
    ]
  }
];

const REVIEWS = [
  { name: "Ahmed Al Maktoum", text: "The Baba Special Butter Chicken is arguably the best in Dubai. The ambience is pure luxury.", rating: 5 },
  { name: "Sarah Jenkins", text: "Exceptional service and the Firdous Biryani took me back to India. Highly recommended!", rating: 5 },
  { name: "Faisal R.", text: "Perfect spot on Sheikh Zayed Road. The Non-Veg Mix Platter is a must-try for meat lovers.", rating: 4 },
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

// --- ANIMATION WRAPPER ---
const FadeIn = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {children}
    </div>
  );
};

// --- COMPONENTS ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleWhatsAppOrder = () => {
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hello!%20I%20would%20like%20to%20place%20an%20order%20at%20Baba's%20Restaurant.`, '_blank');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-amber-500/30">
      
      {/* CSS For custom animations simulating Framer Motion */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        h1, h2, h3, h4, .font-serif { font-family: 'Playfair Display', serif; }
        body { font-family: 'Inter', sans-serif; }
        .glass-nav { background: rgba(9, 9, 11, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(245, 158, 11, 0.1); }
        .hover-gold-glow:hover { box-shadow: 0 0 20px rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.5); }
        .menu-scroll::-webkit-scrollbar { width: 4px; }
        .menu-scroll::-webkit-scrollbar-track { background: transparent; }
        .menu-scroll::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 4px; }
      `}} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer flex items-center gap-2" onClick={() => setCurrentPage('home')}>
              <Utensils className="h-8 w-8 text-amber-500" />
              <span className="font-serif text-2xl font-bold tracking-wider text-white">BABA'S</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                    currentPage === link.id ? 'text-amber-500 font-semibold' : 'text-zinc-400 hover:text-amber-400'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button 
                onClick={() => setIsReservationOpen(true)}
                className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded-sm text-sm uppercase tracking-wider font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Reserve
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-zinc-300 hover:text-amber-500 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden absolute w-full bg-zinc-900 border-b border-amber-900/30 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 pt-2 pb-6 space-y-2 shadow-2xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                  currentPage === link.id ? 'text-amber-500 bg-zinc-800/50' : 'text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/30'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => { setIsReservationOpen(true); setIsMobileMenuOpen(false); }}
              className="block w-full text-center mt-4 bg-amber-600 text-white px-4 py-3 rounded-sm font-semibold uppercase tracking-wider"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-20">
        {currentPage === 'home' && <HomePage setPage={setCurrentPage} openReservation={() => setIsReservationOpen(true)} handleWhatsAppOrder={handleWhatsAppOrder} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'menu' && <MenuPage handleWhatsAppOrder={handleWhatsAppOrder} />}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'reviews' && <ReviewsPage />}
        {currentPage === 'contact' && <ContactPage handleWhatsAppOrder={handleWhatsAppOrder} />}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="h-6 w-6 text-amber-500" />
                <span className="font-serif text-xl font-bold tracking-wider text-white">BABA'S</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-sm">
                Experience the pinnacle of Indian culinary excellence in the heart of Dubai. Luxury dining meets authentic flavors.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:bg-zinc-800 transition-all">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:bg-zinc-800 transition-all">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-serif text-lg text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map(link => (
                  <li key={`footer-${link.id}`}>
                    <button onClick={() => setCurrentPage(link.id)} className="text-zinc-400 hover:text-amber-500 text-sm transition-colors">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg text-white mb-4">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-zinc-400 text-sm">{RESTAURANT_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-amber-500 shrink-0" />
                  <span className="text-zinc-400 text-sm">{RESTAURANT_INFO.phone}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-600 text-sm">© 2026 Baba's Restaurant Dubai. All rights reserved.</p>
            <p className="text-zinc-600 text-sm mt-2 md:mt-0">Designed for Luxury Dining</p>
          </div>
        </div>
      </footer>

      {/* Reservation Modal */}
      {isReservationOpen && (
        <ReservationModal onClose={() => setIsReservationOpen(false)} />
      )}
      
      {/* Floating WhatsApp Button */}
      <button 
        onClick={handleWhatsAppOrder}
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="Order on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute right-16 bg-zinc-900 text-white text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-zinc-800 shadow-xl">
          Order Online
        </span>
      </button>
    </div>
  );
}

// --- PAGE COMPONENTS ---

function HomePage({ setPage, openReservation, handleWhatsAppOrder }) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Restaurant Interior" 
            className="w-full h-full object-cover opacity-40 scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <FadeIn delay={100}>
            <span className="text-amber-500 tracking-[0.3em] text-sm uppercase font-semibold mb-4 block">Welcome to</span>
          </FadeIn>
          <FadeIn delay={300}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 drop-shadow-2xl">
              BABA'S
            </h1>
          </FadeIn>
          <FadeIn delay={500}>
            <p className="text-lg md:text-2xl text-zinc-300 mb-10 font-light italic">
              A Symphony of Authentic Flavors in the Heart of Dubai.
            </p>
          </FadeIn>
          <FadeIn delay={700}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={openReservation}
                className="w-full sm:w-auto px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold uppercase tracking-wider text-sm transition-all duration-300 transform hover:scale-105 rounded-sm"
              >
                Reserve a Table
              </button>
              <button 
                onClick={() => setPage('menu')}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white font-semibold uppercase tracking-wider text-sm transition-all duration-300 rounded-sm"
              >
                View Menu
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Signature Creations</h2>
              <div className="h-1 w-20 bg-amber-500 mx-auto rounded"></div>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Baba Special Butter Chicken", img: GALLERY_IMAGES[1], price: "dh64" },
              { title: "Non Veg Grill Mix Platter", img: GALLERY_IMAGES[2], price: "dh79" },
              { title: "Chicken Firdous Biryani", img: GALLERY_IMAGES[3], price: "dh64" }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 200}>
                <div className="group cursor-pointer rounded-lg overflow-hidden border border-zinc-900 bg-zinc-900/50 hover-gold-glow transition-all duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-amber-500 px-3 py-1 font-semibold rounded text-sm border border-amber-500/30">
                      {item.price}
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-serif text-xl text-white mb-2 group-hover:text-amber-500 transition-colors">{item.title}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-amber-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 mb-3 opacity-80" />
              <h4 className="font-bold uppercase tracking-wider mb-1">Opening Hours</h4>
              <p className="text-sm opacity-90">Daily: 12:00 PM - 1:00 AM</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 mb-3 opacity-80" />
              <h4 className="font-bold uppercase tracking-wider mb-1">Location</h4>
              <p className="text-sm opacity-90 text-balance">DXB Tower, Sheikh Zayed Road, Dubai</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h4 className="font-bold uppercase tracking-wider mb-3">Dine At Home</h4>
              <button onClick={handleWhatsAppOrder} className="bg-black text-white px-6 py-2 rounded-sm text-sm uppercase tracking-wider font-semibold hover:bg-zinc-900 transition-colors flex items-center gap-2">
                Order via WhatsApp <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="w-full py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Our Story</h1>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded"></div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <FadeIn delay={200}>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Restaurant Ambience" 
              className="rounded-lg shadow-2xl border border-zinc-800"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-amber-500 rounded-lg -z-10 hidden md:block"></div>
          </div>
        </FadeIn>
        <FadeIn delay={400}>
          <div>
            <h2 className="text-3xl font-serif text-amber-500 mb-6">A Legacy of Taste in Dubai</h2>
            <p className="text-zinc-400 mb-6 leading-relaxed text-lg">
              Located in the prestigious DXB Tower on Sheikh Zayed Road, Baba's Restaurant brings the rich, authentic flavors of traditional Indian cuisine to the modern landscape of Dubai. 
            </p>
            <p className="text-zinc-400 mb-6 leading-relaxed text-lg">
              Our journey began with a simple philosophy: to serve food that touches the soul. Every spice is handpicked, every recipe is a guarded secret passed down through generations, and every dish is a masterpiece designed to provide a royal dining experience.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="border-l-2 border-amber-500 pl-4">
                <h4 className="text-white font-bold text-xl">10+</h4>
                <p className="text-zinc-500 text-sm uppercase tracking-wider">Years of Excellence</p>
              </div>
              <div className="border-l-2 border-amber-500 pl-4">
                <h4 className="text-white font-bold text-xl">50+</h4>
                <p className="text-zinc-500 text-sm uppercase tracking-wider">Signature Dishes</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Chef Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row-reverse">
        <FadeIn delay={300}>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Master Chef" 
              className="rounded-lg shadow-2xl border border-zinc-800 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </FadeIn>
        <FadeIn delay={500}>
          <div>
            <h2 className="text-3xl font-serif text-amber-500 mb-6">Meet The Culinary Mastermind</h2>
            <p className="text-zinc-400 mb-6 leading-relaxed text-lg">
              Our Head Chef brings over two decades of culinary mastery to Baba's Restaurant. Training in the royal kitchens of India, he has perfected the art of balancing robust spices with delicate flavors.
            </p>
            <p className="text-zinc-400 mb-8 leading-relaxed text-lg">
              "Cooking is not just about ingredients; it's about the passion and history poured into every simmering pot. At Baba's, we don't just serve meals; we serve memories."
            </p>
            <div className="flex items-center gap-4">
               <div className="h-[1px] w-12 bg-amber-500"></div>
               <p className="font-serif text-white italic text-xl">Head Chef</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function MenuPage({ handleWhatsAppOrder }) {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].title);

  return (
    <div className="w-full min-h-screen bg-zinc-950 pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Our Menu</h1>
            <p className="text-zinc-400 max-w-2xl mx-auto">Discover our carefully curated selection of authentic dishes, prepared with the finest ingredients.</p>
          </div>
        </FadeIn>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Menu Sidebar (Categories) */}
          <div className="lg:w-1/4">
            <div className="sticky top-28 bg-zinc-900/50 rounded-lg p-2 border border-zinc-800/50 flex lg:flex-col overflow-x-auto menu-scroll">
              {MENU_CATEGORIES.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat.title)}
                  className={`whitespace-nowrap lg:whitespace-normal text-left px-6 py-4 rounded-md transition-all duration-300 font-medium ${
                    activeCategory === cat.title 
                      ? 'bg-amber-600 text-white shadow-lg' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:w-3/4 min-h-[60vh]">
            <FadeIn key={activeCategory}>
              <div className="bg-zinc-900/30 rounded-xl p-6 md:p-8 border border-zinc-800">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-6 mb-8">
                   <h2 className="text-3xl font-serif text-amber-500">{activeCategory}</h2>
                   <button onClick={handleWhatsAppOrder} className="hidden sm:flex text-sm bg-zinc-800 hover:bg-amber-600 text-white px-4 py-2 rounded transition-colors items-center gap-2">
                     <MessageCircle className="h-4 w-4" /> Order Now
                   </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {MENU_CATEGORIES.find(c => c.title === activeCategory)?.items.map((item, idx) => (
                    <div key={idx} className="group flex flex-col justify-between border-b border-zinc-800/50 pb-4 hover:border-amber-500/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-white group-hover:text-amber-400 transition-colors pr-4">{item.name}</h3>
                        <span className="text-amber-500 font-serif font-bold whitespace-nowrap">dh {item.price}</span>
                      </div>
                      {item.desc && (
                        <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">{item.desc}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryPage() {
  return (
    <div className="w-full py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Gallery</h1>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded"></div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERY_IMAGES.map((img, idx) => (
          <FadeIn key={idx} delay={idx * 150}>
            <div className="group relative aspect-square overflow-hidden rounded-lg bg-zinc-900 cursor-pointer">
              <img 
                src={img} 
                alt={`Gallery image ${idx + 1}`} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-serif tracking-wider">Baba's Experience</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function ReviewsPage() {
  return (
    <div className="w-full py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Guest Experiences</h1>
          <p className="text-zinc-400">What our esteemed guests say about us.</p>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded mt-6"></div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REVIEWS.map((review, idx) => (
          <FadeIn key={idx} delay={idx * 200}>
            <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 relative hover-gold-glow transition-all duration-500 h-full flex flex-col">
              <Quote className="absolute top-6 right-6 h-12 w-12 text-zinc-800" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-zinc-700'}`} />
                ))}
              </div>
              <p className="text-zinc-300 mb-8 flex-grow relative z-10 leading-relaxed text-lg italic">
                "{review.text}"
              </p>
              <div>
                <div className="h-px w-full bg-zinc-800 mb-4"></div>
                <p className="font-serif text-white font-semibold">{review.name}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function ContactPage({ handleWhatsAppOrder }) {
  return (
    <div className="w-full py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Contact Us</h1>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded"></div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-zinc-900/40 rounded-2xl overflow-hidden border border-zinc-800">
        
        {/* Contact Info */}
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-serif text-amber-500 mb-8">Get In Touch</h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-zinc-800 p-3 rounded-full text-amber-500 shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Location</h4>
                <p className="text-zinc-400 leading-relaxed">{RESTAURANT_INFO.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-zinc-800 p-3 rounded-full text-amber-500 shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Phone</h4>
                <p className="text-zinc-400">{RESTAURANT_INFO.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-zinc-800 p-3 rounded-full text-amber-500 shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Hours</h4>
                <p className="text-zinc-400">Monday - Sunday<br/>12:00 PM - 1:00 AM</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
             <button onClick={handleWhatsAppOrder} className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-sm font-semibold flex items-center justify-center gap-2 transition-colors">
               <MessageCircle className="h-5 w-5" /> WhatsApp Order
             </button>
             <a href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, '')}`} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 py-3 rounded-sm font-semibold flex items-center justify-center gap-2 transition-colors">
               <Phone className="h-5 w-5" /> Call Now
             </a>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="h-96 lg:h-auto bg-zinc-800 relative group">
           {/* Simulate a map with an image to avoid complex iframe embed issues in sandbox, but style it nicely */}
           <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Map location" 
              className="w-full h-full object-cover opacity-50 mix-blend-overlay"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/40 group-hover:bg-zinc-950/20 transition-all">
              <MapPin className="h-12 w-12 text-amber-500 mb-4 animate-bounce" />
              <span className="bg-black/80 px-4 py-2 rounded text-white font-semibold shadow-xl border border-zinc-700">DXB Tower, Sheikh Zayed Road</span>
            </div>
        </div>
      </div>
    </div>
  );
}

// --- MODALS ---

function ReservationModal({ onClose }) {
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => onClose(), 2500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-zinc-900 border border-amber-500/30 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-[fade-in-up_0.3s_ease-out]">
        
        <div className="p-6 md:p-8">
          <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
          
          <h2 className="text-3xl font-serif text-white mb-2">Reserve a Table</h2>
          <p className="text-zinc-400 mb-8 text-sm">Experience luxury dining. Secure your spot today.</p>

          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 fill-green-500" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">Reservation Request Sent!</h3>
              <p className="text-zinc-400">Our team will contact you shortly to confirm your booking.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Full Name</label>
                <input required type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Phone</label>
                  <input required type="tel" className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="+971..." />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Guests</label>
                  <select className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none">
                    {[1,2,3,4,5,6,7,8,"9+"].map(n => <option key={n} value={n}>{n} People</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Date</label>
                  <div className="relative">
                    <input required type="date" className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Time</label>
                  <input required type="time" className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none" />
                </div>
              </div>
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-semibold uppercase tracking-wider py-4 rounded transition-colors"
                >
                  {status === 'submitting' ? 'Processing...' : 'Confirm Reservation'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}