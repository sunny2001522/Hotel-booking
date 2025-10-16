"use client";
import React from "react";

import { Filter } from "@/components/feature/Filter";
import RoomList from "@/components/feature/RoomList";
export const dynamic = "force-dynamic";

const RoomsPage = () => {
  return (
    <div
      className="bg-primary/10 pt-40 bg-cover bg-center p-8 bg-fixed"
      style={{ backgroundImage: "url('/bg/bg-07.webp')" }}
    >
      <h2 className="text-4xl font-serif text-center mb-12 text-white">
        冬眠客房
      </h2>
      <Filter />
      <section className="max-w-screen-xl mx-auto px-6 py-10 ">
        <RoomList smCol={1} mdCol={3} lgCol={5} />
      </section>
    </div>
  );
};

export default RoomsPage;
