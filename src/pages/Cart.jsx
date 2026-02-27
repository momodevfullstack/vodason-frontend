import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useGroupageCart } from '../context/GroupageCartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } =
    useGroupageCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, delta) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    updateQuantity(id, item.quantity + delta);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container max-w-4xl">
        <button
          onClick={() => navigate('/groupage')}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft size={16} />
          Retour au catalogue
        </button>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Mon panier Groupage
        </h1>
        <p className="text-slate-600 mb-6">
          Récapitulatif des articles que vous souhaitez inclure dans votre
          opération de groupage.
        </p>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-10 text-center">
            <p className="text-slate-600 mb-4">
              Votre panier est vide pour le moment.
            </p>
            <Link
              to="/groupage"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition"
            >
              Explorer les articles de groupage
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-700">
                      {item.price.toFixed(0)} € / unité
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center border border-slate-200 rounded-full px-2 py-1">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 rounded-full hover:bg-slate-100"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm font-semibold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-1 rounded-full hover:bg-slate-100"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                      Retirer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-300 mb-1">
                  Estimation globale
                </p>
                <p className="text-2xl font-bold">
                  {total.toFixed(0)} €{' '}
                  <span className="text-sm font-normal text-slate-300">
                    (à titre indicatif)
                  </span>
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="px-4 py-3 rounded-full border border-white/30 text-sm font-semibold hover:bg-white/10 transition"
                >
                  Vider le panier
                </button>
                <Link
                  to="/contact"
                  className="px-5 py-3 rounded-full bg-primary-500 text-sm font-semibold hover:bg-primary-400 transition shadow-md"
                >
                  Envoyer ma demande à Vodason
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;


