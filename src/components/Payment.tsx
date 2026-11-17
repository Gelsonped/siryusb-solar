'use client';

const paymentOptions = [
  {
    title: 'À vista',
    description: 'Maior desconto e payback mais rápido',
    details: ['Desconto especial no valor total', 'Sem juros nem taxas', 'Payback a partir de 3 anos', 'Posse imediata do sistema'],
    highlight: 'Melhor custo-benefício',
  },
  {
    title: 'Cartão de crédito',
    description: 'Até 10x sem juros',
    details: ['Parcelamento em até 10x', 'Sem juros nas bandeiras parceiras', 'Aprovação na hora', 'Acumula pontos/milhas'],
    highlight: 'Praticidade',
  },
  {
    title: 'Financiamento pré aprovado',
    description: 'Até 92x com taxas competitivas',
    details: ['Parcelas que cabem no seu bolso', 'Taxas a partir de 1,2% a.m.', 'Prazo de até 92 meses', 'Sujeito a análise de crédito'],
    highlight: 'Fluxo de caixa preservado',
  },
];

export default function Payment() {
  return (
    <section id="pagamento" className="section" aria-labelledby="pagamento-titulo">
      <div className="container">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="pagamento-titulo" className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-4">
            Escolha a forma que <span className="text-accent">cabe melhor no seu bolso</span>
          </h2>
          <p className="text-text-2 text-lg">
            Flexibilidade para você investir em energia solar sem comprometer seu orçamento.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {paymentOptions.map((option, index) => (
            <article key={option.title} className="card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" aria-hidden="true" />
              <div className="relative z-10">
                <h3 className="font-display text-xl font-bold text-primary mb-2">{option.title}</h3>
                <p className="text-text-2 mb-6">{option.description}</p>
                <ul className="space-y-3 mb-6" role="list">
                  {option.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-2">
                      <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  {option.highlight}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}