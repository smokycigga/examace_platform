import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProblemSection = () => {
  const [visibleStats, setVisibleStats] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const problems = [
    {
      icon: "DollarSign",
      title: "Expensive Coaching Fees",
      description: "₹2-5 lakhs annually for quality coaching",
      stat: "₹3.5L",
      statLabel: "Average Annual Cost",
      color: "error"
    },
    {
      icon: "Clock",
      title: "Time Wastage in Travel",
      description: "2-4 hours daily commuting to coaching centers",
      stat: "3.2 hrs",
      statLabel: "Daily Travel Time",
      color: "warning"
    },
    {
      icon: "Users",
      title: "Lack of Personal Attention",
      description: "1 teacher for 100+ students in batch coaching",
      stat: "1:100",
      statLabel: "Teacher-Student Ratio",
      color: "secondary"
    },
    {
      icon: "TrendingDown",
      title: "No Progress Tracking",
      description: "Students don't know their weak areas until it's too late",
      stat: "78%",
      statLabel: "Students Lack Clarity",
      color: "primary"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Parent of JEE Aspirant",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: `We spent ₹4 lakhs on coaching for our son, but he still couldn't crack JEE. The batch size was too large, and teachers couldn't give individual attention. We wish we had found a better solution earlier.`,
      location: "Delhi"
    },
    {
      name: "Sunita Sharma",
      role: "Mother of NEET Aspirant",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: `My daughter used to travel 2 hours daily to coaching. By the time she reached home, she was exhausted. Online learning seemed risky, but traditional coaching wasn't working either.`,
      location: "Mumbai"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate stats appearance
          problems.forEach((_, index) => {
            setTimeout(() => {
              setVisibleStats(prev => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('#problem-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color) => {
    const colors = {
      error: "bg-error-50 text-error border-error-200",
      warning: "bg-warning-50 text-warning border-warning-200",
      secondary: "bg-secondary-50 text-secondary border-secondary-200",
      primary: "bg-primary-50 text-primary border-primary-200"
    };
    return colors[color] || colors.primary;
  };

  return (
    <section id="problem-section" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Why Traditional Coaching 
            <span className="block text-error">Isn't Working Anymore?</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Thousands of students and parents are struggling with outdated coaching methods. 
            Here's what's holding them back from achieving their dreams.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-500 ${
                visibleStats.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getColorClasses(problem.color)}`}>
                <Icon name={problem.icon} size={24} />
              </div>
              
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {problem.title}
              </h3>
              
              <p className="text-text-secondary mb-4 text-sm">
                {problem.description}
              </p>
              
              <div className="border-t border-border pt-4">
                <div className={`text-2xl font-bold ${problem.color === 'error' ? 'text-error' : problem.color === 'warning' ? 'text-warning' : problem.color === 'secondary' ? 'text-secondary' : 'text-primary'}`}>
                  {problem.stat}
                </div>
                <div className="text-xs text-text-secondary">
                  {problem.statLabel}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Parent Testimonials */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              Real Stories from Frustrated Parents
            </h3>
            <p className="text-text-secondary">
              Don't let your child's dreams suffer like these families did
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-text-secondary">{testimonial.role}</p>
                    <p className="text-xs text-text-muted flex items-center mt-1">
                      <Icon name="MapPin" size={12} className="mr-1" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                
                <blockquote className="text-text-secondary italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center mt-4 text-warning">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-error-50 to-warning-50 rounded-2xl p-8 border border-error-200">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Don't Let Your Child Become Another Statistic
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Every year, thousands of talented students miss their dream colleges due to ineffective preparation methods. 
              It's time for a smarter approach.
            </p>
            <div className="flex items-center justify-center space-x-2 text-error font-semibold">
              <Icon name="AlertTriangle" size={20} />
              <span>Limited seats available for this academic year</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;