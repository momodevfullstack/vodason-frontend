import { motion } from 'framer-motion';
import { ArrowRight, Play, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/images/1.jpeg';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[700px] max-h-[900px] flex items-center overflow-hidden bg-white pt-28 md:pt-32">
      {/* --- ÉLÉMENTS DE DESIGN CRÉATIFS --- */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10" />
      <div className="absolute top-20 right-[30%] w-px h-64 bg-gradient-to-b from-transparent via-primary-200 to-transparent hidden lg:block" />
      
      {/* Orbe de lumière diffus */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary-100/40 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* --- TEXTE : L'ACCENT SUR LA CLARTÉ --- */}
          <div className="w-full lg:w-[55%] space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <span className="h-[2px] w-12 bg-primary-500"></span>
              <span className="text-primary-500 font-bold text-xs uppercase tracking-[0.3em]">
                Solutions • Innovation
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
                Votre partenaire de <br />
                <span className="relative inline-block text-primary-500 italic font-serif pr-4">
                  confiance
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 10.5C50 3.5 150 1.5 299 10.5" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span> <br />
                pour l'excellence professionnelle
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-slate-500 max-w-lg leading-relaxed border-l-4 border-slate-100 pl-6"
            >
              Vodason Company offre une gamme complète de services professionnels innovants. 
              De la formation au transport, en passant par l'immobilier et la communication digitale, 
              nous accompagnons votre réussite.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold flex items-center gap-3 hover:bg-primary-500 transition-all shadow-xl shadow-slate-200"
              >
                Nous contacter <ArrowRight size={18} />
              </Link>
              
              <a 
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="flex items-center gap-3 group"
              >
                <span className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                  <Play size={16} className="text-slate-900 fill-slate-900 group-hover:text-primary-500 group-hover:fill-primary-500" />
                </span>
                <span className="font-bold text-slate-900 text-sm">Découvrir nos services</span>
              </a>
            </motion.div>
          </div>

          {/* --- IMAGE : LA COMPOSITION CRÉATIVE --- */}
          <div className="w-full lg:w-[40%] relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="relative aspect-[4/5] max-w-[400px] mx-auto lg:ml-auto"
            >
              {/* Cadre décoratif décalé */}
              <div className="absolute inset-0 border-2 border-slate-200 rounded-[2rem] translate-x-6 translate-y-6 -z-10" />
              
              {/* Image principale */}
              <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <img 
                  src={heroImage} 
                  alt="Vodason Company" 
                  className="w-full h-full object-cover scale-110" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Badge flottant Expérience */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-12 bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-2 border border-slate-50"
              >
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white">
                  <Award size={20} />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Expérience</p>
                  <p className="text-lg font-bold text-slate-900 leading-tight italic">15+ ans</p>
                </div>
              </motion.div>

              {/* Petite bulle de confiance
              <div className="absolute top-10 -right-8 bg-white py-2 px-4 rounded-full shadow-lg border border-slate-50 flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-xs font-bold text-slate-700">Disponible</span>
              </div> */}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

