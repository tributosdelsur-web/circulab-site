import { NextRequest, NextResponse } from 'next/server'
import { esAdmin } from '../../../lib/servidor'

export async function POST(req: NextRequest) {
  if (!(await esAdmin(req))) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const clave = process.env.ANTHROPIC_API_KEY
  if (!clave) return NextResponse.json({ error: 'Falta ANTHROPIC_API_KEY en Vercel' }, { status: 503 })
  const { messages, max_tokens } = await req.json()
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': clave, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: Math.min(Number(max_tokens) || 500, 1500), messages }),
  })
  return NextResponse.json(await res.json(), { status: res.status })
}
