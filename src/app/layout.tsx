import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Energia solar em Peruíbe e no litoral de SP | SiryusB',
  description: 'Projeto, instalação e homologação de energia solar em Peruíbe e no litoral paulista. Simule sua economia em 30 segundos e fale com um especialista.',
  metadataBase: new URL('https://www.siryusbsolar.com.br'),
  alternates: {
    canonical: 'https://www.siryusbsolar.com.br/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'SiryusB Solar',
    title: 'Energia solar em Peruíbe e no litoral de SP | SiryusB',
    description: 'Projeto, instalação e homologação de energia solar em Peruíbe e no litoral paulista. Simule sua economia em 30 segundos.',
    url: 'https://www.siryusbsolar.com.br/',
    images: [
      {
        url: '/images/optimized/hero-1280.jpg',
        width: 1200,
        height: 630,
        alt: 'Casa no litoral paulista com painéis solares no telhado ao pôr do sol',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Energia solar em Peruíbe e no litoral de SP | SiryusB',
    description: 'Projeto, instalação e homologação de energia solar em Peruíbe e no litoral paulista. Simule sua economia em 30 segundos.',
    images: ['/images/optimized/hero-1280.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/optimized/logo-sym-200.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#1d1649',
  width: 'device-width',
  initialScale: 1,
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') ?? undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://www.siryusbsolar.com.br/#empresa',
        name: 'SiryusB Solar',
        url: 'https://www.siryusbsolar.com.br/',
        image: 'https://www.siryusbsolar.com.br/images/optimized/logo-sym-200.png',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.siryusbsolar.com.br/images/optimized/logo-sym-200.png',
          width: 260,
          height: 292,
        },
        telephone: '+5513997630654',
        email: 'contato@siryusbsolar.com.br',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Av. Gov. Mário Covas Jr, 183',
          addressLocality: 'Peruíbe',
          addressRegion: 'SP',
          addressCountry: 'BR',
        },
        areaServed: {
          '@type': 'State',
          name: 'São Paulo',
        },
      },
      {
        '@type': 'Service',
        '@id': 'https://www.siryusbsolar.com.br/#servico',
        name: 'Projeto e instalação de energia solar',
        serviceType: 'Energia solar fotovoltaica',
        provider: { '@id': 'https://www.siryusbsolar.com.br/#empresa' },
        areaServed: { '@type': 'State', name: 'São Paulo' },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.siryusbsolar.com.br/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'A energia solar funciona em dias nublados?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sim. A geração diminui, mas continua ocorrendo. Os créditos dos dias de sol compensam esses períodos.',
            },
          },
          {
            '@type': 'Question',
            name: 'E se eu gerar mais energia do que consumo?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'O excedente vira crédito na distribuidora e pode abater o consumo nos meses seguintes, conforme as regras vigentes.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quais são as formas de pagamento?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'À vista, cartão em até 10x ou financiamento em até 92x, sujeito a análise de crédito.',
            },
          },
          {
            '@type': 'Question',
            name: 'Preciso de bateria para usar à noite?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Não. O sistema on-grid injeta o excedente na rede e você usa os créditos à noite. Baterias são opcionais para backup.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quanto tempo leva a instalação?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Em média 2 a 5 dias úteis, dependendo do tamanho do sistema e da estrutura do telhado.',
            },
          },
          {
            '@type': 'Question',
            name: 'A SiryusB atende minha cidade?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Atendemos Peruíbe e todo o Estado de São Paulo. Simule e confirmamos a viabilidade técnica.',
            },
          },
          {
            '@type': 'Question',
            name: 'Qual a garantia dos equipamentos?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Módulos: 25 anos de performance. Inversores: 10 a 12 anos. Estrutura e instalação: 5 anos.',
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="pt-BR">
      <head>
        <meta name="csp-nonce" content={nonce} />
        <link
          rel="preload"
          as="image"
          imageSrcSet="/images/optimized/hero-480.avif 480w, /images/optimized/hero-848.avif 848w, /images/optimized/hero-1280.avif 1280w, /images/optimized/hero-1920.avif 1920w"
          imageSizes="(max-width: 900px) 100vw, 460px"
          fetchPriority="high"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&family=Figtree:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-figtree antialiased text-gray-900 bg-white">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary focus:text-white"
        >
          Pular para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}