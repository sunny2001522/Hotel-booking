"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { forgotPassword } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().email({ message: "請輸入有效的電子郵件" }),
});

const ForgotPasswordPage = () => {
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setMessage(null);
    try {
      await forgotPassword(values.email);
      setMessage(
        "如果此電子郵件存在於我們的系統中，您將會收到一封密碼重設信件。"
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("登入時發生未知錯誤");
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">忘記密碼</CardTitle>
          <CardDescription className="text-center">
            請輸入您的電子郵件以重設密碼
          </CardDescription>
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
              {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
              )}
              {message && (
                <p className="text-sm font-medium text-green-600">{message}</p>
              )}
              <Button type="submit" className="w-full">
                傳送重設信件
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="underline">
              返回登入
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
