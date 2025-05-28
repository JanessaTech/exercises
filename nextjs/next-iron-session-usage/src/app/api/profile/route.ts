import { UserSession, sessionOptions } from '@/lib/iron'
import { getIronSession } from 'iron-session'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const session = await getIronSession<UserSession>(request, NextResponse.next(), sessionOptions)
  const user = session.user
  console.log(user)
  if (!user?.isLoggedIn) {
    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 401 }
    )
  }

  // 已登录用户继续执行操作
  return NextResponse.json({ 
    message: 'Protected data',
    user 
  })
}