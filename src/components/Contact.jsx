import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-light text-gray-800 mb-2">Message sent</div>
          <div className="text-gray-500">Thank you for reaching out</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto py-16 px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-light text-gray-900 mb-4">Contact</h1>
          <p className="text-gray-600">Get in touch with us</p>
        </div>

        {/* Contact Form */}
        <div className="mb-16">
          <div className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 focus:outline-none bg-transparent placeholder-gray-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 focus:outline-none bg-transparent placeholder-gray-400"
                placeholder="Your email"
              />
            </div>

            <div>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 focus:outline-none bg-transparent placeholder-gray-400 resize-none"
                placeholder="Your message"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="flex items-center space-x-2 text-gray-900 hover:text-gray-600 transition-colors duration-200 group"
            >
              <span className="font-light">Send message</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <Mail className="w-6 h-6 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 text-sm">hello@company.com</p>
          </div>
          
          <div>
            <Phone className="w-6 h-6 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
          </div>
          
          <div>
            <MapPin className="w-6 h-6 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 text-sm">New York, NY</p>
          </div>
        </div>
      </div>
    </div>
  );
}