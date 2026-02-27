import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Clock, User, Trash2, Search, LogOut, Users, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: string }
  const [confirmModal, setConfirmModal] = useState(null); // { type: 'clearAll' | 'deleteOne', id?: string, onConfirm: () => void }

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/messages`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (response.status === 401 || response.status === 403) {
          // Token invalide ou expiré
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminData');
          navigate('/');
          return;
        }

        if (!response.ok) {
          throw new Error('Erreur lors du chargement des messages');
        }
        const data = await response.json();
        setMessages(data || []);
      } catch (error) {
        console.error('Erreur lors du chargement des messages de contact :', error);
      }
    };

    fetchMessages();
  }, [navigate]);

  const handleClearAll = () => {
    setConfirmModal({
      type: 'clearAll',
      onConfirm: async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/');
          return;
        }

        try {
          const response = await fetch(`${API_BASE_URL}/messages`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok && response.status !== 204) {
            throw new Error('Erreur lors de la suppression des messages');
          }
          setMessages([]);
          setPage(1);
          setNotification({
            type: 'success',
            message: 'Tous les messages ont été supprimés avec succès.',
          });
        } catch (error) {
          console.error('Erreur lors de la suppression des messages :', error);
          setNotification({
            type: 'error',
            message: 'Impossible de supprimer tous les messages pour le moment.',
          });
        }
        setConfirmModal(null);
      },
    });
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

  const handleDeleteOne = (id) => {
    setConfirmModal({
      type: 'deleteOne',
      id,
      onConfirm: async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/');
          return;
        }

        try {
          const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok && response.status !== 204) {
            throw new Error('Erreur lors de la suppression du message');
          }
          const updated = messages.filter((m) => m.id !== id);
          setMessages(updated);
          setNotification({
            type: 'success',
            message: 'Message supprimé avec succès.',
          });
        } catch (error) {
          console.error('Erreur lors de la suppression du message :', error);
          setNotification({
            type: 'error',
            message: 'Impossible de supprimer ce message pour le moment.',
          });
        }
        setConfirmModal(null);
      },
    });
  };

  const filteredMessages = messages.filter((m) => {
    const term = search.toLowerCase();
    return (
      m.name?.toLowerCase().includes(term) ||
      m.email?.toLowerCase().includes(term) ||
      m.subject?.toLowerCase().includes(term) ||
      m.message?.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredMessages.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedMessages = filteredMessages.slice(startIndex, startIndex + pageSize);

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              Messages de contact
            </h1>
            <p className="text-slate-500 mt-2 text-sm md:text-base">
              Tous les messages envoyés depuis la page Contact sont listés ici pour vous permettre de
              recontacter facilement vos prospects et clients.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-end">
            {messages.length > 0 && (
              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-xs md:text-sm font-semibold hover:bg-red-100 transition-colors"
              >
                <Trash2 size={16} />
                Vider tous les messages
              </button>
            )}
            <button
              onClick={() => navigate('/admin/users')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500 text-white text-xs md:text-sm font-semibold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/20"
            >
              <Users size={16} />
              Gestion des admins
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

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom, email, sujet..."
              className="w-full pl-9 pr-3 py-2.5 rounded-full border border-slate-200 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-white"
            />
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-2">
            {messages.length === 0
              ? 'Aucun message pour le moment.'
              : `${filteredMessages.length} message${filteredMessages.length > 1 ? 's' : ''} - page ${currentPage}/${totalPages}`}
          </div>
        </div>

        {/* Messages list */}
        {filteredMessages.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white/60 p-10 text-center">
            <p className="text-slate-500 mb-2 font-semibold">Aucun message trouvé</p>
            <p className="text-slate-400 text-sm">
              Dès qu&apos;un visiteur remplira le formulaire de contact, son message apparaîtra ici.
            </p>
          </div>
        ) : (
          <>
          <div className="space-y-4">
            {paginatedMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5 md:p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <User size={18} className="text-primary-600" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-bold text-slate-900 text-sm md:text-base">
                          {message.name || 'Nom non renseigné'}
                        </h2>
                        {message.subject && (
                          <span className="inline-flex px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold uppercase tracking-wide">
                            {message.subject}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500">
                        {message.email && (
                          <span className="inline-flex items-center gap-1">
                            <Mail size={12} />
                            {message.email}
                          </span>
                        )}
                        {message.phone && (
                          <span className="inline-flex items-center gap-1">
                            <Phone size={12} />
                            {message.phone}
                          </span>
                        )}
                        {message.createdAt && (
                          <span className="inline-flex items-center gap-1">
                            <Clock size={12} />
                            {new Date(message.createdAt).toLocaleString('fr-FR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteOne(message.id)}
                    className="self-start inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={12} />
                    Supprimer
                  </button>
                </div>

                {message.message && (
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                    {message.message}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2 text-xs md:text-sm">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:border-primary-500 hover:text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Précédent
              </button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const p = index + 1;
                const isActive = p === currentPage;
                return (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`w-8 h-8 rounded-full text-xs font-semibold flex items-center justify-center ${
                      isActive
                        ? 'bg-primary-500 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-500 hover:text-primary-600'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                onClick={() => goToPage(currentPage - 1 + 2 - 1)} /* currentPage + 1 */
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:border-primary-500 hover:text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Suivant
              </button>
            </div>
          )}
          </>
        )}
      </div>

      {/* Modale de confirmation */}
      <AnimatePresence>
        {confirmModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300]"
              onClick={() => setConfirmModal(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              className="fixed inset-0 z-[301] flex items-center justify-center px-4"
            >
              <div
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 md:p-8 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle size={24} className="text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2">
                      {confirmModal.type === 'clearAll'
                        ? 'Supprimer tous les messages ?'
                        : 'Supprimer ce message ?'}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {confirmModal.type === 'clearAll'
                        ? 'Cette action est irréversible. Tous les messages de contact seront définitivement supprimés.'
                        : 'Cette action est irréversible. Le message sera définitivement supprimé.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmModal(null)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={confirmModal.onConfirm}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors shadow-lg shadow-red-500/20"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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

export default Admin;


