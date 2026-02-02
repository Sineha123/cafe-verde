import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Instagram, 
  MapPin, 
  Phone, 
  ChevronRight, 
  ArrowRight, 
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
  Calendar,
  Users,
  Menu,
  Facebook,
  Twitter
} from 'lucide-react';
import { MENU_ITEMS, GALLERY_IMAGES, SOCIAL_POSTS, MENU_CATEGORIES } from './constants';
import { MenuItem, CartItem } from './types';

// --- ANIMATION VARIANTS ---
const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerChildren: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15 } 
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

// --- COMPONENTS ---

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative flex flex-col items-center justify-center bg-[#008A45] aspect-[3/4] rounded-full border-[4px] border-[#FF6B00] shadow-xl ${className}`}>
    <div className="flex flex-col items-center justify-center p-1 text-white text-center h-full">
      <div className="flex flex-col items-center flex-1 justify-center">
        <div className="relative mb-1">
           <div className="w-8 h-8 border-[1.5px] border-white/80 rounded-full flex items-center justify-center">
              <div className="flex space-x-0.5">
                <div className="w-0.5 h-3 bg-white/80 rounded-full"></div>
                <div className="w-0.5 h-4 bg-white/80 rounded-full scale-y-110"></div>
                <div className="w-0.5 h-3 bg-white/80 rounded-full"></div>
              </div>
           </div>
        </div>
        <div className="w-8 h-px bg-white/30 my-1"></div>
        <div className="font-serif font-bold text-[8px] tracking-tight leading-none uppercase">
          Cafe<br/>Verde
        </div>
      </div>
    </div>
  </div>
);

const CustomCursor: React.FC<{ label: string | null }> = ({ label }) => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference hidden md:flex"
      animate={{ 
        x: mousePos.x - 16, 
        y: mousePos.y - 16,
        scale: label ? 6 : 1 
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
    >
      <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
        <AnimatePresence>
          {label && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[4px] font-bold text-black uppercase tracking-tighter text-center px-1"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

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
          <Logo className="w-11 group-hover:rotate-6 transition-transform" />
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold tracking-tight text-[#008A45] leading-none">CAFE VERDE</span>
            <span className="text-[8px] tracking-[0.4em] font-sans text-gray-400 font-bold uppercase">Contemporary Fine Dining</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-12">
          {['home', 'story', 'menu', 'chef', 'contact'].map(id => (
            <button 
              key={id} 
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-gray-900 transition-colors"
            >
              {id}
            </button>
          ))}
          <div className="flex items-center space-x-8">
            <button onClick={onOpenCart} className="relative p-2 text-[#008A45] group">
              <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#FF6B00] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={onOpenReserve} className="bg-[#008A45] text-white px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">Book Table</button>
          </div>
        </div>

        <div className="lg:hidden flex items-center space-x-4">
           <button onClick={onOpenCart} className="relative p-2 text-[#008A45]">
             <ShoppingBag size={24} />
             {cartCount > 0 && <span className="absolute top-1 right-1 bg-[#FF6B00] w-2 h-2 rounded-full shadow-lg"></span>}
           </button>
           <button className="p-2 text-[#008A45]"><Menu size={24} /></button>
        </div>
      </div>
    </nav>
  );
};

const SectionHeader: React.FC<{ sub: string; title: string; center?: boolean }> = ({ sub, title, center }) => (
  <div className={`mb-16 md:mb-20 ${center ? 'text-center' : ''}`}>
    <motion.span 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-[#FF6B00] font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block"
    >
      {sub}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-7xl font-serif font-bold tracking-tighter leading-none"
    >
      {title.split(' ').map((word, i) => (
        <span key={i} className={word.includes('.') ? 'text-[#008A45] italic' : ''}>
          {word}{' '}
        </span>
      ))}
    </motion.h2>
  </div>
);

const ChefExcellence: React.FC = () => {
  return (
    <motion.section 
      id="chef" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionReveal}
      className="py-32 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1595273670150-db0a3d39074f?auto=format&fit=crop&q=80&w=1200" 
                alt="Executive Chef portrait" 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12">
                <span className="text-[#FF6B00] font-bold text-[10px] uppercase tracking-widest block mb-2">Executive Chef</span>
                <h3 className="text-white text-3xl font-serif font-bold tracking-tight">Chef Alessandro Verde</h3>
              </div>
            </div>
            
            <div className="absolute -right-8 -bottom-8 bg-white p-8 rounded-[2rem] shadow-2xl hidden md:block border border-gray-100">
              <div className="flex items-center space-x-4 mb-4">
                 <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-[#008A45]"><Award size={24} /></div>
                 <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Accolades</p>
                   <p className="text-sm font-bold">5+ Global Awards</p>
                 </div>
              </div>
              <div className="w-full h-px bg-gray-100 my-4"></div>
              <p className="text-[10px] text-gray-400 leading-relaxed font-medium uppercase tracking-widest max-w-[150px]">
                Dedicated to the purity of ingredients and the art of plating.
              </p>
            </div>
          </motion.div>

          <div className="space-y-12 order-1 lg:order-2">
            <SectionHeader sub="The Master" title="Culinary Excellence." />
            
            <motion.p variants={fadeInUp} className="text-gray-500 text-xl leading-relaxed italic font-serif">
              "We don't just cook; we choreograph textures and flavors to create an unforgettable architectural experience on your plate."
            </motion.p>

            <motion.div variants={staggerChildren} className="grid grid-cols-2 gap-6">
              {[
                { icon: <ChefHat size={32} />, title: "Precision", desc: "Meticulous attention to every garnish." },
                { icon: <Flame size={32} />, title: "Passion", desc: "Techniques honed over decades." },
                { icon: <Award size={32} />, title: "Quality", desc: "Only the finest local & imported goods." },
                { icon: <UtensilsCrossed size={32} />, title: "Tradition", desc: "Heritage flavors, modern craft." }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="p-6 border border-gray-100 rounded-3xl hover:border-[#008A45] transition-all bg-gray-50/50 group">
                  <div className="text-[#008A45] mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="text-base font-serif font-bold mb-2">{item.title}</h4>
                  <p className="text-[10px] text-gray-400 leading-relaxed font-medium uppercase tracking-widest">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
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
      variants={sectionReveal}
      className="py-32 bg-[#F9FAFB] relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <SectionHeader sub="Get In Touch" title="Contact Verde." center />

        <div className="grid lg:grid-cols-12 gap-16">
          <motion.div variants={fadeInUp} className="lg:col-span-4 space-y-12">
            <div className="space-y-10">
              {[
                { icon: <MapPin />, title: "Location", content: "Autobhan Road, Hyderabad, Sindh" },
                { icon: <Phone />, title: "Inquiries", content: "+92 311 1234567" },
                { icon: <Clock />, title: "Operating Hours", content: "Daily: 12:00 PM — 01:00 AM" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-[#008A45] group-hover:bg-[#008A45] group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#008A45] p-10 rounded-[3rem] text-white space-y-6 shadow-2xl">
              <h3 className="text-2xl font-serif font-bold">Plan an Event?</h3>
              <p className="text-emerald-100 text-sm font-medium">We host exclusive private dinners and corporate gatherings for up to 50 guests.</p>
              <button className="w-full bg-white text-[#008A45] py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#FF6B00] hover:text-white transition-all">
                Event Inquiry
              </button>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="lg:col-span-8 bg-white p-10 md:p-16 rounded-[4rem] shadow-xl border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 ml-4">Full Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-[#008A45] focus:bg-white outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 ml-4">Email Address</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-[#008A45] focus:bg-white outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 ml-4">Your Inquiry</label>
                <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Tell us how we can curate your experience..." className="w-full px-8 py-6 rounded-[2.5rem] bg-gray-50 border-2 border-transparent focus:border-[#008A45] focus:bg-white outline-none transition-all resize-none"></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={isSending}
                className="w-full bg-[#1a1a1a] text-white py-6 rounded-[2.5rem] font-bold uppercase tracking-[0.3em] text-[10px] flex items-center justify-center space-x-4 hover:bg-[#FF6B00] transition-all relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {isSending ? (
                    <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} key="loading"><Clock size={20} /></motion.div>
                  ) : isSent ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} key="sent" className="flex items-center space-x-3"><CheckCircle2 size={20} /><span>Message Received</span></motion.div>
                  ) : (
                    <motion.div key="default" className="flex items-center space-x-3">
                      <span>Transmit Inquiry</span>
                      <Send size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const InstagramCarousel: React.FC = () => {
  const posts = [...SOCIAL_POSTS, ...SOCIAL_POSTS, ...SOCIAL_POSTS];
  const itemWidth = 350; 
  const totalWidth = itemWidth * SOCIAL_POSTS.length;
  
  return (
    <section className="py-32 bg-white overflow-hidden relative border-y border-gray-50">
      <div className="container mx-auto px-6 mb-20 text-center">
        <SectionHeader sub="The Gallery" title="Social Story." center />
      </div>

      <div className="flex relative items-center">
        <motion.div 
          animate={{ x: [0, -totalWidth] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex space-x-8 px-4"
        >
          {posts.map((post, i) => (
            <div key={`${post.id}-${i}`} className="w-80 h-[500px] flex-shrink-0 relative group rounded-[4rem] overflow-hidden shadow-2xl bg-gray-50 border border-gray-100">
              <img src={post.imageUrl} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="Instagram Post" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center p-12 text-center backdrop-blur-md">
                <div className="text-white">
                  <Instagram size={40} className="mx-auto mb-6 text-[#FF6B00]" />
                  <p className="text-sm font-serif italic mb-8">"{post.caption}"</p>
                  <div className="text-[9px] uppercase tracking-[0.4em] font-bold border-b border-white/30 pb-2 inline-block">View on Instagram</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
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
    setCursorLabel('Added!');
    setTimeout(() => setCursorLabel(null), 1000);
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
      <CustomCursor label={cursorLabel} />
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
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center z-10 pt-20">
            <motion.div initial="hidden" animate="visible" variants={staggerChildren}>
              <motion.div variants={fadeInUp} className="flex items-center space-x-3 mb-10">
                <span className="w-12 h-px bg-[#FF6B00]"></span>
                <span className="text-[#FF6B00] font-sans font-bold tracking-[0.6em] uppercase text-[10px]">Artisan Gastronomy</span>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-[12vw] lg:text-[7vw] font-serif font-bold leading-[0.85] mb-12 tracking-tighter">
                Architecture <br />
                <span className="text-[#008A45] italic">of Flavor.</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-gray-400 font-sans max-w-sm text-lg leading-relaxed mb-16 border-l-4 border-[#008A45] pl-8">
                Where high-end aesthetics meet the heart of fine dining. Experience Hyderabad's most exclusive culinary landmark.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-10">
                <button 
                  onClick={() => setIsReserveOpen(true)}
                  className="bg-[#008A45] text-white px-12 py-6 rounded-[2.5rem] font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-emerald-500/20 active:scale-95 transition-all"
                >
                  Reserve Experience
                </button>
                <button 
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-b-2 border-gray-900 py-4 font-bold uppercase tracking-[0.4em] text-[10px] hover:text-[#008A45] hover:border-[#008A45] transition-all"
                >
                  Explore Menu
                </button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-[600px] mx-auto">
                <div className="absolute inset-0 bg-[#008A45]/10 rounded-full blur-[100px] animate-pulse"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover rounded-full border-[20px] border-white shadow-2xl" 
                  alt="Fine Dining Selection" 
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
          variants={sectionReveal}
          className="py-32 bg-white"
        >
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative group overflow-hidden rounded-[4rem] h-[700px] shadow-2xl">
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" alt="Cafe Verde Interior" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-16 left-16 text-white">
                <h3 className="text-5xl font-serif italic mb-4">Space of Luxury.</h3>
                <p className="text-[10px] uppercase tracking-[0.5em] opacity-60">Architectural Excellence</p>
              </div>
            </div>
            <div className="space-y-12">
              <SectionHeader sub="The Vision" title="Elevating Taste." />
              <p className="text-gray-500 text-xl leading-relaxed italic font-serif">"Every dish is a brushstroke, every space a canvas. At Cafe Verde, we curate emotions, not just meals."</p>
              <p className="text-sm text-gray-400 leading-relaxed font-medium uppercase tracking-widest border-t border-gray-100 pt-12">
                Designed for the connoisseur, our space blends modern minimalism with heritage warmth to create Hyderabad's premier fine dining atmosphere.
              </p>
            </div>
          </div>
        </motion.section>

        {/* MENU SECTION */}
        <section id="menu" className="py-32 bg-[#F8F9FA]">
          <div className="container mx-auto px-6">
            <SectionHeader sub="Selection" title="Our Menu." center />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {MENU_ITEMS.map((item) => (
                <motion.div 
                  key={item.id}
                  whileHover={{ y: -20, scale: 1.02 }}
                  className="bg-white p-14 rounded-[4.5rem] shadow-sm hover:shadow-2xl transition-all group flex flex-col border border-transparent hover:border-gray-100"
                >
                  <div className="relative h-[450px] rounded-[4rem] overflow-hidden mb-12">
                    <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                    <div className="absolute top-8 left-8">
                      <span className="bg-[#008A45] text-white px-6 py-3 rounded-full text-[12px] font-bold uppercase tracking-widest shadow-xl">{item.recommendation}</span>
                    </div>
                  </div>
                  <h3 className="text-5xl font-serif font-bold mb-6 tracking-tight">{item.title}</h3>
                  <div className="flex justify-between items-center mb-10 pb-10 border-b border-gray-100">
                    <p className="text-4xl text-[#FF6B00] font-bold font-serif">{item.price}</p>
                    <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-gray-400 bg-gray-50 px-6 py-3 rounded-full">{item.category}</span>
                  </div>
                  <p className="text-gray-400 text-lg leading-relaxed mb-14 flex-1">{item.description}</p>
                  <button 
                    onClick={() => addToCart(item)}
                    className="w-full py-8 rounded-[2.5rem] bg-[#1a1a1a] text-white text-[12px] font-bold uppercase tracking-[0.5em] hover:bg-[#008A45] transition-all shadow-xl active:scale-95"
                  >
                    Add to Feast
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ChefExcellence />

        <InstagramCarousel />

        <ContactUs />

        {/* FOOTER */}
        <footer className="py-24 bg-white border-t border-gray-100">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-16 mb-20">
              <div className="col-span-2 space-y-8">
                <div className="flex items-center space-x-4">
                  <Logo className="w-10" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-serif font-bold tracking-tight text-[#008A45]">CAFE VERDE</span>
                    <span className="text-[8px] tracking-[0.4em] font-sans text-gray-400 font-bold uppercase">Contemporary Fine Dining</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  Redefining the fine dining landscape of Hyderabad with artistic gastronomy and architectural luxury.
                </p>
                <div className="flex space-x-6">
                  <Instagram className="text-gray-300 hover:text-[#008A45] cursor-pointer transition-colors" size={20} />
                  <Facebook className="text-gray-300 hover:text-[#008A45] cursor-pointer transition-colors" size={20} />
                  <Twitter className="text-gray-300 hover:text-[#008A45] cursor-pointer transition-colors" size={20} />
                </div>
              </div>
              
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-900">Explore</h4>
                <ul className="space-y-4 text-sm text-gray-400 font-medium uppercase tracking-widest">
                  <li className="hover:text-[#008A45] cursor-pointer transition-colors">Our Story</li>
                  <li className="hover:text-[#008A45] cursor-pointer transition-colors">Menu Collection</li>
                  <li className="hover:text-[#008A45] cursor-pointer transition-colors">Private Events</li>
                  <li className="hover:text-[#008A45] cursor-pointer transition-colors">Contact</li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-900">Experience</h4>
                <ul className="space-y-4 text-sm text-gray-400 font-medium uppercase tracking-widest">
                  <li className="hover:text-[#008A45] cursor-pointer transition-colors">Book a Table</li>
                  <li className="hover:text-[#008A45] cursor-pointer transition-colors">Order Online</li>
                  <li className="hover:text-[#008A45] cursor-pointer transition-colors">Gift Vouchers</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[9px] uppercase tracking-[0.4em] text-gray-300 font-bold">© 2026 Cafe Verde Hyderabad. All rights curated.</p>
              <div className="flex space-x-12">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-300 hover:text-black cursor-pointer transition-colors">Privacy Policy</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-300 hover:text-black cursor-pointer transition-colors">Terms of Taste</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;