"use client";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Users, Bed, Maximize } from "lucide-react";
import type { Room } from "@/lib/types";
import { useRooms } from "@/lib/api";
import Image from "next/image";

const RoomList = ({
  smCol,
  mdCol,
  lgCol,
}: {
  smCol: number;
  mdCol: number;
  lgCol: number;
}) => {
  const { rooms, isLoading } = useRooms();
  const searchParams = useSearchParams();

  const filteredRooms = useMemo(() => {
    if (!rooms) return [];

    const people = searchParams.get("people");

    return rooms.filter((room: Room) => {
      if (people && room.maxPeople < parseInt(people, 10)) {
        return false;
      }
      return true;
    });
  }, [rooms, searchParams]);

  return (
    <>
      {isLoading ? (
        <p className="text-center py-40">房間資料載入中...</p>
      ) : (
        <div
          className={`grid sm:grid-cols-${smCol} md:grid-cols-${mdCol} lg:grid-cols-${lgCol} gap-8`}
        >
          {filteredRooms.map((room: Room) => (
            <Link
              href={`/rooms/${room._id}`}
              key={room._id}
              className="group bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="relative w-full h-60">
                <Image
                  src={room.imageUrl}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-2">{room.name}</h3>
                <div className="flex gap-4 text-sm text-steel-blue/80 mb-4">
                  <div className="flex-col items-center gap-1">
                    <Users size={16} /> {room.maxPeople} 人
                  </div>
                  <div className="flex-col items-center gap-1">
                    <Bed size={16} /> {room.bedInfo}
                  </div>
                  <div className="flex-col items-center gap-1">
                    <Maximize size={16} /> {room.areaInfo}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2 h-12">
                  {room.description}
                </p>
                <div className="flex justify-end items-center">
                  <p className="text-lg font-bold text-ice-blue">
                    NT$ {room.price.toLocaleString()} / 晚
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default RoomList;
