import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const [studentCount, setStudentCount] = useState(50247);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate student counter
    const interval = setInterval(() => {
      setStudentCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleTrialClick = () => {
    const element = document.querySelector('#trial-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDemoClick = () => {
    const element = document.querySelector('#demo-test');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Live Counter */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-primary-200">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-text-primary">
                <span className="font-bold text-primary">{studentCount.toLocaleString()}</span> students preparing right now
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                Crack <span className="text-gradient">JEE/NEET</span> with India's #1 
                <span className="block text-primary">AI-Powered Test Platform</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-text-secondary font-medium">
                Get IIT/AIIMS coaching at <span className="text-accent font-bold">1/10th the cost</span> with personalized AI analytics
              </p>
            </div>

            {/* Value Props */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center">
                  <Icon name="Zap" size={16} className="text-accent" />
                </div>
                <span className="text-text-primary font-medium">AI-Powered Analytics</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="Clock" size={16} className="text-primary" />
                </div>
                <span className="text-text-primary font-medium">Real-time Tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                  <Icon name="Users" size={16} className="text-secondary" />
                </div>
                <span className="text-text-primary font-medium">Expert Faculty</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-warning-100 rounded-full flex items-center justify-center">
                  <Icon name="Award" size={16} className="text-warning" />
                </div>
                <span className="text-text-primary font-medium">85% Success Rate</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleTrialClick}
                className="font-semibold px-8 py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Start Free 14-Day Trial
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleDemoClick}
                className="font-semibold px-8 py-4 border-2 hover:bg-primary-50 transition-all duration-300"
                iconName="Play"
                iconPosition="left"
              >
                Take Demo Test Now
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-text-secondary">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">85%</div>
                <div className="text-sm text-text-secondary">Score Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">200+</div>
                <div className="text-sm text-text-secondary">Partner Institutes</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              {/* Main Dashboard Preview */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">E</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">ExamAce Dashboard</h3>
                      <p className="text-sm text-text-secondary">Your Performance Overview</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-sm text-text-secondary">Live</span>
                  </div>
                </div>

                {/* Progress Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-text-secondary">JEE Rank</p>
                        <p className="text-2xl font-bold text-primary">2,847</p>
                      </div>
                      <Icon name="TrendingUp" className="text-primary" />
                    </div>
                  </div>
                  <div className="bg-accent-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-text-secondary">Accuracy</p>
                        <p className="text-2xl font-bold text-accent">87%</p>
                      </div>
                      <Icon name="Target" className="text-accent" />
                    </div>
                  </div>
                </div>

                {/* Subject Performance */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-text-primary">Subject Performance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">Physics</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-surface-200 rounded-full">
                          <div className="w-16 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">80%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">Chemistry</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-surface-200 rounded-full">
                          <div className="w-18 h-2 bg-accent rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">90%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">Mathematics</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-surface-200 rounded-full">
                          <div className="w-14 h-2 bg-secondary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">70%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Success Notifications */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-border animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center">
                    <Icon name="Trophy" size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-text-primary">Rahul K.</p>
                    <p className="text-xs text-text-secondary">AIR 247 in JEE</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-border animate-bounce delay-1000">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name="Star" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-text-primary">Priya S.</p>
                    <p className="text-xs text-text-secondary">AIIMS Delhi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-text-secondary" />
      </div>
    </section>
  );
};

export default HeroSection;