import React, { useRef } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
import "swiper/css/navigation";
import Button from "./Button";

const breakpoints = {
  slidesPerView: 1,
  spaceBetween: 0,
  1850: {
    slidesPerView: 5,
  },
  1520: {
    slidesPerView: 4,
  },
  1185: {
    slidesPerView: 3,
  },
  1030: {
    slidesPerView: 2,
  },
};

const Slider = ({ items }) => {
  const swiperRef = useRef();

  return (
    <div className="relative flex w-3/4 items-center justify-center">
      <Button onClick={() => swiperRef.current.slidePrev()}>{"<"}</Button>
      <Swiper
        className="h-96 w-full"
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
              className="flex items-center justify-center overflow-hidden object-cover p-5"
            >
              <Card data={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Button onClick={() => swiperRef.current.slideNext()}>{">"}</Button>
    </div>
  );
};

export default Slider;
