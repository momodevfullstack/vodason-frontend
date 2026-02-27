import { motion } from 'framer-motion';
import { ShoppingCart, PackageOpen, UserCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useGroupageCart } from '../context/GroupageCartContext';
import telephoneImage from '../assets/images/telephone.jpg';
import montreImage from '../assets/images/montre_aple_watch.avif';

const products = [
  {
    id: 'grp-1',
    name: 'Cartons & Emballages',
    description: 'Cartons renforcés et protections pour sécuriser vos envois groupés.',
    price: 25,
    category: 'Emballage',
    image: telephoneImage,
  },
  {
    id: 'grp-2',
    name: 'Électronique & Accessoires',
    description:
      'Petits appareils et accessoires électroniques adaptés au groupage.',
    price: 120,
    category: 'Électronique',
    image: telephoneImage,
  },
  {
    id: 'grp-3',
    name: 'Mode & Accessoires',
    description:
      'Vêtements et accessoires faciles à regrouper pour vos expéditions.',
    price: 60,
    category: 'Mode',
    image: telephoneImage,
  },
  {
    id: 'grp-4',
    name: 'Équipements Maison',
    description:
      'Articles pour la maison optimisés pour le transport en groupage.',
    price: 90,
    category: 'Maison',
    image: montreImage,
  },
];

const GroupageShop = () => {
  const { cartItems, addToCart } = useGroupageCart();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-slate-50 min-h-screen pt-28 md:pt-32 pb-10">
      <div className="container">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-extrabold text-slate-900"
            >
              Espace Groupage
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 mt-2 max-w-xl"
            >
              Découvrez une sélection d’articles représentatifs du service de
              groupage VODASON. Sélectionnez ce dont vous avez besoin, ajoutez
              au panier et préparez votre demande de groupage.
            </motion.p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/groupage/profil')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
            >
              <UserCircle size={18} />
              <span className="text-sm font-medium">Mon profil</span>
            </button>
            <button
              onClick={() => navigate('/groupage/panier')}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition shadow-md"
            >
              <ShoppingCart size={18} />
              <span className="text-sm font-semibold">Mon panier</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[20px] h-5 rounded-full bg-white text-primary-600 text-xs font-bold flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-3 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-slate-800 shadow-sm">
                  {product.category}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-600 mb-3 line-clamp-3">
                  {product.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">
                    À partir de{' '}
                    <span className="text-primary-500">
                      {product.price.toFixed(0)} €
                    </span>
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-primary-600 transition"
                  >
                    <PackageOpen size={14} />
                    Ajouter
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info banner */}
        <div className="mt-10 bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold mb-1">
              Prêt à finaliser votre demande de groupage ?
            </h2>
            <p className="text-sm text-slate-200 max-w-2xl">
              Une fois votre sélection terminée, rendez-vous dans votre panier
              pour récapituler les articles, puis contactez notre équipe via la
              page Contact pour valider définitivement votre opération.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/contact"
              className="px-5 py-3 rounded-full bg-white text-slate-900 text-sm font-semibold hover:bg-slate-100 transition"
            >
              Contacter Vodason
            </Link>
            <button
              onClick={() => navigate('/groupage/panier')}
              className="px-5 py-3 rounded-full border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition"
            >
              Voir mon panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupageShop;


