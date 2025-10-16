"use client";
import React from "react";
import Image from "next/image";
import { useRooms } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Users, Bed, Maximize } from "lucide-react";
import Link from "next/link";
import type { Room } from "@/lib/types";

const RoomShowcase = () => {
  const { rooms, isLoading, isError } = useRooms();

  if (isError)
    return <p className="text-center text-red-500">⚠️ 房間資料載入失敗</p>;
  if (isLoading) return <p className="text-center">房間資料載入中...</p>;

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center bg-cover bg-center max-sm:pt-20 p-8 bg-fixed font-serif"
      style={{ backgroundImage: "url('/bg/bg-07.webp')" }}
    >
      <h2 className="text-4xl  text-white text-center mb-12">冬眠客房</h2>
      {rooms.length === 0 ? (
        <p className="text-center text-white">目前沒有可顯示的房間。</p>
      ) : (
        <div className="md:flex max-sm:grid sm:grid-cols-2 max-sm:grid-cols-1 gap-2 items-center justify-center w-full mx-auto">
          {rooms.map((room: Room, index: number) => (
            <div
              className="group md:[perspective:1000px] "
              key={room._id}
              style={{
                marginTop:
                  typeof window !== "undefined" && window.innerWidth >= 768 // md breakpoint
                    ? index === 0 || index === 4
                      ? "0px"
                      : index === 1 || index === 3
                      ? "40px"
                      : "80px"
                    : `10px`, // mobile 狀態維持原本遞增效果
              }}
            >
              <Link href={`/rooms/${room._id}`} passHref>
                <div className="relative sm:w-60 md:w-35 lg:w-50 h-80 transition-transform duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front Side */}
                  <div className="absolute w-full h-full text-white text-xl flex flex-col rounded-lg  items-end justify-end overflow-hidden [backface-visibility:hidden]">
                    <Image
                      src={room.imageUrl}
                      alt={room.name}
                      fill
                      className="object-cover "
                    />
                    <div className="relative bg-gradient-to-t from-gray-500 to-transparent w-full h-1/2 flex flex-col justify-end">
                      <h3 className="font-serif  text-center p-2 ">
                        {room.name}
                      </h3>
                      {/* <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                      {room.description}
                    </p> */}
                      <div className="flex justify-end items-center mx-auto  w-full pb-4 px-2">
                        <div className=" w-1 aspect-square bg-white rounded-full "></div>
                        <hr className="border-white w-full" />
                        <div className="w-1 aspect-square bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute  w-full h-full text-white rounded-lg [backface-visibility:hidden] [transform:rotateY(180deg)] text-center">
                    <Image
                      src={room.imageUrl}
                      alt={room.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm w-full h-full rounded-lg p-4 flex flex-col justify-between">
                      <h3 className="text-xl">{room.name}</h3>
                      <div className="space-y-2 text-sm text-steel-blue/80 mb-4">
                        <div className="flex items-start gap-1">
                          <Users size={16} /> {room.maxPeople} 人
                        </div>
                        <div className="flex items-center gap-1">
                          <Bed size={16} /> {room.bedInfo}
                        </div>
                        <div className="flex items-center gap-1">
                          <Maximize size={16} /> {room.areaInfo}
                        </div>
                      </div>
                      <div>
                        <p className="text-md pb-2">NT$ {room.price}/晚</p>
                        <Link href={`/rooms/${room._id}`} passHref>
                          <Button size="sm">立即訂房</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      <Image
        src="/logo/logo.webp"
        alt="decorative ice"
        width={80}
        height={80}
        className="mt-10"
      />
    </div>
  );
};

export default RoomShowcase;
