import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const StickyHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navigationItems = [
    { label: 'Home', anchor: '#home', primary: false },
    { label: 'Demo Test', anchor: '#demo-test', primary: false },
    { label: 'Features', anchor: '#features', primary: false },
    { label: 'Success Stories', anchor: '#success-stories', primary: false },
    { label: 'Pricing', anchor: '#pricing', primary: false },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);

      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.anchor.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (anchor) => {
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
  };

  const handleTrialClick = () => {
    // Track conversion event
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'CTA',
        event_label: 'Header Free Trial',
      });
    }
    
    const element = document.querySelector('#free-trial');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-[1000] transition-all duration-200 ease-in-out ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-sm shadow-md border-b border-border' 
          : 'bg-background'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
              aria-label="ExamAce Platform - Go to top"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="font-heading font-bold text-xl text-text-primary">
                ExamAce
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.anchor}
                onClick={() => handleNavClick(item.anchor)}
                className={`font-medium transition-colors duration-200 hover:text-primary ${
                  activeSection === item.anchor.substring(1)
                    ? 'text-primary border-b-2 border-primary pb-1' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center">
            <Button
              variant="primary"
              onClick={handleTrialClick}
              className="font-semibold px-6 py-2.5 shadow-cta hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile CTA */}
            <Button
              variant="primary"
              size="sm"
              onClick={handleTrialClick}
              className="font-semibold px-4 py-2"
            >
              Free Trial
            </Button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <Icon 
                name={isMenuOpen ? "X" : "Menu"} 
                size={24} 
                className="transition-transform duration-200"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[1050]"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-16 right-0 w-64 h-full bg-background shadow-xl z-[1100] transform transition-transform duration-300 ease-in-out">
            <nav className="flex flex-col p-6 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.anchor}
                  onClick={() => handleNavClick(item.anchor)}
                  className={`text-left py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    activeSection === item.anchor.substring(1)
                      ? 'bg-primary-50 text-primary border-l-4 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 border-t border-border">
                <Button
                  variant="primary"
                  onClick={handleTrialClick}
                  className="w-full font-semibold"
                  fullWidth
                >
                  Start Free Trial
                </Button>
              </div>
              
              <div className="pt-4 text-center">
                <p className="text-sm text-text-muted">
                  Join 10,000+ students already improving their ranks
                </p>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default StickyHeader;