import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Clock } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: string }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Erreur lors de l’envoi du message.');
      }

      setNotification({
        type: 'success',
        message: 'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Erreur lors de l’envoi du message de contact :', error);
      setNotification({
        type: 'error',
        message: "Une erreur est survenue lors de l'envoi du message. Merci de réessayer plus tard.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@vodason.com',
      link: 'mailto:contact@vodason.com',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+221 XX XXX XX XX',
      link: 'tel:+221XXXXXXXXX',
    },
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'Dakar, Sénégal',
      link: '#',
    },
    {
      icon: Clock,
      title: 'Horaires',
      content: 'Lun - Ven: 9h - 18h',
      link: '#',
    },
  ];

  return (
    <main className="pt-32 pb-24 bg-white">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary-500 font-bold tracking-wider uppercase text-sm">
            Contactez-nous
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-4 mb-6">
            Parlons de votre projet
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Notre équipe est à votre écoute pour répondre à toutes vos questions 
            et vous accompagner dans vos projets.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  placeholder="+221 XX XXX XX XX"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
                  Sujet *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-primary-500 text-white rounded-full font-bold flex items-center justify-center gap-3 hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                <Send size={20} />
              </button>
            </form>
          </motion.div>

          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all card-hover border border-slate-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon size={24} className="text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{info.title}</h3>
                    <p className="text-slate-600">{info.content}</p>
                  </div>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="p-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Besoin d'une réponse rapide ?</h3>
              <p className="text-primary-100 mb-6">
                Appelez-nous directement ou envoyez-nous un email. 
                Nous répondons généralement dans les 24 heures.
              </p>
              <a
                href="tel:+221XXXXXXXXX"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-500 rounded-full font-bold hover:bg-slate-100 transition-colors"
              >
                <Phone size={20} />
                Appeler maintenant
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-[250] max-w-sm"
          >
            <div
              className={`rounded-2xl shadow-xl border px-5 py-4 bg-white flex items-start gap-3 ${
                notification.type === 'success'
                  ? 'border-emerald-200'
                  : 'border-red-200'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  notification.type === 'success'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {notification.type === 'success' ? '✓' : '!'}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 mb-1">
                  {notification.type === 'success' ? 'Message envoyé' : 'Erreur'}
                </p>
                <p className="text-xs text-slate-600">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold ml-1"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Contact;

