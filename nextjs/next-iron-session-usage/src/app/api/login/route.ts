import { UserSession, sessionOptions } from '@/lib/iron'
import { getIronSession } from 'iron-session'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const session = await getIronSession<UserSession>(request, NextResponse.next(), sessionOptions);
  const { email, password } = await request.json();

  if (email === 'user@example.com' && password === 'password') {
    session.user = { id: '123', email, isLoggedIn: true };
    await session.save();
    console.log('Saved session:', session.user);
    
    // 显式返回 Set-Cookie 头
    const response = NextResponse.json(session.user);
    response.cookies.set({
      name: sessionOptions.cookieName,
      value: (session as any)._seal || "",
      maxAge: sessionOptions.cookieOptions?.maxAge
    });
    return response;
  }
  
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
