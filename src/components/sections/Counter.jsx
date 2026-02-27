import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, Briefcase, Award, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: '+',
    label: 'Clients Satisfaits',
    color: 'text-primary-500',
  },
  {
    icon: Briefcase,
    value: 8,
    suffix: '',
    label: 'Services Proposés',
    color: 'text-slate-800',
  },
  {
    icon: Award,
    value: 15,
    suffix: '+',
    label: 'Années d\'Expérience',
    color: 'text-primary-600',
  },
  {
    icon: TrendingUp,
    value: 95,
    suffix: '%',
    label: 'Taux de Satisfaction',
    color: 'text-slate-700',
  },
];

const Counter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

const CounterSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-500 to-primary-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Des résultats qui parlent
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">
            Notre engagement envers l'excellence se reflète dans nos statistiques
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <stat.icon size={32} className="text-white" />
                </div>
              </div>
              <div className="text-5xl md:text-6xl font-black mb-2">
                <Counter end={stat.value} />{stat.suffix}
              </div>
              <div className="text-primary-100 font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;

