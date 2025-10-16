import { Filter } from "@/components/feature/Filter";
import RoomShowcase from "@/components/feature/RoomShowcase";
import AboutSection from "@/components/feature/AboutSection";
import NewsList from "@/components/feature/NewsList";
import CuisineSwiperPage from "@/components/feature/CuisineSwiperPage";
import Image from "next/image";

export default function Home() {
  return (
    <div className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll overflow-x-hidden ">
      <section className="snap-start relative h-screen">
        <Image
          src="/bg/bg-01.webp"
          alt="Hero Image"
          fill
          className="object-cover"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h4 className="font-bold text-white text-2xl drop-shadow-md font-serif mb-2">
            搜尋冬眠客房
          </h4>
          <Filter />
        </div>
      </section>

      {/* Section 2: Room Showcase */}
      <section className="snap-start relative md:h-screen w-screen flex items-center justify-center ">
        <RoomShowcase />
      </section>

      {/* Section 3: About */}
      <section className="snap-start relative h-screen w-screen flex items-center justify-center">
        <AboutSection />
      </section>

      {/* Section 4: News */}
      <section
        className="snap-start relative h-screen w-screen flex flex-col items-center justify-center text-white bg-gray-50"
        id="news"
      >
        <NewsList />
      </section>

      {/* Section 5: Cuisine */}
      <section
        className="snap-start relative h-screen w-screen flex items-center justify-center"
        id="food"
      >
        <CuisineSwiperPage />
      </section>
    </div>
  );
}
