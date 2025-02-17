import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const testimonials = [
  {
    contentKey: 'testimonials.verzonni.content',
    authorKey: 'testimonials.verzonni.author',
    roleKey: 'testimonials.verzonni.role',
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    contentKey: 'testimonials.paliamedic.content',
    authorKey: 'testimonials.paliamedic.author',
    roleKey: 'testimonials.paliamedic.role',
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    contentKey: 'testimonials.maximino.content',
    authorKey: 'testimonials.maximino.author',
    roleKey: 'testimonials.maximino.role',
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200"
  }
];

export default function Testimonials() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const scrollToTestimonial = (index: number) => {
    if (containerRef.current) {
      const testimonialWidth = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: testimonialWidth * index,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    scrollToTestimonial(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    scrollToTestimonial(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div id="testimonials" className="relative bg-white py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/0" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary">{t('testimonials.title')}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-50"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-50"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>

          {/* Testimonials Container */}
          <div
            ref={containerRef}
            className="relative flex snap-x snap-mandatory overflow-hidden"
          >
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="flex w-full flex-none snap-center flex-col items-center px-4 transition-opacity duration-300"
                style={{
                  opacity: currentIndex === idx ? 1 : 0.5,
                  transform: `scale(${currentIndex === idx ? 1 : 0.9})`,
                  transition: 'all 0.5s ease-out',
                }}
              >
                <div className="relative mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-100/5 transition-all duration-300 hover:shadow-xl">
                  <Quote className="absolute -top-4 -left-4 h-8 w-8 text-primary/20" />
                  <blockquote className="text-lg font-medium text-gray-900 sm:text-xl">
                    "{t(testimonial.contentKey)}"
                  </blockquote>
                  <div className="mt-6 flex items-center gap-x-4">
                    <img
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
                      src={testimonial.image}
                      alt={t(testimonial.authorKey)}
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{t(testimonial.authorKey)}</div>
                      <div className="text-sm text-gray-600">
                        {t(testimonial.roleKey)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToTestimonial(idx)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-6 bg-primary'
                    : 'bg-gray-300 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}