import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Arjun Sharma",
      rank: "AIR 247 - JEE Advanced",
      college: "IIT Delhi - Computer Science",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: `ExamAce's AI completely transformed my preparation. The personalized study plan helped me identify my weak areas in Physics, and within 3 months, my score improved by 40%. The real-time analytics kept me motivated throughout my journey.`,
      improvement: "+40% Score Improvement",
      timeframe: "3 months",
      previousScore: "65%",
      finalScore: "91%",
      location: "Delhi"
    },
    {
      id: 2,
      name: "Priya Patel",
      rank: "AIR 156 - NEET",
      college: "AIIMS Delhi - MBBS",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: `I was struggling with Chemistry and Biology concepts. ExamAce's video solutions by AIIMS faculty and instant doubt clearing helped me understand complex topics easily. The mock tests were exactly like the real NEET exam.`,
      improvement: "+35% Score Improvement",
      timeframe: "4 months",
      previousScore: "72%",
      finalScore: "97%",
      location: "Gujarat"
    },
    {
      id: 3,
      name: "Rohit Kumar",
      rank: "AIR 89 - JEE Main",
      college: "NIT Trichy - Mechanical Engineering",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: `Coming from a small town, I couldn't afford expensive coaching. ExamAce gave me access to top-quality education at an affordable price. The AI-powered practice tests adapted to my learning pace perfectly.`,
      improvement: "+50% Score Improvement",
      timeframe: "6 months",
      previousScore: "58%",
      finalScore: "87%",
      location: "Jharkhand"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      rank: "AIR 203 - NEET",
      college: "JIPMER - MBBS",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: `The detailed performance analytics helped me track my progress daily. I could see exactly which topics needed more attention. The mobile app allowed me to study anywhere, anytime. Highly recommend ExamAce!`,
      improvement: "+42% Score Improvement",
      timeframe: "5 months",
      previousScore: "69%",
      finalScore: "96%",
      location: "Hyderabad"
    },
    {
      id: 5,
      name: "Vikash Singh",
      rank: "AIR 134 - JEE Advanced",
      college: "IIT Bombay - Electrical Engineering",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      quote: `ExamAce's AI identified that I was weak in Calculus and Organic Chemistry. The personalized study plan focused on these areas, and I saw immediate improvement. The cost was just 1/10th of what my friends paid for coaching.`,
      improvement: "+38% Score Improvement",
      timeframe: "4 months",
      previousScore: "71%",
      finalScore: "98%",
      location: "Bihar"
    }
  ];

  const parentTestimonials = [
    {
      name: "Mrs. Sunita Sharma",
      relation: "Mother of Arjun Sharma (AIR 247)",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      quote: `We saved over ₹3 lakhs compared to traditional coaching. Arjun could study from home, and we could track his progress in real-time. The results speak for themselves - he got into IIT Delhi!`,
      savings: "₹3,00,000 saved",
      location: "Delhi"
    },
    {
      name: "Mr. Rajesh Patel",
      relation: "Father of Priya Patel (AIIMS Delhi)",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: `As a middle-class family, ExamAce was a blessing. Quality education at an affordable price. Priya got personalized attention that she never got in batch coaching. Worth every penny!`,
      savings: "₹2,50,000 saved",
      location: "Ahmedabad"
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

    const element = document.querySelector('#testimonials-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Success Stories from 
            <span className="block text-gradient">Our Top Rankers</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Real students, real results. See how ExamAce helped them achieve their dream college admissions 
            with significant score improvements.
          </p>
        </div>

        {/* Student Testimonials Carousel */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative max-w-4xl mx-auto mb-16">
            {/* Main Testimonial Card */}
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 shadow-xl border border-primary-200">
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                {/* Student Photo & Basic Info */}
                <div className="flex-shrink-0 text-center lg:text-left">
                  <div className="relative">
                    <Image
                      src={testimonials[currentSlide].image}
                      alt={testimonials[currentSlide].name}
                      className="w-32 h-32 rounded-full object-cover mx-auto lg:mx-0 border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-accent rounded-full flex items-center justify-center border-4 border-white">
                      <Icon name="Trophy" size={20} className="text-white" />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-text-primary">{testimonials[currentSlide].name}</h3>
                    <p className="text-primary font-semibold">{testimonials[currentSlide].rank}</p>
                    <p className="text-text-secondary text-sm">{testimonials[currentSlide].college}</p>
                    <p className="text-text-muted text-xs flex items-center justify-center lg:justify-start mt-1">
                      <Icon name="MapPin" size={12} className="mr-1" />
                      {testimonials[currentSlide].location}
                    </p>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1">
                  <div className="mb-6">
                    <Icon name="Quote" size={32} className="text-primary opacity-50 mb-4" />
                    <blockquote className="text-text-primary text-lg leading-relaxed italic">
                      "{testimonials[currentSlide].quote}"
                    </blockquote>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                      <div className="text-2xl font-bold text-accent">{testimonials[currentSlide].improvement}</div>
                      <div className="text-xs text-text-secondary">Improvement</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                      <div className="text-2xl font-bold text-primary">{testimonials[currentSlide].timeframe}</div>
                      <div className="text-xs text-text-secondary">Duration</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                      <div className="text-2xl font-bold text-error">{testimonials[currentSlide].previousScore}</div>
                      <div className="text-xs text-text-secondary">Before</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                      <div className="text-2xl font-bold text-accent">{testimonials[currentSlide].finalScore}</div>
                      <div className="text-xs text-text-secondary">After</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200"
            >
              <Icon name="ChevronRight" size={20} />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide ? 'bg-primary' : 'bg-surface-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Parent Testimonials */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              What Parents Say About ExamAce
            </h3>
            <p className="text-text-secondary">
              Hear from satisfied parents who saved lakhs while ensuring their child's success
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {parentTestimonials.map((parent, index) => (
              <div key={index} className="bg-surface rounded-xl p-6 shadow-lg border border-border">
                <div className="flex items-start space-x-4 mb-4">
                  <Image
                    src={parent.image}
                    alt={parent.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-text-primary">{parent.name}</h4>
                    <p className="text-sm text-text-secondary">{parent.relation}</p>
                    <p className="text-xs text-text-muted flex items-center mt-1">
                      <Icon name="MapPin" size={12} className="mr-1" />
                      {parent.location}
                    </p>
                  </div>
                </div>
                
                <blockquote className="text-text-secondary italic mb-4">
                  "{parent.quote}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-current" />
                    ))}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-accent">{parent.savings}</div>
                    <div className="text-xs text-text-secondary">Total Savings</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className={`mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6">
              Join Our Success Community
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">50,000+</div>
                <div className="text-sm opacity-90">Students Enrolled</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">85%</div>
                <div className="text-sm opacity-90">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">₹2.5L</div>
                <div className="text-sm opacity-90">Average Savings</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">4.9/5</div>
                <div className="text-sm opacity-90">Student Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;