// src/app/components/main-page/services/Services.jsx
"use client";
import module from "./Services.module.scss";
import { useState, useRef } from "react";
import Link from "next/link";
// 🔥 ИСПРАВЛЕНО: относительный путь вместо @/app/...
import { getAllServices, transliterateToSlug } from "../../../data/services.data";

// Модальное окно "Подробнее"
function MoreModal({ isOpen, onClose, service }) {
  if (!isOpen || !service) return null;

  return (
    <div
      className={module.services_modal_overlay}
      onClick={onClose}
      id="services"
    >
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
              <p>
                {service.price && service.price.includes("/")
                  ? service.price
                  : `${service.price} ₽`}
              </p>
            </div>
          </div>

          <div className={module.services_modal_description}>
            <h4>Описание услуги</h4>
            <p>{service.fullDescription}</p>
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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    agreement: false,
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: "",
  });

  if (!isOpen) return null;

  // Маска для телефона
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 0) {
      if (value.length === 1) {
        value = `+7 (${value}`;
      } else if (value.length <= 4) {
        value = `+7 (${value.slice(1, 4)}`;
      } else if (value.length <= 7) {
        value = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}`;
      } else if (value.length <= 9) {
        value = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}`;
      } else {
        value = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9, 11)}`;
      }
    }

    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handlePhoneKeyDown = (e) => {
    if (
      e.key === "Backspace" || e.key === "Delete" || e.key === "Tab" ||
      e.key === "Escape" || e.key === "Enter" || e.key === "ArrowLeft" ||
      e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown" ||
      e.key === "Home" || e.key === "End"
    ) return;
    if (!/^\d$/.test(e.key) && e.key !== "+") e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreement) {
      setStatus({ loading: false, success: false, error: true, message: "Необходимо согласие с политикой обработки данных" });
      return;
    }
    if (!formData.name || !formData.phone) {
      setStatus({ loading: false, success: false, error: true, message: "Пожалуйста, заполните все обязательные поля" });
      return;
    }

    const cleanPhone = formData.phone.replace(/[^\d+]/g, "");
    setStatus({ loading: true, success: false, error: false, message: "" });

    try {
      const response = await fetch("/api/send-to-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: serviceTitle,
          name: formData.name,
          phone: cleanPhone,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Ошибка при отправке");

      // 🔥 Яндекс.Метрика
      if (typeof window !== "undefined" && window.ym) {
        window.ym(106779809, "reachGoal", "services_form");
      }

      setStatus({
        loading: false,
        success: true,
        error: false,
        message: "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
      });
      setFormData({ name: "", phone: "", agreement: false });
    } catch (error) {
      console.error("Ошибка отправки:", error);
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: "Произошла ошибка при отправке. Попробуйте позже.",
      });
    }
  };

  const handleClose = () => {
    setFormData({ name: "", phone: "", agreement: false });
    setStatus({ loading: false, success: false, error: false, message: "" });
    onClose();
  };

  return (
    <div className={module.services_modal_overlay} onClick={handleClose}>
      <div
        className={`${module.services_modal_content} ${module.services_booking_modal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={module.services_modal_close} onClick={handleClose}>×</button>
        <div className={module.services_modal_body}>
          {!status.success ? (
            <>
              <h3>Записаться на услугу</h3>
              <div className={module.services_service_name}>{serviceTitle}</div>
              <form onSubmit={handleSubmit} className={module.services_booking_form}>
                <div className={module.services_form_group}>
                  <label htmlFor="name">Ваше имя *</label>
                  <input type="text" id="name" name="name" placeholder="Введите ваше имя" value={formData.name} onChange={handleChange} disabled={status.loading} required />
                </div>
                <div className={module.services_form_group}>
                  <label htmlFor="phone">Номер телефона *</label>
                  <input type="tel" id="phone" name="phone" placeholder="+7 (___) ___-__-__" value={formData.phone} onChange={handlePhoneChange} onKeyDown={handlePhoneKeyDown} disabled={status.loading} maxLength="18" required />
                </div>
                <div className={module.services_checkbox_group}>
                  <label className={module.services_checkbox_label}>
                    <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleChange} disabled={status.loading} required />
                    <span>Я соглашаюсь на обработку персональных данных и с <a href="/privacy-policy.pdf" target="_blank">политикой конфиденциальности</a></span>
                  </label>
                </div>
                {status.message && <div className={`${module.services_message} ${status.error ? module.error : ""}`}>{status.message}</div>}
                <div className={module.services_booking_actions}>
                  <button type="submit" className={module.services_booking_submit} disabled={status.loading}>{status.loading ? "Отправка..." : "Отправить заявку"}</button>
                  <button type="button" className={module.services_booking_cancel} onClick={handleClose} disabled={status.loading}>Отмена</button>
                </div>
              </form>
            </>
          ) : (
            <div className={module.services_success_message}>
              <div className={module.services_success_icon}>✓</div>
              <h4>Спасибо за заявку!</h4>
              <p>{status.message}</p>
              <button onClick={handleClose}>Закрыть</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 🔥 Карточка услуги
function ServicesCard({ title, time, image, price, garanty, fullDescription, slug, onBookingClick }) {
  // const slug = transliterateToSlug(title);

  return (
<div className={`${module.services_card} ${slug === 'evakuaciya-avtomobilej' ? module.services_card__emergency : ''}`}>      <img src={image} alt={title} />
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
          <p>{typeof price === "string" && price.includes("/") ? price : `${price} ₽`}</p>
        </div>
      </div>
      <div className={module.services_card__buttons}>
        {/* <button className={module.services_card__buttons__cta} onClick={() => onBookingClick({ title, time, image, price, garanty, fullDescription })}>
          Позвонить
        </button> */}
        
          <Link 
                      href="tel:+79235670063" 
                      className={module.services_card__buttons__cta}
                       onClick={() => {
    // 🔥 Трекинг Яндекс.Метрики
    if (typeof window !== "undefined" && window.ym) {
      window.ym(106779809, "reachGoal", "telephone");
    }
    // 📞 Вызов набора номера
    window.location.href = "tel:+79235670063";
  }}
                    >
                     Позвонить
                    </Link>
        
        {/* 🔥 Используем готовый slug из данных */}
        <Link  href={`/${slug}`} className={`${module.services_card__buttons__more} ${module.link_more}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default function Services() {
  const [showAll, setShowAll] = useState(false);
  const [moreModalOpen, setMoreModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const servicesSectionRef = useRef(null);

  // 🔥 Импорт данных из services.data.js
  const allServices = getAllServices();
  const displayedServices = showAll ? allServices : allServices.slice(0, 6);

  const toggleServices = () => {
    if (showAll) {
      setShowAll(false);
      servicesSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setShowAll(true);
    }
  };

  const handleMoreClick = (service) => { setSelectedService(service); setMoreModalOpen(true); };
  const handleBookingClick = (service) => { setSelectedService(service); setBookingModalOpen(true); };
  const closeMoreModal = () => { setMoreModalOpen(false); setSelectedService(null); };
  const closeBookingModal = () => { setBookingModalOpen(false); setSelectedService(null); };

  return (
    <section className={module.services_section} id="services" ref={servicesSectionRef}>
      <div className={module.services_container__top}>
        <h2>НАШИ УСЛУГИ</h2>
        <div className={module.services_container__top__line}>
          <span className={module.services_container__top__line__span}>///</span>
          <span>Услуги</span>
        </div>
      </div>

      <div className={module.services_container__grid}>
        {displayedServices.map((service, index) => (
          <ServicesCard key={index} {...service} onMoreClick={handleMoreClick} onBookingClick={handleBookingClick} />
        ))}
      </div>

      <button className={module.services_container__button} onClick={toggleServices}>
        {showAll ? "Скрыть" : "Посмотреть все услуги"}
      </button>

      <MoreModal isOpen={moreModalOpen} onClose={closeMoreModal} service={selectedService} />
      <BookingModal isOpen={bookingModalOpen} onClose={closeBookingModal} serviceTitle={selectedService?.title} />
    </section>
  );
}