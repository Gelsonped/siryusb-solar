'use client';

const faqs = [
  {
    question: 'A energia solar funciona em dias nublados ou chuvosos?',
    answer: 'Sim. A geração diminui, mas continua ocorrendo mesmo com nebulosidade. Os painéis captam radiação difusa. Nos dias de sol intenso, você gera créditos que compensam os períodos nublados. No fim do mês, o saldo costuma ser positivo.',
  },
  {
    question: 'E se eu gerar mais energia do que consumo?',
    answer: 'O excedente é injetado na rede da distribuidora e vira crédito em kWh. Esses créditos abatem o consumo dos meses seguintes (até 60 meses, conforme resolução da ANEEL). Você só paga a diferença se consumir mais do que gerou.',
  },
  {
    question: 'Preciso de bateria para usar energia à noite?',
    answer: 'Não, no sistema on-grid (conectado à rede). Durante o dia você injeta o excedente na rede e à noite consome da rede usando os créditos. Baterias são opcionais, indicadas apenas para quem quer autonomia total (off-grid) ou backup em quedas de energia frequentes.',
  },
  {
    question: 'Quanto tempo leva a instalação?',
    answer: 'A instalação física leva de 2 a 5 dias úteis, dependendo do tamanho do sistema e da estrutura do telhado. O processo completo (projeto, homologação, instalação, vistoria) costuma levar 30 a 60 dias. Cuidamos de toda a burocracia para você.',
  },
  {
    question: 'A SiryusB atende minha cidade?',
    answer: 'Atendemos Peruíbe e todo o Estado de São Paulo. Temos equipes próprias e parceiros homologados em todas as regiões. Faça a simulação e confirmamos a viabilidade técnica e o prazo para sua localidade.',
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer: 'Oferecemos três opções: à vista (com desconto), cartão de crédito em até 10x sem juros, ou financiamento em até 92x com taxas a partir de 1,2% a.m. (sujeito a análise). Trabalhamos com BB, BNDES, Caixa, Bradesco, Santander e outros.',
  },
  {
    question: 'Qual a garantia dos equipamentos e da instalação?',
    answer: 'Módulos fotovoltaicos: 25 anos de garantia de performance linear (80%+ no ano 25) e 12-15 anos de produto. Inversores: 10 a 12 anos. Estrutura de fixação e instalação: 5 anos. Todos os equipamentos têm certificação INMETRO.',
  },
  {
    question: 'O telhado suporta o peso dos painéis?',
    answer: 'Sim. A estrutura adiciona cerca de 15-20 kg/m², bem dentro da capacidade da maioria dos telhados (cerâmica, fibrocimento, metálico, laje). Fazemos vistoria técnica prévia e reforçamos a estrutura se necessário. A instalação não danifica a impermeabilização.',
  },
];

export default function FAQ() {
  return (
    <section id="duvidas" className="section bg-surface-1" aria-labelledby="duvidas-titulo">
      <div className="container">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h2 id="duvidas-titulo" className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-4">
            Dúvidas <span className="text-accent">frequentes</span>
          </h2>
          <p className="text-text-2 text-lg">
            Respostas diretas para as principais perguntas sobre energia solar fotovoltaica.
          </p>
        </header>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="card group" id={`faq-${index}`}>
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-semibold text-primary group-hover:text-accent transition-colors" aria-expanded="false">
                {faq.question}
                <svg className="w-6 h-6 text-accent flex-shrink-0 ml-4 transform transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-4 pb-4 text-text-2 animate-fade-in">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-text-2 mb-4">Não encontrou sua dúvida?</p>
          <a
            href="https://wa.me/5513997630654?text=Olá! Tenho uma dúvida sobre energia solar."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Perguntar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}