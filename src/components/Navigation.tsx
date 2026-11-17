'use client';

import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { href: '#energia-solar', label: 'Energia Solar' },
  { href: '#beneficios', label: 'Benefícios' },
  { href: '#simulador', label: 'Simulador' },
  { href: '#solucoes', label: 'Soluções' },
  { href: '#pagamento', label: 'Pagamento' },
  { href: '#duvidas', label: 'Dúvidas' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, mounted]);

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="container px-5">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="/"
            className="flex items-center text-primary font-display font-bold text-xl z-50"
            aria-label="SiryusB Solar - Início"
          >
            <img
              src="/images/optimized/logo-completo-320.png"
              alt="SiryusB Solar"
              width={200}
              height={50}
              className="w-auto h-12 sm:h-14"
              decoding="async"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-1 hover:text-accent font-medium transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#orcamento"
              className="btn btn-primary text-sm px-5 py-2"
            >
              Orçamento grátis
            </a>
          </div>

          <button
            ref={menuButtonRef}
            className="md:hidden p-2 rounded-lg text-text-1 hover:bg-surface-2 transition-colors z-50"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100 visible pb-8' : 'max-h-0 opacity-0 invisible'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <h2 id="mobile-menu-title" className="sr-only">Menu de navegação</h2>
          <ul className="pt-4 space-y-3" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block px-4 py-3 text-lg font-medium text-text-1 hover:text-accent hover:bg-surface-1 rounded-xl transition-colors"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#orcamento"
                className="btn btn-primary w-full mt-4 text-center"
                onClick={closeMenu}
              >
                Orçamento grátis
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}