import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import CounterSection from '../components/sections/Counter';
import Payment from '../components/sections/Payment';
import Team from '../components/sections/Team';
import ContactBanner from '../components/sections/ContactBanner';

const Home = () => {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <CounterSection />
      <Payment />
      <Team />
      <ContactBanner />
    </main>
  );
};

export default Home;

