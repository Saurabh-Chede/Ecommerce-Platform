import React from 'react';
import { Users, Heart, Shield, Truck } from 'lucide-react';
import { motion, scale } from "motion/react"
import Content from './Content';

const AboutPage = () => {
  const stats = [
    { number: '2M+', label: 'Customers' },
    { number: '50K+', label: 'Products' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Customer First',
      description: 'Every decision starts with our customers in mind.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Trust & Security',
      description: 'Industry-leading security for every transaction.'
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Fast Delivery',
      description: 'Lightning-fast shipping worldwide.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community',
      description: 'Building connections between buyers and sellers.'
    }
  ];

  const teamMembers = [
    { name: 'Sarah Johnson', role: 'CEO & Founder' },
    { name: 'Michael Chen', role: 'CTO' },
    { name: 'Emily Rodriguez', role: 'Head of Customer Success' },
    { name: 'David Park', role: 'VP of Operations' }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }} className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-6xl font-light mb-12 tracking-tight">
            About Us
          </h1>
          <p className="text-xl font-light leading-relaxed max-w-2xl mx-auto">
            We create seamless shopping experiences through thoughtful design and unwavering commitment to quality.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-light mb-2">{stat.number}</div>
                <div className="text-sm uppercase tracking-wide text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 border-t border-gray-200">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }} className="max-w-4xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl font-light mb-8">Our Story</h2>
            </div>
            <div className="space-y-6 text-gray-700 font-light leading-relaxed">
              <p>
                Founded in 2018, we began with a simple belief: online shopping should be effortless and enjoyable.
              </p>
              <p>
                What started as a small team has grown into a global marketplace serving millions of customers.
                We've never lost sight of our core mission.
              </p>
              <p>
                Today, we continue to innovate while maintaining our commitment to simplicity and excellence.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-32 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl font-light mb-8">Mission</h2>
              <p className="text-gray-700 font-light leading-relaxed">
                To democratize commerce by creating a platform where anyone can buy and sell with confidence.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-light mb-8">Vision</h2>
              <p className="text-gray-700 font-light leading-relaxed">
                To be the world's most trusted marketplace, where every transaction is seamless and satisfying.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-light">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="mb-6 flex justify-center">{value.icon}</div>
                <h3 className="text-lg font-light mb-4">{value.title}</h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-light">Leadership</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center py-8">
                <h3 className="text-xl font-light mb-2">{member.name}</h3>
                <p className="text-sm uppercase tracking-wide text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-32 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-light">Recognition</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="py-8">
              <h3 className="text-lg font-light mb-2">Best Platform 2024</h3>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Tech Innovation</p>
            </div>

            <div className="py-8">
              <h3 className="text-lg font-light mb-2">Customer Choice</h3>
              <p className="text-sm text-gray-600 uppercase tracking-wide">E-commerce Excellence</p>
            </div>

            <div className="py-8">
              <h3 className="text-lg font-light mb-2">Fastest Growing</h3>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Business Innovation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-light mb-8">Join Our Community</h2>
          <p className="text-lg text-gray-700 font-light mb-12 max-w-2xl mx-auto">
            Discover products from trusted sellers around the world
          </p>
          <div className="space-x-8">
            <button className="bg-black text-white px-8 py-3 font-light uppercase tracking-wide hover:bg-gray-800 transition-colors">
              Start Shopping
            </button>
            <button className="border border-black text-black px-8 py-3 font-light uppercase tracking-wide hover:bg-black hover:text-white transition-colors">
              Become a Seller
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;