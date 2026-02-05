import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Instagram, 
  MapPin, 
  Phone, 
  Clock, 
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Send,
  ChefHat,
  Award,
  Flame,
  UtensilsCrossed,
  Menu,
  Facebook,
  Twitter,
  Star,
  Quote
} from 'lucide-react';
import { MENU_ITEMS, SOCIAL_POSTS, REVIEWS } from './constants';
import { MenuItem, CartItem } from './types';

// --- ANIMATION VARIANTS ---
const revealLeft: Variants = {
  hidden: { opacity: 0, x: -120 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const revealRight: Variants = {
  hidden: { opacity: 0, x: 120 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2 } 
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

// --- COMPONENTS ---

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative flex flex-col items-center justify-center bg-[#008A45] aspect-[3/4] rounded-full border-[3px] border-[#FF6B00] shadow-xl ${className}`}>
    <div className="flex flex-col items-center justify-center p-1 text-white text-center h-full">
      <div className="flex flex-col items-center flex-1 justify-center">
        <div className="relative mb-0.5">
           <div className="w-6 h-6 border-[1.5px] border-white/80 rounded-full flex items-center justify-center">
              <div className="flex space-x-0.5">
                <div className="w-0.5 h-2 bg-white/80 rounded-full"></div>
                <div className="w-0.5 h-3 bg-white/80 rounded-full scale-y-110"></div>
                <div className="w-0.5 h-2 bg-white/80 rounded-full"></div>
              </div>
           </div>
        </div>
        <div className="w-6 h-px bg-white/30 my-0.5"></div>
        <div className="font-serif font-bold text-[6px] tracking-tight leading-none uppercase">
          Cafe<br/>Verde
        </div>
      </div>
    </div>
  </div>
);

const ReservationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
      setTimeout(() => {
        onClose();
        setStep(1);
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative bg-white w-full max-w-lg rounded-[3.5rem] overflow-hidden shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors z-10">
              <X size={20} />
            </button>

            <div className="p-12 md:p-16">
              {step === 1 ? (
                <>
                  <div className="mb-10 text-center">
                    <span className="text-[#008A45] font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Reservation</span>
                    <h2 className="text-4xl font-serif font-bold tracking-tighter">Secure Your Table</h2>
                  </div>
                  <form onSubmit={handleReserve} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-2">Date</label>
                        <input required type="date" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#008A45] text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-2">Time</label>
                        <input required type="time" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#008A45] text-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-2">Guests</label>
                      <select required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#008A45] text-sm appearance-none">
                        <option>2 People</option>
                        <option>4 People</option>
                        <option>6+ People</option>
                      </select>
                    </div>
                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-[#008A45] text-white py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-[#007038] transition-all shadow-xl mt-4"
                    >
                      {isSubmitting ? "Orchestrating..." : "Confirm Booking"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-[#008A45] rounded-full flex items-center justify-center text-white mx-auto mb-8">
                    <CheckCircle2 size={40} />
                  </motion.div>
                  <h3 className="text-3xl font-serif font-bold mb-4 tracking-tighter">Excellence Awaits.</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Your table has been curated. We look forward to hosting you.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const OrderDrawer: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  cart: CartItem[]; 
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}> = ({ isOpen, onClose, cart, onUpdateQty, onRemove }) => {
  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.priceNum * item.quantity), 0), [cart]);
  const [isOrdered, setIsOrdered] = useState(false);

  const handleOrder = () => {
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-md:max-w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-8 border-b flex justify-between items-center bg-gray-50/50">
              <h2 className="text-2xl font-serif font-bold">Your Curated Feast</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <ShoppingBag size={64} className="mb-6 opacity-10" />
                  <p className="font-serif italic">The table is currently empty.</p>
                </div>
              ) : isOrdered ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <CheckCircle2 size={48} className="text-[#008A45] mb-6" />
                  <h3 className="text-2xl font-serif font-bold mb-2">Order Confirmed</h3>
                  <p className="text-gray-500 text-sm">Our artisans are preparing your selection.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div layout key={item.id} className="flex gap-5 items-center">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif font-bold text-lg">{item.title}</h4>
                      <p className="text-[#008A45] font-bold text-xs">{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-50 px-3 py-2 rounded-xl">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="text-gray-400 hover:text-black"><Minus size={14} /></button>
                      <span className="font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="text-gray-400 hover:text-black"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {!isOrdered && cart.length > 0 && (
              <div className="p-8 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                  <span className="text-3xl font-serif font-bold">PKR {subtotal.toLocaleString()}</span>
                </div>
                <button 
                  onClick={handleOrder}
                  className="w-full bg-[#1a1a1a] text-white py-6 rounded-[2rem] font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-[#FF6B00] transition-all shadow-xl active:scale-95"
                >
                  Initiate Order
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Navbar: React.FC<{ cartCount: number; onOpenCart: () => void; onOpenReserve: () => void }> = ({ cartCount, onOpenCart, onOpenReserve }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'py-3 glass-nav shadow-lg' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4 cursor-pointer group">
          <Logo className="w-10 group-hover:rotate-6 transition-transform" />
          <div className="flex flex-col">
            <span className="text-lg font-serif font-bold tracking-tight text-[#008A45] leading-none">CAFE VERDE</span>
            <span className="text-[7px] tracking-[0.4em] font-sans text-gray-400 font-bold uppercase">Contemporary Fine Dining</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-10">
          {['home', 'story', 'menu', 'chef', 'reviews', 'contact'].map(id => (
            <button 
              key={id} 
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-[#008A45] transition-all"
            >
              {id}
            </button>
          ))}
          <div className="flex items-center space-x-6">
            <button onClick={onOpenCart} className="relative p-2 text-[#008A45] group">
              <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#FF6B00] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={onOpenReserve} className="bg-[#008A45] text-white px-6 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest shadow-xl shadow-emerald-500/10 active:scale-95 transition-all">Book Table</button>
          </div>
        </div>

        <div className="lg:hidden flex items-center space-x-4">
           <button onClick={onOpenCart} className="relative p-2 text-[#008A45]">
             <ShoppingBag size={22} />
             {cartCount > 0 && <span className="absolute top-1 right-1 bg-[#FF6B00] w-2 h-2 rounded-full shadow-lg"></span>}
           </button>
           <button className="p-2 text-[#008A45]"><Menu size={22} /></button>
        </div>
      </div>
    </nav>
  );
};

const SectionHeader: React.FC<{ sub: string; title: string; center?: boolean }> = ({ sub, title, center }) => (
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeInUp}
    className={`mb-12 md:mb-16 ${center ? 'text-center' : ''}`}
  >
    <motion.span 
      className="text-[#FF6B00] font-bold uppercase tracking-[0.5em] text-[9px] mb-3 block"
    >
      {sub}
    </motion.span>
    <motion.h2 
      className="text-3xl md:text-6xl font-serif font-bold tracking-tighter leading-none"
    >
      {title.split(' ').map((word, i) => (
        <span key={i} className={word.includes('.') ? 'text-[#008A45] italic' : ''}>
          {word}{' '}
        </span>
      ))}
    </motion.h2>
  </motion.div>
);

const ChefExcellence: React.FC = () => {
  return (
    <motion.section 
      id="chef" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-150px" }}
      className="py-24 bg-[#FCFCFC] relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={revealLeft} className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[4rem] shadow-2xl group border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=1200" 
                alt="Executive Chef" 
                className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10">
                <span className="text-[#FF6B00] font-bold text-[9px] uppercase tracking-widest block mb-2">Executive Chef</span>
                <h3 className="text-white text-3xl font-serif font-bold tracking-tight">Chef Alessandro Verde</h3>
              </div>
            </div>
            
            <div className="absolute -right-6 -bottom-6 bg-white p-8 rounded-[2.5rem] shadow-2xl hidden md:block border border-gray-50">
              <div className="flex items-center space-x-4 mb-3">
                 <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-[#008A45]"><Award size={20} /></div>
                 <div>
                   <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Accolades</p>
                   <p className="text-xs font-bold">5+ Global Awards</p>
                 </div>
              </div>
              <p className="text-[9px] text-gray-400 leading-relaxed font-medium uppercase tracking-widest max-w-[140px]">
                Dedicated to the purity of ingredients.
              </p>
            </div>
          </motion.div>

          <motion.div variants={revealRight} className="space-y-10 order-1 lg:order-2">
            <SectionHeader sub="The Master" title="Culinary Excellence." />
            
            <motion.p variants={fadeInUp} className="text-gray-500 text-lg leading-relaxed italic font-serif border-l-2 border-[#008A45] pl-6">
              "Cooking is not a task; it is an architectural performance. We don't just cook; we choreograph textures and flavors to create an unforgettable experience."
            </motion.p>

            <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4">
              {[
                { icon: <ChefHat size={24} />, title: "Precision", desc: "Meticulous detail." },
                { icon: <Flame size={24} />, title: "Passion", desc: "Honest craft." },
                { icon: <Award size={24} />, title: "Quality", desc: "Premium sourcing." },
                { icon: <UtensilsCrossed size={24} />, title: "Heritage", desc: "Modern legacy." }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="p-5 border border-gray-100 rounded-2xl hover:border-[#008A45] transition-all bg-white group shadow-sm">
                  <div className="text-[#008A45] mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="text-sm font-serif font-bold mb-1">{item.title}</h4>
                  <p className="text-[9px] text-gray-400 leading-relaxed font-medium uppercase tracking-widest">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const ReviewsSection: React.FC = () => {
  return (
    <motion.section 
      id="reviews" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-24 bg-white relative"
    >
      <div className="container mx-auto px-6">
        <SectionHeader sub="Testimonials" title="Epicurean Voices." center />
        <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div 
              key={review.id}
              variants={i % 2 === 0 ? revealLeft : revealRight}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[3rem] bg-[#F9FAFB] border border-gray-100 relative group overflow-hidden"
            >
              <Quote className="absolute -top-4 -right-4 w-24 h-24 text-gray-200/50 group-hover:text-[#008A45]/10 transition-colors" />
              <div className="flex space-x-1 mb-6">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} className="fill-[#FF6B00] text-[#FF6B00]" />)}
              </div>
              <p className="text-gray-500 font-serif italic text-lg leading-relaxed mb-8">"{review.content}"</p>
              <div>
                <h4 className="font-bold text-gray-900">{review.name}</h4>
                <p className="text-[9px] uppercase tracking-widest font-bold text-[#008A45]">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const InstagramCarousel: React.FC = () => {
  const posts = [...SOCIAL_POSTS, ...SOCIAL_POSTS, ...SOCIAL_POSTS];
  const totalWidth = 350 * SOCIAL_POSTS.length;
  
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionReveal}
      className="py-24 bg-white overflow-hidden relative border-y border-gray-50"
    >
      <div className="container mx-auto px-6 mb-16 text-center">
        <SectionHeader sub="The Gallery" title="Social Pulse." center />
      </div>

      <div className="flex relative items-center">
        <motion.div 
          animate={{ x: [0, -totalWidth] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="flex space-x-6 px-4"
        >
          {posts.map((post, i) => (
            <div key={`${post.id}-${i}`} className="w-72 h-96 flex-shrink-0 relative group rounded-[3rem] overflow-hidden shadow-xl bg-gray-50 border border-gray-100">
              <img src={post.imageUrl} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="Instagram Post" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center p-8 text-center backdrop-blur-sm">
                <div className="text-white">
                  <Instagram size={30} className="mx-auto mb-4 text-[#FF6B00]" />
                  <p className="text-xs font-serif italic mb-6">"{post.caption}"</p>
                  <a href="https://www.instagram.com/cafeverde.hyd/" target="_blank" rel="noreferrer" className="text-[8px] uppercase tracking-[0.4em] font-bold border-b border-white/30 pb-2 inline-block">View Post</a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  return (
    <motion.section 
      id="contact" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-24 bg-[#F9FAFB] relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <SectionHeader sub="Get In Touch" title="Contact Verde." center />

        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div variants={revealLeft} className="lg:col-span-4 space-y-8">
            <div className="space-y-8">
              {[
                { icon: <MapPin />, title: "Location", content: "Autobhan Road, Hyderabad, Sindh" },
                { icon: <Phone />, title: "Inquiries", content: "+92 311 1234567" },
                { icon: <Clock />, title: "Operating Hours", content: "Daily: 12:00 PM — 01:00 AM" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-6 group">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-[#008A45] group-hover:bg-[#008A45] group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#008A45] p-10 rounded-[2.5rem] text-white space-y-4 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl group-hover:bg-white/20 transition-all"></div>
              <h3 className="text-2xl font-serif font-bold">Plan an Event?</h3>
              <p className="text-emerald-500/80 text-sm font-medium">We host exclusive private dinners for up to 50 guests.</p>
              <button className="w-full bg-white text-[#008A45] py-3.5 rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-[#FF6B00] hover:text-white transition-all">
                Event Inquiry
              </button>
            </div>
          </motion.div>

          <motion.div 
            variants={revealRight}
            className="lg:col-span-8 bg-white p-10 md:p-14 rounded-[4rem] shadow-xl border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 ml-4">Full Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-[#008A45] focus:bg-white outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 ml-4">Email Address</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-[#008A45] focus:bg-white outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 ml-4">Your Inquiry</label>
                <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="How can we curate your experience?" className="w-full px-6 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-[#008A45] focus:bg-white outline-none transition-all resize-none"></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={isSending}
                className="w-full bg-[#1a1a1a] text-white py-5 rounded-[2rem] font-bold uppercase tracking-[0.3em] text-[9px] flex items-center justify-center space-x-3 hover:bg-[#FF6B00] transition-all"
              >
                {isSending ? (
                  <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Clock size={16} /></motion.div>
                ) : isSent ? (
                  <div className="flex items-center space-x-2"><CheckCircle2 size={16} /><span>Message Received</span></div>
                ) : (
                  <div className="flex items-center space-x-2"><span>Transmit Inquiry</span><Send size={14} /></div>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="font-sans text-[#1a1a1a] bg-white min-h-screen">
      <Navbar cartCount={totalItems} onOpenCart={() => setIsCartOpen(true)} onOpenReserve={() => setIsReserveOpen(true)} />
      
      <OrderDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onUpdateQty={updateQuantity}
        onRemove={removeItem}
      />

      <ReservationModal isOpen={isReserveOpen} onClose={() => setIsReserveOpen(false)} />

      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FBFBFB]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,138,69,0.03)_0%,_transparent_60%)]"></div>
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center z-10 pt-20">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={revealLeft} className="flex items-center space-x-3 mb-8">
                <span className="w-10 h-px bg-[#FF6B00]"></span>
                <span className="text-[#FF6B00] font-sans font-bold tracking-[0.5em] uppercase text-[9px]">Artisan Gastronomy</span>
              </motion.div>
              <motion.h1 variants={revealLeft} className="text-[10vw] lg:text-[6vw] font-serif font-bold leading-[0.9] mb-10 tracking-tighter">
                Architecture <br />
                <span className="text-[#008A45] italic">of Flavor.</span>
              </motion.h1>
              <motion.p variants={revealLeft} className="text-gray-400 font-sans max-w-sm text-base leading-relaxed mb-12 border-l-4 border-[#008A45] pl-6">
                Where high-end aesthetics meet the heart of fine dining. Experience Hyderabad's most exclusive culinary landmark.
              </motion.p>
              <motion.div variants={revealLeft} className="flex flex-wrap gap-8">
                <button 
                  onClick={() => setIsReserveOpen(true)}
                  className="bg-[#008A45] text-white px-10 py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[9px] shadow-2xl shadow-emerald-500/10 active:scale-95 transition-all"
                >
                  Reserve Experience
                </button>
                <button 
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-b-2 border-gray-900 py-3 font-bold uppercase tracking-[0.3em] text-[9px] hover:text-[#008A45] hover:border-[#008A45] transition-all"
                >
                  Explore Menu
                </button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={revealRight}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-[550px] mx-auto">
                <div className="absolute inset-0 bg-[#008A45]/5 rounded-full blur-[80px]"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover rounded-full border-[15px] border-white shadow-2xl" 
                  alt="Fine Dining" 
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* STORY SECTION */}
        <motion.section 
          id="story" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 bg-white"
        >
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={revealLeft} className="relative group overflow-hidden rounded-[3rem] h-[600px] shadow-2xl">
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" alt="Interior" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 text-white">
                <h3 className="text-4xl font-serif italic mb-2">Space of Luxury.</h3>
                <p className="text-[9px] uppercase tracking-[0.5em] opacity-60 font-bold">The Visionary Core</p>
              </div>
            </motion.div>
            <motion.div variants={revealRight} className="space-y-10">
              <SectionHeader sub="The Vision" title="Elevating Taste." />
              <div className="space-y-6">
                <p className="text-gray-500 text-xl leading-relaxed italic font-serif">"At Cafe Verde, we believe that dining is the highest form of performance art. Our mission is to bridge the gap between architectural precision and organic soul."</p>
                <div className="h-px bg-gray-100 w-24"></div>
                <p className="text-sm text-gray-400 leading-relaxed font-medium uppercase tracking-widest text-balance">
                  Every element, from the hand-carved furniture to the micro-herbs on your plate, is a deliberate choice. We aim to redefine the culinary landscape of Hyderabad by honoring heritage flavors while embracing the avant-garde.
                </p>
                <p className="text-sm text-gray-400 leading-relaxed font-medium uppercase tracking-widest text-balance">
                  Our space is more than a restaurant; it is a sanctuary for the connoisseur, where the rustle of linen and the clink of crystal compose a symphony of refinement. We invite you to lose yourself in an environment where excellence is the only standard.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* MENU SECTION */}
        <section id="menu" className="py-24 bg-[#F8F9FA]">
          <div className="container mx-auto px-6">
            <SectionHeader sub="Selection" title="Our Menu." center />
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {MENU_ITEMS.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  variants={idx % 2 === 0 ? revealLeft : revealRight}
                  whileHover={{ y: -10 }}
                  className="bg-white p-10 rounded-[4rem] shadow-sm hover:shadow-xl transition-all group flex flex-col md:flex-row gap-8 border border-transparent hover:border-gray-50"
                >
                  <div className="relative h-64 md:h-auto md:w-[40%] rounded-[2.5rem] overflow-hidden flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                  </div>
                  <div className="flex-1 flex flex-col py-2">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-3xl font-serif font-bold tracking-tight">{item.title}</h3>
                      <span className="bg-[#008A45] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">{item.recommendation}</span>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                      <p className="text-2xl text-[#FF6B00] font-bold font-serif">{item.price}</p>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 bg-gray-50 px-4 py-1.5 rounded-full">{item.category}</span>
                    </div>
                    <p className="text-gray-400 text-base leading-relaxed mb-8 italic flex-1">{item.description}</p>
                    <button 
                      onClick={() => addToCart(item)}
                      className="w-full py-4 rounded-[1.5rem] bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-[#008A45] transition-all"
                    >
                      Add to Feast
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 text-center">
              <button className="border-2 border-[#1a1a1a] px-12 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#1a1a1a] hover:text-white transition-all">
                View Full Menu
              </button>
            </motion.div>
          </div>
        </section>

        <ChefExcellence />
        <ReviewsSection />
        <InstagramCarousel />
        <ContactUs />

        {/* FOOTER */}
        <motion.footer 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 bg-[#002E17] text-white"
        >
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
              <div className="lg:col-span-1 space-y-6">
                <div className="flex items-center space-x-3">
                  <Logo className="w-10 border-white/20" />
                  <div className="flex flex-col">
                    <span className="text-xl font-serif font-bold tracking-tight text-white">CAFE VERDE</span>
                    <span className="text-[7px] tracking-[0.4em] font-sans text-emerald-500 font-bold uppercase">Contemporary Fine Dining</span>
                  </div>
                </div>
                <p className="text-emerald-500/60 text-sm leading-relaxed max-w-xs">
                  Redefining the fine dining landscape of Hyderabad with artistic gastronomy and architectural luxury.
                </p>
                <div className="flex space-x-5 pt-4">
                  <a href="https://www.instagram.com/cafeverde.hyd/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#FF6B00] hover:border-[#FF6B00] transition-all">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#008A45] hover:border-[#008A45] transition-all">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#008A45] hover:border-[#008A45] transition-all">
                    <Twitter size={18} />
                  </a>
                </div>
              </div>
              
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500">Navigation</h4>
                <ul className="space-y-3 text-[11px] text-white/50 font-bold uppercase tracking-widest">
                  <li onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white cursor-pointer transition-colors">Return Home</li>
                  <li onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white cursor-pointer transition-colors">The Vision</li>
                  <li onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white cursor-pointer transition-colors">Curated Menu</li>
                  <li onClick={() => document.getElementById('chef')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white cursor-pointer transition-colors">The Master</li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500">Reservation</h4>
                <ul className="space-y-3 text-[11px] text-white/50 font-bold uppercase tracking-widest">
                  <li onClick={() => setIsReserveOpen(true)} className="hover:text-white cursor-pointer transition-colors">Book a Table</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Private Events</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Catering</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Gift Vouchers</li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500">Contact</h4>
                <div className="space-y-3 text-[11px] text-white/50 font-bold uppercase tracking-widest">
                   <p className="flex items-center space-x-3"><MapPin size={12} className="text-emerald-500" /> <span>Hyderabad, Pakistan</span></p>
                   <p className="flex items-center space-x-3"><Phone size={12} className="text-emerald-500" /> <span>+92 311 1234567</span></p>
                   <p className="flex items-center space-x-3"><Clock size={12} className="text-emerald-500" /> <span>12 PM - 1 AM Daily</span></p>
                </div>
              </div>
            </div>
            
            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold">© 2026 Cafe Verde Hyderabad. Masterfully Curated.</p>
              <div className="flex space-x-10">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 hover:text-white cursor-pointer transition-colors">Privacy</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 hover:text-white cursor-pointer transition-colors">Terms of Taste</span>
              </div>
            </div>
          </div>
        </motion.footer>
      </main>
    </div>
  );
};

export default App;