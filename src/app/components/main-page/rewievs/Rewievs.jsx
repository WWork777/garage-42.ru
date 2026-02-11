"use client";
import module from "./Rewievs.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useState, useEffect } from "react";

import "swiper/css";
import "swiper/css/navigation";

const rewievs = [
  {
    id: 1,
    name: "Иван Иванов",
    text: "Отличный сервис! Быстро и качественно отремонтировали мой автомобиль. Рекомендую всем!",
    rating: 5,
  },
  {
    id: 2,
    name: "Мария Петрова",
    text: "Очень доволен обслуживанием. Мастера профессионалы, а цены адекватные. Вернусь сюда снова!",
    rating: 4,
  },
  {
    id: 3,
    name: "Алексей Смирнов",
    text: "Хороший сервис, но ожидал более быстрой работы. В целом, результатом доволен.",
    rating: 4,
  },
  {
    id: 4,
    name: "Алексей Смирнов",
    text: "Хороший сервис, но ожидал более быстрой работы. В целом, результатом доволен.",
    rating: 4,
  },
];

function Rewiev({ name, text, rating }) {
  return (
    <div className={module.rewievs_card}>
      <div className={module.rewievs_card__name}>
        <img src="/svg/rewievs/user.svg" alt="" />
        <div className={module.rewievs_card__name__text}>
          <span>{name}</span>
          <div className={module.rewievs_card__name__rating}>
            {[...Array(5)].map((_, i) => (
              <img key={i} src="/svg/rewievs/star.svg" alt="star" />
            ))}
          </div>
        </div>
      </div>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default function Rewievs() {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;

      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();

      swiperInstance.on("slideChange", () => {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
      });
    }
  }, [swiperInstance]);
  return (
    <section className={module.rewievs_section}>
      <div className={module.rewievs_container__top}>
        <h2>О НАС ГОВОРЯТ</h2>
        <div className={module.rewievs_container__top__yandex}>
          <img src="/svg/rewievs/yandex.svg" alt="" />
          <span>5.0</span>
          <div className={module.rewievs_container__top__star}>
            <span>Отзывы в Яндекс</span>
            <div className={module.rewievs_container__top__star__svg}>
              <img src="/svg/rewievs/star.svg" alt="" />
              <img src="/svg/rewievs/star.svg" alt="" />
              <img src="/svg/rewievs/star.svg" alt="" />
              <img src="/svg/rewievs/star.svg" alt="" />
              <img src="/svg/rewievs/star.svg" alt="" />
            </div>
          </div>
        </div>
        <div className={module.rewievs_container__top__yandex}>
          <img src="/svg/rewievs/2gis.svg" alt="" />
          <span>4.8</span>
          <div className={module.rewievs_container__top__star}>
            <span>Отзывы в 2GIS</span>
            <div className={module.rewievs_container__top__star__svg}>
              <img src="/svg/rewievs/star.svg" alt="" />
              <img src="/svg/rewievs/star.svg" alt="" />
              <img src="/svg/rewievs/star.svg" alt="" />
              <img src="/svg/rewievs/star.svg" alt="" />
              <img src="/svg/rewievs/star.svg" alt="" />
            </div>
          </div>
        </div>
        <div className={module.rewievs_container__top__line}>
          <span className={module.rewievs_container__top__line__span}>///</span>
          <span>Отзывы</span>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={3}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSwiper={setSwiperInstance}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
        className={module.rewievs_swiper}
      >
        {rewievs.map((rewiev) => (
          <SwiperSlide key={rewiev.id}>
            <Rewiev {...rewiev} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={module.rewievs_container__bottom}>
        <div className={module.rewievs_container__bottom__arrow}>
          <img
            ref={prevRef}
            src="/svg/rewievs/arrow.svg"
            alt="prev"
            className={isBeginning ? module.inactive : module.active}
          />
          <img
            ref={nextRef}
            src="/svg/rewievs/arrow.svg"
            alt="next"
            className={isEnd ? module.inactive : module.active}
          />
        </div>
        <button className={module.rewievs_container__bottom__button}>
          Оставить отзыв
        </button>
      </div>
    </section>
  );
}
