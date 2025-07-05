import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TrialFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    examType: 'JEE',
    currentClass: '12th',
    city: '',
    agreeTerms: false
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const examTypes = ['JEE Main', 'JEE Advanced', 'NEET', 'Both JEE & NEET'];
  const classes = ['11th', '12th', 'Dropper'];
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Other'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('#trial-form');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number';
    }
    
    if (step === 2) {
      if (!formData.agreeTerms) newErrors.agreeTerms = 'Please accept terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(2)) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Track conversion
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          event_category: 'Trial Signup',
          event_label: formData.examType,
          value: 1
        });
      }
      
      // Show success state
      setCurrentStep(3);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: "Zap",
      title: "Instant Access",
      description: "Start practicing immediately after signup"
    },
    {
      icon: "BookOpen",
      title: "5,000+ Questions",
      description: "Access to our complete question bank"
    },
    {
      icon: "BarChart3",
      title: "AI Analytics",
      description: "Personalized performance insights"
    },
    {
      icon: "Users",
      title: "Expert Support",
      description: "Get help from IIT/AIIMS faculty"
    }
  ];

  return (
    <section id="trial-form" className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                Start Your <span className="text-gradient">Free Trial</span>
                <span className="block">Today</span>
              </h2>
              <p className="text-xl text-text-secondary">
                Join 50,000+ students who are already using AI to crack JEE/NEET. 
                Get instant access to our complete platform for 14 days, absolutely free.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Icon name={benefit.icon} size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-text-secondary">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-text-secondary">Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">4.9/5</div>
                  <div className="text-sm text-text-secondary">Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">85%</div>
                  <div className="text-sm text-text-secondary">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-border">
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-text-secondary">
                    Step {currentStep} of {currentStep === 3 ? 3 : 2}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {currentStep === 3 ? 'Complete!' : `${Math.round((currentStep / 2) * 100)}%`}
                  </span>
                </div>
                <div className="w-full bg-surface-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${currentStep === 3 ? 100 : (currentStep / 2) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                      Let's Get Started
                    </h3>
                    <p className="text-text-secondary">
                      Tell us about yourself to personalize your experience
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={errors.name ? 'border-error' : ''}
                      />
                      {errors.name && (
                        <p className="text-error text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-error' : ''}
                      />
                      {errors.email && (
                        <p className="text-error text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={errors.phone ? 'border-error' : ''}
                      />
                      {errors.phone && (
                        <p className="text-error text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <select
                          value={formData.examType}
                          onChange={(e) => handleInputChange('examType', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          {examTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <select
                          value={formData.currentClass}
                          onChange={(e) => handleInputChange('currentClass', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          {classes.map(cls => (
                            <option key={cls} value={cls}>{cls}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <select
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select Your City</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    fullWidth
                    size="lg"
                    onClick={handleNextStep}
                    className="font-semibold"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Continue
                  </Button>
                </div>
              )}

              {/* Step 2: Confirmation */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                      Almost There!
                    </h3>
                    <p className="text-text-secondary">
                      Review your information and start your free trial
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="bg-surface rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Name:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Email:</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Exam:</span>
                      <span className="font-medium">{formData.examType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Class:</span>
                      <span className="font-medium">{formData.currentClass}</span>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="space-y-4">
                    <label className="flex items-start space-x-3">
                      <Input
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                        className="mt-1"
                      />
                      <span className="text-sm text-text-secondary">
                        I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and{' '}
                        <a href="#" className="text-primary hover:underline">Privacy Policy</a>. 
                        I understand this is a free 14-day trial with no automatic charges.
                      </span>
                    </label>
                    {errors.agreeTerms && (
                      <p className="text-error text-sm">{errors.agreeTerms}</p>
                    )}
                  </div>

                  {errors.submit && (
                    <div className="bg-error-50 border border-error-200 rounded-lg p-4">
                      <p className="text-error text-sm">{errors.submit}</p>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      className="flex-1"
                      iconName="ArrowLeft"
                      iconPosition="left"
                    >
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      loading={isSubmitting}
                      className="flex-1 font-semibold"
                      iconName="Zap"
                      iconPosition="right"
                    >
                      Start Free Trial
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {currentStep === 3 && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto">
                    <Icon name="Check" size={40} className="text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                      Welcome to ExamAce!
                    </h3>
                    <p className="text-text-secondary">
                      Your free trial has been activated. Check your email for login details.
                    </p>
                  </div>

                  <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                    <h4 className="font-semibold text-text-primary mb-2">What's Next?</h4>
                    <ul className="text-sm text-text-secondary space-y-1 text-left">
                      <li>• Check your email for login credentials</li>
                      <li>• Take the diagnostic test to assess your level</li>
                      <li>• Get your personalized study plan</li>
                      <li>• Start practicing with AI-powered questions</li>
                    </ul>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="font-semibold"
                    iconName="ExternalLink"
                    iconPosition="right"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrialFormSection;