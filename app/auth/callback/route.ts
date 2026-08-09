import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
export async function GET(request: NextRequest) { const code = request.nextUrl.searchParams.get('code'); if (code) { const supabase = await createClient(); const { error } = await supabase.auth.exchangeCodeForSession(code); if (!error) return NextResponse.redirect(new URL('/access-pending', request.url)); } return NextResponse.redirect(new URL('/login?error=We%20could%20confirm%20that%20link.', request.url)); }
