import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, UserPlus, Mail, Shield, Trash2, LogOut, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const AdminUsers = () => {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'admin' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/admins`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminData');
          navigate('/');
          return;
        }

        if (!res.ok) throw new Error('Erreur lors du chargement des administrateurs');
        const data = await res.json();
        setAdmins(data || []);
      } catch (error) {
        console.error('Erreur GET /admins :', error);
        setNotification({
          type: 'error',
          message: 'Impossible de charger la liste des administrateurs.',
        });
      }
    };

    fetchAdmins();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la création de l’administrateur.');
      }

      setAdmins((prev) => [data, ...prev]);
      setFormData({ name: '', email: '', password: '', role: 'admin' });
      setNotification({
        type: 'success',
        message: 'Administrateur créé avec succès.',
      });
    } catch (error) {
      console.error('Erreur POST /admins :', error);
      setNotification({
        type: 'error',
        message: error.message || 'Impossible de créer cet administrateur.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet administrateur ?")) return;

    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/admins/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Erreur lors de la suppression.');
      }
      setAdmins((prev) => prev.filter((a) => a._id !== id));
      setNotification({
        type: 'success',
        message: 'Administrateur supprimé avec succès.',
      });
    } catch (error) {
      console.error('Erreur DELETE /admins/:id :', error);
      setNotification({
        type: 'error',
        message: error.message || 'Impossible de supprimer cet administrateur.',
      });
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('adminToken');
    
    // Appeler l'API de déconnexion
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    }

    // Supprimer le token et les données admin du localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    
    navigate('/');
    setNotification({
      type: 'success',
      message: 'Vous avez été déconnecté du tableau de bord.',
    });
  };

  return (
    <main className="pt-16 pb-24 bg-slate-50 min-h-screen relative">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-[0.2em]">
                Dashboard
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900">
              Gestion des administrateurs
            </h1>
            <p className="text-slate-500 mt-2 text-sm md:text-base">
              Ajoutez, visualisez et supprimez les comptes administrateurs ayant accès au tableau de bord.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-end">
            <button
              onClick={() => navigate('/admin')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-xs md:text-sm font-semibold hover:bg-white hover:border-primary-200 transition-colors bg-white"
            >
              <ArrowLeft size={16} />
              Messages de contact
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-xs md:text-sm font-semibold hover:bg-white hover:border-primary-200 transition-colors bg-white"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Formulaire création admin */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                <UserPlus size={18} className="text-primary-600" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-slate-900">
                  Ajouter un administrateur
                </h2>
                <p className="text-xs text-slate-500">
                  Créez un nouveau compte avec accès au tableau de bord.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  placeholder="Nom de l'administrateur"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  placeholder="admin@exemple.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Rôle
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-3 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs uppercase tracking-widest transition-colors shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Création en cours...' : "Créer l'administrateur"}
              </button>
            </form>

            <p className="mt-3 text-[11px] text-slate-500">
              Note : un administrateur par défaut est déjà créé : <span className="font-semibold">admin@vodason.com / admin123</span>.
              Pensez à le modifier ou le supprimer lorsque la gestion des comptes sera en place.
            </p>
          </motion.div>

          {/* Liste des admins */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {admins.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 p-8 text-center">
                <p className="text-slate-500 mb-2 font-semibold">Aucun administrateur trouvé</p>
                <p className="text-slate-400 text-sm">
                  Utilisez le formulaire à gauche pour créer votre premier compte administrateur.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {admins.map((admin) => (
                  <motion.div
                    key={admin._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-5 flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <User size={18} className="text-primary-600" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-bold text-slate-900 text-sm md:text-base">
                            {admin.name}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold uppercase tracking-wide">
                            <Shield size={10} />
                            {admin.role || 'admin'}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <Mail size={12} />
                            {admin.email}
                          </span>
                          {admin.createdAt && (
                            <span>
                              Créé le{' '}
                              {new Date(admin.createdAt).toLocaleDateString('fr-FR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(admin._id)}
                      className="self-start inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={12} />
                      Supprimer
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-[250] max-w-sm"
          >
            <div
              className={`rounded-2xl shadow-xl border px-5 py-4 bg-white flex items-start gap-3 ${
                notification.type === 'success'
                  ? 'border-emerald-200'
                  : 'border-red-200'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  notification.type === 'success'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {notification.type === 'success' ? '✓' : '!'}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 mb-1">
                  {notification.type === 'success' ? 'Action réussie' : 'Erreur'}
                </p>
                <p className="text-xs text-slate-600">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold ml-1"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default AdminUsers;


