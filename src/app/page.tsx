import BookingForm from "@/components/feature/BookingForm";
import RoomShowcase from "@/components/feature/RoomShowcase";
import NewsList from "@/components/feature/NewsList";
import AboutSection from "@/components/feature/AboutSection";
import CuisineShowcase from "@/components/feature/CuisineShowcase";

export default function Home() {
  return (
    <div className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll overflow-x-hidden">
      {/* Section 1: Hero Video */}
      <section className="snap-start relative h-screen w-screen">
        <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
          <source src="/video/ice.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30"></div>
        <BookingForm />
      </section>

      {/* Section 2: Room Showcase */}
      <section className="snap-start relative h-screen w-screen flex items-center justify-center bg-primary/10">
        <RoomShowcase />
      </section>

      {/* Section 3: About */}
      <section className="snap-start relative h-screen w-screen flex items-center justify-center">
         <AboutSection />
      </section>

       {/* Section 4: News */}
      <section className="snap-start relative min-h-screen w-screen flex flex-col items-center justify-center py-24 bg-gray-50">
        <NewsList />
      </section>

      {/* Section 5: Cuisine */}
      <section className="snap-start relative h-screen w-screen flex items-center justify-center">
         <CuisineShowcase />
      </section>
    </div>
  );
}