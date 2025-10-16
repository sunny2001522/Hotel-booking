"use client";

import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";

export const userInfoSchema = z.object({
  name: z.string().min(1, "姓名為必填"),
  phone: z.string().min(1, "手機為必填"),
  email: z.string().email("無效的電子郵件"),
  address: z.object({
    zipcode: z.preprocess(
      (val) => parseInt(z.string().parse(val), 10),
      z.number().min(100, "請輸入有效的郵遞區號")
    ),
    detail: z.string().min(1, "請輸入詳細地址"),
  }),
});

export type UserInfoData = z.infer<typeof userInfoSchema>;

interface UserInfoFormProps {
  form: UseFormReturn<UserInfoData>;
  onFormChange?: (data: UserInfoData) => void;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({
  form,
  onFormChange,
}) => {
  const watchedValues = form.watch();

  useEffect(() => {
    if (onFormChange) {
      onFormChange(watchedValues);
    }
  }, [watchedValues, onFormChange]);

  return (
    <Form {...form}>
      <form className="space-y-4">
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>地址</FormLabel>
          <div className="flex gap-2 mt-2">
            <FormField
              control={form.control}
              name="address.zipcode"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="郵遞區號"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
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
        </div>
      </form>
    </Form>
  );
};
