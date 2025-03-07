//import Contact from 'components/landing/contact';
import Features from 'components/landing/features';
import Footer from 'components/landing/footer';
import Hero from 'components/landing/hero';
import Ofrecemos from 'components/landing/ofrecemos';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Ofrecemos />
      <Features />
      <Footer />
    </main>
  );
}

