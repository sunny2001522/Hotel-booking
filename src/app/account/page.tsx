"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUser, updateUser } from "@/lib/api";

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

const formSchema = z.object({
  name: z.string().min(1, "姓名為必填"),
  email: z.string().email(),
  phone: z.string().min(1, "手機為必填"),
  birthday: z.string().min(1, "生日為必填"),
  address: z.object({
    zipcode: z
      .string()
      .min(1, { message: "請輸入郵遞區號" })
      .refine((val) => !isNaN(Number(val)) && Number(val) >= 100, {
        message: "請輸入有效的郵遞區號(至少100)",
      }),
    detail: z.string().min(1, "請輸入詳細地址"),
  }),
});

const ProfilePage = () => {
  const { user, isLoading, mutate } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        birthday: user.birthday
          ? new Date(user.birthday).toISOString().split("T")[0]
          : "",
        address: {
          zipcode: user.address?.zipcode || undefined,
          detail: user.address?.detail || "",
        },
      });
    }
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setSuccess(null);
    try {
      await updateUser(values);
      mutate(); // Re-fetch user data to update the view
      setSuccess("個人資料更新成功！");
      setIsEditing(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("登入時發生未知錯誤");
      }
    }
  }

  if (isLoading) return <p>讀取資料中...</p>;

  const DisplayField = ({
    label,
    value,
  }: {
    label: string;
    value: string | undefined | null;
  }) => (
    <div className="flex items-center font-sans">
      <p className="w-24 font-semibold shrink-0">{label}</p>
      <p>{value || "未提供"}</p>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">個人資料</h1>
        {!isEditing && <Button onClick={() => setIsEditing(true)}>編輯</Button>}
      </div>

      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>姓名</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>電子郵件 </FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
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
                    <Input {...field} />
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
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>地址</FormLabel>

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="address.zipcode"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input type="number" placeholder="郵遞區號" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.detail"
                render={({ field }) => (
                  <FormItem className="flex-[2]">
                    <FormControl>
                      <Input placeholder="詳細地址" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
            {success && (
              <p className="text-sm font-medium text-green-600">{success}</p>
            )}
            <div className="flex gap-2">
              <Button type="submit">儲存變更</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  form.reset();
                }}
              >
                取消
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="space-y-4 text-steel-blue">
          <DisplayField label="姓名" value={user?.name} />
          <DisplayField label="Email" value={user?.email} />
          <DisplayField label="手機" value={user?.phone} />
          <DisplayField
            label="生日"
            value={
              user?.birthday
                ? new Date(user.birthday).toLocaleDateString()
                : null
            }
          />
          <DisplayField
            label="地址"
            value={
              user?.address
                ? `${user.address.zipcode || ""} ${user.address.detail || ""}`
                : null
            }
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
