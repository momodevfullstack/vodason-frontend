import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactBanner = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-primary-400 font-bold tracking-wider uppercase text-sm">
                Prêt à commencer ?
              </span>
              <h2 className="text-4xl md:text-6xl font-black mt-4 mb-6">
                Discutons de votre projet
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Notre équipe est prête à vous accompagner dans la réalisation de vos objectifs. 
                Contactez-nous dès aujourd'hui pour une consultation gratuite.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="px-8 py-4 bg-primary-500 text-white rounded-full font-bold flex items-center gap-3 hover:bg-primary-600 transition-all shadow-xl shadow-primary-500/20"
              >
                Nous contacter <ArrowRight size={20} />
              </Link>
              
              <div className="flex items-center gap-6 text-slate-300">
                <a href="tel:+221XXXXXXXXX" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                  <Phone size={20} />
                  <span className="font-semibold">+221 XX XXX XX XX</span>
                </a>
                <a href="mailto:contact@vodason.com" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                  <Mail size={20} />
                  <span className="font-semibold">contact@vodason.com</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;

