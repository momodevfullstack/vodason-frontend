import { motion } from 'framer-motion';
import { Target, Award, Users, TrendingUp } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Innovation',
    description: 'Solutions modernes et adaptées aux besoins actuels du marché.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Qualité de service et expertise reconnue dans tous nos domaines.',
  },
  {
    icon: Users,
    title: 'Personnalisation',
    description: 'Accompagnement sur mesure pour chaque client et projet.',
  },
  {
    icon: TrendingUp,
    title: 'Croissance',
    description: 'Nous vous aidons à atteindre vos objectifs de développement.',
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* --- CONTENU TEXTE --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-primary-500 font-bold tracking-wider uppercase text-sm">
              À Propos de Nous
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Votre partenaire de confiance depuis 2010
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Fondée en 2010, Vodason Company s'est imposée comme un leader dans le domaine 
              des services professionnels multisectoriels. Notre mission est d'aider les entreprises 
              et les particuliers à optimiser leurs performances et atteindre leurs objectifs.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Avec plus de 15 ans d'expérience, nous avons développé une expertise reconnue 
              dans la formation, le transport, l'immobilier, la communication digitale et bien d'autres domaines. 
              Notre approche personnalisée et notre engagement envers l'excellence font de nous 
              le partenaire idéal pour votre réussite.
            </p>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-4xl font-black text-primary-500">15+</div>
                <div className="text-sm text-slate-600 font-semibold">Années d'expérience</div>
              </div>
              <div>
                <div className="text-4xl font-black text-primary-500">500+</div>
                <div className="text-sm text-slate-600 font-semibold">Clients satisfaits</div>
              </div>
            </div>
          </motion.div>

          {/* --- VALEURS --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <value.icon size={24} className="text-primary-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-sm text-slate-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

