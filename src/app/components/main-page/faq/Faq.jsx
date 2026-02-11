"use client";
import module from "./Faq.module.scss";
import { useState, useRef } from "react";
const faq = [
  {
    title: "Как записаться на обслуживание?",
    text: "Вы можете оставить заявку на сайте или позвонить нам по телефону. Мы уточним детали, подберём удобное время и подтвердим запись.",
  },
  {
    title: "Сколько времени занимает диагностика?",
    text: "Комплексная диагностика обычно занимает от 30 до 60 минут. Точное время зависит от марки автомобиля и характера неисправности.",
  },
  {
    title: "Согласовываете ли вы стоимость перед ремонтом?",
    text: "Да, мы обязательно согласовываем перечень работ и их стоимость до начала ремонта. Никаких скрытых платежей и неожиданных доплат.",
  },
  {
    title: "Работаете ли вы с автомобилями всех марок?",
    text: "Мы обслуживаем большинство популярных марок автомобилей — как европейских, так и азиатских и отечественных производителей.",
  },
  {
    title: "Предоставляете ли вы гарантию на работы?",
    text: "Да, на все выполненные работы и установленные запчасти предоставляется гарантия. Срок гарантии зависит от вида ремонта.",
  },
  {
    title: "Можно ли привезти свои запчасти?",
    text: "Да, вы можете предоставить свои запчасти. Однако в этом случае гарантия распространяется только на выполненные работы.",
  },
  {
    title: "Делаете ли вы срочный ремонт?",
    text: "При наличии свободных мастеров и необходимых запчастей мы можем выполнить срочный ремонт в день обращения.",
  },
  {
    title: "Как узнать стоимость ремонта?",
    text: "Точную стоимость можно определить после диагностики. Предварительную цену мы можем озвучить по телефону после описания проблемы.",
  },
  {
    title: "Есть ли у вас зона ожидания?",
    text: "Да, у нас оборудована комфортная зона ожидания с Wi-Fi и напитками, где вы можете дождаться окончания работ.",
  },
  {
    title: "Работаете ли вы с корпоративными клиентами?",
    text: "Да, мы обслуживаем корпоративные автопарки и предлагаем индивидуальные условия сотрудничества.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <section className={module.faq_section}>
      <div className={module.faq_container__top}>
        <h2>ОТВЕТЫ НА ЧАСТЫЕ ВОПРОСЫ</h2>
        <div className={module.faq_container__top__line}>
          <span className={module.faq_container__top__line__span}>///</span>
          <span>Faq</span>
        </div>
      </div>
      <div className={module.faq_container__cards}>
        {faq.map((item, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              className={`${module.faq_container__card} ${
                isOpen ? module.active : ""
              }`}
              key={index}
            >
              <div
                className={module.faq_container__card__title}
                onClick={() => toggle(index)}
              >
                <h3>{item.title}</h3>
                <img src="/svg/faq/arrow.svg" alt="" />
              </div>

              <div
                className={module.faq_container__card__text}
                style={{
                  maxHeight: isOpen ? "200px" : "0px",
                }}
              >
                <p>{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
