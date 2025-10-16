"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useRoomById, useUser } from "@/lib/api";
import { useUserStore } from "@/store/userStore";
import { useBookingStore } from "@/store/bookingStore";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import RoomFacilities from "@/components/feature/RoomFacilities";
import AddOns from "@/components/feature/AddOns";
import RoomList from "@/components/feature/RoomList";

const RoomDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === "string" ? params.id : "";

  const { room, isLoading, isError } = useRoomById(id);
  const { isLoggedIn } = useUserStore();
  const { user } = useUser();
  const { setBookingDetails } = useBookingStore();

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });
  const [guestCount, setGuestCount] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<{
    [key: string]: number;
  }>({});

  const handleAddOnChange = (id: string, quantity: number) => {
    setSelectedAddOns((prev) => ({ ...prev, [id]: quantity }));
  };

  const handleBookingClick = () => {
    if (!isLoggedIn) {
      alert("請先登入才能預訂房間！");
      router.push("/login");
      return;
    }
    if (
      !user?.name ||
      !user?.phone ||
      !user?.email ||
      !user?.address?.detail ||
      !user?.address?.zipcode
    ) {
      alert(
        "為了完成訂房，請先至會員中心填寫您完整的個人資料 (姓名、手機、Email、地址)。"
      );
      router.push("/account");
      return;
    }
    if (room && date?.from && date?.to) {
      setBookingDetails({
        roomId: room._id,
        checkInDate: date.from,
        checkOutDate: date.to,
        numberOfGuests: guestCount,
        addOns: selectedAddOns, // Save add-ons to store
      });
      router.push("/booking");
    }
  };

  if (isError)
    return (
      <p className="text-center text-red-500 py-40">⚠️ 房間資料載入失敗</p>
    );
  if (isLoading) return <p className="text-center py-40">房間資料載入中...</p>;
  if (!room) return <p className="text-center py-40">找不到該房間的資料。</p>;

  const nights =
    date?.from && date?.to
      ? Math.ceil(
          (date.to.getTime() - date.from.getTime()) / (1000 * 3600 * 24)
        )
      : 1;
  const addOnsTotal = Object.entries(selectedAddOns).reduce(
    (total, [id, quantity]) => {
      const item = room.addOnsList.find((a) => a._id === id);
      return total + (item ? item.price * quantity : 0);
    },
    0
  );
  const totalPrice = nights * room.price + addOnsTotal;

  return (
    <div
      className="bg-white/70 font-serif bg-cover bg-center p-8 bg-fixed"
      style={{ backgroundImage: "url('/bg/bg-07.webp')" }}
    >
      <section className="max-w-screen-xl mx-auto px-6 py-10 pt-24">
        <div className="md:flex gap-8">
          {/* Left Side: Room Details */}
          <div className="w-full md:w-2/3">
            <div className="relative w-full h-[500px] rounded-lg shadow-lg mb-8 overflow-hidden">
              <Image
                src={room.imageUrl}
                alt={room.name}
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-steel-blue">
              {room.name}
            </h1>
            <p className="text-steel-blue/80 leading-relaxed mb-8">
              {room.description}
            </p>
            <div className="text-sm text-steel-blue/70 leading-relaxed space-y-2">
              <h4 className="font-bold text-base mb-2">訂房須知</h4>
              <p>1. 入住時間為下午 15:00，退房時間為上午 11:00。</p>
              <p>2. 若需更改預訂請於入住日前 3 天通知。</p>
              <p>3. 全館禁煙，寵物入住請提前聯繫客服。</p>
            </div>

            <AddOns
              addOnsList={room.addOnsList}
              selectedAddOns={selectedAddOns}
              onAddOnChange={handleAddOnChange}
            />

            <RoomFacilities
              bedroomList={room.bedroomList}
              bathList={room.bathList}
              livingRoomList={room.livingRoomList}
              barList={room.barList}
              workSpaceList={room.workSpaceList}
            />
          </div>

          {/* Right Side: Booking Card */}
          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                預訂 {room.name}
              </h2>
              <div className="mb-4">
                <p className="font-semibold mb-2">選擇日期</p>
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              <div className="mb-6">
                <p className="font-semibold mb-2">人數</p>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={guestCount}
                    onChange={(e) =>
                      setGuestCount(
                        Math.max(
                          1,
                          Math.min(
                            room.maxPeople,
                            parseInt(e.target.value, 10) || 1
                          )
                        )
                      )
                    }
                    className="w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      setGuestCount(Math.min(room.maxPeople, guestCount + 1))
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
              <hr className="solid my-4" />
              <div className="flex justify-between text-xl text-steel-blue font-bold mb-6">
                <span>總價 ({nights} 晚)</span>
                <span>NT$ {totalPrice.toLocaleString()}</span>
              </div>
              <Button className="w-full" size="lg" onClick={handleBookingClick}>
                {isLoggedIn ? "前往預訂" : "請先登入"}
              </Button>
              {!isLoggedIn && (
                <p className="text-xs text-center mt-2 text-gray-500">
                  登入後即可預訂
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-screen-xl mx-auto px-6 py-10 pt-24">
        <RoomList smCol={1} mdCol={2} lgCol={4} />
      </section>
    </div>
  );
};

export default RoomDetailPage;
