import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Termos de Uso | SiryusB Solar',
  description: 'Termos e condições de uso do site SiryusB Solar.',
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main id="conteudo" tabIndex={-1} className="min-h-screen">
        <section className="section pt-32 pb-16">
          <div className="container max-w-3xl">
            <header className="mb-12">
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-4">
                Termos de Uso — SiryusB Solar
              </h1>
              <p className="text-text-2">Última atualização: 17/11/2026</p>
            </header>

            <article className="prose prose-primary max-w-none space-y-8 text-text-2">
              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">1. Aceitação</h2>
                <p>Ao acessar e usar o site <strong>siryusbsolar.com.br</strong>, você concorda com estes Termos. Se não concordar, não utilize o site.</p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">2. Serviços</h2>
                <p>O site fornece informações sobre energia solar fotovoltaica, um simulador de economia (estimativa) e formulário para solicitação de orçamento. O simulador usa premissas médias (tarifa, irradiação, custo/kWp) e não substitui projeto técnico nem proposta formal.</p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">3. Simulador — natureza estimativa</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Resultados são <strong>estimativas</strong> baseadas em médias para o Estado de SP.</li>
                  <li>Não garantem economia exata, geração, payback ou viabilidade técnica.</li>
                  <li>Projeto definitivo requer vistoria técnica, análise de sombreamento, estrutura e rede.</li>
                  <li>Premissas atuais: tarifa R$ 0,95/kWh, produtividade 110 kWh/kWp/mês, custo R$ 4.050–4.950/kWp.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">4. Orçamento e contratação</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>O envio do formulário <strong>não gera obrigação de compra</strong> nem contrato.</li>
                  <li>A SiryusB entrará em contato para qualificar a demanda e apresentar proposta formal.</li>
                  <li>Valores, prazos e condições finais constam na proposta/contrato assinado pelas partes.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">5. Propriedade intelectual</h2>
                <p>Conteúdo, imagens, código, simulador e marca SiryusB são de propriedade da empresa ou licenciados. É vedada a cópia, reprodução ou uso comercial sem autorização prévia por escrito.</p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">6. Links de terceiros</h2>
                <p>O site pode conter links para WhatsApp, redes sociais, instituições financeiras e órgãos públicos. Não nos responsabilizamos por conteúdo, políticas ou práticas de terceiros.</p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">7. Limitação de responsabilidade</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>O site é fornecido "como está", sem garantias de disponibilidade ininterrupta ou isenção de erros.</li>
                  <li>Não nos responsabilizamos por danos diretos, indiretos, incidentais ou consequentes decorrentes do uso ou impossibilidade de uso do site.</li>
                  <li>O simulador não substitui laudo técnico, projeto executivo ou parecer de engenheiro eletricista.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">8. Dados pessoais e privacidade</h2>
                <p>O tratamento de dados pessoais segue nossa <Link href="/privacidade" className="text-accent underline">Política de Privacidade</Link>. Ao usar o formulário, você consente com o tratamento para fins de orçamento e contato.</p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">9. Alterações</h2>
                <p>Podemos atualizar estes Termos a qualquer momento. A versão vigente estará sempre nesta página. O uso contínuo após alterações constitui aceitação.</p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">10. Lei aplicável e foro</h2>
                <p>Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da Comarca de Peruíbe/SP para dirimir controvérsias, com renúncia a qualquer outro.</p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">11. Contato</h2>
                <p>Dúvidas sobre estes Termos: <a href="mailto:contato@siryusbsolar.com.br" className="text-accent underline">contato@siryusbsolar.com.br</a> ou <Link href="#orcamento" className="text-accent underline">formulário de contato</Link>.</p>
              </section>
            </article>

            <nav className="mt-12" aria-label="Navegação inferior">
              <Link href="/" className="btn btn-outline">Voltar ao início</Link>
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}