
'use client';
import React from 'react';
import { useRooms } from '@/lib/api';
import { Button } from '@/components/ui/button';

const RoomShowcase = () => {
  const { rooms, isLoading, isError } = useRooms();

  if (isError) return <p className="text-center text-red-500">⚠️ 房間資料載入失敗</p>;
  if (isLoading) return <p className="text-center">房間資料載入中...</p>;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-cover bg-center p-8" style={{backgroundImage: "url('/ice-background.jpg')"}}>
        <h2 className="text-4xl font-serif text-white text-center mb-12">冬眠客房</h2>
        {rooms.length === 0 ? (
            <p className="text-center text-white">目前沒有可顯示的房間。</p>
        ) : (
            <div className="flex gap-2 items-center justify-center w-full mx-auto">
                {/* 只顯示前5筆作為展示 */}
                {rooms.slice(0, 5).map((room: any, index: number) => (
                    <div key={room._id} className="group [perspective:1000px]" style={{marginTop: `${index * 20}px`}}>
                        <div className="relative w-60 h-80 transition-transform duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                            {/* Front Side */}
                            <div className="absolute w-full h-full bg-cover text-white text-xl flex items-end justify-center rounded-lg [backface-visibility:hidden]" style={{backgroundImage: `url(${room.imageUrl})`}}>
                                <h3 className='w-full text-center p-2 bg-black/50'>{room.name}</h3>
                            </div>

                            {/* Back Side */}
                            <div className="absolute w-full h-full bg-cover text-white rounded-lg [backface-visibility:hidden] [transform:rotateY(180deg)] text-center" style={{backgroundImage: `url(${room.imageUrl})`}}>
                                <div className="bg-black/60 backdrop-blur-sm w-full h-full rounded-lg p-4 flex flex-col justify-between">
                                    <h3 className="text-xl">{room.name}</h3>
                                    <ul className="text-sm text-left">
                                        <li><i className="bi bi-check2"></i> 人數: {room.maxCapacity}</li>
                                        <li><i className="bi bi-check2"></i> 坪數: 10</li>
                                        <li><i className="bi bi-check2"></i> 床型: 雙人床</li>
                                    </ul>
                                    <div>
                                        <p className="text-md">NT$ {room.price}/晚</p>
                                        <Button size="sm">立即訂房</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default RoomShowcase;
