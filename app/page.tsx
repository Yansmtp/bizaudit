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
import { useLanguage } from '@/components/LanguageProvider';
import { useTheme } from 'next-themes';

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'basic' | 'professional' | null>(null);
  const [step, setStep] = useState<'landing' | 'form' | 'processing'>('landing');
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { theme } = useTheme();
  const { setLanguage, t } = useLanguage();

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

  const plans = t.plans;
  const planEntries = [
    ['free', plans.free],
    ['basic', plans.basic],
    ['professional', plans.professional],
  ] as const;
  const faqs = t.faq.items;

  const trustStats = [
    { value: t.trust.stats[0].value, label: t.trust.stats[0].label, icon: FileText },
    { value: t.trust.stats[1].value, label: t.trust.stats[1].label, icon: Award },
    { value: t.trust.stats[2].value, label: t.trust.stats[2].label, icon: TrendingUp },
  ];

  const howItWorksSteps = [
    { ...t.howItWorks.steps[0], icon: Building2 },
    { ...t.howItWorks.steps[1], icon: Brain },
    { ...t.howItWorks.steps[2], icon: FileText },
  ];

  const featureItems = [
    { icon: Globe, ...t.features.items[0] },
    { icon: Search, ...t.features.items[1] },
    { icon: MapPin, ...t.features.items[2] },
    { icon: Share2, ...t.features.items[3] },
    { icon: Users, ...t.features.items[4] },
    { icon: Target, ...t.features.items[5] },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,224,255,0.12),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(255,95,170,0.2),_transparent_35%)]"></div>
        <div className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/10 to-transparent blur-3xl"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-card/90 text-primary px-4 py-2 mb-6 font-semibold text-sm">
                {t.hero.pretitle}
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
                {t.hero.title}{' '}
                <span className="gradient-text">{t.hero.emphasis}</span> online
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setStep('form')}
                  className="btn-primary text-lg flex items-center justify-center gap-2"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight size={20} />
                </button>
                <button className="btn-secondary text-lg flex items-center justify-center gap-2">
                  <Play size={20} />
                  {t.hero.ctaSecondary}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-14">
                {t.hero.metrics.map((metric, index) => (
                  <div key={index} className="rounded-3xl bg-card/90 border border-border/70 p-5 text-center shadow-lg shadow-black/10">
                    <div className="text-3xl font-bold text-primary">{metric.value}</div>
                    <div className="text-sm font-medium text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-background/95 dark:bg-card/95 rounded-[32px] shadow-2xl p-8 border border-border/70 backdrop-blur-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-primary/85 font-semibold mb-2">{t.audit.live}</p>
                    <h3 className="text-2xl font-bold text-card-foreground">{t.audit.title}</h3>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-card/90 text-secondary px-4 py-2 rounded-full text-sm font-semibold shadow-[0_10px_40px_-30px_rgba(0,0,0,0.25)]">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary"></span>
                    {t.audit.quickTitle}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-card/90 p-6 rounded-[28px] border border-border/70">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary mb-2">{t.audit.score}</div>
                      <div className="text-muted-foreground">{t.audit.scoreLabel}</div>
                    </div>
                  </div>

                  {[
                    { name: t.audit.metrics[0].label, score: 85, color: 'bg-card/80' },
                    { name: t.audit.metrics[1].label, score: 78, color: 'bg-card/80' },
                    { name: t.audit.metrics[2].label, score: 72, color: 'bg-card/80' },
                    { name: t.audit.metrics[3].label, score: 88, color: 'bg-card/80' },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">{item.name}</span>
                        <span className="text-foreground font-semibold">{item.score}%</span>
                      </div>
                      <div className="w-full bg-card/50 rounded-full h-2">
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

                <div className="mt-6 p-4 bg-card/90 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-semibold text-primary text-sm">{t.audit.quickTitle}</div>
                      <div className="text-xs text-primary/80 mt-1">{t.audit.quickText}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-16 bg-card/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t.trust.title}
            </h2>
            <div className="flex flex-wrap justify-center gap-8 opacity-80 text-muted-foreground">
              {t.trust.companies.map((company, index) => (
                <div key={index} className="text-lg font-semibold">
                  {company}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {trustStats.map((stat, index) => (
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
              {t.howItWorks.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t.howItWorks.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="card text-center h-full">
                  <div className="text-6xl font-bold text-primary mb-4">
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
      <section id="features" className="py-20 bg-card/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t.features.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t.features.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureItems.map((feature, index) => (
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
              {t.sampleReport.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t.sampleReport.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl shadow-2xl p-8 border border-border max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-card-foreground">{t.sampleReport.title}</h3>
              <button className="btn-secondary flex items-center gap-2">
                <Download size={18} />
                {t.sampleReport.download}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card/90 p-6 rounded-xl border border-border/70">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-2">82</div>
                  <div className="text-muted-foreground">{t.sampleReport.overallScore}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="text-primary" size={18} />
                    {t.sampleReport.strengths}
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {t.sampleReport.strengthList.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
                    <Zap className="text-secondary" size={18} />
                    {t.sampleReport.quickWins}
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {t.sampleReport.quickWinList.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 bg-card/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t.pricing.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t.pricing.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {planEntries.map(([key, plan], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-2xl shadow-xl p-8 ${
                  plan.popular
                    ? 'bg-card/90 border border-primary/20 text-primary scale-105'
                    : 'bg-card'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-card/80 text-primary px-4 py-1 rounded-full text-sm font-semibold shadow-lg shadow-primary/20">
                    {t.plans.popularBadge}
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-5xl font-bold mb-2">{plan.price}</div>
                  <p className={plan.popular ? 'text-primary-foreground/90' : 'text-muted-foreground'}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className={`mt-0.5 ${plan.popular ? 'text-primary-foreground' : 'text-secondary-foreground'}`} size={18} />
                      <span className={plan.popular ? 'text-primary-foreground' : 'text-card-foreground'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => selectPlan(key as 'free' | 'basic' | 'professional')}
                  className={`w-full py-4 rounded-3xl font-semibold transition-all ${
                    plan.popular
                      ? 'btn-primary shadow-xl'
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
              {t.testimonials.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimonial, index) => (
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
                    <Star key={i} className="text-secondary-foreground fill-secondary-foreground" size={18} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
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
      <section className="py-20 bg-card/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t.faq.title}
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
                className="bg-card/95 rounded-xl shadow-2xl overflow-hidden border border-border"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-card/90 transition-colors"
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
      <section className="py-20 bg-card/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t.cta.subtitle}
            </p>
            <button
              onClick={() => setStep('form')}
              className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center gap-2 shadow-xl"
            >
              {t.cta.button}
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-card text-card-foreground py-16 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">BizAudit AI</h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-background mb-4">{t.footer.product}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">{t.footer.features}</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">{t.footer.pricing}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.sampleReport}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-background mb-4">{t.footer.company}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.about}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.contact}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.careers}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-background mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} BizAudit AI. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* FORM MODAL */}
      {step === 'form' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card/95 rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-card-foreground mb-2">
                  {selectedPlan === 'professional' ? t.form.consultationTitle : t.form.auditTitle}
                </h2>
                <p className="text-muted-foreground">
                  {t.form.planLabel} <span className="font-semibold">{plans[selectedPlan!]?.name} - {plans[selectedPlan!]?.price}</span>
                </p>
              </div>
              <button
                onClick={() => setStep('landing')}
                className="p-2 hover:bg-card/90 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    {t.form.labels.businessName}
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder={t.form.placeholders.businessName}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    {t.form.labels.category}
                  </label>
                  <input
                    type="text"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder={t.form.placeholders.category}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    {t.form.labels.city}
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder={t.form.placeholders.city}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    {t.form.labels.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder={t.form.placeholders.email}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    {t.form.labels.website}
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder={t.form.placeholders.website}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    {t.form.labels.instagram}
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder={t.form.placeholders.instagram}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    {t.form.labels.facebook}
                  </label>
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder={t.form.placeholders.facebook}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    {t.form.labels.googleMaps}
                  </label>
                  <input
                    type="text"
                    name="googleMaps"
                    value={formData.googleMaps}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder={t.form.placeholders.googleMaps}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    {t.form.labels.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder={t.form.placeholders.phone}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    {t.form.labels.mainGoal}
                  </label>
                  <textarea
                    name="mainGoal"
                    required
                    value={formData.mainGoal}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder={t.form.placeholders.mainGoal}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  t.form.loading
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
            className="bg-card/95 rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center border border-border"
          >
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-card-foreground mb-4">
              {selectedPlan === 'professional' ? t.processing.consultation : t.processing.success}
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              {selectedPlan === 'professional' 
                ? t.processing.consultationText
                : t.processing.successText
              }
            </p>
            <div className="bg-card/90 p-4 rounded-lg">
              <p className="text-sm text-primary">
                {t.processing.emailNote}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}