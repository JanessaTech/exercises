
import { SessionOptions } from 'iron-session'

export interface UserSession {
  user?: {  // 使用可选属性
    id: string;
    email: string;
    isLoggedIn: boolean;
  }
}

export const sessionOptions: SessionOptions = {
  cookieName: 'next14_auth',
  password: process.env.SESSION_SECRET || 'default_complex_password_min_32_chars',
  cookieOptions: {
    secure: false,          // 开发环境必须关闭
    sameSite: "lax",        // 允许同站跨域
    httpOnly: true,
    path: "/",              // 全路径生效
    maxAge: 86400           // 有效期24小时
  }
}
