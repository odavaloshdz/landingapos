import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Users, ShoppingBag, Star, FileText, Book } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const stats = [
  { icon: Users, value: '145', label: 'hero.stats.registeredCompanies', endValue: 145 },
  { icon: Users, value: '400+', label: 'hero.stats.dailyUsers', endValue: 400 },
  { icon: FileText, value: '50K', label: 'hero.stats.invoicesCreated', endValue: 50000 },
  { icon: Book, value: '126+', label: 'hero.stats.onlineResources', endValue: 126 }
];

export default function Hero() {
  const { t } = useLanguage();
  const businesses = [
    t('hero.businesses.store'),
    t('hero.businesses.liquorStore'),
    t('hero.businesses.hotel'),
    t('hero.businesses.restaurant'),
    t('hero.businesses.pharmacy'),
    t('hero.businesses.boutique'),
    t('hero.businesses.cafe'),
    t('hero.businesses.hardware'),
    t('hero.businesses.supermarket'),
    t('hero.businesses.stationery')
  ];

  const [businessIndex, setBusinessIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));
  const [statsVisible, setStatsVisible] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isIntersecting) {
      setStatsVisible(true);
    }
  }, [isIntersecting]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (statsVisible) {
      stats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
          if (currentStep < steps) {
            setAnimatedStats(prev => {
              const newStats = [...prev];
              const progress = currentStep / steps;
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              newStats[index] = stat.endValue * easeOutQuart;
              return newStats;
            });
            currentStep++;
          } else {
            clearInterval(interval);
          }
        }, stepDuration);

        return () => clearInterval(interval);
      });
    }
  }, [statsVisible]);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setBusinessIndex((current) => (current + 1) % businesses.length);
        setIsVisible(true);
      }, 200);
    }, 3000);

    return () => clearInterval(interval);
  }, [businesses.length]);

  const formatStat = (value: number, index: number) => {
    if (index === 0) return Math.round(value).toString();
    if (index === 1) return Math.round(value).toString() + '+';
    if (index === 2) return Math.round(value / 1000) + 'K';
    return Math.round(value).toString() + '+';
  };

  return (
    <div className="relative bg-gradient-to-b from-accent/10 via-white to-white pt-20 overflow-hidden">
      <div 
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      ></div>
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div 
              className="mb-8 inline-flex items-center rounded-full bg-accent/10 px-6 py-2 text-sm font-medium text-accent ring-1 ring-inset ring-accent/20 transition-all duration-500 hover:scale-105 animate-float"
              role="banner"
              aria-label={t('hero.newVersion')}
              style={{
                transform: `translateY(${scrollY * -0.2}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              {t('hero.newVersion')}
            </div>
            
            <h1 
              className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-dark sm:text-7xl"
              style={{
                transform: `translateY(${scrollY * -0.15}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              {t('hero.title')}{' '}
              <span 
                key={businessIndex} 
                className={`relative whitespace-nowrap text-primary transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute left-0 top-2/3 h-[0.58em] w-full fill-accent/40"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                </svg>
                <span className="relative">{businesses[businessIndex]}</span>
              </span>
              {' '}{t('hero.titleSuffix')}
            </h1>
            
            <p 
              className="mx-auto mt-6 max-w-2xl text-lg text-secondary transition-all duration-500"
              style={{
                transform: `translateY(${scrollY * -0.1}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              {t('hero.description')}
            </p>
            
            <div 
              className="mt-10 flex justify-center gap-x-6"
              style={{
                transform: `translateY(${scrollY * -0.05}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              <a 
                href="#pricing" 
                className="group inline-flex items-center justify-center rounded-full py-3 px-6 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary text-white hover:bg-primary/90 active:bg-primary/80 focus-visible:outline-primary transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-primary/25"
              >
                {t('hero.startNow')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
              </a>
              <a 
                href="#demo" 
                className="group inline-flex ring-1 ring-secondary/20 items-center justify-center rounded-full py-3 px-6 text-sm font-semibold focus:outline-none hover:ring-secondary/30 active:bg-secondary/10 active:text-secondary focus-visible:outline-accent transition-all duration-500 hover:scale-110 hover:shadow-lg"
              >
                {t('hero.watchDemo')}
              </a>
            </div>

            <div 
              className="mt-16 mb-24 rounded-xl border border-accent/20 bg-white/60 backdrop-blur-xl p-2 shadow-xl ring-1 ring-accent/5 transition-all duration-500 hover:shadow-2xl"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              <div className="aspect-video rounded-lg bg-gray-100 overflow-hidden">
                <img 
                  src="/erp-dashboard.jpg"
                  alt={t('hero.imageAlt')}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                />
              </div>
            </div>

            <div className="stats-section mt-12 grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-12 relative z-10">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="group flex flex-col items-center opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]"
                  style={{ 
                    animationDelay: `${index * 0.2}s`,
                    transform: `translateY(${scrollY * -0.05}px)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-all duration-500 group-hover:scale-150" />
                    <stat.icon className="relative h-8 w-8 text-primary mb-2 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                  </div>
                  <dt className="relative text-2xl font-bold text-dark transition-all duration-500 group-hover:text-primary group-hover:scale-110">
                    {formatStat(animatedStats[index], index)}
                  </dt>
                  <dd className="text-sm text-secondary transition-all duration-500 group-hover:text-dark text-center">{t(stat.label)}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes numberPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}