import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Subscription from './pages/Subscription';
import Admin from './pages/Admin';
import AdminUsers from './pages/AdminUsers';
import GroupageShop from './pages/GroupageShop';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import { GroupageCartProvider } from './context/GroupageCartContext';
import './styles/global.css';
import './styles/variables.css';

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!isAdminRoute && <Header />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/subscription" element={<Subscription />} />
          {/* Espace Groupage / mini e-commerce */}
          <Route path="/groupage" element={<GroupageShop />} />
          <Route path="/groupage/panier" element={<Cart />} />
          <Route path="/groupage/profil" element={<Profile />} />
          {/* Alias direct pour la page profil si on tape /profile */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <GroupageCartProvider>
        <AppLayout />
      </GroupageCartProvider>
    </Router>
  );
}

export default App;

