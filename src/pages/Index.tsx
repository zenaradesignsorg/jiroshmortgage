import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StructuredData from "@/components/StructuredData";

// Lazy load below-the-fold components for better initial load performance
const About = lazy(() => import("@/components/About"));
const Services = lazy(() => import("@/components/Services"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Calculator = lazy(() => import("@/components/Calculator"));
const ContactForm = lazy(() => import("@/components/ContactForm"));
const Footer = lazy(() => import("@/components/Footer"));

const LoadingFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData />
      <Header />
      <main id="main-content">
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Services />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Calculator />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <ContactForm />
        </Suspense>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
