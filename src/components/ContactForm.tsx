'use client';

import { useState, useEffect } from 'react';

type FormData = {
  nome: string;
  telefone: string;
  email: string;
  cidade: string;
  tipo: string;
  conta: string;
  mensagem: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const TIPOS = [
  { value: 'residencial', label: 'Residência' },
  { value: 'comercial', label: 'Comércio' },
  { value: 'industrial', label: 'Indústria' },
  { value: 'rural', label: 'Propriedade rural' },
];

const MENSAGENS: Record<keyof FormData, string> = {
  nome: 'Informe seu nome.',
  telefone: 'Informe um WhatsApp com DDD, 10 ou 11 dígitos.',
  email: 'Informe um e-mail válido.',
  cidade: 'Informe sua cidade.',
  tipo: 'Selecione o tipo de imóvel.',
  conta: 'Informe um valor a partir de R$ 100 ou deixe em branco.',
  mensagem: '',
};

const REGRAS = {
  nome: (v: string) => v.trim().length >= 2,
  telefone: (v: string) => [10, 11].includes(v.replace(/\D/g, '').length),
  email: (v: string) => v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  cidade: (v: string) => v.trim().length >= 2,
  tipo: (v: string) => v.trim() !== '',
  conta: (v: string) => v === '' || Number(v.replace(/\./g, '').replace(',', '.')) >= 100,
  mensagem: () => true,
};

function formatPhone(value: string) {
  const nums = value.replace(/\D/g, '').slice(0, 11);
  if (nums.length <= 2) return `(${nums}`;
  if (nums.length <= 6) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
  if (nums.length <= 10) return `(${nums.slice(0, 2)}) ${nums.slice(2, 6)}-${nums.slice(6)}`;
  return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
}

export default function ContactForm() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    telefone: '',
    email: '',
    cidade: '',
    tipo: '',
    conta: '',
    mensagem: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
  nome: false,
  telefone: false,
  email: false,
  cidade: false,
  tipo: false,
  conta: false,
  mensagem: false,
});
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  useEffect(() => setMounted(true), []);

  const validateField = (name: keyof FormData, value: string, showError = false) => {
    const rule = REGRAS[name];
    const ok = rule ? rule(value) : true;
    if (!ok && showError) {
      setErrors(prev => ({ ...prev, [name]: MENSAGENS[name] }));
    } else if (ok) {
      setErrors(prev => { const next = { ...prev }; delete next[name]; return next; });
    }
    return ok;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue = value;
    
    if (name === 'telefone') {
      newValue = formatPhone(value);
    }
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    const fieldName = name as keyof FormData;
    if (touched[fieldName]) {
      validateField(fieldName, newValue, true);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, value, true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTouched: Record<keyof FormData, boolean> = {
  nome: true, telefone: true, email: true, cidade: true, tipo: true, conta: true, mensagem: true
};
    setTouched(newTouched);
    
    const newErrors: FormErrors = {};
    let isValid = true;
    
    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
      const ok = validateField(key, formData[key], true);
      if (!ok) isValid = false;
    });
    
    if (!isValid) {
      setSubmitStatus('error');
      setSubmitMessage('Confira os campos destacados.');
      return;
    }
    
    setSubmitStatus('loading');
    
    const data = {
      ...formData,
      telefone: formData.telefone.replace(/\D/g, ''),
      origem: document.referrer || 'direto',
    };
    
    const url = `https://wa.me/5513997630654?text=${encodeURIComponent(
      ['Olá! Quero um orçamento de energia solar.', `Nome: ${data.nome}`, `WhatsApp: ${data.telefone}`, data.cidade ? `Cidade: ${data.cidade}` : '', data.email ? `E-mail: ${data.email}` : '', data.conta ? `Conta média: R$ ${data.conta}` : '', data.tipo ? `Tipo: ${TIPOS.find(t => t.value === data.tipo)?.label}` : '', data.mensagem ? `Mensagem: ${data.mensagem}` : ''].filter(Boolean).join('\n')
    )}`;
    setWhatsappUrl(url);
    
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      sessionStorage.setItem('siryusb:lead', JSON.stringify({ url, em: Date.now() }));
      setSubmitStatus('success');
      setSubmitMessage('Recebemos seus dados. Se o WhatsApp não abrir, use o botão abaixo.');
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Não conseguimos registrar agora. Seus dados continuam no formulário; use o botão do WhatsApp.');
    }
  };

  const saved = sessionStorage.getItem('siryusb:lead');
  if (saved && !submitted) {
    try {
      const parsed = JSON.parse(saved);
      setWhatsappUrl(parsed.url);
      setSubmitStatus('success');
      setSubmitMessage('Recebemos seus dados. Se o WhatsApp não abrir, use o botão abaixo.');
      setSubmitted(true);
    } catch {}
  }

  if (!mounted) return <div className="h-96" aria-hidden="true" />;

  return (
    <section id="orcamento" className="section" aria-labelledby="orcamento-titulo">
      <div className="container">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h2 id="orcamento-titulo" className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-4">
            Receba seu <span className="text-accent">orçamento grátis</span>
          </h2>
          <p className="text-text-2 text-lg">
            Preencha o formulário e nossa equipe entrará em contato em até 1h no horário comercial (seg-sex, 8h-18h).
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-label="Formulário de orçamento">
            <div className="campo">
              <label htmlFor="nome" className="label">
                Nome <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                autoComplete="name"
                value={formData.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-field ${errors.nome ? 'aria-invalid' : ''}`}
                aria-invalid={errors.nome ? 'true' : 'false'}
                aria-describedby={errors.nome ? 'nome-erro' : undefined}
                required
              />
              {errors.nome && (
                <p id="nome-erro" className="error-message" role="alert">{errors.nome}</p>
              )}
            </div>

            <div className="campo">
              <label htmlFor="telefone" className="label">
                WhatsApp com DDD <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={15}
                placeholder="(13) 99999-9999"
                value={formData.telefone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-field ${errors.telefone ? 'aria-invalid' : ''}`}
                aria-invalid={errors.telefone ? 'true' : 'false'}
                aria-describedby={errors.telefone ? 'telefone-erro' : undefined}
                required
              />
              {errors.telefone && (
                <p id="telefone-erro" className="error-message" role="alert">{errors.telefone}</p>
              )}
            </div>

            <div className="campo">
              <label htmlFor="email" className="label">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-field ${errors.email ? 'aria-invalid' : ''}`}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-erro' : undefined}
              />
              {errors.email && (
                <p id="email-erro" className="error-message" role="alert">{errors.email}</p>
              )}
            </div>

            <div className="campo">
              <label htmlFor="cidade" className="label">
                Cidade <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <input
                id="cidade"
                name="cidade"
                type="text"
                autoComplete="address-city"
                placeholder="Sua cidade"
                value={formData.cidade}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-field ${errors.cidade ? 'aria-invalid' : ''}`}
                aria-invalid={errors.cidade ? 'true' : 'false'}
                aria-describedby={errors.cidade ? 'cidade-erro' : undefined}
                required
              />
              {errors.cidade && (
                <p id="cidade-erro" className="error-message" role="alert">{errors.cidade}</p>
              )}
            </div>

            <div className="campo">
              <label htmlFor="tipo" className="label">
                Tipo de imóvel <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-field ${errors.tipo ? 'aria-invalid' : ''}`}
                aria-invalid={errors.tipo ? 'true' : 'false'}
                aria-describedby={errors.tipo ? 'tipo-erro' : undefined}
                required
              >
                <option value="">Selecione</option>
                {TIPOS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              {errors.tipo && (
                <p id="tipo-erro" className="error-message" role="alert">{errors.tipo}</p>
              )}
            </div>

            <div className="campo">
              <label htmlFor="conta" className="label">
                Valor médio da conta de luz (R$) — opcional
              </label>
              <input
                id="conta"
                name="conta"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ex: 450"
                value={formData.conta}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-field ${errors.conta ? 'aria-invalid' : ''}`}
                aria-invalid={errors.conta ? 'true' : 'false'}
                aria-describedby={errors.conta ? 'conta-erro' : undefined}
              />
              {errors.conta && (
                <p id="conta-erro" className="error-message" role="alert">{errors.conta}</p>
              )}
              <p className="text-xs text-text-3 mt-1">Ajuda a dimensionar o sistema ideal.</p>
            </div>

            <div className="campo">
              <label htmlFor="mensagem" className="label">
                Mensagem — opcional
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={3}
                placeholder="Observações, horário preferido para contato, etc."
                value={formData.mensagem}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input-field resize-none"
              />
            </div>

            <div className="hp" aria-hidden="true">
              <label htmlFor="site">Não preencha este campo</label>
              <input id="site" name="site" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {submitStatus === 'error' && (
              <p id="form-alerta" className="form-alert" role="alert">
                {submitMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={submitStatus === 'loading'}
              className="btn btn-primary w-full text-lg py-4"
            >
              {submitStatus === 'loading' ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enviando...
                </span>
              ) : (
                'Receber orçamento'
              )}
            </button>

            {submitStatus === 'success' && (
              <div id="sucesso" className="success-panel animate-fade-in" role="status">
                <p><strong>Recebemos seus dados.</strong> Se o WhatsApp não abrir, use o botão abaixo.</p>
                <a
                  id="whatsapp-fallback"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full mt-4"
                >
                  Abrir o WhatsApp
                </a>
              </div>
            )}

            <p className="privacidade text-xs text-text-3 text-center">
              Usamos seus dados para responder este orçamento.{' '}
              <a href="/privacidade" className="underline hover:text-accent">Política de privacidade</a>.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}