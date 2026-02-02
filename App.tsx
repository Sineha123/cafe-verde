import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion';
import { 
  Instagram, 
  MapPin, 
  Phone, 
  ChevronRight, 
  ArrowRight, 
  Clock, 
  Star,
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
  Menu
} from 'lucide-react';
import { COLORS, MENU_ITEMS, GALLERY_IMAGES, SOCIAL_POSTS, MENU_CATEGORIES } from './constants';
import { MenuItem, CartItem } from './types';

// --- ANIMATION VARIANTS ---
const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 100 },
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
    transition: { staggerChildren: 0.2 } 
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

// --- COMPONENTS ---

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative flex flex-col items-center justify-center bg-[#008A45] aspect-[2/3] rounded-full border-[3px] border-[#FF6B00] shadow-md ${className}`}>
    <div className="flex flex-col items-center justify-center p-1 text-white text-center">
      <div className="flex flex-col items-center">
        {/* Fork and Plate Iconography */}
        <div className="relative mb-0.5">
           <div className="w-6 h-6 border-2 border-white/80 rounded-full flex items-center justify-center">
              <div className="w-1 h-4 bg-white/80 rounded-full"></div>
           </div>
           <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white/80 rounded-full"></div>
        </div>
        <div className="w-6 h-px bg-white/40 mb-1"></div>
        <div className="font-serif font-bold text-[7px] tracking-tight leading-tight uppercase scale-90">
          Cafe<br/>Verde
        </div>
      </div>
    </div>
  </div>
);

const CustomCursor: React.FC<{ label: string | null }> = ({ label }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors z-10">
              <X size={20} />
            </button>

            <div className="p-10 md:p-14">
              {step === 1 ? (
                <>
                  <div className="mb-10 text-center">
                    <span className="text-[#008A45] font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Book Experience</span>
                    <h2 className="text-4xl font-serif font-bold tracking-tighter">Reserve Your Table</h2>
                  </div>
                  <form onSubmit={handleReserve} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-2">Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input required type="date" className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#008A45] text-sm" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-2">Time</label>
                        <div className="relative">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input required type="time" className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#008A45] text-sm" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-2">Guests</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <select required className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#008A45] text-sm appearance-none">
                          <option>2 People</option>
                          <option>4 People</option>
                          <option>6+ People</option>
                          <option>Private Lounge (20+)</option>
                        </select>
                      </div>
                    </div>
                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-[#008A45] text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#007038] transition-all shadow-xl shadow-emerald-500/20 mt-4 flex items-center justify-center"
                    >
                      {isSubmitting ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Clock size={20} /></motion.div> : "Confirm Reservation"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-[#008A45] rounded-full flex items-center justify-center text-white mx-auto mb-8">
                    <CheckCircle2 size={40} />
                  </motion.div>
                  <h3 className="text-3xl font-serif font-bold mb-4 tracking-tighter">See You Soon!</h3>
                  <p className="text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">
                    Your reservation has been confirmed. A formal invitation has been sent to your email.
                  </p>
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
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold">Your Feast</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <ShoppingBag size={64} className="mb-4 opacity-20" />
                  <p>A gourmet experience awaits.</p>
                  <p className="text-sm">Explore our menu to fill your table.</p>
                </div>
              ) : isOrdered ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-[#008A45] rounded-full flex items-center justify-center text-white mb-6"
                  >
                    <CheckCircle2 size={40} />
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold mb-2">Order Placed!</h3>
                  <p className="text-gray-500">Our chefs are orchestrating your meal. Prepare for excellence.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <motion.div layout key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif font-bold text-lg">{item.title}</h4>
                          <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[#008A45] font-bold text-sm mb-2">{item.price}</p>
                        <div className="flex items-center space-x-3">
                          <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"><Minus size={14} /></button>
                          <span className="font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"><Plus size={14} /></button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {!isOrdered && cart.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-medium">Order Total</span>
                  <span className="text-2xl font-serif font-bold">PKR {subtotal.toLocaleString()}</span>
                </div>
                <button 
                  onClick={handleOrder}
                  className="w-full bg-[#FF6B00] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#e66000] shadow-xl shadow-orange-500/20 transition-all active:scale-[0.98]"
                >
                  Confirm Order
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
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'story', 'menu', 'chef', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Story', id: 'story' },
    { name: 'Menu', id: 'menu' },
    { name: 'Excellence', id: 'chef' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'py-3 glass-nav shadow-lg' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          onClick={() => scrollTo('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <Logo className="w-10 shadow-lg group-hover:rotate-6 transition-transform" />
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold tracking-tight text-[#008A45] leading-none">CAFE VERDE</span>
            <span className="text-[8px] tracking-[0.4em] font-sans text-gray-400 font-bold uppercase">Fine Gastronomy</span>
          </div>
        </motion.div>
        
        <div className="hidden lg:flex items-center space-x-10">
          <div className="bg-gray-100/30 backdrop-blur-xl px-8 py-2.5 rounded-full border border-white/40 flex items-center space-x-8">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => scrollTo(link.id)}
                className={`text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition-all relative ${activeSection === link.id ? 'text-[#008A45]' : 'text-gray-400 hover:text-gray-900'}`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div layoutId="nav-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#008A45] rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onOpenCart}
              className="relative p-2 text-[#008A45] group"
            >
              <ShoppingBag size={20} className="group-hover:text-[#FF6B00] transition-colors" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-[#FF6B00] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button 
              onClick={onOpenReserve}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#008A45] text-white px-8 py-3 rounded-xl font-sans font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-500/10"
            >
              Reserve Table
            </motion.button>
          </div>
        </div>

        <div className="lg:hidden flex items-center space-x-4">
           <button onClick={onOpenCart} className="relative p-2 text-[#008A45]">
             <ShoppingBag size={24} />
             {cartCount > 0 && <span className="absolute top-0 right-0 bg-[#FF6B00] w-2 h-2 rounded-full"></span>}
           </button>
           <button className="p-2 text-[#008A45]"><Menu size={24} /></button>
        </div>
      </div>
    </nav>
  );
};

const SectionHeader: React.FC<{ sub: string; title: string; center?: boolean }> = ({ sub, title, center }) => (
  <div className={`mb-20 ${center ? 'text-center' : ''}`}>
    <motion.span 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-[#FF6B00] font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block"
    >
      {sub}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-5xl md:text-7xl font-serif font-bold tracking-tighter leading-none"
    >
      {title.split(' ').map((word, i) => (
        <span key={i} className={word === 'Verde.' || word === 'Menu' || word === 'Mastery.' ? 'text-[#008A45] italic' : ''}>
          {word}{' '}
        </span>
      ))}
    </motion.h2>
  </div>
);

const InstagramCarousel: React.FC = () => {
  // Triple the posts to ensure a very long seamless scroll
  const posts = [...SOCIAL_POSTS, ...SOCIAL_POSTS, ...SOCIAL_POSTS];
  
  return (
    <section className="py-32 bg-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      
      <div className="mb-20 container mx-auto px-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
        <div>
          <span className="text-[#008A45] font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Social Proof</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter leading-none">Vibrant <span className="text-[#008A45] italic">Moments.</span></h2>
        </div>
        <a href="https://www.instagram.com/cafeverde.hyd/" target="_blank" className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6B00] hover:translate-x-3 transition-transform group">
          <span>Follow @cafeverde.hyd</span>
          <ArrowRight size={18} className="group-hover:scale-125 transition-transform" />
        </a>
      </div>

      <div className="flex relative">
        <motion.div 
          animate={{ x: [0, -320 * SOCIAL_POSTS.length] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex space-x-8 px-4"
        >
          {posts.map((post, i) => (
            <div 
              key={`${post.id}-${i}`} 
              className="w-80 h-[450px] flex-shrink-0 relative group rounded-[3.5rem] overflow-hidden shadow-2xl bg-gray-50 border border-gray-100"
            >
              <img src={post.imageUrl} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" alt="Instagram Post" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center p-12 text-center backdrop-blur-sm">
                <div className="text-white">
                  <Instagram size={40} className="mx-auto mb-6 text-[#FF6B00]" />
                  <p className="text-xs font-serif font-light italic mb-8 leading-relaxed">"{post.caption}"</p>
                  <div className="text-[9px] uppercase tracking-[0.4em] font-bold border-b border-white/30 pb-2 inline-block">View Post</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

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
          <motion.div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group">
              <img 
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=1200" 
                alt="Chef Quality" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
              
              <div className="absolute top-10 right-10 flex flex-col items-end space-y-4">
                <motion.div whileHover={{ x: -10 }} className="bg-white/95 backdrop-blur-md p-5 rounded-[2rem] shadow-xl flex items-center space-x-3 cursor-default">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-[#008A45]"><Award size={20} /></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Certified Excellence</span>
                </motion.div>
                <motion.div whileHover={{ x: -10 }} className="bg-[#008A45]/95 backdrop-blur-md p-5 rounded-[2rem] shadow-xl flex items-center space-x-3 text-white cursor-default">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Flame size={20} /></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Artisan Craft</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-12">
            <SectionHeader sub="Our Philosophy" title="The Soul of Culinary Mastery." />
            
            <motion.p variants={fadeInUp} className="text-gray-500 text-xl leading-relaxed max-w-lg italic font-serif">
              "At Cafe Verde, every dish is an architecture of taste. We don't just serve food; we choreograph textures and aromas to define luxury in Hyderabad."
            </motion.p>

            <motion.div variants={staggerChildren} className="grid sm:grid-cols-2 gap-8">
              {[
                { icon: <ChefHat size={32} />, title: "Master Chefs", desc: "Our team brings decades of global Michelin-standard expertise." },
                { icon: <UtensilsCrossed size={32} />, title: "Pristine Sourcing", desc: "Only the finest local organic and imported ingredients from the source." }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="p-8 border border-gray-100 rounded-3xl hover:border-[#008A45] transition-all duration-500 group bg-gray-50/50">
                  <div className="text-[#008A45] mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">{item.icon}</div>
                  <h4 className="text-lg font-serif font-bold mb-3">{item.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium uppercase tracking-wider">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.button variants={fadeInUp} className="flex items-center space-x-4 text-[#008A45] font-bold uppercase tracking-[0.3em] text-[10px] pt-4 group">
              <span>Meet Our Executive Team</span>
              <div className="w-8 h-8 rounded-full border border-emerald-100 flex items-center justify-center group-hover:bg-[#008A45] group-hover:text-white transition-all">
                <ArrowRight size={16} />
              </div>
            </motion.button>
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

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-12 order-2 lg:order-1">
            <motion.div variants={staggerChildren} className="space-y-8">
              {[
                { icon: <MapPin />, title: "Our Location", content: "Metro Shopping Mall, Autobhan Road, Hyderabad" },
                { icon: <Phone />, title: "Call Us", content: "+92 311 1234567" },
                { icon: <Clock />, title: "Operating Hours", content: "Daily: 12:00 PM — 01:00 AM" }
              ].map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="flex items-start space-x-6">
                  <div className={`w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center ${idx === 1 ? 'text-[#FF6B00]' : 'text-[#008A45]'} shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-[#008A45] p-12 rounded-[3rem] text-white space-y-8 shadow-[0_30px_60px_-15px_rgba(0,138,69,0.3)]">
               <div>
                <h3 className="text-3xl font-serif font-bold mb-2">Plan an Event?</h3>
                <p className="text-emerald-100 text-sm font-medium">Exclusive lounge access for up to 40 guests.</p>
               </div>
               <button className="w-full bg-white text-[#008A45] py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#FF6B00] hover:text-white transition-all transform hover:-translate-y-1 active:scale-95">
                  Request Private Booking
               </button>
            </motion.div>
          </div>

          <motion.div 
            variants={fadeInUp}
            className="lg:col-span-8 bg-white p-12 md:p-16 rounded-[4rem] shadow-xl order-1 lg:order-2"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 ml-4">Your Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-[#008A45] focus:bg-white outline-none transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 ml-4">Email Address</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-[#008A45] focus:bg-white outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 ml-4">Inquiry Details</label>
                <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="How can we curate your experience?" className="w-full px-8 py-6 rounded-[2.5rem] bg-gray-50 border-2 border-transparent focus:border-[#008A45] focus:bg-white outline-none transition-all resize-none"></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={isSending}
                className="group w-full bg-[#1a1a1a] text-white py-6 rounded-[2rem] font-bold flex items-center justify-center space-x-4 hover:bg-[#FF6B00] transition-all relative overflow-hidden active:scale-[0.98]"
              >
                <AnimatePresence mode="wait">
                  {isSending ? (
                    <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} key="loading"><Clock size={20} /></motion.div>
                  ) : isSent ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} key="sent" className="flex items-center space-x-3"><CheckCircle2 size={20} /><span>Sent!</span></motion.div>
                  ) : (
                    <motion.div key="default" className="flex items-center space-x-3">
                      <span className="uppercase tracking-[0.4em] text-[10px]">Transmit Message</span>
                      <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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

const Hero: React.FC<{ onHover: (label: string | null) => void; onOpenReserve: () => void }> = ({ onHover, onOpenReserve }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 40;
    const y = (e.clientY - top - height / 2) / 40;
    setTilt({ x, y });
  };

  return (
    <section 
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,138,69,0.02)_0%,_transparent_60%)]"></div>
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center z-10 pt-20">
        <motion.div initial="hidden" animate="visible" variants={staggerChildren}>
          <motion.div variants={fadeInUp} className="flex items-center space-x-3 mb-8">
            <span className="w-12 h-px bg-[#FF6B00]"></span>
            <span className="text-[#FF6B00] font-sans font-bold tracking-[0.5em] uppercase text-[10px]">Contemporary Fine Dining</span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-[12vw] lg:text-[7vw] font-serif font-bold leading-[0.8] mb-12 tracking-tighter text-[#1a1a1a]">
            Artistic <br />
            <span className="text-[#008A45] italic">Flavor</span> <br />
            Fusion.
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-gray-400 font-sans max-w-sm text-lg leading-relaxed mb-14 border-l-4 border-[#008A45] pl-8">
            Experience the future of gastronomy in Hyderabad. Where fine dining architecture meets the soul of heritage.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-8">
            <button 
              onClick={onOpenReserve}
              className="group bg-[#008A45] text-white px-12 py-6 rounded-[2rem] font-bold flex items-center justify-center space-x-4 hover:bg-[#007038] transition-all shadow-[0_20px_40px_-10px_rgba(0,138,69,0.3)]"
            >
              <span className="uppercase tracking-[0.3em] text-[10px]">Reserve Table</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#008A45] transition-all">
                <ChevronRight size={16} />
              </div>
            </button>
            <button 
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-12 py-6 rounded-[2rem] font-bold text-[10px] uppercase tracking-[0.3em] border-2 border-gray-100 hover:bg-gray-50 transition-all flex items-center space-x-3"
            >
              <span>Explore Menu</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          style={{ rotateX: tilt.y, rotateY: tilt.x, perspective: 2000 }}
          className="relative hidden lg:block"
          onMouseEnter={() => onHover('Curated Dish')}
          onMouseLeave={() => onHover(null)}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full aspect-square max-w-[650px] mx-auto p-12"
          >
            <div className="absolute inset-0 bg-[#008A45]/5 rounded-full blur-[120px] animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=1200" 
              alt="Culinary Masterpiece" 
              className="w-full h-full object-cover rounded-full shadow-[0_80px_160px_-40px_rgba(0,0,0,0.4)] border-[20px] border-white"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const MenuSection: React.FC<{ onAddToCart: (item: MenuItem) => void; onHover: (l: string | null) => void }> = ({ onAddToCart, onHover }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return MENU_ITEMS;
    return MENU_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <motion.section 
      id="menu" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionReveal}
      className="py-32 bg-[#F9FAFB] relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-24 text-center">
          <SectionHeader sub="The Collection" title="Gourmet Menu" center />

          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-10 py-4 rounded-[2rem] text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-sm ${activeCategory === cat ? 'bg-[#008A45] text-white shadow-emerald-500/30' : 'bg-white text-gray-400 hover:text-gray-900 border border-gray-100 hover:border-emerald-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onMouseEnter={() => onHover('Add to Feast')}
                onMouseLeave={() => onHover(null)}
                className="group relative bg-white rounded-[3rem] overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 border border-gray-100 flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                    <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[8px] font-bold text-[#008A45] uppercase tracking-widest shadow-lg">
                      {item.recommendation}
                    </span>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-80 mb-2 block">{item.category}</span>
                    <h3 className="text-3xl font-serif font-bold tracking-tight mb-2 leading-none">{item.title}</h3>
                    <p className="text-[10px] font-medium tracking-widest text-[#FF6B00]">{item.price}</p>
                  </div>
                </div>
                
                <div className="p-10 pt-8 flex-1 flex flex-col justify-between">
                  <p className="text-gray-400 text-xs leading-relaxed mb-8 font-medium">
                    {item.description}
                  </p>
                  
                  <button 
                    onClick={() => onAddToCart(item)}
                    className="w-full py-5 rounded-[2rem] bg-gray-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#FF6B00] transition-all flex items-center justify-center space-x-3 group/btn shadow-xl"
                  >
                    <Plus size={14} className="group-hover/btn:rotate-90 transition-transform" />
                    <span>Experience Flavor</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
};

// --- MAIN APP ---

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
    <div className="font-sans text-[#1a1a1a] selection:bg-[#008A45] selection:text-white bg-white">
      <CustomCursor label={cursorLabel} />
      <Navbar 
        cartCount={totalItems} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenReserve={() => setIsReserveOpen(true)} 
      />
      
      <OrderDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onUpdateQty={updateQuantity}
        onRemove={removeItem}
      />

      <ReservationModal isOpen={isReserveOpen} onClose={() => setIsReserveOpen(false)} />

      <main>
        <Hero onHover={setCursorLabel} onOpenReserve={() => setIsReserveOpen(true)} />
        
        <motion.section 
          id="story" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionReveal}
          className="py-32 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="relative group">
                <div className="relative h-[700px] w-full overflow-hidden rounded-[4rem] shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200" alt="Ambience" className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-16 left-16 text-white">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block opacity-60">Architectural Heritage</span>
                    <h3 className="text-5xl font-serif italic max-w-sm font-light">Atmosphere as a <br /> Canvas of Luxury.</h3>
                  </div>
                </div>
              </div>
              
              <div className="space-y-16">
                <SectionHeader sub="Our Origin" title="Beyond the Mundane." />
                
                <div className="space-y-10 text-gray-500 text-lg leading-relaxed max-w-lg">
                  <p className="font-bold text-gray-900 tracking-tight text-2xl font-serif">
                    Cafe Verde was sculpted from a vision of elegance and emerald depths.
                  </p>
                  <p className="text-sm font-medium leading-relaxed tracking-wider text-gray-400">
                    We believe every meal is a theatrical performance. From the rich textures of our seating to the precisely tuned frequencies of our atmosphere, we define Hyderabad's contemporary luxury.
                  </p>
                  <div className="pt-10 grid grid-cols-2 gap-12 border-t border-gray-100">
                    <div><h4 className="text-[#FF6B00] font-bold text-5xl mb-2 font-serif tracking-tighter">98%</h4><p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold">Chef Precision</p></div>
                    <div><h4 className="text-[#008A45] font-bold text-5xl mb-2 font-serif tracking-tighter">15+</h4><p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold">Global Origins</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <MenuSection onAddToCart={addToCart} onHover={setCursorLabel} />
        
        <ChefExcellence />

        <InstagramCarousel />
        
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionReveal}
          className="py-32 bg-white"
        >
          <div className="container mx-auto px-6">
             <SectionHeader sub="The Gallery" title="Architectural Spaces." center />
             <div className="grid grid-cols-12 gap-8 h-[900px]">
                {GALLERY_IMAGES.slice(0, 4).map((img, i) => (
                   <motion.div 
                     key={img.id}
                     whileHover={{ scale: 1.02 }}
                     className={`relative rounded-[4rem] overflow-hidden shadow-2xl ${i === 0 ? 'col-span-12 md:col-span-7 row-span-2' : 'col-span-12 md:col-span-5'}`}
                   >
                      <img src={img.url} className="w-full h-full object-cover" alt={img.alt} />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-700">
                        <span className="text-white font-serif italic text-3xl tracking-tight">{img.alt}</span>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
        </motion.section>

        <ContactUs />
        
        <footer className="bg-white border-t border-gray-100 relative z-10">
          <div className="container mx-auto px-6 py-24">
            <div className="flex flex-col md:flex-row justify-between items-center gap-16">
              <div className="flex items-center space-x-4">
                <Logo className="w-12 shadow-xl" />
                <div className="flex flex-col">
                  <span className="text-2xl font-serif font-bold tracking-tight text-[#008A45]">CAFE VERDE</span>
                  <span className="text-[8px] tracking-[0.4em] font-sans text-gray-400 font-bold uppercase">Fine Gastronomy</span>
                </div>
              </div>
              <div className="flex space-x-12">
                {['Instagram', 'Facebook', 'TripAdvisor'].map(social => (
                  <a key={social} href="#" className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 hover:text-[#FF6B00] transition-all hover:-translate-y-1">{social}</a>
                ))}
              </div>
              <div className="text-right">
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-2">© 2026 Cafe Verde Hyderabad.</p>
                <p className="text-[8px] font-medium tracking-[0.2em] text-gray-300">Curated for Excellence.</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;