
'use client';
import React from 'react';
import { useCuisine } from '@/lib/api';

const CuisineShowcase = () => {
  const { cuisine, isLoading, isError } = useCuisine();

  if (isError) return <p className="text-center text-red-500">⚠️ 美食資料載入失敗</p>;
  if (isLoading) return <p className="text-center text-white">美食資料載入中...</p>;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-cover bg-center p-8 bg-gray-900">
        <h2 className="text-4xl font-serif text-white text-center mb-12">冰霓餐廳</h2>
        {cuisine.length === 0 ? (
            <p className="text-center text-white">目前沒有可顯示的特色美食。</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cuisine.map((item: any) => (
                    <div key={item._id} className="border border-gray-700 bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-primary/50 transition-shadow duration-300">
                        <img src={item.image_url} alt={item.name} className="w-full h-56 object-cover"/>
                        <div className="p-4">
                            <h3 className="text-xl font-serif mb-2 text-white">{item.name}</h3>
                            <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default CuisineShowcase;
