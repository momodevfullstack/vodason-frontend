import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'vodason_groupage_profile';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    notes: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Erreur chargement profil groupage', e);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (err) {
      console.error('Erreur sauvegarde profil groupage', err);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container max-w-3xl">
        <button
          onClick={() => navigate('/groupage')}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft size={16} />
          Retour à l’espace Groupage
        </button>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Mon profil Groupage
        </h1>
        <p className="text-slate-600 mb-6 max-w-xl">
          Enregistrez vos informations pour faciliter le traitement de vos
          demandes de groupage par l’équipe VODASON.
        </p>

        <form
          onSubmit={handleSave}
          className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Nom complet
              </label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50"
                placeholder="Votre nom et prénom"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50"
                placeholder="vous@example.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Téléphone / WhatsApp
              </label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50"
                placeholder="+221..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Ville / Pays
              </label>
              <input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50"
                placeholder="Dakar, Abidjan..."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Notes / Informations complémentaires
            </label>
            <textarea
              name="notes"
              value={profile.notes}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 resize-none"
              placeholder="Précisez vos besoins de groupage, destinations, fréquences..."
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <p className="text-xs text-slate-500 max-w-sm">
              Ces informations restent utilisées uniquement dans le cadre de vos
              demandes de groupage avec VODASON.
            </p>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition shadow-md"
            >
              Enregistrer mon profil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;


