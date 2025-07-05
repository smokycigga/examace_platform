import React from 'react';
import Icon from '../../../components/AppIcon';


const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Demo Test', href: '#demo-test' },
      { name: 'Success Stories', href: '#success-stories' },
      { name: 'Mobile App', href: '#mobile-app' }
    ],
    exams: [
      { name: 'JEE Main Preparation', href: '#jee-main' },
      { name: 'JEE Advanced Preparation', href: '#jee-advanced' },
      { name: 'NEET Preparation', href: '#neet' },
      { name: 'Mock Tests', href: '#mock-tests' },
      { name: 'Previous Year Papers', href: '#previous-papers' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'Live Chat', href: '#chat' },
      { name: 'WhatsApp Support', href: '#whatsapp' },
      { name: 'FAQ', href: '#faq' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' },
      { name: 'Blog', href: '#blog' },
      { name: 'Partnerships', href: '#partnerships' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Refund Policy', href: '#refund' },
      { name: 'Cookie Policy', href: '#cookies' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', href: '#facebook' },
    { name: 'Twitter', icon: 'Twitter', href: '#twitter' },
    { name: 'Instagram', icon: 'Instagram', href: '#instagram' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#linkedin' },
    { name: 'YouTube', icon: 'Youtube', href: '#youtube' },
    { name: 'Telegram', icon: 'MessageCircle', href: '#telegram' }
  ];

  const trustBadges = [
    {
      name: 'ISO Certified',
      icon: 'Shield',
      description: 'ISO 27001 Certified'
    },
    {
      name: 'Secure Payments',
      icon: 'Lock',
      description: 'SSL Encrypted'
    },
    {
      name: 'GDPR Compliant',
      icon: 'FileCheck',
      description: 'Data Protected'
    },
    {
      name: '99.9% Uptime',
      icon: 'Server',
      description: 'Reliable Service'
    }
  ];

  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-text-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="font-heading font-bold text-2xl">ExamAce</span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              India's most trusted AI-powered exam preparation platform. 
              Helping 50,000+ students crack JEE/NEET with personalized learning 
              and expert guidance at affordable prices.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-primary" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-primary" />
                <span className="text-gray-300">support@examace.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="text-gray-300">Bangalore, Karnataka, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <button
                  key={social.name}
                  onClick={() => handleLinkClick(social.href)}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Exam Preparation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Exam Prep</h3>
            <ul className="space-y-3">
              {footerLinks.exams.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* App Download */}
            <div className="space-y-3">
              <h4 className="font-medium text-white">Download App</h4>
              <div className="space-y-2">
                <button className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2 hover:bg-gray-700 transition-colors duration-200">
                  <Icon name="Smartphone" size={20} className="text-primary" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on</div>
                    <div className="text-sm font-medium">Google Play</div>
                  </div>
                </button>
                <button className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2 hover:bg-gray-700 transition-colors duration-200">
                  <Icon name="Smartphone" size={20} className="text-primary" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on</div>
                    <div className="text-sm font-medium">App Store</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Icon name={badge.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{badge.name}</div>
                  <div className="text-xs text-gray-400">{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Updated with Exam Tips</h3>
            <p className="text-gray-300 mb-6">
              Get weekly study tips, exam updates, and success stories delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} ExamAce. All rights reserved. Made with ❤️ for Indian students.
            </div>
            
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-gray-600">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;