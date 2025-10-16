import React from "react";

const AboutSection = () => {
  return (
    <div
      className="w-full h-full flex items-center justify-center bg-cover bg-center p-8"
      style={{ backgroundImage: "url('/bg/bg-04.webp')" }}
    >
      <div className="bg-white/30 w-[90%] md:w-1/2 lg:w-1/3 mx-auto p-8 backdrop-blur-lg rounded-lg">
        <h2 className="text-center text-white text-3xl pb-6 font-serif">
          關於冰穹境
        </h2>
        <p className="text-white">
          冰穹境是台灣首座以極光為主題的飯店，提供獨特的住宿體驗，讓您在星空下入眠，享受冰雪世界的美麗。
          我們的設施包括穹頂劇院、星空餐廳和冰雪SPA，讓您在這裡度過難忘的假期。
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
