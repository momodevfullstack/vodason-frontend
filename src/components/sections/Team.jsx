import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import team1 from '../../assets/images/1.jpeg';
import team2 from '../../assets/images/2.jpeg';
import team3 from '../../assets/images/3.jpeg';
import team4 from '../../assets/images/4.jpeg';

const teamMembers = [
  {
    name: 'Mohamed Bamba',
    role: 'CEO & Fondateur',
    image: team1,
    bio: 'Expert en stratégie d\'entreprise avec plus de 15 ans d\'expérience.',
  },
  {
    name: 'Aminata Diallo',
    role: 'Directrice Communication',
    image: team2,
    bio: 'Spécialiste en marketing digital et communication de marque.',
  },
  {
    name: 'Ibrahima Sall',
    role: 'Directeur Technique',
    image: team3,
    bio: 'Ingénieur en développement et solutions technologiques.',
  },
  {
    name: 'Fatou Ndiaye',
    role: 'Directrice Formation',
    image: team4,
    bio: 'Experte en développement des compétences et formation professionnelle.',
  },
];

const Team = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-500 font-bold tracking-wider uppercase text-sm">
            Notre Équipe
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6">
            Rencontrez les experts derrière Vodason
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Une équipe passionnée et dévouée, prête à vous accompagner vers le succès.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-primary-500 font-semibold mb-3">{member.role}</p>
                  <p className="text-sm text-slate-600 mb-4">{member.bio}</p>
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors"
                    >
                      <Linkedin size={16} />
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors"
                    >
                      <Mail size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

