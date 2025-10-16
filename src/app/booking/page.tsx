"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";
import { useUser, useRoomById, createOrder, getOrders } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { EditDatesModal } from "@/components/feature/booking/EditDatesModal";
import { EditGuestsModal } from "@/components/feature/booking/EditGuestsModal";
import {
  EditUserInfoModal,
  UserInfoData,
} from "@/components/feature/booking/EditUserInfoModal";
import { EditIcon } from "lucide-react";

const BookingPage = () => {
  const router = useRouter();
  const { roomId, checkInDate, checkOutDate, numberOfGuests, addOns } =
    useBookingStore();
  const { user, isLoading: isUserLoading } = useUser();
  const { room, isLoading: isRoomLoading } = useRoomById(roomId || "");

  const [isClient, setIsClient] = useState(false);
  const [currentPeopleNum, setCurrentPeopleNum] = useState(numberOfGuests);
  const [currentDateRange, setCurrentDateRange] = useState({
    from: checkInDate,
    to: checkOutDate,
  });
  const [currentUserInfo, setCurrentUserInfo] = useState<UserInfoData | null>(
    null
  );

  useEffect(() => {
    if (user) {
      setCurrentUserInfo({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: {
          zipcode: user.address.zipcode,
          detail: user.address.detail,
        },
      });
    }
  }, [user]);

  useEffect(() => {
    setIsClient(true);
    if (!roomId) {
      setTimeout(() => {
        if (!useBookingStore.getState().roomId) {
          router.replace("/rooms");
        }
      }, 500);
    }
  }, [roomId, router]);

  
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirmBooking = async () => {
    if (
      !room ||
      !currentUserInfo ||
      !currentDateRange.from ||
      !currentDateRange.to
    ) {
      setError("訂單資料不完整，無法建立訂單。");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const orderData = {
        roomId: room._id,
        checkInDate: format(currentDateRange.from, "yyyy/MM/dd"),
        checkOutDate: format(currentDateRange.to, "yyyy/MM/dd"),
        peopleNum: currentPeopleNum,
        userInfo: {
          ...currentUserInfo,
          address: {
            ...currentUserInfo.address,
            zipcode: String(currentUserInfo.address.zipcode), // 轉成 string
          },
        },
        addOns: addOns,
      };

      await createOrder(orderData);

      const ordersResponse = await getOrders();
      const allOrders = ordersResponse.result || [];

      if (allOrders.length > 0) {
        const sortedOrders = [...allOrders].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        const newOrder = sortedOrders[0];
        router.push(`/booking/success/${newOrder._id}`);
      } else {
        throw new Error("無法獲取剛剛建立的訂單資訊。");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("登入時發生未知錯誤");
        setIsSubmitting(false);
      }
    }
  };

  if (
    !isClient ||
    isUserLoading ||
    isRoomLoading ||
    !currentUserInfo ||
    !room
  ) {
    return <p className="text-center py-40">載入訂單資訊中...</p>;
  }

  const nights =
    currentDateRange.from && currentDateRange.to
      ? (currentDateRange.to.getTime() - currentDateRange.from.getTime()) /
        (1000 * 3600 * 24)
      : 0;

  const addOnsTotal = Object.entries(addOns).reduce((total, [id, quantity]) => {
    const item = room.addOnsList.find((a) => a._id === id);
    return total + (item ? item.price * quantity : 0);
  }, 0);

  const totalPrice = nights > 0 ? nights * room.price + addOnsTotal : 0;

  return (
    <div
      className="min-h-screen bg-gray-200 pt-24 font-serif bg-cover bg-centers text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0)),url('/bg/bg-03.webp')",
      }}
    >
      <div className="max-w-screen-lg mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-steel-blue">
          確認您的訂房
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-400/40 backdrop-blur-lg p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">訂房人資訊</h2>
                <EditUserInfoModal
                  initialData={currentUserInfo}
                  onSave={setCurrentUserInfo}
                >
                  <Button variant="ghost" size="sm">
                    <EditIcon className="w-4 h-4 mr-2" />
                    編輯
                  </Button>
                </EditUserInfoModal>
              </div>
              <div className="space-y-2 text-steel-blue/90 ">
                <div className="flex justify-between items-center">
                  <strong>姓名</strong>
                  <p>{currentUserInfo.name}</p>
                </div>

                <div className="flex justify-between items-center">
                  <strong>Email</strong>
                  <p>{currentUserInfo.email}</p>
                </div>
                <div className="flex justify-between items-center">
                  <strong>手機</strong>
                  <p>{currentUserInfo.phone}</p>
                </div>
                <div className="flex justify-between items-center">
                  <strong>地址</strong>
                  <p>{currentUserInfo.address.zipcode}</p>
                  <p>{currentUserInfo.address.detail}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-400/40 backdrop-blur-lg p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">支付方式</h2>
              <p className="text-steel-blue/90">將於入住時付款。(此為示意)</p>
            </div>
          </div>

          <div className="bg-gray-400/40 backdrop-blur-lg p-6 rounded-lg shadow-md h-fit sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">訂單詳情</h2>
              <Link href={`/rooms/${roomId}`} passHref>
                <Button variant="outline">查看房間詳情</Button>
              </Link>
            </div>
            <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
              <Image
                src={room.imageUrl}
                alt={room.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>入住/退房日期</span>
                <EditDatesModal
                  initialDateRange={{
                    from: currentDateRange.from!,
                    to: currentDateRange.to!,
                  }}
                  onSave={(newDates) =>
                    setCurrentDateRange({
                      from: newDates.from,
                      to: newDates.to,
                    })
                  }
                >
                  <Button variant="ghost" size="sm">
                    {currentDateRange.from &&
                      format(currentDateRange.from, "MM/dd")}{" "}
                    -{" "}
                    {currentDateRange.to &&
                      format(currentDateRange.to, "MM/dd")}{" "}
                    <EditIcon className="w-4 h-4 ml-2" />
                  </Button>
                </EditDatesModal>
              </div>
              <div className="flex justify-between items-center">
                <span>人數</span>
                <EditGuestsModal
                  initialValue={currentPeopleNum}
                  maxValue={room.maxPeople}
                  onSave={setCurrentPeopleNum}
                >
                  <Button variant="ghost" size="sm">
                    {currentPeopleNum} 人 <EditIcon className="w-4 h-4 ml-2" />
                  </Button>
                </EditGuestsModal>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <p>總金額 ({nights > 0 ? nights : 0} 晚)</p>
                <p className="text-ice-blue">
                  NT$ {totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? "處理中..." : "確認付款並訂房"}
              </Button>
            </div>
            {error && (
              <p className="text-sm text-center mt-2 text-destructive">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
