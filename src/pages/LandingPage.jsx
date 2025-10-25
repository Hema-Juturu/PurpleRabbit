import HeroCarousel from "../Components/HeroCarousel";
import Categories from "../Components/Categories";
import Features from "../Components/Features";
import Trending from "../Components/Trending";
const LandingPage = () => {
  return (
    <div>
      <section className="mt-100 w-full md:h-screen">
        <HeroCarousel />
      </section>
      <section className="md:py-16 px-8 bg-white/30 backdrop-blur-md">
        <h2 className=" text-gray-50 text-2xl font-bold mb-8 text-center">
          Shop by Category
        </h2>
        <Categories />
      </section>

      <section>
        <Trending />
      </section>
      <section className="py-16 px-8 bg-gray-50">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Us?</h2>
        <Features />
      </section>
    </div>
  );
};

export default LandingPage;
