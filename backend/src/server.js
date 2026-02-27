const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://bambahamed262_db_user:yriRLD0CAhra0jPE@vodason.ywzthsw.mongodb.net/';

// --- Connexion MongoDB ---
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connecté à MongoDB');
  })
  .catch((error) => {
    console.error('❌ Erreur de connexion à MongoDB :', error);
  });

// --- Modèle de message de contact ---
const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const Message = mongoose.model('Message', messageSchema);

// --- Modèle d'administrateur ---
const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // en clair pour l'instant (dev only)
    role: { type: String, default: 'admin' },
    token: { type: String, default: null }, // Token de session
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const Admin = mongoose.model('Admin', adminSchema);

// Création d'un admin par défaut si aucun n'existe
async function ensureDefaultAdmin() {
  try {
    const count = await Admin.estimatedDocumentCount();
    if (count === 0) {
      await Admin.create({
        name: 'Super Admin',
        email: 'admin@vodason.com',
        password: 'admin123', // à changer plus tard pour un mot de passe hashé
        role: 'superadmin',
      });
      console.log('✅ Admin par défaut créé : admin@vodason.com / admin123');
    }
  } catch (error) {
    console.error('Erreur lors de la création de l’admin par défaut :', error);
  }
}

mongoose.connection.once('open', () => {
  ensureDefaultAdmin();
});

// Middlewares
app.use(cors());
app.use(express.json());

// Middleware pour vérifier le token d'authentification
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Token d\'authentification manquant.' });
  }

  try {
    // Vérifier que le token existe dans la base (on stocke les tokens actifs dans Admin)
    const admin = await Admin.findOne({ token });
    if (!admin) {
      return res.status(403).json({ error: 'Token invalide ou session expirée.' });
    }
    req.admin = admin;
    next();
  } catch (error) {
    console.error('Erreur vérification token:', error);
    return res.status(500).json({ error: 'Erreur lors de la vérification du token.' });
  }
};

// Routes
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// --- Route d'authentification ---
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }

    // Générer un token unique
    const token = crypto.randomBytes(32).toString('hex');
    
    // Stocker le token dans l'admin
    admin.token = token;
    await admin.save();

    const adminSafe = admin.toObject();
    delete adminSafe.password;
    delete adminSafe.token;

    res.json({
      token,
      admin: adminSafe,
      message: 'Connexion réussie.',
    });
  } catch (error) {
    console.error('Erreur POST /api/auth/login:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion.' });
  }
});

// Route de déconnexion
app.post('/api/auth/logout', authenticateToken, async (req, res) => {
  try {
    req.admin.token = null;
    await req.admin.save();
    res.json({ message: 'Déconnexion réussie.' });
  } catch (error) {
    console.error('Erreur POST /api/auth/logout:', error);
    res.status(500).json({ error: 'Erreur lors de la déconnexion.' });
  }
});

// Récupérer tous les messages (protégé)
app.get('/api/messages', authenticateToken, async (_req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    // Transformer _id en id pour le frontend
    const messagesWithId = messages.map((msg) => {
      const msgObj = msg.toObject();
      msgObj.id = msgObj._id.toString();
      delete msgObj._id;
      return msgObj;
    });
    res.json(messagesWithId);
  } catch (error) {
    console.error('Erreur GET /api/messages:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des messages.' });
  }
});

// --- Routes Admins ---

// Liste des admins (sans le mot de passe) (protégé)
app.get('/api/admins', authenticateToken, async (_req, res) => {
  try {
    const admins = await Admin.find().sort({ createdAt: -1 }).select('-password');
    // Transformer _id en _id (garder _id pour AdminUsers qui l'utilise déjà)
    const adminsWithId = admins.map((admin) => {
      const adminObj = admin.toObject();
      adminObj._id = adminObj._id.toString();
      return adminObj;
    });
    res.json(adminsWithId);
  } catch (error) {
    console.error('Erreur GET /api/admins :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des administrateurs.' });
  }
});

// Créer un admin (protégé)
app.post('/api/admins', authenticateToken, async (req, res) => {
  const { name, email, password, role } = req.body || {};

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: 'Merci de renseigner au minimum nom, email et mot de passe.' });
  }

  try {
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Un administrateur avec cet email existe déjà.' });
    }

    const admin = await Admin.create({
      name,
      email,
      password, // on hashera plus tard
      role: role || 'admin',
    });

    const adminSafe = admin.toObject();
    delete adminSafe.password;
    adminSafe._id = adminSafe._id.toString();

    res.status(201).json(adminSafe);
  } catch (error) {
    console.error('Erreur POST /api/admins :', error);
    res.status(500).json({ error: 'Erreur lors de la création de l’administrateur.' });
  }
});

// Supprimer un admin (protégé)
app.delete('/api/admins/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    // On empêche (juste côté backend) de supprimer le dernier admin
    const count = await Admin.estimatedDocumentCount();
    if (count <= 1) {
      return res
        .status(400)
        .json({ error: "Impossible de supprimer le dernier administrateur restant." });
    }

    await Admin.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error('Erreur DELETE /api/admins/:id :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l’administrateur.' });
  }
});

// Créer un nouveau message
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res
      .status(400)
      .json({ error: 'Merci de remplir au minimum nom, email, sujet et message.' });
  }

  try {
    const newMessage = await Message.create({
      name,
      email,
      phone: phone || '',
      subject,
      message,
    });
    // Transformer _id en id pour le frontend
    const msgObj = newMessage.toObject();
    msgObj.id = msgObj._id.toString();
    delete msgObj._id;
    res.status(201).json(msgObj);
  } catch (error) {
    console.error('Erreur POST /api/contact:', error);
    res.status(500).json({ error: 'Erreur lors de l’enregistrement du message.' });
  }
});

// Supprimer un message (protégé)
app.delete('/api/messages/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  
  if (!id || id === 'undefined' || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID de message invalide.' });
  }

  try {
    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Message non trouvé.' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Erreur DELETE /api/messages/:id:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du message.' });
  }
});

// Vider tous les messages (protégé)
app.delete('/api/messages', authenticateToken, async (_req, res) => {
  try {
    await Message.deleteMany({});
    res.status(204).end();
  } catch (error) {
    console.error('Erreur DELETE /api/messages:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression des messages.' });
  }
});

app.listen(PORT, () => {
  console.log(`Vodason API démarrée sur http://localhost:${PORT}`);
});


