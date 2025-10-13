
'use client';
import React from 'react';
import { useRooms } from '@/lib/api';
import { Button } from '@/components/ui/button';

const RoomList = () => {
  const { rooms, isLoading, isError } = useRooms();

  if (isError) return <p className="text-center text-red-500">⚠️ 房間資料載入失敗</p>;
  if (isLoading) return <p className="text-center">房間資料載入中...</p>;

  return (
    <div className="py-16">
        <h2 className="text-4xl font-serif text-center mb-12">我們的房間</h2>
        {rooms.length === 0 ? (
            <p className="text-center">目前沒有可顯示的房間。</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rooms.slice(0, 3).map((room: any) => (
                    <div key={room._id} className="group border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="relative">
                            <img src={room.imageUrl} alt={room.name} className="w-full h-64 object-cover"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                        <div className="p-6 bg-white">
                            <h3 className="text-2xl font-serif mb-2 text-gray-800">{room.name}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-bold text-primary">NT$ {room.price.toLocaleString()}</p>
                                <Button>查看詳情</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default RoomList;
