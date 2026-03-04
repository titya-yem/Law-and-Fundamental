import About from '@/components/Home/About';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router';
import Section from '@/components/Home/Section';
import Testimonials from '@/components/Home/Testimonials';

const MainLayout = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
      <About />
      <Section />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default MainLayout;
