import React, { useRef } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
import "swiper/css/navigation";
import Button from "./Button";

const breakpoints = {
  slidesPerView: 1,
  spaceBetween: 0,
  1728: {
    slidesPerView: 5,
  },
  1535: {
    slidesPerView: 4,
  },
  1150: {
    slidesPerView: 3,
  },
  800: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
};

const Slider = ({ items }) => {
  const swiperRef = useRef();

  return (
    <div className="relative m-5 flex w-3/4 items-center justify-center sm:w-full">
      <Button
        className="sm:hidden"
        onClick={() => swiperRef.current.slidePrev()}
      >
        {"<"}
      </Button>
      <Swiper
        className="h-full w-full"
        breakpoints={breakpoints}
        modules={[Navigation]}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {items.map((item) => {
          return (
            <SwiperSlide
              key={item.id}
              className="flex items-center justify-center overflow-hidden object-cover"
            >
              <Card data={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Button
        className="sm:hidden"
        onClick={() => swiperRef.current.slideNext()}
      >
        {">"}
      </Button>
    </div>
  );
};

export default Slider;
