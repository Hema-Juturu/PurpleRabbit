import HeroCarousel from "../Components/HeroCarousel";
import Categories from "../Components/Categories";
import Features from "../Components/Features";
import Trending from "../Components/Trending";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const LandingPage = () => {
  const role = localStorage.getItem("role") || "user";
  useEffect(() => {}, []);
  return (
    <div className="py-5">
      {role == "admin" ? (
        <Link to="/addProduct" className="bg-white">
          <div className="mt-2 flex justify-center">
            <button className="bg-purple-400 p-2 rounded-md text-white m-2 ">
              add new products
            </button>
          </div>
        </Link>
      ) : null}

      {/* <AddNewProductForm /> */}
      <section className="w-full md:h-screen">
        <HeroCarousel />
      </section>
      <section className="py-16 px-8 bg-white/30 backdrop-blur-md">
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
