import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import orangeMoneyLogo from '../../assets/images/Orange-Money-Logo.png';
import waveLogo from '../../assets/images/wave-mobile-money-logo.avif';
import bancaireLogo from '../../assets/images/Visa-credit-card-debit-card.webp';
import mtnMoneyLogo from '../../assets/images/mtn-logo.png';
import moovMoneyLogo from '../../assets/images/moov-money.jpg';

const Payment = () => {
  const paymentMethods = [
    { name: 'Orange Money', logo: orangeMoneyLogo },
    { name: 'Wave', logo: waveLogo },
    { name: 'Mtn Money', logo: mtnMoneyLogo },
    { name: 'Moov Money', logo: moovMoneyLogo },
    { name: 'Carte Bancaire', logo: bancaireLogo },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary-500 font-bold tracking-wider uppercase text-sm">
              Paiement Sécurisé
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6">
              Méthodes de paiement flexibles
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Nous acceptons plusieurs méthodes de paiement pour votre commodité. 
              Toutes les transactions sont sécurisées et traitées avec la plus grande confidentialité.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"
              >
                {method.logo ? (
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-white flex items-center justify-center shadow-sm">
                    <img
                      src={method.logo}
                      alt={method.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center text-white">
                    <Check size={20} />
                  </div>
                )}
                <span className="font-bold text-slate-900">{method.name}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/subscription"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary-500 text-white rounded-full font-bold hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl"
            >
              Voir nos abonnements <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Payment;

