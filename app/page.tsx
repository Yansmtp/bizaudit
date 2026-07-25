'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import {
  Building2,
  Brain,
  FileText,
  Globe,
  Search,
  MapPin,
  Share2,
  Users,
  Target,
  Lightbulb,
  TrendingUp,
  Star,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun,
  Menu,
  X,
  CheckCircle2,
  ArrowRight,
  Play,
  Download,
  Calendar,
  BarChart3,
  Award,
  Clock,
  Shield,
  Zap,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useTheme } from 'next-themes';

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'basic' | 'professional' | null>(null);
  const [step, setStep] = useState<'landing' | 'form' | 'processing'>('landing');
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    city: '',
    website: '',
    instagram: '',
    facebook: '',
    googleMaps: '',
    email: '',
    phone: '',
    mainGoal: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedPlan === 'free') {
        setStep('processing');
        return;
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          plan: selectedPlan,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la orden');
      }

      const { clientSecret } = data;

      if (selectedPlan === 'professional') {
        setStep('processing');
        return;
      }

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (!stripe) throw new Error('Stripe no cargó correctamente');

      const { error } = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (error) {
        console.error('Error en el pago:', error);
        alert('Hubo un error al procesar el pago. Inténtalo de nuevo.');
      } else {
        setStep('processing');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const selectPlan = (plan: 'free' | 'basic' | 'professional') => {
    setSelectedPlan(plan);
    setStep('form');
  };

  const plans = {
    free: {
      name: 'Free',
      price: '$0',
      description: 'Basic Score',
      features: [
        'AI-powered business analysis',
        'Overall Score',
      ],
      cta: 'Get My Free Score',
      popular: false,
    },
    basic: {
      name: 'Starter',
      price: '$19',
      description: 'Business Audit',
      features: [
        'AI-powered business analysis',
        'Comprehensive PDF report',
        'Website & SEO evaluation',
        'Social media audit',
        '30-day action plan',
        'Email delivery',
      ],
      cta: 'Get My Audit',
      popular: true,
    },
    professional: {
      name: 'Growth',
      price: '$300',
      description: 'Business Audit + 1-hour consultation',
      features: [
        'Everything in Starter',
        '1-hour video consultation',
        'Custom growth strategy',
        'Competitor analysis',
        'Priority support',
        'Follow-up email support',
      ],
      cta: 'Schedule Consultation',
      popular: false,
    },
  };

  const faqs = [
    {
      question: 'How does the AI work?',
      answer: "Our AI analyzes your business's online presence across multiple platforms including your website, social media profiles, Google Business listing, and competitor data. It uses advanced machine learning to identify opportunities and generate actionable recommendations.",
    },
    {
      question: 'How long does it take?',
      answer: "The free preview audit takes about 2 minutes. For paid audits, you'll receive your comprehensive PDF report within 5 minutes of payment. Consultation sessions are scheduled within 24-48 hours.",
    },
    {
      question: 'Can I audit any business?',
      answer: 'Yes! Our platform works for any type of business including restaurants, retail, professional services, healthcare, and more. The AI adapts its analysis based on your industry and goals.',
    },
    {
      question: 'Do I need technical knowledge?',
      answer: 'Not at all. Our platform is designed to be user-friendly. Just provide your business information and we handle the technical analysis. The reports are written in plain language with clear, actionable steps.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
                Discover Why Your Business Is{' '}
                <span className="gradient-text">Losing Customers</span> Online
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Get an AI-powered business audit in minutes. Receive a detailed report with growth opportunities, marketing improvements, and an action plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setStep('form')}
                  className="btn-primary text-lg flex items-center justify-center gap-2"
                >
                  Get My Audit
                  <ArrowRight size={20} />
                </button>
                <button className="btn-secondary text-lg flex items-center justify-center gap-2">
                  <Play size={20} />
                  See Sample Report
                </button>
              </div>
              <div className="flex gap-8 mt-12">
                <div>
                  <div className="text-3xl font-bold text-primary">+42%</div>
                  <div className="text-sm text-muted-foreground">Visibility</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600">+31%</div>
                  <div className="text-sm text-muted-foreground">Leads</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">AI</div>
                  <div className="text-sm text-muted-foreground">Powered</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-card-foreground">Business Audit</h3>
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                    Live Analysis
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-gray-700 dark:to-gray-700 p-6 rounded-xl">
                    <div className="text-center">
                      <div className="text-5xl font-bold gradient-text mb-2">82/100</div>
                      <div className="text-muted-foreground">Overall Score</div>
                    </div>
                  </div>

                  {[
                    { name: 'Website Analysis', score: 85, color: 'bg-blue-500' },
                    { name: 'SEO Score', score: 78, color: 'bg-emerald-500' },
                    { name: 'Social Media', score: 72, color: 'bg-purple-500' },
                    { name: 'Google Business', score: 88, color: 'bg-orange-500' },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">{item.name}</span>
                        <span className="text-foreground font-semibold">{item.score}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.score}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className={`${item.color} h-2 rounded-full`}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-primary rounded-lg">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="text-primary-foreground mt-1" size={20} />
                    <div>
                      <div className="font-semibold text-primary-foreground text-sm">Quick Win</div>
                      <div className="text-xs text-primary-foreground/80 mt-1">Add 5 more posts this week to increase engagement by 23%</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Trusted by growing businesses
            </h2>
            <div className="flex flex-wrap justify-center gap-8 opacity-50">
              {['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5'].map((company, index) => (
                <div key={index} className="text-2xl font-bold text-muted-foreground">
                  {company}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: '10,000+', label: 'Audits Generated', icon: FileText },
              { value: '94%', label: 'Customer Satisfaction', icon: Award },
              { value: '$3.2M', label: 'Estimated Revenue Growth', icon: TrendingUp },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to transform your business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Submit Your Business',
                description: 'Fill out our simple form with your business details and online presence information.',
                icon: Building2,
              },
              {
                step: '02',
                title: 'AI Analyzes Your Digital Presence',
                description: 'Our advanced AI scans your website, social media, SEO, and competitors.',
                icon: Brain,
              },
              {
                step: '03',
                title: 'Receive Your Personalized Report',
                description: 'Get a comprehensive PDF report with actionable recommendations and growth strategies.',
                icon: FileText,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="card text-center h-full">
                  <div className="text-6xl font-bold text-primary dark:text-gray-700 mb-4">
                    {item.step}
                  </div>
                  <item.icon className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Business Analysis
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to grow your online presence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'Website Analysis',
                description: 'Evaluate your website\'s design, speed, mobile-friendliness, and conversion optimization.',
              },
              {
                icon: Search,
                title: 'SEO Evaluation',
                description: 'Analyze your search engine optimization and identify opportunities to rank higher.',
              },
              {
                icon: MapPin,
                title: 'Google Business Review',
                description: 'Optimize your Google Business Profile to attract more local customers.',
              },
              {
                icon: Share2,
                title: 'Social Media Audit',
                description: 'Review your social media presence across all major platforms.',
              },
              {
                icon: Users,
                title: 'Competitor Insights',
                description: 'Understand what your competitors are doing right and how to outperform them.',
              },
              {
                icon: Target,
                title: '30-Day Growth Plan',
                description: 'Receive a prioritized action plan with specific tasks to grow your business.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card group cursor-pointer"
              >
                <feature.icon className="w-12 h-12 mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE REPORT */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              See What You'll Get
            </h2>
            <p className="text-xl text-muted-foreground">
              A comprehensive report with actionable insights
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl shadow-2xl p-8 border border-border max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-card-foreground">Sample Report</h3>
              <button className="btn-secondary flex items-center gap-2">
                <Download size={18} />
                Download PDF
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-gray-700 dark:to-gray-700 p-6 rounded-xl">
                <div className="text-center">
                  <div className="text-6xl font-bold gradient-text mb-2">82</div>
                  <div className="text-muted-foreground">Overall Score</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-600" size={18} />
                    Strengths
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Strong social media presence</li>
                    <li>• Good customer reviews</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
                    <Zap className="text-orange-600" size={18} />
                    Quick Wins
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Add 5 more posts this week</li>
                    <li>• Optimize Google Business description</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.entries(plans).map(([key, plan], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-2xl shadow-xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-primary to-accent text-primary-foreground scale-105'
                    : 'bg-card'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-5xl font-bold mb-2">{plan.price}</div>
                  <p className={plan.popular ? 'text-blue-100' : 'text-muted-foreground'}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className={`mt-0.5 ${plan.popular ? 'text-blue-200' : 'text-emerald-600'}`} size={18} />
                      <span className={plan.popular ? 'text-blue-50' : 'text-card-foreground'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => selectPlan(key as 'free' | 'basic' | 'professional')}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-white text-primary hover:bg-gray-100'
                      : 'btn-primary'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria Garcia',
                company: 'La Cocina Restaurant',
                text: 'The audit helped us identify key areas we were missing. Our online orders increased by 40% in just one month!',
                rating: 5,
              },
              {
                name: 'John Smith',
                company: 'Smith & Co. Consulting',
                text: 'Incredible insights. The AI found issues we never noticed. The consultation was worth every penny.',
                rating: 5,
              },
              {
                name: 'Ana Rodriguez',
                company: 'Bella Beauty Salon',
                text: 'Professional, detailed, and actionable. Our Google Business profile went from invisible to #1 in our area.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={18} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-secondary transition-colors"
                >
                  <span className="font-semibold text-card-foreground">
                    {faq.question}
                  </span>
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6">
              Stop Guessing. Start Growing.
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that have transformed their online presence with AI-powered insights.
            </p>
            <button
              onClick={() => setStep('form')}
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl inline-flex items-center gap-2"
            >
              Generate My Business Audit
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-background mb-4 gradient-text">BizAudit AI</h3>
              <p className="text-sm">
                AI-powered business audits to help you grow your online presence and increase revenue.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-background mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sample Report</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-background mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-background mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} BizAudit AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* FORM MODAL */}
      {step === 'form' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-card-foreground mb-2">
                  {selectedPlan === 'professional' ? 'Schedule Your Consultation' : 'Get Your Business Audit'}
                </h2>
                <p className="text-muted-foreground">
                  Plan: <span className="font-semibold">{plans[selectedPlan!]?.name} - {plans[selectedPlan!]?.price}</span>
                </p>
              </div>
              <button
                onClick={() => setStep('landing')}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder="Ej: Restaurant La Habana"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder="Ej: Restaurant"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder="Ej: Miami"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder="https://tusitio.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Instagram
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder="@tucuenta"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Facebook
                  </label>
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder="facebook.com/tupagina"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Google Maps
                  </label>
                  <input
                    type="text"
                    name="googleMaps"
                    value={formData.googleMaps}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder="URL de Google Maps"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder="+1 305 555 0123"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Main Goal *
                  </label>
                  <textarea
                    name="mainGoal"
                    required
                    value={formData.mainGoal}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder="¿Qué quieres lograr con esta auditoría? Ej: Quiero conseguir más clientes locales."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    {selectedPlan === 'free' && <Zap size={20} />}
                    {selectedPlan === 'basic' && <Zap size={20} />}
                    {selectedPlan === 'professional' && <Calendar size={20} />}
                    {plans[selectedPlan!]?.cta}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* PROCESSING MODAL */}
      {step === 'processing' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center"
          >
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-card-foreground mb-4">
              {selectedPlan === 'professional' ? 'Consultation Scheduled!' : 'Thank You For Your Purchase!'}
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              {selectedPlan === 'professional' 
                ? 'We\'ll send you a calendar invitation within 24 hours to schedule your 30-minute consultation with our team.'
                : 'We\'re analyzing your business. You\'ll receive your report in your email in less than 5 minutes.'
              }
            </p>
            <div className="bg-primary p-4 rounded-lg">
              <p className="text-sm text-primary-foreground">
                ⚡ Check your email for confirmation and next steps.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}