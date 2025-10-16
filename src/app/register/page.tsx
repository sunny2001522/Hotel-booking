"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signupUser } from "@/lib/api";
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

// New schema based on user's JSON structure
const formSchema = z.object({
  name: z.string().min(1, { message: "請輸入姓名" }),
  email: z.string().email({ message: "請輸入有效的電子郵件" }),
  password: z.string().min(6, { message: "密碼至少需要6個字元" }),
  phone: z.string().min(1, { message: "請輸入電話號碼" }),
  birthday: z.string().min(1, { message: "請輸入生日" }),
  address: z.object({
    zipcode: z
      .string()
      .min(1, { message: "請輸入郵遞區號" })
      .refine((val) => !isNaN(Number(val)) && Number(val) >= 100, {
        message: "請輸入有效的郵遞區號(至少100)",
      }),
    city: z.string().min(1, { message: "請輸入城市" }),
    county: z.string().min(1, { message: "請輸入區域" }),
    detail: z.string().min(1, { message: "請輸入詳細地址" }),
  }),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "您必須同意隱私權條款",
  }),
});

const RegisterPage = () => {
  const router = useRouter();
  const { login } = useUserStore();
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      address: {
        zipcode: "" ,
        city: "",
        county: "",
        detail: "",
      },
      privacyPolicy: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    try {
      // The data structure from the form now matches the required API structure
      const data = await signupUser(values);
      if (data.token) {
        login(data.token); // Auto-login
        router.push("/"); // Redirect to homepage
      } else {
        throw new Error("註冊成功，但無法自動登入");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("註冊時發生未知錯誤");
      }
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen py-12 pt-20 bg-cover bg-center p-8 bg-fixed font-serif"
      style={{ backgroundImage: "url('/bg/bg-02.webp')" }}
    >
      <Card className="w-full max-w-md bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">註冊</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>姓名</FormLabel>
                    <FormControl>
                      <Input placeholder="王小明" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>手機</FormLabel>
                    <FormControl>
                      <Input placeholder="0912345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>生日</FormLabel>
                    <FormControl>
                      <Input placeholder="格式: YYYY/MM/DD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <FormLabel>地址</FormLabel>
                <div className="flex flex-col gap-2">
                  <div className="flex w-full gap-2">
                    <FormField
                      control={form.control}
                      name="address.zipcode"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="郵遞區號" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="城市" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.county"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="區域" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address.detail"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="詳細地址" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="privacyPolicy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>我已閱讀並同意本網站的個資使用規範</FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full">
                建立帳戶
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            已經有帳戶了?{" "}
            <Link href="/login" className="underline">
              立即登入
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
