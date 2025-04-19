import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from '@/libs/supabase';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  const sessionToken = req.cookies.get('supabase-auth-token')?.value;

  if (sessionToken) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser(sessionToken);

      if (user) {
        return res;
      }
    } catch (error) {
      console.error('Supabase auth error:', error);
    }
  }

  res.cookies.delete('supabase-auth-token');
  const loginUrl = new URL('/login', req.url);
  loginUrl.searchParams.set('redirectedFrom', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile/:path*',
        '/switch-plan/:path*',
        '/claim-history/:path*',
        '/recommend/:path*',
        '/profile/:path*'
    ],
};
