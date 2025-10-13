
'use client';
import React from 'react';
import { useCuisine } from '@/lib/api';

const CuisineList = () => {
  const { cuisine, isLoading, isError } = useCuisine();

  if (isError) return <p className="text-center text-red-500">⚠️ 美食資料載入失敗</p>;
  if (isLoading) return <p className="text-center">美食資料載入中...</p>;

  return (
    <div className="py-16">
        <h2 className="text-4xl font-serif text-center mb-12">特色美食</h2>
        {cuisine.length === 0 ? (
            <p className="text-center">ㄏ。</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cuisine.slice(0, 3).map((item: any) => (
                    <div key={item._id} className="border rounded-lg overflow-hidden shadow-lg">
                        {/* API沒有美食圖片，暫時使用房間圖片 */}
                        <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover"/>
                        <div className="p-6 bg-white">
                            {/* API沒有美食名稱，暫時使用房間名稱 */}
                            <h3 className="text-2xl font-serif mb-2 text-gray-800">{item.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default CuisineList;
