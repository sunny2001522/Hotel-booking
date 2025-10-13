
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 flex justify-between items-center z-50">
      <Link href="/" className="text-2xl font-bold">
        Iceverse
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/rooms" className="hover:text-gray-300">房間</Link>
        <Link href="/news" className="hover:text-gray-300">最新消息</Link>
        <Link href="/cuisine" className="hover:text-gray-300">美食</Link>
        <div className="flex gap-2">
            <Button variant="outline">登入</Button>
            <Button>註冊</Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
