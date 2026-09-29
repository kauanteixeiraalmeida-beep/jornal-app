import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  if (!supabase) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(data ?? [], { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message ?? 'Erro ao buscar notícias.',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.' },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();

    const { data, error } = await supabase.from('news').insert([
      {
        title: body.title,
        description: body.description,
        type: body.type,
        src: body.src,
        featured: Boolean(body.featured),
        date: body.date ?? new Date().toISOString(),
      },
    ]).select();

    if (error) {
      throw error;
    }

    return NextResponse.json(data?.[0] ?? body, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message ?? 'Erro ao publicar notícia.',
      },
      { status: 500 }
    );
  }
}
