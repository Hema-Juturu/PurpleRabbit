import HeroCarousel from "../Components/HeroCarousel";
import Categories from "../Components/Categories";
import Features from "../Components/Features";
import Trending from "../Components/Trending";
const LandingPage = () => {
  return (
    <div>
      <section className="relative w-full md:h-screen">
        <HeroCarousel />
      </section>
      <section className="md:py-16 px-8">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Shop by Category
        </h2>
        <Categories />
      </section>

      <section className="py-16 px-8 bg-gray-50">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Us?</h2>
        <Features />
      </section>

      <section>
        <Trending />
      </section>
    </div>
  );
};

export default LandingPage;
