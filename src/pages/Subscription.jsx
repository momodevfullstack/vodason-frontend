import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Shield, Diamond, Crown, Zap, X, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';

const plans = [
  {
    name: 'Standard',
    price: 'Contactez-nous',
    period: '',
    features: [
      'Accès aux services de base',
      'Support technique par email',
      'Accès à la communauté',
      'Ressources de base'
    ],
    icon: Zap,
    popular: false,
    color: 'slate',
    image: '/assets/standard.jpg',
  },
  {
    name: 'Or',
    price: '80 000',
    period: 'FCFA/mois',
    features: [
      'Conception graphique',
      'Mise en ligne',
      'Sponsorisation',
      'Montage Vidéo',
      'Support prioritaire'
    ],
    icon: Star,
    popular: false,
    color: 'amber',
    image: '/assets/or.jpg',
  },
  {
    name: 'Premium',
    price: '150 000',
    period: 'FCFA/mois',
    features: [
      'Toutes les fonctionnalités Or',
      'Conception graphique avancée',
      'Mise en ligne optimisée',
      'Sponsorisation premium',
      'Montage Vidéo professionnel',
      'Support 24/7'
    ],
    icon: Shield,
    popular: true,
    color: 'red',
    image: '/assets/premium.jpg',
  },
  {
    name: 'Diamant',
    price: '300 000',
    period: 'FCFA/mois',
    features: [
      'Toutes les fonctionnalités Premium',
      'Conception graphique exclusive',
      'Mise en ligne prioritaire',
      'Sponsorisation maximale',
      'Montage Vidéo 4K',
      'Influenceurs partenaires',
      'Support dédié'
    ],
    icon: Diamond,
    popular: false,
    color: 'indigo',
    image: '/assets/diamant.jpg',
  },
  {
    name: 'VVIP',
    price: 'Sur mesure',
    period: '',
    features: [
      'Toutes les fonctionnalités Diamant',
      'Support VIP dédié 24/7',
      'Mises à jour en temps réel',
      'Stockage illimité',
      'Formation sur site',
      'Développement personnalisé',
      'Consultant personnel'
    ],
    icon: Crown,
    popular: false,
    color: 'purple',
    image: '/assets/vvip.jpg',
  }
];

const faqs = [
  {
    question: 'Quels sont les modes de paiement acceptés ?',
    answer: 'Nous acceptons Orange Money, Free Money, Wave, virement bancaire, espèces et carte bancaire.',
  },
  {
    question: 'Puis-je changer de plan à tout moment ?',
    answer: 'Oui, vous pouvez mettre à niveau ou rétrograder votre plan à tout moment. Les changements prendront effet au début du prochain cycle de facturation.',
  },
  {
    question: 'Y a-t-il des frais cachés ?',
    answer: 'Non, tous nos prix sont transparents. Le prix affiché est le prix que vous payez, sans frais cachés.',
  },
  {
    question: 'Que se passe-t-il si je ne suis pas satisfait ?',
    answer: 'Nous offrons une garantie de satisfaction. Si vous n\'êtes pas satisfait dans les 30 premiers jours, nous vous rembourserons intégralement.',
  },
  {
    question: 'Le support est-il disponible en français ?',
    answer: 'Oui, notre équipe de support parle français et est disponible pour vous aider dans votre langue.',
  },
];

const Subscription = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

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
            Nos Forfaits
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-4 mb-6">
            Choisissez le plan adapté <br /> à votre ambition
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Des solutions flexibles pour tous les besoins. 
            De l'essentiel au sur-mesure, trouvez le plan qui vous correspond.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-24">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative flex flex-col p-8 rounded-3xl border transition-all duration-300",
                plan.popular 
                  ? "bg-slate-900 text-white border-slate-900 shadow-2xl scale-105 z-10" 
                  : "bg-white text-slate-900 border-slate-100 hover:border-primary-200 hover:shadow-xl"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Plus Populaire
                </div>
              )}
              
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-6",
                plan.popular ? "bg-primary-500 text-white" : "bg-primary-100 text-primary-500"
              )}>
                <plan.icon size={24} />
              </div>

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && <span className={cn("ml-2", plan.popular ? "text-slate-400" : "text-slate-500")}>{plan.period}</span>}
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm">
                    <Check className={cn("mt-0.5 flex-shrink-0", plan.popular ? "text-primary-400" : "text-primary-500")} size={16} />
                    <span className={plan.popular ? "text-slate-300" : "text-slate-600"}>{feature}</span>
                  </div>
                ))}
              </div>

              {plan.image && (
                <button
                  onClick={() => setSelectedImage(plan.image)}
                  className="mb-4 text-sm text-primary-500 hover:text-primary-600 font-semibold"
                >
                  Voir les détails du package
                </button>
              )}

              <button className={cn(
                "w-full py-3 px-4 rounded-xl font-bold transition-all",
                plan.popular 
                  ? "bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20" 
                  : "bg-slate-100 hover:bg-primary-500 hover:text-white text-slate-900"
              )}>
                Sélectionner
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
            Questions Fréquentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-slate-50 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
                >
                  <span className="font-bold text-slate-900 pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp size={20} className="text-primary-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-slate-400 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-slate-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal pour les images */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
              >
                <X size={24} className="text-slate-900" />
              </button>
              <img
                src={selectedImage}
                alt="Package details"
                className="w-full h-auto rounded-2xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Image+non+disponible';
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Subscription;

