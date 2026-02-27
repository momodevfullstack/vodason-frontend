import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Truck, Briefcase, Globe, 
  UserPlus, Home, Smartphone, Lightbulb,
  ArrowRight, X, Check
} from 'lucide-react';

const services = [
  {
    title: 'Groupage',
    description: 'Service de groupage moderne permettant aux clients de découvrir et sélectionner différents articles comme sur une boutique en ligne.',
    icon: Briefcase,
    color: 'bg-primary-600',
    gradient: 'from-primary-600 to-primary-700',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&h=600&fit=crop&q=80',
    features: [
      'Catalogue d’articles dédié au groupage',
      'Sélection et ajout au panier en quelques clics',
      'Suivi simplifié des demandes de groupage',
      'Interface claire et moderne pour vos clients',
      'Intégration future avec la logistique Vodason'
    ],
    fullDescription: 'Le service de groupage de VODASON vous permet de centraliser différents articles dans une même expédition. Nous mettons à disposition une interface inspirée du e‑commerce pour faciliter la sélection des produits, la constitution du panier et le suivi de vos demandes.'
  },
  {
    title: 'Formation',
    description: 'Programmes de renforcement de capacités adaptés aux besoins professionnels actuels. Formation continue et développement des compétences.',
    icon: BookOpen,
    color: 'bg-primary-500',
    gradient: 'from-primary-500 to-primary-600',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80',
    features: [
      'Formation sur mesure adaptée à vos besoins',
      'Formateurs experts certifiés',
      'Programmes de certification reconnus',
      'Support continu et suivi personnalisé',
      'Formation en présentiel et à distance'
    ],
    fullDescription: 'Notre service de formation offre des programmes complets de développement des compétences professionnelles. Nous proposons des formations adaptées aux besoins spécifiques de chaque entreprise, avec des formateurs expérimentés et des méthodes pédagogiques innovantes.'
  },
  {
    title: 'Transport',
    description: 'Solutions logistiques complètes pour le transport de marchandises en local et à l\'international. Gestion de la chaîne d\'approvisionnement.',
    icon: Truck,
    color: 'bg-slate-800',
    gradient: 'from-slate-800 to-slate-900',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&q=80',
    features: [
      'Transport local et international',
      'Suivi en temps réel des expéditions',
      'Gestion complète de la logistique',
      'Transport sécurisé et assuré',
      'Tarifs compétitifs et flexibles'
    ],
    fullDescription: 'Nous offrons des solutions de transport complètes pour répondre à tous vos besoins logistiques. De la gestion de la chaîne d\'approvisionnement au transport de marchandises, nous garantissons un service fiable et efficace.'
  },
  {
    title: 'Négoce',
    description: 'Activités commerciales de gros et détail avec des partenaires fiables. Intermédiation commerciale et distribution.',
    icon: Briefcase,
    color: 'bg-primary-600',
    gradient: 'from-primary-600 to-primary-700',
    image: 'https://images.unsplash.com/photo-1556761175-b4134f7f2a78?w=800&h=600&fit=crop&q=80',
    features: [
      'Réseau de partenaires fiables',
      'Négociation de meilleurs prix',
      'Gestion des stocks optimisée',
      'Distribution efficace et rapide',
      'Support commercial dédié'
    ],
    fullDescription: 'Notre service de négoce vous permet d\'accéder à un large réseau de partenaires commerciaux. Nous facilitons les transactions de gros et détail avec des conditions avantageuses et un service de qualité.'
  },
  {
    title: 'Import-Export',
    description: 'Importation et exportation de biens via des circuits maîtrisés. Accompagnement dans les démarches douanières et logistiques.',
    icon: Globe,
    color: 'bg-slate-700',
    gradient: 'from-slate-700 to-slate-800',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop&q=80',
    features: [
      'Gestion complète des formalités douanières',
      'Accompagnement personnalisé',
      'Réseau international étendu',
      'Optimisation des coûts et délais',
      'Conformité réglementaire garantie'
    ],
    fullDescription: 'Simplifiez vos opérations d\'import-export avec notre expertise. Nous gérons toutes les formalités douanières et logistiques pour vous permettre de vous concentrer sur votre cœur de métier.'
  },
  {
    title: 'Recrutement',
    description: 'Recherche et sélection de profils adaptés aux besoins des entreprises. Chasse de talents et placement professionnel.',
    icon: UserPlus,
    color: 'bg-primary-700',
    gradient: 'from-primary-700 to-primary-800',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80',
    features: [
      'Recherche de profils ciblés',
      'Sélection rigoureuse des candidats',
      'Chasse de talents passifs',
      'Placement rapide et efficace',
      'Garantie de satisfaction'
    ],
    fullDescription: 'Trouvez les talents dont vous avez besoin grâce à notre service de recrutement. Nous identifions, sélectionnons et plaçons les meilleurs profils pour répondre à vos besoins spécifiques.'
  },
  {
    title: 'Immobilier',
    description: 'Résidences meublées, achats, ventes et gestion immobilière. Conseil en investissement et gestion de patrimoine.',
    icon: Home,
    color: 'bg-slate-900',
    gradient: 'from-slate-900 to-slate-950',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop&q=80',
    features: [
      'Résidences meublées de qualité',
      'Achat, vente et location',
      'Gestion immobilière complète',
      'Conseil en investissement',
      'Portfolio diversifié'
    ],
    fullDescription: 'Notre service immobilier couvre tous vos besoins : résidences meublées, transactions immobilières, gestion de patrimoine et conseil en investissement. Nous vous accompagnons dans tous vos projets immobiliers.'
  },
  {
    title: 'Communication Digitale',
    description: 'Stratégies digitales et commerciales pour booster la visibilité. Gestion des réseaux sociaux, développement web et production audiovisuelle.',
    icon: Smartphone,
    color: 'bg-primary-500',
    gradient: 'from-primary-500 to-primary-600',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&q=80',
    features: [
      'Stratégie digitale sur mesure',
      'Gestion des réseaux sociaux',
      'Développement web et applications',
      'Production audiovisuelle',
      'Analyse et reporting de performance'
    ],
    fullDescription: 'Boostez votre présence digitale avec nos services de communication. De la stratégie digitale à la production de contenu, nous créons une identité forte et engageante pour votre marque.'
  },
  {
    title: 'Conseils',
    description: 'Accompagnement personnalisé pour projets professionnels ou personnels. Conseil stratégique et opérationnel.',
    icon: Lightbulb,
    color: 'bg-slate-600',
    gradient: 'from-slate-600 to-slate-700',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
    features: [
      'Conseil stratégique personnalisé',
      'Accompagnement opérationnel',
      'Analyse et diagnostic approfondi',
      'Solutions sur mesure',
      'Suivi et optimisation continue'
    ],
    fullDescription: 'Bénéficiez de l\'expertise de nos conseillers pour optimiser vos projets. Nous vous accompagnons avec des solutions personnalisées et un suivi continu pour garantir votre succès.'
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const openModal = (service) => {
    // Si c'est le service Groupage, on redirige vers la mini boutique e-commerce
    if (service.title === 'Groupage') {
      navigate('/groupage');
      return;
    }

    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section id="services" className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary-500 font-bold tracking-wider uppercase text-sm"
            >
              Nos Expertises
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6"
            >
              Solutions Complètes pour votre <br className="hidden md:block" /> Succès Professionnel
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 max-w-2xl mx-auto"
            >
              Découvrez notre large gamme de services conçus pour répondre aux défis du marché moderne. 
              Une expertise multisectorielle à votre service.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() =>
                  service.title === 'Groupage'
                    ? navigate('/groupage')
                    : openModal(service)
                }
                className="group rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-primary-100 transition-all duration-300 card-hover overflow-hidden cursor-pointer"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <service.icon size={24} />
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-3 text-sm">
                    {service.description}
                  </p>
                  <button 
                  onClick={() => openModal(service)}
                  className="inline-flex items-center gap-2 text-primary-500 font-semibold hover:gap-3 transition-all text-sm"
                >
                  En savoir plus <ArrowRight size={16} />
                </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
            >
              <div 
                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors z-10"
                >
                  <X size={20} className="text-slate-900" />
                </button>

                {/* Image Header */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className={`absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br ${selectedService.gradient} rounded-2xl flex items-center justify-center text-white shadow-xl`}>
                    <selectedService.icon size={32} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                    {selectedService.title}
                  </h2>
                  
                  <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                    {selectedService.fullDescription}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Nos Services Inclus</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedService.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={`w-6 h-6 bg-gradient-to-br ${selectedService.gradient} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Check size={14} className="text-white" />
                          </div>
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex gap-4">
                    <a
                      href="/contact"
                      className="flex-1 px-6 py-4 bg-primary-500 text-white rounded-full font-bold text-center hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl"
                    >
                      Nous Contacter
                    </a>
                    <button
                      onClick={closeModal}
                      className="px-6 py-4 bg-slate-100 text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-all"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Services;

