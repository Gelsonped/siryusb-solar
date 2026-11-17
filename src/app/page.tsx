import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import Simulator from '@/components/Simulator';
import SolutionsEquipment from '@/components/SolutionsEquipment';
import Payment from '@/components/Payment';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Benefits />
        <Simulator />
        <SolutionsEquipment />
        <Payment />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}