import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'À Propos', href: '/#about' },
    // { name: 'Abonnements', href: '/subscription' },
  ];

  const handleLinkClick = (href) => {
    setIsMobileMenuOpen(false);
    
    // Gérer le smooth scroll pour les liens avec hash
    if (href.includes('#')) {
      const hash = href.split('#')[1];
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <>
      <nav
        className={cn(
          'fixed w-full z-[100] transition-all duration-500 ease-in-out px-6 md:px-12',
          isScrolled 
            ? 'top-4'
            : 'top-0 py-6'
        )}
      >
        <div 
          className={cn(
            "mx-auto max-w-7xl transition-all duration-500 rounded-full",
            isScrolled 
              ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/20 px-8 py-3" 
              : "bg-transparent px-0 py-0"
          )}
        >
          <div className="flex items-center justify-between">
            {/* --- LOGO --- */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden transition-transform group-hover:scale-110 shadow-lg shadow-primary-500/20">
                <img 
                  src={logo} 
                  alt="Vodason Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-black text-xl tracking-tighter text-slate-900 uppercase">
                Vodason<span className="text-primary-500">.</span>
              </span>
            </Link>

            {/* --- DESKTOP NAVIGATION --- */}
            <div className="hidden md:flex items-center gap-10">
              <div className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={(e) => {
                      if (link.href.includes('#')) {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      }
                    }}
                    className="relative group text-[13px] font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>
              
              <div className="h-6 w-px bg-slate-200 mx-2" />

              <Link 
                to="/contact" 
                className={cn(
                  "group flex items-center gap-2 font-bold text-xs uppercase tracking-widest transition-all",
                  isScrolled 
                    ? "bg-primary-500 text-white px-6 py-3 rounded-full hover:bg-slate-900 shadow-lg shadow-primary-500/20" 
                    : "text-slate-900 hover:text-primary-500"
                )}
              >
                Contact <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* --- MOBILE TOGGLE --- */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full text-slate-900"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[200] flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-black text-2xl tracking-tighter uppercase text-slate-900">Vodason.</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  key={link.name}
                >
                  <Link
                    to={link.href}
                    className="text-4xl font-black text-slate-900 hover:text-primary-500 transition-colors"
                    onClick={(e) => {
                      if (link.href.includes('#')) {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      } else {
                        handleLinkClick(link.href);
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto">
              <p className="text-slate-400 text-sm mb-6">Prêt à collaborer ?</p>
              <Link 
                to="/contact" 
                className="w-full py-5 bg-primary-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary-500/20"
                onClick={() => handleLinkClick('/contact')}
              >
                Nous contacter <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

