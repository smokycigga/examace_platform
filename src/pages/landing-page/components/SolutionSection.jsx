import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SolutionSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const solutions = [
    {
      title: "AI-Powered Personalization",
      description: "Our AI analyzes your performance and creates personalized study plans",
      icon: "Brain",
      features: [
        "Identifies weak areas in real-time",
        "Adapts question difficulty based on performance",
        "Provides personalized study recommendations",
        "Tracks improvement patterns"
      ],
      comparison: {
        traditional: "One-size-fits-all approach",
        ai: "Personalized for each student"
      }
    },
    {
      title: "Real-Time Analytics",
      description: "Get instant insights into your performance and progress",
      icon: "BarChart3",
      features: [
        "Live performance tracking",
        "Detailed subject-wise analysis",
        "Rank prediction algorithms",
        "Progress visualization"
      ],
      comparison: {
        traditional: "Results after months",
        ai: "Instant feedback & analysis"
      }
    },
    {
      title: "Expert Faculty Access",
      description: "Learn from IIT/AIIMS graduates and top educators",
      icon: "GraduationCap",
      features: [
        "Video solutions by IIT/AIIMS faculty",
        "Live doubt clearing sessions",
        "Concept explanation videos",
        "24/7 expert support"
      ],
      comparison: {
        traditional: "Limited teacher interaction",
        ai: "Unlimited expert access"
      }
    },
    {
      title: "Cost-Effective Learning",
      description: "Get premium coaching at a fraction of traditional costs",
      icon: "Wallet",
      features: [
        "90% cost savings vs offline coaching",
        "No travel expenses",
        "Flexible payment options",
        "Money-back guarantee"
      ],
      comparison: {
        traditional: "₹2-5 lakhs annually",
        ai: "₹12,000-24,000 annually"
      }
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('#solution-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prev => (prev + 1) % solutions.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleTrialClick = () => {
    const element = document.querySelector('#trial-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="solution-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Meet Your <span className="text-gradient">AI-Powered</span>
            <span className="block">Exam Preparation Solution</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            ExamAce combines cutting-edge AI technology with expert teaching to deliver 
            personalized learning experiences that adapt to your unique needs.
          </p>
        </div>

        {/* Interactive Solution Showcase */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Solution Tabs */}
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    activeTab === index
                      ? 'border-primary bg-primary-50 shadow-lg'
                      : 'border-border bg-white hover:border-primary-300 hover:bg-primary-25'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      activeTab === index ? 'bg-primary text-white' : 'bg-surface text-text-secondary'
                    }`}>
                      <Icon name={solution.icon} size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-2 ${
                        activeTab === index ? 'text-primary' : 'text-text-primary'
                      }`}>
                        {solution.title}
                      </h3>
                      <p className="text-text-secondary text-sm">
                        {solution.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Active Solution Details */}
            <div className="bg-surface rounded-2xl p-8 shadow-xl">
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                    <Icon name={solutions[activeTab].icon} size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">
                      {solutions[activeTab].title}
                    </h3>
                    <p className="text-text-secondary">
                      {solutions[activeTab].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <h4 className="font-semibold text-text-primary mb-4">Key Features:</h4>
                <div className="space-y-3">
                  {solutions[activeTab].features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                        <Icon name="Check" size={12} className="text-white" />
                      </div>
                      <span className="text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparison */}
              <div className="bg-white rounded-lg p-6 border border-border">
                <h4 className="font-semibold text-text-primary mb-4">Traditional vs AI-Powered:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon name="X" size={16} className="text-error" />
                    </div>
                    <p className="text-sm text-text-secondary">
                      {solutions[activeTab].comparison.traditional}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon name="Check" size={16} className="text-accent" />
                    </div>
                    <p className="text-sm text-text-secondary">
                      {solutions[activeTab].comparison.ai}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className={`mt-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              Why Students Choose ExamAce
            </h3>
            <p className="text-text-secondary">
              Join thousands of successful students who transformed their exam preparation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-primary-50 rounded-xl border border-primary-200">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold text-text-primary mb-2">3x Faster Learning</h4>
              <p className="text-text-secondary">
                AI identifies and fixes weak areas 3x faster than traditional methods
              </p>
            </div>

            <div className="text-center p-6 bg-accent-50 rounded-xl border border-accent-200">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Target" size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold text-text-primary mb-2">85% Success Rate</h4>
              <p className="text-text-secondary">
                Students improve their scores by average 85% within 3 months
              </p>
            </div>

            <div className="text-center p-6 bg-secondary-50 rounded-xl border border-secondary-200">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="DollarSign" size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold text-text-primary mb-2">90% Cost Savings</h4>
              <p className="text-text-secondary">
                Get premium coaching at 1/10th the cost of traditional institutes
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Transform Your Exam Preparation?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join 50,000+ students who are already using AI to crack JEE/NEET
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleTrialClick}
              className="font-semibold px-8 py-4 bg-white text-primary hover:bg-surface shadow-xl"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Start Your Free Trial Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;