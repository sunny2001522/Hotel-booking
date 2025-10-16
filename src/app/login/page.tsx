"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/lib/api";
import { useUserStore } from "@/store/userStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().email({ message: "請輸入有效的電子郵件" }),
  password: z.string().min(6, { message: "密碼至少需要6個字元" }),
});

const LoginPage = () => {
  const router = useRouter();
  const { login } = useUserStore();
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    try {
      const data = await loginUser(values);
      if (data.token) {
        login(data.token);
        router.push("/"); // 登入成功後跳轉到首頁
      } else {
        throw new Error("API did not return a token");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("登入時發生未知錯誤");
      }
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen pt-20 bg-cover bg-center p-8 bg-fixed font-serif"
      style={{ backgroundImage: "url('/bg/bg-02.webp')" }}
    >
      <Card className="w-full max-w-md bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">登入</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>電子郵件</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密碼</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-me" />
                  <label htmlFor="remember-me" className="text-sm font-medium">
                    記住我
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm underline"
                  legacyBehavior
                  passHref
                >
                  忘記密碼?
                </Link>
              </div>
              {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full">
                登入
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            還沒有帳戶嗎?{" "}
            <Link href="/register" className="underline">
              立即註冊
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
