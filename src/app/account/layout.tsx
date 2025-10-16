"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { isLoggedIn, logout } = useUserStore();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  const handleLogout = () => {
    logout();
    router.push("/"); // 登出後跳轉回首頁
  };

  if (!isLoggedIn) {
    return <p className="text-center py-40">驗證中，將為您導向登入頁面...</p>;
  }

  const navLinks = [
    { href: "/account", label: "個人資料" },
    { href: "/account/bookings", label: "我的訂單" },
  ];

  return (
    <div
      className="min-h-screen bg-gray-100 pt-24 bg-cover bg-center p-8 bg-fixed"
      style={{ backgroundImage: "url('/bg/bg-02.webp')" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 font-serif">
        <div className="md:flex md:gap-8">
          <aside className="w-full md:w-1/4 mb-8 md:mb-0">
            <div className="bg-white/40 backdrop-blur-sm p-4 rounded-lg shadow-md ">
              <h2 className="text-xl font-bold mb-4 text-steel-blue">
                會員中心
              </h2>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`p-2 rounded-md text-steel-blue/80 hover:bg-lavender/40 ${
                      pathname === link.href
                        ? "bg-lavender/60 font-semibold text-ice-blue"
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
          <main className="w-full md:w-3/4">
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-md mb-6">
              {children}
            </div>
            <Button onClick={handleLogout}>登出</Button>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
