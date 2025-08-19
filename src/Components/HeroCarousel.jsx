import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import img7 from "../assets/img7.png";

const HeroCarousel = () => {
  const slides = [img1, img2, img3, img4, img5, img6, img7];

  return (
    <section className="w-full py-10 bg-white text-center">

      {/* Carousel Section */}
      <div className="relative w-full flex justify-center">
        <Swiper
          modules={[EffectCoverflow, Pagination, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          className="w-full max-w-6xl"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide
              key={idx}
              className="flex justify-center items-center"
              style={{ width: "450px" }}
            >
              <img
                src={slide}
                alt={`slide-${idx}`}
                className="rounded-xl shadow-2xl 
               w-[280px] h-[40vh]    /* Mobile */
               sm:w-[350px] sm:h-[50vh]  /* Small screens */
               md:w-[450px] md:h-[65vh]  /* Desktop */
               object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
       <div className="mb-12 mt-10">
        <p className="text-lg md:text-xl mb-6 text-gray-700">
          Shop • Rent • Explore the latest trends
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition">
            Shop Now
          </button>
          <button className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition">
            Explore
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
