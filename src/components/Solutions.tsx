'use client';

const solutions = [
  {
    type: 'residencial',
    title: 'Residencial',
    subtitle: 'Sua casa gerando economia',
    image: '/images/optimized/residencial-800.jpg',
    imageAlt: 'Casa residencial com painéis solares no telhado',
    features: [
      'Sistemas de 2 a 15 kWp',
      'Instalação em telhado ou solo',
      'Monitoramento via app',
      'Homologação junto à distribuidora',
    ],
    cta: 'Simular para residência',
  },
  {
    type: 'comercial',
    title: 'Comercial',
    subtitle: 'Seu negócio mais competitivo',
    image: '/images/optimized/comercial-800.jpg',
    imageAlt: 'Prédio comercial com sistema fotovoltaico',
    features: [
      'Sistemas de 10 a 100+ kWp',
      'Redução de custos operacionais',
      'Depreciação acelerada (Lei 11.196)',
      'Imagem sustentável para clientes',
    ],
    cta: 'Simular para comércio',
  },
  {
    type: 'industrial',
    title: 'Industrial',
    subtitle: 'Indústria com energia própria',
    image: '/images/optimized/industrial-800.jpg',
    imageAlt: 'Fábrica com grande instalação solar no telhado',
    features: [
      'Sistemas de 50 kWp a MWp',
      'Demanda contratada otimizada',
      'Incentivos fiscais estaduais/federais',
      'Estabilidade no custo de produção',
    ],
    cta: 'Simular para indústria',
  },
  {
    type: 'rural',
    title: 'Propriedade rural',
    subtitle: 'Agro forte com energia solar',
    image: '/images/optimized/rural-800.jpg',
    imageAlt: 'Propriedade rural com painéis solares no solo',
    features: [
      'Sistemas para irrigação/beneficiamento',
      'Linhas de crédito BNDES/FCO/Pronaf',
      'Isenção de ICMS em vários estados',
      'Autonomia energética no campo',
    ],
    cta: 'Simular para rural',
  },
];

export default function Solutions() {
  return (
    <section id="solucoes" className="section bg-surface-1" aria-labelledby="solucoes-titulo">
      <div className="container">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="solucoes-titulo" className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-4">
            Soluções para <span className="text-accent">todos os perfis</span>
          </h2>
          <p className="text-text-2 text-lg">
            Da residência à grande indústria, dimensionamos o sistema ideal para seu consumo e seu bolso.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <article key={solution.type} className="card relative overflow-hidden group">
              <div className="absolute inset-0 z-0">
                <img
                  src={solution.image}
                  alt={solution.imageAlt}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover opacity-15 group-hover:opacity-20 transition-opacity duration-500"
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                    {solution.title}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-primary mb-2">{solution.subtitle}</h3>
                  <ul className="space-y-2 mb-6" role="list">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-text-2">
                        <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#simulador"
                  className="btn btn-outline w-full text-center"
                >
                  {solution.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}