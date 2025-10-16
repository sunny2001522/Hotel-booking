"use client";

import React from "react";
import { useOrders, cancelOrder } from "@/lib/api";
import { Button } from "@/components/ui/button";
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
import type { Order } from "@/lib/types";
import Link from "next/link";

const BookingsPage = () => {
  const { orders, isLoading, error, mutate } = useOrders();
  const [formError, setFormError] = React.useState<string | null>(null);

  const handleCancelOrder = async (orderId: string) => {
    try {
      await cancelOrder(orderId);
      alert("訂單已成功取消！");
      mutate(); // 重新整理訂單列表
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError("登入時發生未知錯誤");
      }
    }
  };

  if (error) return <p>讀取訂單時發生錯誤。</p>;
  if (isLoading) return <p>讀取訂單中...</p>;

  const now = new Date();
  const upcomingOrders = orders.filter(
    (order: Order) => new Date(order.checkInDate) >= now
  );
  const pastOrders = orders.filter(
    (order: Order) => new Date(order.checkInDate) < now
  );

  const OrderCard = ({
    order,
    isUpcoming,
  }: {
    order: Order;
    isUpcoming: boolean;
  }) => {
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
      <div className="border rounded-lg p-4 flex justify-between items-center">
        <div>
          <h3 className="font-bold">{order.roomId.name}</h3>
          <p className="text-sm text-gray-600">
            入住: {new Date(order.checkInDate).toLocaleDateString()} | 退房:{" "}
            {new Date(order.checkOutDate).toLocaleDateString()}
          </p>
          <p className="text-sm font-semibold">
            總金額: NT$ {totalPrice.toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/rooms/${order.roomId._id}`} passHref>
            <Button variant="outline">查看房間詳情</Button>
          </Link>
          {formError && (
            <p className="text-sm font-medium text-destructive">{formError}</p>
          )}
          {isUpcoming && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">取消訂單</Button>
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
                  <AlertDialogAction
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    確定取消
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">我的訂單</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">即將到來的旅程</h2>
          {upcomingOrders.length > 0 ? (
            <div className="space-y-4">
              {upcomingOrders.map((order: Order) => (
                <OrderCard key={order._id} order={order} isUpcoming={true} />
              ))}
            </div>
          ) : (
            <p>您目前沒有即將到來的預訂。</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">歷史訂單</h2>
          {pastOrders.length > 0 ? (
            <div className="space-y-4">
              {pastOrders.map((order: Order) => (
                <OrderCard key={order._id} order={order} isUpcoming={false} />
              ))}
            </div>
          ) : (
            <p>您目前沒有任何歷史訂單。</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
