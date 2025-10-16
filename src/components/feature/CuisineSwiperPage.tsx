"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const menuList = [
  { title: "", description: "冰霓餐廳", diningTime: "午餐時段供應" },
  {
    title: "白玫瑰冰晶閃光晶球",
    description: "白玫瑰凍 × 晶化香梨泡沫",
  },
  {
    title: "北極之珠佐杏仁乳雲霧",
    description: "冰晶葡萄球 × 分子杏仁奶霧",
  },
  {
    title: "寒冬水晶球佐藍莓魚子醬",
    description: "液態氮水晶凍 × 藍莓球狀醬",
  },
  {
    title: "萊姆冰磚佐薄荷迷霧",
    description: "萊姆凝膠晶 × 分子薄荷泡沫",
  },
  {
    title: "薰衣草晶粒佐香草雪花",
    description: "薰衣草冰晶塊 × 香草泡雪",
  },
  {
    title: "荔枝茉莉冰穹",
    description: "荔枝水晶凝凍 × 茉莉冷萃膠球",
  },
];

const CuisineSwiperPage = () => {
  return (
    <div
      className="h-screen w-screen flex relative bg-cover bg-center items-end justify-end p-3 md:p-20 text-white font-serif"
      style={{ backgroundImage: "url('/bg/bg-07.webp')" }}
    >
      <div className="overflow-hidden max-md:hidden relative flex justify-center items-center w-full h-full">
        <div className="bg-black w-full h-full text-8xl absolute inset-0 flex justify-center items-center text-white/80 mix-blend-multiply">
          <h2 className="mx-auto font-serif">
            Dining
            <br />
            in
            <br />
            iCEVERSE
          </h2>
        </div>
      </div>
      <div className="w-2/3 h-1/2 md:w-full md:h-full">
        <Swiper
          direction={"vertical"}
          loop={true}
          mousewheel={true}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{
            el: ".food-swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
              const menuItem = menuList[index % menuList.length];
              return `
                            <span class="${className} !h-auto !bg-transparent text-left !w-full p-2 transition-colors duration-300 rounded-md">
                                <strong class="text-steel-blue text-lg">${menuItem.title}</strong>
                                <p class="text-sm text-steel-blue/60">${menuItem.description}</p>
                            </span>
                        `;
            },
          }}
          modules={[Mousewheel, Pagination, Autoplay]}
          className="h-full"
        >
          {[
            "/video/res3-1.webm",
            "/video/food1.webm",
            "/video/food2.webm",
            "/video/food3.webm",
            "/video/food4.webm",
            "/video/food5.webm",
          ].map((src, i) => (
            <SwiperSlide key={i}>
              <video autoPlay muted loop className="object-cover w-full h-full">
                <source src={src} type="video/webm" />
              </video>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="food-swiper-pagination absolute top-18 !md:top-1/2 !left-2 md:!left-1/2 md:-translate-x-1/2  !md:-translate-y-1/2 z-20 bg-white/50 backdrop-blur-md shadow-lg rounded-lg !w-[280px] p-6 space-y-2"></div>
      </div>
    </div>
  );
};

export default CuisineSwiperPage;
