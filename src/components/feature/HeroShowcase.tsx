
import React from 'react';

const HeroShowcase = () => {
  return (
    <section className="relative h-screen bg-cover bg-center text-white" style={{ backgroundImage: "url('/hero-background.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-5xl font-bold mb-4">探索 Iceverse 的奇蹟</h1>
        <p className="text-xl max-w-2xl">從我們的特色美食到壯觀的冰穹劇院，準備好迎接一場無與倫比的住宿體驗。</p>
      </div>
    </section>
  );
};

export default HeroShowcase;
