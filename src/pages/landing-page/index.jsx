import React from 'react';
import StickyHeader from '../../components/ui/StickyHeader';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import DemoTestSection from './components/DemoTestSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import TrialFormSection from './components/TrialFormSection';
import FooterSection from './components/FooterSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation Header */}
      <StickyHeader />
      
      {/* Hero Section - Above the fold with primary CTA */}
      <HeroSection />
      
      {/* Problem Agitation - Highlighting pain points */}
      <ProblemSection />
      
      {/* Solution Overview - Platform capabilities */}
      <SolutionSection />
      
      {/* Demo Test Interface - Interactive experience */}
      <DemoTestSection />
      
      {/* Student Success Testimonials - Social proof */}
      <TestimonialsSection />
      
      {/* Pricing Plans - Conversion focused */}
      <PricingSection />
      
      {/* FAQ Section - Address objections */}
      <FAQSection />
      
      {/* Trial Form - Primary conversion point */}
      <TrialFormSection />
      
      {/* Footer - Additional links and trust signals */}
      <FooterSection />
    </div>
  );
};

export default LandingPage;