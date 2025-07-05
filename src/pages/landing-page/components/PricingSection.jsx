import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [isAnnual, setIsAnnual] = useState(true);
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds
  const [isVisible, setIsVisible] = useState(false);

  const plans = [
    {
      id: 0,
      name: "Foundation",
      description: "Perfect for beginners starting their JEE/NEET preparation",
      monthlyPrice: 999,
      annualPrice: 7999,
      originalPrice: 15999,
      features: [
        "5,000+ Practice Questions",
        "Basic Performance Analytics",
        "Subject-wise Tests",
        "Video Solutions",
        "Mobile App Access",
        "Email Support"
      ],
      limitations: [
        "Limited mock tests (10/month)",
        "Basic doubt clearing"
      ],
      popular: false,
      color: "secondary"
    },
    {
      id: 1,
      name: "Advanced",
      description: "Most popular choice for serious JEE/NEET aspirants",
      monthlyPrice: 1499,
      annualPrice: 11999,
      originalPrice: 23999,
      features: [
        "15,000+ Practice Questions",
        "Advanced AI Analytics",
        "Unlimited Mock Tests",
        "Live Doubt Clearing Sessions",
        "Personalized Study Plans",
        "Performance Comparison",
        "Mobile + Web Access",
        "Priority Support",
        "Previous Year Papers"
      ],
      limitations: [],
      popular: true,
      color: "primary"
    },
    {
      id: 2,
      name: "Complete",
      description: "Ultimate package with everything you need to crack JEE/NEET",
      monthlyPrice: 1999,
      annualPrice: 15999,
      originalPrice: 31999,
      features: [
        "25,000+ Practice Questions",
        "AI-Powered Rank Prediction",
        "Unlimited Everything",
        "1-on-1 Mentorship Sessions",
        "Custom Study Materials",
        "Live Classes by IIT/AIIMS Faculty",
        "Instant Doubt Resolution",
        "College Counseling",
        "Scholarship Guidance",
        "24/7 Premium Support"
      ],
      limitations: [],
      popular: false,
      color: "accent"
    }
  ];

  const comparisonData = [
    {
      category: "Traditional Coaching",
      annual: "₹2,50,000 - ₹5,00,000",
      perDay: "₹685 - ₹1,370",
      features: [
        "Fixed batch timings",
        "Limited personal attention",
        "Travel time required",
        "No flexibility"
      ],
      color: "error"
    },
    {
      category: "ExamAce Complete",
      annual: "₹15,999",
      perDay: "₹44",
      features: [
        "24/7 access",
        "Personalized learning",
        "Study from anywhere",
        "Complete flexibility"
      ],
      color: "accent"
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

    const element = document.querySelector('#pricing-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 86400);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPrice = (plan) => {
    return isAnnual ? plan.annualPrice : plan.monthlyPrice;
  };

  const getSavings = (plan) => {
    if (isAnnual) {
      return plan.originalPrice - plan.annualPrice;
    }
    return 0;
  };

  const getPerDayPrice = (plan) => {
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice * 12;
    return Math.round(price / 365);
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleEnrollClick = (plan) => {
    // Track conversion event
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'Pricing',
        event_label: `${plan.name} Plan`,
        value: getPrice(plan)
      });
    }
    
    const element = document.querySelector('#trial-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing-section" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Choose Your Path to 
            <span className="block text-gradient">Success</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Get premium JEE/NEET coaching at 90% less cost than traditional institutes. 
            All plans include 14-day free trial with money-back guarantee.
          </p>

          {/* Limited Time Offer */}
          <div className="bg-gradient-to-r from-error to-warning rounded-2xl p-6 text-white max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Clock" size={20} />
              <span className="font-semibold">Limited Time Offer</span>
            </div>
            <div className="text-2xl font-bold mb-2">50% OFF Annual Plans</div>
            <div className="text-lg">Offer expires in: {formatTime(timeLeft)}</div>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`font-medium ${!isAnnual ? 'text-text-primary' : 'text-text-secondary'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                isAnnual ? 'bg-primary' : 'bg-surface-300'
              }`}
            >
              <div className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform duration-200 ${
                isAnnual ? 'translate-x-8' : 'translate-x-1'
              }`}></div>
            </button>
            <span className={`font-medium ${isAnnual ? 'text-text-primary' : 'text-text-secondary'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                Save 50%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-primary scale-105' 
                    : selectedPlan === plan.id
                    ? 'border-primary' :'border-border hover:border-primary-300'
                } ${plan.popular ? 'transform hover:scale-110' : 'hover:scale-105'}`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                    <p className="text-text-secondary text-sm">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-4xl font-bold text-text-primary">
                        ₹{getPrice(plan).toLocaleString()}
                      </span>
                      <span className="text-text-secondary">
                        /{isAnnual ? 'year' : 'month'}
                      </span>
                    </div>
                    
                    {isAnnual && getSavings(plan) > 0 && (
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-text-muted line-through">
                          ₹{plan.originalPrice.toLocaleString()}
                        </span>
                        <span className="bg-accent text-white px-2 py-1 rounded text-sm font-medium">
                          Save ₹{getSavings(plan).toLocaleString()}
                        </span>
                      </div>
                    )}
                    
                    <div className="text-sm text-text-secondary">
                      Just ₹{getPerDayPrice(plan)}/day
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                          <Icon name="Check" size={12} className="text-white" />
                        </div>
                        <span className="text-text-secondary text-sm">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-center space-x-3 opacity-60">
                        <div className="w-5 h-5 bg-surface-300 rounded-full flex items-center justify-center">
                          <Icon name="X" size={12} className="text-text-muted" />
                        </div>
                        <span className="text-text-muted text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    fullWidth
                    size="lg"
                    onClick={() => handleEnrollClick(plan)}
                    className="font-semibold"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Start Free Trial
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              ExamAce vs Traditional Coaching
            </h3>
            <p className="text-text-secondary">
              See how much you can save while getting better results
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {comparisonData.map((item, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border-2 ${
                  item.color === 'error' ?'border-error-200 bg-error-50' :'border-accent-200 bg-accent-50'
                }`}
              >
                <div className="text-center mb-6">
                  <h4 className={`text-2xl font-bold mb-2 ${
                    item.color === 'error' ? 'text-error' : 'text-accent'
                  }`}>
                    {item.category}
                  </h4>
                  <div className={`text-3xl font-bold mb-1 ${
                    item.color === 'error' ? 'text-error' : 'text-accent'
                  }`}>
                    {item.annual}
                  </div>
                  <div className="text-text-secondary">
                    {item.perDay} per day
                  </div>
                </div>

                <div className="space-y-3">
                  {item.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        item.color === 'error' ?'bg-error text-white' :'bg-accent text-white'
                      }`}>
                        <Icon name={item.color === 'error' ? "X" : "Check"} size={12} />
                      </div>
                      <span className="text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-border max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={32} className="text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              100% Money-Back Guarantee
            </h3>
            <p className="text-text-secondary mb-6">
              Not satisfied with your progress in the first 30 days? Get a full refund, no questions asked. 
              We're confident in our AI-powered approach.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-accent" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-accent" />
                <span>30-day money back</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-accent" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;