export type Language = 'en' | 'es';

export const DEFAULT_LANGUAGE: Language = 'en';
export const languages: Language[] = ['en', 'es'];

const translations = {
  en: {
    nav: {
      features: 'Features',
      howItWorks: 'How It Works',
      pricing: 'Pricing',
      testimonials: 'Testimonials',
      getStarted: 'Get Started',
      language: 'Language',
    },
    hero: {
      pretitle: 'Premium business audit',
      title: 'Discover why your business is',
      emphasis: 'losing customers',
      subtitle: 'Get an AI-powered business audit in minutes. Receive a detailed report with growth opportunities, marketing improvements, and an action plan.',
      ctaPrimary: 'Get My Audit',
      ctaSecondary: 'See Sample Report',
      metrics: [
        { value: '+42%', label: 'Visibility' },
        { value: '+31%', label: 'Leads' },
        { value: 'AI', label: 'Powered' },
      ],
    },
    plans: {
      popularBadge: 'Most Popular',
      free: {
        name: 'Free',
        price: '$0',
        description: 'Basic Score',
        features: ['AI-powered business analysis', 'Overall Score'],
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
    },
    audit: {
      title: 'Business Audit',
      live: 'Live Analysis',
      score: '82/100',
      scoreLabel: 'Overall Score',
      quickTitle: 'Quick Win',
      quickText: 'Add 5 more posts this week to increase engagement by 23%',
      metrics: [
        { label: 'Website Analysis' },
        { label: 'SEO Score' },
        { label: 'Social Media' },
        { label: 'Google Business' },
      ],
    },
    trust: {
      title: 'Trusted by growing businesses',
      companies: ['La Cocina', 'Innova', 'Studio X', 'Local&Co', 'Urban Biz'],
      stats: [
        { icon: 'FileText', value: '10,000+', label: 'Audits Generated' },
        { icon: 'Award', value: '94%', label: 'Customer Satisfaction' },
        { icon: 'TrendingUp', value: '$3.2M', label: 'Estimated Revenue Growth' },
      ],
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Three simple steps to transform your business',
      steps: [
        {
          step: '01',
          title: 'Submit Your Business',
          description: 'Fill out our simple form with your business details and online presence information.',
        },
        {
          step: '02',
          title: 'AI Analyzes Your Digital Presence',
          description: 'Our advanced AI scans your website, social media, SEO, and competitors.',
        },
        {
          step: '03',
          title: 'Receive Your Personalized Report',
          description: 'Get a comprehensive PDF report with actionable recommendations and growth strategies.',
        },
      ],
    },
    features: {
      title: 'Comprehensive Business Analysis',
      subtitle: 'Everything you need to grow your online presence',
      items: [
        {
          title: 'Website Analysis',
          description: "Evaluate your website's design, speed, mobile-friendliness, and conversion optimization.",
        },
        {
          title: 'SEO Evaluation',
          description: 'Analyze your search engine optimization and identify opportunities to rank higher.',
        },
        {
          title: 'Google Business Review',
          description: 'Optimize your Google Business Profile to attract more local customers.',
        },
        {
          title: 'Social Media Audit',
          description: 'Review your social media presence across all major platforms.',
        },
        {
          title: 'Competitor Insights',
          description: 'Understand what your competitors are doing right and how to outperform them.',
        },
        {
          title: '30-Day Growth Plan',
          description: 'Receive a prioritized action plan with specific tasks to grow your business.',
        },
      ],
    },
    sampleReport: {
      title: "See What You'll Get",
      subtitle: 'A comprehensive report with actionable insights',
      download: 'Download PDF',
      overallScore: 'Overall Score',
      strengths: 'Strengths',
      quickWins: 'Quick Wins',
      strengthList: ['Strong social media presence', 'Good customer reviews'],
      quickWinList: ['Add 5 more posts this week', 'Optimize Google Business description'],
    },
    pricing: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choose the plan that fits your needs',
    },
    testimonials: {
      title: 'What Our Clients Say',
      items: [
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
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
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
      ],
    },
    cta: {
      title: 'Stop Guessing. Start Growing.',
      subtitle: 'Join thousands of businesses that have transformed their online presence with AI-powered insights.',
      button: 'Generate My Business Audit',
    },
    footer: {
      product: 'Product',
      features: 'Features',
      pricing: 'Pricing',
      sampleReport: 'Sample Report',
      company: 'Company',
      about: 'About',
      contact: 'Contact',
      careers: 'Careers',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      description: 'AI-powered business audits to improve your online presence and convert more customers.',
    },
    form: {
      auditTitle: 'Get Your Business Audit',
      consultationTitle: 'Schedule Your Consultation',
      planLabel: 'Plan:',
      labels: {
        businessName: 'Business Name *',
        category: 'Category *',
        city: 'City *',
        email: 'Email *',
        website: 'Website',
        instagram: 'Instagram',
        facebook: 'Facebook',
        googleMaps: 'Google Maps',
        phone: 'Phone',
        mainGoal: 'Main Goal *',
      },
      placeholders: {
        businessName: 'E.g. Restaurant La Habana',
        category: 'E.g. Restaurant',
        city: 'E.g. Miami',
        email: 'your@email.com',
        website: 'https://yourwebsite.com',
        instagram: '@yourhandle',
        facebook: 'facebook.com/yourpage',
        googleMaps: 'Google Maps URL',
        phone: '+1 305 555 0123',
        mainGoal: 'What do you want to achieve with this audit? E.g. Get more local customers.',
      },
      loading: 'Processing...',
    },
    processing: {
      success: 'Thank You For Your Purchase!',
      consultation: 'Consultation Scheduled!',
      successText: "We're analyzing your business. You'll receive your report in your email in less than 5 minutes.",
      consultationText: "We'll send you a calendar invitation within 24 hours to schedule your 30-minute consultation with our team.",
      emailNote: '⚡ Check your email for confirmation and next steps.',
    },
  },
  es: {
    nav: {
      features: 'Características',
      howItWorks: 'Cómo Funciona',
      pricing: 'Precios',
      testimonials: 'Testimonios',
      getStarted: 'Comenzar',
      language: 'Idioma',
    },
    hero: {
      pretitle: 'Auditoría de negocio premium',
      title: 'Descubre por qué tu negocio está',
      emphasis: 'perdiendo clientes',
      subtitle: 'Obtén una auditoría de negocio impulsada por IA en minutos. Recibe un reporte detallado con oportunidades de crecimiento, mejoras de marketing y un plan de acción.',
      ctaPrimary: 'Obtener mi auditoría',
      ctaSecondary: 'Ver muestra',
      metrics: [
        { value: '+42%', label: 'Visibilidad' },
        { value: '+31%', label: 'Leads' },
        { value: 'IA', label: 'Potenciado' },
      ],
    },
    audit: {
      title: 'Auditoría de negocio',
      live: 'Análisis en vivo',
      score: '82/100',
      scoreLabel: 'Puntuación general',
      quickTitle: 'Mejora rápida',
      quickText: 'Publica 5 veces más esta semana para aumentar el engagement en 23%',
      metrics: [
        { label: 'Análisis web' },
        { label: 'Evaluación SEO' },
        { label: 'Redes sociales' },
        { label: 'Google Business' },
      ],
    },
    plans: {
      popularBadge: 'Más popular',
      free: {
        name: 'Gratis',
        price: '$0',
        description: 'Puntuación básica',
        features: ['Análisis de negocio impulsado por IA', 'Puntuación general'],
        cta: 'Obtener mi puntaje gratis',
        popular: false,
      },
      basic: {
        name: 'Starter',
        price: '$19',
        description: 'Auditoría de negocio',
        features: [
          'Análisis de negocio impulsado por IA',
          'Reporte PDF completo',
          'Evaluación de sitio web y SEO',
          'Auditoría de redes sociales',
          'Plan de acción de 30 días',
          'Entrega por email',
        ],
        cta: 'Obtener mi auditoría',
        popular: true,
      },
      professional: {
        name: 'Growth',
        price: '$300',
        description: 'Auditoría + consulta de 1 hora',
        features: [
          'Todo en Starter',
          'Consulta de video de 1 hora',
          'Estrategia de crecimiento personalizada',
          'Análisis de competidores',
          'Soporte prioritario',
          'Seguimiento por email',
        ],
        cta: 'Agendar consulta',
        popular: false,
      },
    },
    trust: {
      title: 'Empresas que ya confían en nosotros',
      companies: ['La Cocina', 'Innova', 'Studio X', 'Local&Co', 'Urban Biz'],
      stats: [
        { icon: 'FileText', value: '10,000+', label: 'Auditorías generadas' },
        { icon: 'Award', value: '94%', label: 'Satisfacción' },
        { icon: 'TrendingUp', value: '$3.2M', label: 'Crecimiento estimado' },
      ],
    },
    howItWorks: {
      title: 'Cómo funciona',
      subtitle: 'Tres pasos simples para transformar tu negocio',
      steps: [
        {
          step: '01',
          title: 'Envía tu negocio',
          description: 'Completa nuestro formulario con los datos de tu negocio y tu presencia online.',
        },
        {
          step: '02',
          title: 'La IA analiza tu presencia',
          description: 'Nuestra IA avanzada revisa tu sitio web, redes sociales, SEO y competidores.',
        },
        {
          step: '03',
          title: 'Recibe tu reporte personalizado',
          description: 'Obtén un reporte completo en PDF con recomendaciones accionables y estrategias de crecimiento.',
        },
      ],
    },
    features: {
      title: 'Análisis integral para tu negocio',
      subtitle: 'Todo lo que necesitas para fortalecer tu presencia digital',
      items: [
        {
          title: 'Análisis web',
          description: 'Evalúa el diseño de tu sitio, velocidad, adaptabilidad móvil y conversión.',
        },
        {
          title: 'Evaluación SEO',
          description: 'Analiza tu optimización de búsqueda e identifica oportunidades para escalar.',
        },
        {
          title: 'Google Business',
          description: 'Optimiza tu perfil para atraer más clientes locales.',
        },
        {
          title: 'Auditoría de redes',
          description: 'Revisa tu presencia social en todas las plataformas clave.',
        },
        {
          title: 'Competidores',
          description: 'Descubre qué hacen bien tus competidores y cómo superarlos.',
        },
        {
          title: 'Plan de 30 días',
          description: 'Recibe un plan priorizado con tareas específicas para crecer.',
        },
      ],
    },
    sampleReport: {
      title: 'Mira lo que recibirás',
      subtitle: 'Un reporte completo con insights claros y accionables',
      download: 'Descargar PDF',
      overallScore: 'Puntuación general',
      strengths: 'Fortalezas',
      quickWins: 'Mejoras rápidas',
      strengthList: ['Fuerte presencia en redes sociales', 'Buenas reseñas de clientes'],
      quickWinList: ['Publica 5 veces más esta semana', 'Optimiza la descripción de Google Business'],
    },
    pricing: {
      title: 'Precios claros y directos',
      subtitle: 'Elige el plan que mejor se adapte a tu crecimiento',
    },
    testimonials: {
      title: 'Lo que dicen nuestros clientes',
      items: [
        {
          name: 'Maria Garcia',
          company: 'La Cocina Restaurant',
          text: 'La auditoría nos ayudó a identificar áreas clave que estábamos perdiendo. ¡Nuestras órdenes online aumentaron un 40% en solo un mes!',
          rating: 5,
        },
        {
          name: 'John Smith',
          company: 'Smith & Co. Consulting',
          text: 'Insights increíbles. La IA encontró problemas que nunca habíamos notado. La consulta valió cada centavo.',
          rating: 5,
        },
        {
          name: 'Ana Rodriguez',
          company: 'Bella Beauty Salon',
          text: 'Profesional, detallado y accionable. Nuestro perfil de Google Business pasó de invisible a #1 en nuestra zona.',
          rating: 5,
        },
      ],
    },
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          question: '¿Cómo funciona la IA?',
          answer: 'Nuestra IA analiza la presencia online de tu negocio en plataformas como sitio web, redes sociales, Google Business y la competencia. Utiliza aprendizaje automático para detectar oportunidades y generar recomendaciones accionables.',
        },
        {
          question: '¿Cuánto tiempo toma?',
          answer: 'La auditoría previa gratuita toma alrededor de 2 minutos. Para auditorías pagas, recibirás tu reporte completo en PDF en menos de 5 minutos después del pago. Las consultas se agendan en 24-48 horas.',
        },
        {
          question: '¿Puedo auditar cualquier negocio?',
          answer: '¡Sí! Nuestra plataforma funciona para restaurantes, comercio, servicios profesionales, salud y más. La IA adapta su análisis según tu industria y objetivos.',
        },
        {
          question: '¿Necesito conocimiento técnico?',
          answer: 'Para nada. La plataforma es fácil de usar. Solo ingresa los datos de tu negocio y nosotros nos encargamos del análisis técnico. Los reportes son claros y accionables.',
        },
      ],
    },
    cta: {
      title: 'Deja de adivinar. Empieza a crecer.',
      subtitle: 'Únete a miles de negocios que transformaron su presencia online con insights impulsados por IA.',
      button: 'Generar mi auditoría',
    },
    footer: {
      product: 'Producto',
      features: 'Características',
      pricing: 'Precios',
      sampleReport: 'Reporte de muestra',
      company: 'Compañía',
      about: 'Nosotros',
      contact: 'Contacto',
      careers: 'Carreras',
      legal: 'Legal',
      privacy: 'Política de privacidad',
      terms: 'Términos de servicio',
      description: 'Auditorías de negocio impulsadas por IA para mejorar tu presencia online y convertir más clientes.',
    },
    form: {
      auditTitle: 'Obtener auditoría',
      consultationTitle: 'Agendar consulta',
      planLabel: 'Plan:',
      labels: {
        businessName: 'Nombre del negocio *',
        category: 'Categoría *',
        city: 'Ciudad *',
        email: 'Correo electrónico *',
        website: 'Sitio web',
        instagram: 'Instagram',
        facebook: 'Facebook',
        googleMaps: 'Google Maps',
        phone: 'Teléfono',
        mainGoal: 'Objetivo principal *',
      },
      placeholders: {
        businessName: 'Ej: Restaurant La Habana',
        category: 'Ej: Restaurant',
        city: 'Ej: Miami',
        email: 'tu@email.com',
        website: 'https://tusitio.com',
        instagram: '@tucuenta',
        facebook: 'facebook.com/tupagina',
        googleMaps: 'URL de Google Maps',
        phone: '+1 305 555 0123',
        mainGoal: '¿Qué quieres lograr con esta auditoría? Ej: Quiero conseguir más clientes locales.',
      },
      loading: 'Procesando...',
    },
    processing: {
      success: '¡Gracias por tu pedido!',
      consultation: '¡Consulta agendada!',
      successText: 'Estamos analizando tu negocio. Recibirás tu reporte por email en menos de 5 minutos.',
      consultationText: 'Te enviaremos una invitación de calendario en las próximas 24 horas para agendar tu consulta de 30 minutos con nuestro equipo.',
      emailNote: '⚡ Revisa tu correo para la confirmación y los próximos pasos.',
    },
  },
};

type Translation = typeof translations.en;

export type Translations = Translation;

export const getTranslations = (lang: Language): Translations => {
  return translations[lang] ?? translations.en;
};

export function getBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  const language = navigator.language.toLowerCase();
  if (language.startsWith('es')) {
    return 'es';
  }

  return 'en';
}

export function getStoredLanguage(): Language | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem('lang');
  if (stored === 'en' || stored === 'es') {
    return stored;
  }

  return null;
}
