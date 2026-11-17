import { NextRequest, NextResponse } from 'next/server';

const TIPOS_PERMITIDOS = new Set(['residencial', 'comercial', 'industrial', 'rural']);

function limpar(valor: string | undefined, max: number): string {
  return (valor ?? '').replace(/[<>]/g, '').slice(0, max);
}

async function excedeuLimite(ip: string): Promise<boolean> {
  // TODO: implementar com Redis/Upstash em produção
  // Exemplo: const count = await redis.incr(`ratelimit:${ip}`); if (count === 1) await redis.expire(`ratelimit:${ip}`, 600);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot
    if (String(body.site ?? '').trim() !== '') {
      return new NextResponse(null, { status: 204 });
    }

    // Rate limit por IP
    const ip = String(request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'sem-ip';
    if (await excedeuLimite(ip)) {
      return NextResponse.json({ erro: 'limite' }, { status: 429 });
    }

    // Validação de campos obrigatórios
    const telefone = String(body.telefone ?? '').replace(/\D/g, '');
    if (telefone.length < 10 || telefone.length > 11) {
      return NextResponse.json({ erro: 'telefone' }, { status: 422 });
    }
    if (String(body.nome ?? '').trim().length < 2) {
      return NextResponse.json({ erro: 'nome' }, { status: 422 });
    }
    if (String(body.cidade ?? '').trim().length < 2) {
      return NextResponse.json({ erro: 'cidade' }, { status: 422 });
    }
    if (!TIPOS_PERMITIDOS.has(String(body.tipo ?? '').trim().toLowerCase())) {
      return NextResponse.json({ erro: 'tipo' }, { status: 422 });
    }

    // TODO: conectar banco de dados real (PostgreSQL, MongoDB, etc.)
    // await db.insert('leads', { ... });

    const lead = {
      nome: limpar(body.nome, 80),
      telefone,
      email: limpar(body.email, 120),
      cidade: limpar(body.cidade, 80),
      tipo: limpar(body.tipo, 30),
      conta: Number(String(body.conta ?? '').replace(/\./g, '').replace(',', '.')) || null,
      mensagem: limpar(body.mensagem, 800),
      origem: limpar(body.origem, 300),
      consentimento: true,
      criadoEm: new Date().toISOString(),
    };

    console.log('Lead recebido:', lead);

    return NextResponse.json({ ok: true, id: `lead_${Date.now()}` }, { status: 201 });
  } catch {
    return NextResponse.json({ erro: 'servidor' }, { status: 500 });
  }
}