"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useOrderById, cancelOrder } from "@/lib/api";
import { useBookingStore } from "@/store/bookingStore";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BookingSuccessPage = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = typeof params.orderId === "string" ? params.orderId : "";
  const { resetBooking } = useBookingStore();
  const [formError, setFormError] = useState<string | null>(null);
  const { order, isLoading, error: fetchError, mutate } = useOrderById(orderId);

  React.useEffect(() => {
    resetBooking();
  }, [resetBooking]);

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(orderId);
      await mutate();
      alert("訂單已成功取消！");
      router.push("/account/bookings");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError("取消訂單時發生未知錯誤");
      }
    }
  };

  if (isLoading)
    return <p className="text-center py-40">正在讀取您的訂單...</p>;
  if (fetchError)
    return (
      <p className="text-center py-40 text-destructive">
        讀取訂單失敗，請至會員中心查看。
      </p>
    );
  if (!order) return <p className="text-center py-40">找不到訂單資訊。</p>;

  const nights =
    (new Date(order.checkOutDate).getTime() -
      new Date(order.checkInDate).getTime()) /
    (1000 * 3600 * 24);

  const addOnsTotal = order.addOns
    ? Object.entries(order.addOns).reduce((total, [id, quantity]) => {
        const item = order.roomId.addOnsList.find((a) => a._id === id);
        return total + (item ? item.price * quantity : 0);
      }, 0)
    : 0;

  const totalPrice =
    nights > 0
      ? nights * order.roomId.price + addOnsTotal
      : order.roomId.price + addOnsTotal;

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-serif bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url('/bg/bg-05.webp')",
      }}
    >
      {formError && (
        <>
          <p className="text-destructive">{formError}</p>
        </>
      )}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-steel-blue">訂房成功！</h1>
        <p className="text-steel-blue/80">您的房間已為您準備就緒。</p>
      </div>

      <div className="w-full max-w-md bg-white/30 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-48 bg-cover bg-center">
          <Image
            src={order.roomId.imageUrl}
            alt={order.roomId.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-end p-4">
            <h2 className="text-2xl font-bold text-white">
              {order.roomId.name}
            </h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="font-semibold text-lg ">訂單詳情</h3>
            <Link href={`/rooms/${order.roomId._id}`} passHref>
              <Button>查看房間詳情</Button>
            </Link>
          </div>

          <div className="space-y-2 text-steel-blue/90">
            <div className="flex justify-between">
              <span>訂單編號</span> <span>{order._id}</span>
            </div>
            <div className="flex justify-between">
              <span>入住日期</span>{" "}
              <span>{format(new Date(order.checkInDate), "yyyy-MM-dd")}</span>
            </div>
            <div className="flex justify-between">
              <span>退房日期</span>{" "}
              <span>{format(new Date(order.checkOutDate), "yyyy-MM-dd")}</span>
            </div>
            <div className="flex justify-between">
              <span>入住人數</span> <span>{order.peopleNum} 人</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-xl pt-4 border-t">
            <p>總金額:</p>
            <p className="text-ice-blue">NT$ {totalPrice.toLocaleString()}</p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">取消訂單</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>確定要取消這筆訂單嗎？</AlertDialogTitle>
                <AlertDialogDescription>
                  這個操作無法復原，將會永久取消您的預訂。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>關閉</AlertDialogCancel>
                <AlertDialogAction onClick={handleCancelOrder}>
                  確定取消
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <Button onClick={() => router.push("/")}>返回首頁</Button>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
