'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    // 检查是否已登录，如果没有登录则跳转到登录页面
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    // 可以在这里获取用户信息，这里简单使用测试邮箱
    setEmail('user@example.com');
  }, [router]);

  const handleLogout = () => {
    // 清除登录状态
    localStorage.removeItem('token');
    // 跳转到登录页面
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来！</h1>
            <p className="text-gray-600 text-lg">
              {email}
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-8">
            登录成功
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 outline-none transition-all duration-200"
          >
            退出登录
          </button>

          <div className="mt-6 text-sm text-gray-500">
            <p>您已成功登录系统</p>
          </div>
        </div>
      </div>
    </div>
  );
}
