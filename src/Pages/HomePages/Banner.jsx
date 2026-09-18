import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "motion/react";
import { Link } from "react-router";

import "swiper/css";
import "swiper/css/pagination";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const Banner = () => {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      title: "Delicious Food For Everyone",
      description:
        "Discover fresh and delicious foods prepared with love.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      title: "Taste Something Special",
      description:
        "Explore our collection of delicious meals and find your favorite.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      title: "Fresh Food, Happy Life",
      description:
        "Enjoy tasty and healthy food made from fresh ingredients.",
    },
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      loop={true}
      className="h-[600px] "
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="h-full bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center text-white px-5">
              <div className="max-w-4xl w-full text-center">



                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                  }}
                  className="text-xl md:text-2xl mb-7"
                >
                  {slide.title}
                </motion.h1>
                                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                  }}
                  className="text-4xl md:text-6xl mb-5"
                >
                  {slide.description}
                </motion.p>

                {/* Button */}
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.9,
                  }}
                >
                  <Link
                    to="/allFoods"
                    className="hover:bg-white hover:text-orange-400 btn border-none text-xl p-8 bg-orange-400 text-white rounded-full"
                  >
                     Explore All Foods <FaArrowRightLong size={24}  />
                  </Link>
                </motion.div>

              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;