import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const Footer = () => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="relative w-full py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* --- ABOUT --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-black mb-4">Vodason<span className="text-primary-500">.</span></h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Votre partenaire de confiance pour des solutions professionnelles innovantes. 
                Nous accompagnons votre croissance avec excellence et expertise.
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                realiser par  <Heart size={16} className="text-primary-500 fill-primary-500" /> Mohamed Bamba
              </div>
            </motion.div>

            {/* --- QUICK LINKS --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-lg font-black mb-4">Navigation</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Accueil', path: '/' },
                  { name: 'Services', path: '/#services' },
                  { name: 'À Propos', path: '/#about' },
                  { name: 'Abonnements', path: '/subscription' },
                  { name: 'Contact', path: '/contact' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-primary-500 transition-colors font-semibold"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* --- CONTACT --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-black mb-4">Contact</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-3 font-semibold">
                  <Mail size={18} className="text-primary-500" />
                  contact@vodason.com
                </li>
                <li className="flex items-center gap-3 font-semibold">
                  <Phone size={18} className="text-primary-500" />
                  +221 XX XXX XX XX
                </li>
                <li className="flex items-center gap-3 font-semibold">
                  <MapPin size={18} className="text-primary-500" />
                  Dakar, Sénégal
                </li>
              </ul>
            </motion.div>
          </div>

          {/* --- BOTTOM --- */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} Vodason Company. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="px-5 py-2 rounded-full border border-slate-700 text-xs font-bold uppercase tracking-widest text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                Administration
              </button>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors shadow-lg"
              >
                <ArrowUp size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL ADMIN */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
              onClick={() => setIsAdminModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              className="fixed inset-0 z-[201] flex items-center justify-center px-4"
            >
              <div
                className="w-full max-w-md bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-700 p-8 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsAdminModalOpen(false)}
                  className="absolute right-4 top-4 text-slate-500 hover:text-white text-sm font-bold"
                >
                  ✕
                </button>

                <h3 className="text-2xl font-black mb-2">Espace Administration</h3>
                <p className="text-sm text-slate-400 mb-6">
                  Connectez-vous pour accéder au tableau de bord Vodason.
                </p>

                <form
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsLoading(true);
                    setError('');

                    try {
                      const response = await fetch(`${API_BASE_URL}/auth/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                      });

                      const data = await response.json();

                      if (!response.ok) {
                        throw new Error(data.error || 'Erreur lors de la connexion');
                      }

                      // Stocker le token en localStorage
                      localStorage.setItem('adminToken', data.token);
                      localStorage.setItem('adminData', JSON.stringify(data.admin));

                      // Fermer le modal et rediriger
                      setIsAdminModalOpen(false);
                      setEmail('');
                      setPassword('');
                      navigate('/admin');
                    } catch (err) {
                      setError(err.message || 'Erreur lors de la connexion');
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                >
                  {error && (
                    <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                      Email administrateur
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30"
                      placeholder="admin@vodason.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-4 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 font-bold text-sm uppercase tracking-widest transition-colors shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Connexion...' : 'Se connecter'}
                  </button>
                </form>

                <p className="mt-4 text-[11px] text-slate-500 text-center">
                  Accès réservé à l&apos;équipe Vodason. Si vous avez oublié vos identifiants,
                  contactez l&apos;administrateur principal.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;

