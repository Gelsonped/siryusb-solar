import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Política de Privacidade | SiryusB Solar',
  description: 'Política de privacidade da SiryusB Solar. Como coletamos, usamos e protegemos seus dados pessoais conforme a LGPD.',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main id="conteudo" tabIndex={-1} className="min-h-screen">
        <section className="section pt-32 pb-16">
          <div className="container max-w-3xl">
            <header className="mb-12">
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-4">
                Política de Privacidade — SiryusB Solar
              </h1>
              <p className="text-text-2">Última atualização: 17/11/2026</p>
            </header>

            <article className="prose prose-primary max-w-none space-y-8 text-text-2">
              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">1. Controlador</h2>
                <p>SiryusB Solar — CNPJ: 00.000.000/0000-00 (atualizar com CNPJ real)</p>
                <p>Endereço: Av. Gov. Mário Covas Jr, 183 — Peruíbe/SP</p>
                <p>E-mail do Encarregado (DPO): dpo@siryusbsolar.com.br</p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">2. Dados tratados</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Formulário de orçamento:</strong> nome, WhatsApp, cidade, tipo de imóvel, e-mail (opcional), valor da conta de luz (opcional), mensagem (opcional).</li>
                  <li><strong>Simulador:</strong> valor da conta, tipo de imóvel, tipo de ligação — sem identificação pessoal, sem cadastro.</li>
                  <li><strong>Navegação:</strong> endereço IP, logs de acesso, user-agent, páginas visitadas.</li>
                  <li><strong>Analytics (após consentimento):</strong> eventos de uso, cliques, scroll, web vitals — via PostHog.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">3. Finalidades e bases legais (LGPD Art. 7º)</h2>
                <table className="w-full text-sm border-collapse mb-4">
                  <thead>
                    <tr className="border-b border-surface-3">
                      <th className="text-left p-2 font-semibold">Finalidade</th>
                      <th className="text-left p-2 font-semibold">Base legal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-surface-3">
                      <td className="p-2">Orçamento, contato e envio de proposta</td>
                      <td className="p-2">Procedimentos preliminares a contrato (Art. 7º, V)</td>
                    </tr>
                    <tr className="border-b border-surface-3">
                      <td className="p-2">Medição de uso do site (analytics)</td>
                      <td className="p-2">Consentimento (Art. 7º, I) — revogável a qualquer momento</td>
                    </tr>
                    <tr className="border-b border-surface-3">
                      <td className="p-2">Obrigações legais e regulatórias</td>
                      <td className="p-2">Cumprimento de obrigação legal (Art. 7º, II)</td>
                    </tr>
                    <tr className="border-b border-surface-3">
                      <td className="p-2">Segurança e prevenção a fraudes</td>
                      <td className="p-2">Legítimo interesse (Art. 7º, IX)</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">4. Compartilhamento</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>WhatsApp/Meta:</strong> para atendimento via conversa iniciada pelo titular.</li>
                  <li><strong>Hospedagem e e-mail:</strong> Vercel, provedores de infraestrutura (processadores).</li>
                  <li><strong>Analytics:</strong> PostHog (EUA) — somente após consentimento; transferência internacional com cláusulas contratuais padrão.</li>
                  <li><strong>Órgãos públicos:</strong> quando exigido por lei.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">5. Retenção</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Leads não convertidos: 2 anos a partir do último contato.</li>
                  <li>Leads convertidos (clientes): prazo fiscal/contractual (5 anos) + 2 anos.</li>
                  <li>Logs de navegação/IP: 12 meses.</li>
                  <li>Analytics: conforme política do PostHog (padrão 12 meses).</li>
                  <li>Eliminação: anonimização ou exclusão segura quando não houver base legal para manutenção.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">6. Direitos do titular (Art. 18 LGPD)</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Confirmação de tratamento e acesso aos dados.</li>
                  <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
                  <li>Anonimização, bloqueio ou eliminação de dados desnecessários/excessivos.</li>
                  <li>Portabilidade dos dados a outro fornecedor.</li>
                  <li>Informação sobre compartilhamento com terceiros.</li>
                  <li>Revogação do consentimento (para analytics).</li>
                  <li>Oposição a tratamento baseado em legítimo interesse.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">7. Como exercer seus direitos</h2>
                <p>Canal único: <a href="mailto:dpo@siryusbsolar.com.br" className="text-accent underline">dpo@siryusbsolar.com.br</a> ou formulário em <Link href="#orcamento" className="text-accent underline">Contato</Link>.</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>Prazo de resposta: até 15 dias para confirmação e acesso (Art. 19 LGPD).</li>
                  <li>Verificação de identidade: poderemos solicitar dado adicional mínimo (ex.: último WhatsApp cadastrado).</li>
                  <li>Registro da decisão e eliminação quando cabível.</li>
                  <li>Possibilidade de reclamação à ANPD: <a href="https://www.gov.br/anpd" target="_blank" rel="noopener" className="text-accent underline">www.gov.br/anpd</a>.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">8. Cookies e tecnologias</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Essenciais (sempre ativos):</strong> sessão, segurança (Cloudflare <code>cf_clearance</code>, <code>__cf_bm</code>), preferência de consentimento.</li>
                  <li><strong>Opcionais (requerem consentimento):</strong> analytics PostHog (<code>ph_phc_*</code>), gravação de sessão (desativada por padrão), surveys, web-vitals.</li>
                  <li>O banner de consentimento permite "Aceitar" ou "Recusar" com peso equivalente. A escolha é salva por 1 ano.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">9. Segurança e incidentes</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Criptografia em trânsito (TLS 1.2+) e em repouso.</li>
                  <li>Headers de segurança: CSP, HSTS, X-Frame-Options, Referrer-Policy.</li>
                  <li>Controle de acesso por necessidade (princípio do menor privilégio).</li>
                  <li>Em caso de incidente com risco aos direitos do titular: notificação à ANPD e ao titular em prazo razoável, conforme Art. 48 LGPD.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">10. Alterações</h2>
                <p>Esta política pode ser atualizada. A versão vigente estará sempre em <Link href="/privacidade" className="text-accent underline">siryusbsolar.com.br/privacidade</Link>. Alterações materiais serão comunicadas por e-mail (se tivermos seu contato) ou por aviso destacado no site.</p>
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