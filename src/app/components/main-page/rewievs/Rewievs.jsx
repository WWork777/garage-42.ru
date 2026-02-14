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
    name: "Анастасия",
    text: "1. Вызывали эвакуатор- приехал быстро, загрузил, очень приятный человек! 2. Ремонтники, по своему профилю всё сделали чётко и не дорого, к сожалению пришлось перевозить машину в другой тех.центр, нужен был узкий специалист. 3. Огромное благодарность Дмитрию и всей команде, помыкались мы знатно с машиной. Дмитрий всегда на связи, помогал во всем, нашёл тех.центр, сам отвозил машину.",
    rating: 5,
  },
  {
    id: 2,
    name: "Pavel Velichko",
    text: "Возвращаясь с Алтая в Томск, сломалась машина. Чудом добрались до данного автосервиса. Дело было уже за полночь, но мастера всё равно вызвались помочь. Подсказали где можно поблизости перекусить, пока делают ремонт. Спустя час вернулись обратно в сервис. Мастер с радостью сообщил что все готово и можно продолжить путь домой. Всё рассказали, посоветовали что предстоит сделать в дальнейшем. Мы очень благодарны ребятам. Они нас очень выручили! Адекватно оценили работу. Очень приятно за оперативную помощь в столь позднее время, к тому же мы из другого города. Позитивный настрой, корректное общение! Желаем команде развития и побольше довольных клиентов! Рекомендуем!!!",
    rating: 5,
  },
  {
    id: 3,
    name: "Ольга",
    text: "Хочу написать слова Огромной Благодарности АЛЬБЕРТУ и Никите. В пятницу 22 декабря 23г я с семьёй ехала по трассе Новосибирск- Тайга трос левого тормоза авто пришёл в неисправность. Вечернее время!!!, мы в чужом городе. И эти Мужчины почти за 2часа сделали нам всё, что требовалось. СПАСИБО Вам за профессионализм, понимание и проявленную Человечность. Здоровья и всех благ вам и вашим семьям!!!!Отличное обслуживание и подход к клиентам! Рекомендуем.",
    rating: 5,
  },
  {
    id: 4,
    name: "Евгений Смоленцев",
    text: "Спасибо парням огромное, встал на выезде с кемерово, лопнул грм, приехал эвакуатор, забрали, привезли сам запчасти, быстро и качественно все сделали, персональная благодарность Алексею который делал мне машину",
    rating: 5,
  },
  {
    id: 5,
    name: "Алик",
    text: "23.06.24г. Делал развал-схождение. сделали в день обращения. Показали фото отчет рассказали",
    rating: 5,
  },
  {
    id: 5,
    name: "Сергей Пекарь",
    text: "Благодарность Альберту и его коллегам! В пути из Ангарска в Омск, за 20 км до Кемерово умерла АКПП. На эвакуаторе привезли в Кемерово, эвакуаторщик посоветовал GARAGE. Без очереди заменили коробку на контракт. К сожалению пришлось долго ждать из Н-ска ещё один датчик (CDEK подвела). Адекватные цены, без ненужных допов. После ремонта всё проверили - ехать ещё далеко. Советы по эксплуатации автомобиля бесплатно. Молодцы!",
    rating: 5,
  },
  {
    id: 5,
    name: "Саша Иванов",
    text: "Все норма, качественно выполняют работу, Леха Мусаев знает свою работу. Машины ремонтирует как семечки. Привозил свою машину на эвакуаторе автосервиса, забрал ее на следующий день, прошло пол года, проблемы с машиной больше не было",
    rating: 5,
  },
  {
    id: 5,
    name: "Андрей Сахаров",
    text: "2-х часовая очередь на шиномонтаж сказала все сама за себя. Переобули авто быстро, лишних вопросов не завали, сделали качественно.",
    rating: 5,
  },
  {
    id: 5,
    name: "Тимур Атимских",
    text: "Хороший сервис, делал свое авто тут не один раз, мастера грамотно подходят к своему делу. Решают быстро и без лишних слов. Рекомендую сервис. Заслуживают более чем 5 звезд",
    rating: 5,
  },
  {
    id: 5,
    name: "Давыд Х.",
    text: "Выражаю огромную благодарность Щукину Алексею и Дмитрию Морозову профиссионалы который еще поискать! Быстро четко надёжно. Советую все СТО ГАРАЖ.",
    rating: 5,
  },
];

function Rewiev({ name, text, rating }) {
  return (
    <div className={module.rewievs_card}>
      <div className={module.rewievs_card__name}>
        <img src="/images/avatar.webp" alt="" />
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
    <section className={module.rewievs_section} id="reviews">
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
