"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";

const Header = () => {
  const { isLoggedIn } = useUserStore();

  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // 取得目前頁面路由

  useEffect(() => {
    // 只在首頁啟用觀察
    if (pathname === "/") {
      const firstSection = document.querySelector("#section1");

      if (!firstSection) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setScrolled(!entry.isIntersecting); // 當離開第一區域時變色
        },
        { threshold: 0.5 } // 超過一半才觸發
      );

      observer.observe(firstSection);

      return () => observer.disconnect();
    } else {
      // 其他頁面預設都有背景
      setScrolled(true);
    }
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full text-white p-4 font-serif flex justify-between items-center z-50 transition-all duration-500 ${
        scrolled ? "bg-white/10 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <Link href="/" className="text-2xl font-bold h-full">
        <Image
          src="/logo/logo-ver.webp"
          alt="logo"
          width="120"
          height="40"
          className="object-fit "
        />
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/rooms" className="hover:text-gray-300">
          冬眠客房
        </Link>
        {/* <Link href="/#news" className="hover:text-gray-300">
          最新消息
        </Link> */}
        <Link href="/#food" className="hover:text-gray-300">
          冰霓餐廳
        </Link>

        <div className="flex gap-2">
          {isLoggedIn ? (
            <>
              <Button asChild variant="glass">
                <Link href="/account">會員中心</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild>
                <Link href="/register">立即體驗</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
