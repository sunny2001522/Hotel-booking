"use client";
import React from "react";
import { useNews } from "@/lib/api";
import { News } from "@/lib/types";

const NewsList = () => {
  const { news, isLoading, isError } = useNews();

  if (isError)
    return <p className="text-center text-red-500">⚠️ 最新消息載入失敗</p>;
  if (isLoading) return <p className="text-center">最新消息載入中...</p>;

  return (
    <div
      className="py-16 bg-cover bg-center p-8 w-full h-full max-sm:pt-20 bg-fixed"
      style={{ backgroundImage: "url('/bg/bg-03.webp')" }}
    >
      <h2 className="text-4xl font-serif text-center mb-12">最新消息</h2>
      {news.length === 0 ? (
        <p className="text-center">目前沒有最新消息。</p>
      ) : (
        <div className="space-y-8 max-w-3xl mx-auto">
          {news.slice(0, 3).map((item: News) => (
            <div
              key={item._id}
              className="p-6 border rounded-lg shadow-md bg-white/30 backdrop-blur-2xl hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-2xl font-serif mb-2 ">{item.title}</h3>
              <p className="">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;
