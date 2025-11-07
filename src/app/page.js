import Navigation from '@/components/landing/Navigation';
import Hero from '@/components/landing/Hero';
import Partners from '@/components/landing/Partners';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Partners />
      </main>
      <Footer />
    </>
  );
}
