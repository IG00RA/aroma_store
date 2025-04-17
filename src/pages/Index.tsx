
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import DescriptionSection from '@/components/DescriptionSection';
import GallerySection from '@/components/GallerySection';
import SpecsSection from '@/components/SpecsSection';
import ReviewsSection from '@/components/ReviewsSection';
import OrderSection from '@/components/OrderSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DescriptionSection />
        <GallerySection />
        <SpecsSection />
        <ReviewsSection />
        <OrderSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
