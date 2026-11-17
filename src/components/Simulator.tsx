'use client';

import { useState, useEffect } from 'react';

type PropertyType = 'residencial' | 'comercial' | 'industrial' | 'rural';
type PhaseType = 'nao' | 'mono' | 'bi' | 'tri';

interface SimulatorResult {
  kWp: number;
  panels: number;
  area: number;
  investmentMin: number;
  investmentMax: number;
  monthlySavings: number;
  yearlySavings: number;
  paybackMonths: number;
  co2KgYear: number;
}

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: 'residencial', label: 'Residência' },
  { value: 'comercial', label: 'Comércio' },
  { value: 'industrial', label: 'Indústria' },
  { value: 'rural', label: 'Propriedade rural' },
];

const PHASE_TYPES: { value: PhaseType; label: string }[] = [
  { value: 'nao', label: 'Não sei informar' },
  { value: 'mono', label: 'Monofásica (1 fase)' },
  { value: 'bi', label: 'Bifásica (2 fases)' },
  { value: 'tri', label: 'Trifásica (3 fases)' },
];

const PREMISSAS = {
  tarifaReaisPorKWh: 0.95,
  produtividadeKWhPorKWpMes: 110,
  custoReaisPorKWpMin: 4050,
  custoReaisPorKWpMax: 4950,
  fatorCO2KgPorKWh: 0.084,
};

const LIMITES = {
  minimo: 100,
  maximo: 50000,
  paybackMaximoAnos: 25,
};

function classificarConta(conta: number) {
  if (!Number.isFinite(conta) || conta <= 0) return { tipo: 'invalido' as const, mensagem: 'Informe o valor da conta em reais.' };
  if (conta < LIMITES.minimo) return { tipo: 'abaixo' as const, mensagem: 'Para contas abaixo de R$ 100, o retorno costuma passar de 25 anos. Podemos avaliar seu caso, mas não vamos apresentar payback.' };
  if (conta > LIMITES.maximo) return { tipo: 'acima' as const, mensagem: 'Para contas acima de R$ 50.000, o projeto exige estudo de demanda. Fale com um especialista.' };
  return { tipo: 'ok' as const };
}

function rotuloPaineis(n: number) {
  return `${n} ${n === 1 ? 'painel' : 'painéis'}`;
}

function calcularSimulacao(conta: number, fase: PhaseType): SimulatorResult {
  const tarifasFase = { mono: 1.0, bi: 0.9, tri: 0.78, nao: 1.0 };
  const fatorFase = tarifasFase[fase] || 1.0;
  
  const consumoMensalKWh = conta / PREMISSAS.tarifaReaisPorKWh;
  const kWpNecessario = consumoMensalKWh / (PREMISSAS.produtividadeKWhPorKWpMes * fatorFase);
  const kWpArredondado = Math.max(0.6, Math.round(kWpNecessario * 10) / 10);
  
  const painelWp = 550;
  const painels = Math.ceil((kWpArredondado * 1000) / painelWp);
  const area = painels * 2.6;
  
  const investimentoMin = kWpArredondado * PREMISSAS.custoReaisPorKWpMin;
  const investimentoMax = kWpArredondado * PREMISSAS.custoReaisPorKWpMax;
  
  const geracaoMensalKWh = kWpArredondado * PREMISSAS.produtividadeKWhPorKWpMes * fatorFase;
  const economiaMensal = geracaoMensalKWh * PREMISSAS.tarifaReaisPorKWh;
  const economiaAnual = economiaMensal * 12;
  
  const paybackAnos = (investimentoMin + investimentoMax) / 2 / economiaAnual;
  const paybackMeses = Math.round(paybackAnos * 12);
  
  const co2Ano = geracaoMensalKWh * 12 * PREMISSAS.fatorCO2KgPorKWh;

  return {
    kWp: kWpArredondado,
    panels: painels,
    area: Math.round(area * 10) / 10,
    investmentMin: Math.round(investimentoMin),
    investmentMax: Math.round(investimentoMax),
    monthlySavings: Math.round(economiaMensal),
    yearlySavings: Math.round(economiaAnual),
    paybackMonths: paybackMeses,
    co2KgYear: Math.round(co2Ano),
  };
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('pt-BR').format(value);
}

export default function Simulator() {
  const [mounted, setMounted] = useState(false);
  const [conta, setConta] = useState('');
  const [tipo, setTipo] = useState<PropertyType>('residencial');
  const [fase, setFase] = useState<PhaseType>('nao');
  const [result, setResult] = useState<SimulatorResult | null>(null);
  const [classificacao, setClassificacao] = useState<ReturnType<typeof classificarConta> | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valor = Number(conta.replace(/\./g, '').replace(',', '.')) || 0;
    const classif = classificarConta(valor);
    setClassificacao(classif);
    
    if (classif.tipo === 'ok') {
      setResult(calcularSimulacao(valor, fase));
    } else {
      setResult(null);
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setConta('');
    setTipo('residencial');
    setFase('nao');
    setResult(null);
    setClassificacao(null);
    setSubmitted(false);
  };

  if (!mounted) return <div className="h-96" aria-hidden="true" />;

  return (
    <section id="simulador" className="section bg-surface-1" aria-labelledby="simulador-titulo">
      <div className="container">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h2 id="simulador-titulo" className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-4">
            Simule sua economia em <span className="text-accent">30 segundos</span>
          </h2>
          <p className="text-text-2 text-lg">
            Informe o valor médio da sua conta de luz e descubra o sistema ideal para você.
            Sem cadastro, resultado na hora.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="card space-y-6" noValidate>
            <div className="campo">
              <label htmlFor="conta" className="label">
                Valor médio da conta de luz (R$) <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <input
                id="conta"
                name="conta"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ex: 450"
                value={conta}
                onChange={(e) => setConta(e.target.value)}
                className="input-field text-lg"
                required
                aria-describedby={classificacao?.tipo && classificacao.tipo !== 'ok' ? 'conta-aviso' : undefined}
                aria-invalid={classificacao?.tipo && classificacao.tipo !== 'ok' ? 'true' : 'false'}
              />
              {classificacao && classificacao.tipo !== 'ok' && (
                <p id="conta-aviso" className="error-message" role="alert">
                  {classificacao.mensagem}
                </p>
              )}
              <p className="text-xs text-text-3 mt-1">Sem cadastro. Usamos apenas para calcular.</p>
            </div>

            <div className="campo">
              <label htmlFor="tipo" className="label">
                Tipo de imóvel <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <select
                id="tipo"
                name="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value as PropertyType)}
                className="input-field"
                required
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label htmlFor="fase" className="label">
                Tipo de ligação elétrica
              </label>
              <select
                id="fase"
                name="fase"
                value={fase}
                onChange={(e) => setFase(e.target.value as PhaseType)}
                className="input-field"
              >
                {PHASE_TYPES.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
              <p className="text-xs text-text-3 mt-1">Se não souber, deixe "Não sei informar".</p>
            </div>

            <div className="flex gap-4 pt-2">
              <button type="submit" className="btn btn-primary flex-1 text-lg py-4">
                Calcular minha economia
              </button>
              {submitted && (
                <button type="button" onClick={handleReset} className="btn btn-outline flex-1 text-lg py-4">
                  Nova simulação
                </button>
              )}
            </div>

            <p className="text-xs text-text-3 text-center">
              Premissas: tarifa R$ 0,95/kWh | produtividade 110 kWh/kWp/mês | custo R$ 4.050–4.950/kWp | CO₂ 0,084 kg/kWh
            </p>
          </form>

          <div className="card relative" aria-live="polite" aria-atomic="true">
            {result ? (
              <div className="animate-fade-in">
                <h3 className="font-display text-2xl font-bold text-primary mb-6">
                  Sua estimativa ({PROPERTY_TYPES.find(t => t.value === tipo)?.label})
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-surface-2 rounded-2xl p-4 text-center">
                    <p className="font-display text-3xl font-extrabold text-primary">{result.kWp.toFixed(1)} kWp</p>
                    <p className="text-sm text-text-2">Potência do sistema</p>
                  </div>
                  <div className="bg-surface-2 rounded-2xl p-4 text-center">
                    <p className="font-display text-3xl font-extrabold text-primary">{rotuloPaineis(result.panels)}</p>
                    <p className="text-sm text-text-2">Cerca de {result.area} m² de área</p>
                  </div>
                </div>

                <div className="bg-primary text-white rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="font-display text-3xl font-extrabold">R$ {formatNumber(result.monthlySavings)}/mês</p>
                      <p className="text-sm opacity-80">Economia na conta</p>
                    </div>
                    <div>
                      <p className="font-display text-3xl font-extrabold">R$ {formatNumber(result.yearlySavings)}/ano</p>
                      <p className="text-sm opacity-80">Economia anual</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-text-2">
                    <span>Investimento estimado</span>
                    <span className="font-semibold text-primary">R$ {formatNumber(result.investmentMin)} a R$ {formatNumber(result.investmentMax)}</span>
                  </div>
                  {result.paybackMonths <= LIMITES.paybackMaximoAnos * 12 ? (
                    <div className="flex justify-between text-text-2">
                      <span>Retorno do investimento</span>
                      <span className="font-semibold text-accent">
                        {Math.floor(result.paybackMonths / 12)} anos e {result.paybackMonths % 12} meses
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-text-2">
                      <span>Retorno do investimento</span>
                      <span className="font-semibold text-accent">Acima de 25 anos</span>
                    </div>
                  )}
                  <div className="flex justify-between text-text-2">
                    <span>CO₂ evitado por ano</span>
                    <span className="font-semibold text-green-600">{formatNumber(result.co2KgYear)} kg</span>
                  </div>
                </div>

                <div className="border-t border-surface-3 pt-4">
                  <p className="text-sm text-text-3 text-center mb-4">
                    Valores aproximados, calculados com médias de tarifas e irradiação para o Estado de SP.
                  </p>
                  <a
                    href="#orcamento"
                    className="btn btn-primary w-full"
                  >
                    Receber orçamento detalhado
                  </a>
                </div>
              </div>
            ) : classificacao && classificacao.tipo !== 'ok' ? (
              <div className="text-center py-12 animate-fade-in">
                <svg className="w-16 h-16 mx-auto text-accent/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-text-1 text-lg font-medium mb-2">Atenção</p>
                <p className="text-text-2">{classificacao.mensagem}</p>
                <button type="button" onClick={handleReset} className="btn btn-outline mt-6 mx-auto">
                  Tentar outro valor
                </button>
              </div>
            ) : (
              <div className="text-center py-16 animate-fade-in">
                <svg className="w-20 h-20 mx-auto text-primary/20 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 21V9a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-text-1 text-xl font-medium mb-2">Preencha o formulário ao lado</p>
                <p className="text-text-2">Insira o valor da sua conta de luz para ver a estimativa personalizada.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}