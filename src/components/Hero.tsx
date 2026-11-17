'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            type="image/avif"
            srcSet="/images/optimized/hero-480.avif 480w, /images/optimized/hero-848.avif 848w, /images/optimized/hero-1280.avif 1280w, /images/optimized/hero-1920.avif 1920w"
            sizes="(max-width: 900px) 100vw, 460px"
          />
          <source
            type="image/webp"
            srcSet="/images/optimized/hero-480.webp 480w, /images/optimized/hero-848.webp 848w, /images/optimized/hero-1280.webp 1280w, /images/optimized/hero-1920.webp 1920w"
            sizes="(max-width: 900px) 100vw, 460px"
          />
          <img
            src="/images/optimized/hero-848.jpg"
            alt="Casa no litoral paulista com painéis solares no telhado ao pôr do sol"
            width={848}
            height={1264}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            aria-hidden="true"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
      </div>

      {/* Badge animado do simulador - inspirado no original */}
      <div className="absolute bottom-20 right-10 z-10 hidden lg:block">
        <a href="#simulador" className="relative block" aria-label="Simule sua economia - clique para abrir o simulador" title="Simule sua economia">
          <div className="w-36 h-36 rounded-full bg-accent flex flex-col items-center justify-center shadow-[0_22px_44px_-16px_rgba(255,130,12,0.85)] animate-pulse-ring relative">
            {/* Texto estático no anel externo - não gira */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-xs font-extrabold text-primary/90 uppercase tracking-wider whitespace-nowrap transform rotate-0">
                SIMULE SUA ECONOMIA
              </span>
            </div>
            {/* Anel decorativo que gira (sem texto) */}
            <svg className="ring absolute inset-0 w-full h-full animate-spin-slow opacity-30" viewBox="0 0 156 156" aria-hidden="true">
              <circle cx="78" cy="78" r="70" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="20 10" />
            </svg>
            {/* Centro com ícone */}
            <div className="relative w-20 h-20 rounded-full bg-primary flex items-center justify-center transition-all duration-300 hover:bg-accent hover:text-primary z-10">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </a>
      </div>

      <div className="relative z-10 container px-5 py-20">
        <div className="max-w-3xl animate-fade-in">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6 tracking-wide">
            SIMULE SUA ECONOMIA
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 text-balance">
            Energia solar em <span className="text-accent">Peruíbe</span> e no litoral de SP
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            Projeto, instalação e homologação de sistemas fotovoltaicos para residências, comércios, indústrias e propriedades rurais.
            Simule sua economia em 30 segundos e receba orçamento sem compromisso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#simulador"
              className="btn btn-primary text-lg px-8 py-4"
            >
              Simular minha economia
            </a>
            <a
              href="https://wa.me/5513997630654?text=Olá! Quero um orçamento de energia solar."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 16s linear infinite;
        }
        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 22px 44px -16px rgba(255,130,12,0.85); }
          50% { box-shadow: 0 22px 44px -16px rgba(255,130,12,0.5), 0 0 0 8px rgba(255,130,12,0.3); }
        }
        .animate-pulse-ring {
          animation: pulse-ring 3s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
}