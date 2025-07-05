import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const faqs = [
    {
      question: "How effective is online learning compared to traditional coaching?",
      answer: `Our AI-powered platform has proven to be more effective than traditional coaching for several reasons:\n\n• Personalized learning paths adapt to your unique strengths and weaknesses\n• Instant feedback helps you correct mistakes immediately\n• 24/7 access means you can study at your optimal times\n• Data shows 85% of our students improve their scores within 3 months\n• No time wasted in travel - more time for actual studying\n\nTraditional coaching follows a one-size-fits-all approach, while ExamAce customizes everything for you.`,
      category: "Learning Effectiveness"
    },
    {
      question: "What technical requirements do I need to use ExamAce?",
      answer: `ExamAce works on any device with basic internet connectivity:\n\n• Smartphone (Android 6.0+ or iOS 12+)\n• Tablet or laptop with any modern browser\n• Minimum 2 Mbps internet speed for video content\n• 1GB free storage for offline content\n• No special software installation required\n\nOur platform is optimized for Indian internet conditions and works even on 3G connections. You can also download tests for offline practice.`,
      category: "Technical Requirements"
    },
    {
      question: "How does the AI personalization actually work?",
      answer: `Our AI analyzes your performance across multiple dimensions:\n\n• Time spent on each question type\n• Accuracy patterns across different topics\n• Learning speed and retention rates\n• Mistake patterns and common errors\n• Optimal study times based on your activity\n\nBased on this analysis, the AI creates:\n• Customized question sets focusing on weak areas\n• Adaptive difficulty levels\n• Personalized study schedules\n• Targeted revision plans\n• Predicted performance improvements`,
      category: "AI Technology"
    },
    {
      question: "What if I don't see improvement in my scores?",
      answer: `We're confident in our approach, but if you don't see improvement:\n\n• First 30 days: 100% money-back guarantee, no questions asked\n• Free consultation with our academic counselors\n• Personalized study plan revision\n• Additional mentorship sessions at no extra cost\n• Extended access to premium features\n\nOur data shows 85% of students see significant improvement within 3 months. We'll work with you until you achieve your target scores.`,
      category: "Performance Guarantee"
    },
    {
      question: "How do your mock tests compare to actual JEE/NEET exams?",
      answer: `Our mock tests are designed to be as close to the real exam as possible:\n\n• Same interface as the actual NTA exam portal\n• Questions created by IIT/AIIMS faculty\n• Exact time limits and marking schemes\n• Similar difficulty distribution\n• Real-time rank prediction algorithms\n• Detailed performance analysis post-test\n\nMany students report that our mocks are actually slightly harder than the real exam, which helps build confidence and over-preparation.`,
      category: "Mock Tests"
    },
    {
      question: "Can I get personal doubt clearing and mentorship?",
      answer: `Yes! All our plans include comprehensive support:\n\n• Live doubt clearing sessions with expert faculty\n• 1-on-1 mentorship calls (Advanced & Complete plans)\n• 24/7 chat support for technical issues\n• WhatsApp groups for peer interaction\n• Video explanations for every question\n• Personal academic counselor assignment\n\nOur faculty includes IIT/AIIMS graduates and experienced educators who understand the challenges of competitive exam preparation.`,
      category: "Support & Mentorship"
    },
    {
      question: "How secure is my personal data and payment information?",
      answer: `Your data security is our top priority:\n\n• Bank-grade 256-bit SSL encryption\n• PCI DSS compliant payment processing\n• No storage of payment card details\n• Regular security audits and updates\n• GDPR compliant data handling\n• Secure cloud infrastructure with 99.9% uptime\n\nWe never share your personal information with third parties. Your study data is used only to improve your learning experience.`,
      category: "Security & Privacy"
    },
    {
      question: "What happens after my free trial ends?",
      answer: `After your 14-day free trial:\n\n• You can choose to continue with any paid plan\n• No automatic charges - you decide when to upgrade\n• All your progress and data is saved\n• You can downgrade or cancel anytime\n• Special discount offers for trial users\n• Flexible payment options including EMI\n\nIf you don't upgrade, you'll still have access to basic features and can upgrade later whenever you're ready.`,
      category: "Billing & Plans"
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

    const element = document.querySelector('#faq-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <section id="faq-section" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Frequently Asked 
            <span className="block text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Get answers to common questions about ExamAce. Still have questions? 
            Our support team is here to help 24/7.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-primary-50 text-primary rounded-full text-sm font-medium border border-primary-200"
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className={`space-y-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-surface rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-primary-25 rounded-xl transition-colors duration-200"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {faq.question}
                  </h3>
                  <span className="text-sm text-text-secondary bg-white px-3 py-1 rounded-full border border-border">
                    {faq.category}
                  </span>
                </div>
                <div className={`ml-4 transform transition-transform duration-200 ${
                  openFAQ === index ? 'rotate-180' : ''
                }`}>
                  <Icon name="ChevronDown" size={24} className="text-text-secondary" />
                </div>
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-border pt-4">
                    <div className="prose max-w-none">
                      <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-200">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="MessageCircle" size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Still Have Questions?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Our expert counselors are available 24/7 to help you choose the right plan 
              and answer any questions about your exam preparation journey.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 bg-white rounded-lg p-4 border border-border">
                <Icon name="Phone" size={20} className="text-primary" />
                <div className="text-left">
                  <div className="text-sm font-medium text-text-primary">Call Us</div>
                  <div className="text-xs text-text-secondary">+91 98765 43210</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-2 bg-white rounded-lg p-4 border border-border">
                <Icon name="Mail" size={20} className="text-primary" />
                <div className="text-left">
                  <div className="text-sm font-medium text-text-primary">Email Us</div>
                  <div className="text-xs text-text-secondary">help@examace.in</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-2 bg-white rounded-lg p-4 border border-border">
                <Icon name="MessageSquare" size={20} className="text-primary" />
                <div className="text-left">
                  <div className="text-sm font-medium text-text-primary">Live Chat</div>
                  <div className="text-xs text-text-secondary">Available 24/7</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;