"use client";
import module from "./Services.module.scss";
import { useState } from "react";

// Модальное окно "Подробнее"
function MoreModal({ isOpen, onClose, service }) {
  if (!isOpen || !service) return null;

  return (
    <div className={module.services_modal_overlay} onClick={onClose}>
      <div
        className={module.services_modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={module.services_modal_image}>
          <img src={service.image} alt={service.title} />
        </div>

        <div className={module.services_modal_body}>
          <h3>{service.title}</h3>

          <div className={module.services_modal_info}>
            <div className={module.services_modal_info_item}>
              <span>Примерный срок</span>
              <p>{service.time}</p>
            </div>
            <div className={module.services_modal_info_item}>
              <span>Стоимость</span>
              <p>{service.price} ₽</p>
            </div>
            {/* <div className={module.services_modal_info_item}>
              <span>Гарантия</span>
              <p>{service.garanty}</p>
            </div> */}
          </div>

          <div className={module.services_modal_description}>
            <h4>Описание услуги</h4>
            <p>
              Профессиональный {service.title.toLowerCase()} на современном
              оборудовании. Работаем с автомобилями всех марок. Используем
              качественные запчасти и материалы. Предоставляем гарантию на все
              виды работ.
            </p>
          </div>

          <button
            className={module.services_modal_close_button}
            onClick={onClose}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}

// Модальное окно "Записаться"
function BookingModal({ isOpen, onClose, serviceTitle }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить отправку данных на сервер
    console.log({ name, phone, service: serviceTitle });
    setSubmitted(true);
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setSubmitted(false);
    onClose();
  };

  return (
    <div className={module.services_modal_overlay} onClick={handleClose}>
      <div
        className={`${module.services_modal_content} ${module.services_booking_modal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={module.services_modal_close} onClick={handleClose}>
          ×
        </button>

        <div className={module.services_modal_body}>
          {!submitted ? (
            <>
              <h3>Записаться на услугу</h3>
              <div className={module.services_service_name}>{serviceTitle}</div>

              <form
                onSubmit={handleSubmit}
                className={module.services_booking_form}
              >
                <div className={module.services_form_group}>
                  <label htmlFor="name">Ваше имя *</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Введите ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className={module.services_form_group}>
                  <label htmlFor="phone">Номер телефона *</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className={module.services_booking_actions}>
                  <button
                    type="submit"
                    className={module.services_booking_submit}
                  >
                    Отправить заявку
                  </button>
                  <button
                    type="button"
                    className={module.services_booking_cancel}
                    onClick={handleClose}
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className={module.services_success_message}>
              <div className={module.services_success_icon}>✓</div>
              <h4>Спасибо за заявку!</h4>
              <p>Мы свяжемся с вами в ближайшее время</p>
              <button onClick={handleClose}>Закрыть</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ServicesCard({
  title,
  time,
  image,
  price,
  garanty,
  onMoreClick,
  onBookingClick,
}) {
  return (
    <div className={module.services_card}>
      <img src={image} alt={title} />
      <div className={module.services_card__info}>
        <h3>{title}</h3>
        <div className={module.services_card__info__time_garanty}>
          <div className={module.services_card__info__time_garanty__time}>
            <span>Примерный срок</span>
            <p>{time}</p>
          </div>
        </div>
        <div className={module.services_card__info__price}>
          <span>Стоимость</span>
          <p>{price} ₽</p>
        </div>
      </div>
      <div className={module.services_card__buttons}>
        <button
          className={module.services_card__buttons__cta}
          onClick={() => onBookingClick({ title, time, image, price, garanty })}
        >
          Записаться
        </button>
        <button
          className={module.services_card__buttons__more}
          onClick={() => onMoreClick({ title, time, image, price, garanty })}
        >
          Подробнее
        </button>
      </div>
    </div>
  );
}

const allServices = [
  // Первые 6 - показываем сразу
  {
    title: "Сварочные работы",
    time: "от 1 часа",
    image: "/images/services/Сварочные работы.webp",
    price: "от 500",
    garanty: "6 мес",
  },
  {
    title: "Выхлопная система",
    time: "1-2 часа",
    image: "/images/services/Выхлопная система.webp",
    price: "от 2 500",
    garanty: "12 мес",
  },
  {
    title: "Автоэлектрика",
    time: "от 1 часа",
    image: "/images/services/Автоэлектрика.webp",
    price: "от 1 700",
    garanty: "6 мес",
  },
  {
    title: "Замена жидкостей",
    time: "30-60 мин",
    image: "/images/services/Замена жидкостей.webp",
    price: "от 250",
    garanty: "1 мес",
  },
  {
    title: "Тормозная система",
    time: "1-2 часа",
    image: "/images/services/Тормозная система.webp",
    price: "от 600",
    garanty: "12 мес",
  },
  {
    title: "Система охлаждения",
    time: "1-3 часа",
    image: "/images/services/Система охлаждения.webp",
    price: "от 1 500",
    garanty: "6 мес",
  },
  // Остальные услуги - скрыты до нажатия
  {
    title: "Ремонт подвески",
    time: "2-4 часа",
    image: "/images/services/Ремонт подвески.webp",
    price: "от 700",
    garanty: "6 мес",
  },
  {
    title: "Ремонт ДВС",
    time: "от 4 часов",
    image: "/images/services/Ремонт ДВС.webp",
    price: "от 1 000",
    garanty: "12 мес",
  },
  {
    title: "Доп. оборудование",
    time: "1-3 часа",
    image: "/images/services/Доп. оборудование.webp",
    price: "от 1 000",
    garanty: "6 мес",
  },
  {
    title: "Автосервис",
    time: "от 1 часа",
    image: "/images/services/Автосервис.webp",
    price: "от 2 000",
    garanty: "6 мес",
  },
  {
    title: "Ремонт трансмиссии",
    time: "2-5 часов",
    image: "/images/services/Ремонт трансмиссии.webp",
    price: "от 2 000",
    garanty: "12 мес",
  },
  {
    title: "Диагностика",
    time: "30-60 мин",
    image: "/images/services/Диагностика.webp",
    price: "от 800",
    garanty: "1 мес",
  },
  {
    title: "Рулевое управление",
    time: "1-3 часа",
    image: "/images/services/Рулевое управление.webp",
    price: "от 800",
    garanty: "6 мес",
  },
];

export default function Services() {
  const [showAll, setShowAll] = useState(false);
  const [moreModalOpen, setMoreModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Показываем первые 6 или все услуги
  const displayedServices = showAll ? allServices : allServices.slice(0, 6);

  const handleMoreClick = (service) => {
    setSelectedService(service);
    setMoreModalOpen(true);
  };

  const handleBookingClick = (service) => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  const closeMoreModal = () => {
    setMoreModalOpen(false);
    setSelectedService(null);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section className={module.services_section}>
      <div className={module.services_container__top}>
        <h2>НАШИ УСЛУГИ</h2>
        <div className={module.services_container__top__line}>
          <span className={module.services_container__top__line__span}>
            ///
          </span>
          <span>Услуги</span>
        </div>
      </div>

      <div className={module.services_container__grid}>
        {displayedServices.map((service, index) => (
          <ServicesCard
            key={index}
            {...service}
            onMoreClick={handleMoreClick}
            onBookingClick={handleBookingClick}
          />
        ))}
      </div>

      <button
        className={module.services_container__button}
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Скрыть" : "Посмотреть все услуги"}
      </button>

      {/* Модальные окна */}
      <MoreModal
        isOpen={moreModalOpen}
        onClose={closeMoreModal}
        service={selectedService}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={closeBookingModal}
        serviceTitle={selectedService?.title}
      />
    </section>
  );
}
