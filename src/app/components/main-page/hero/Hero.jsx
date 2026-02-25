"use client";

import { useState } from "react";
import module from "./Hero.module.scss";

export default function Hero() {
  const [formData, setFormData] = useState({
    service: "",
    car: "",
    phone: "",
    agreement: false,
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Маска для телефона
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Удаляем все нецифровые символы

    // Применяем маску +7 (___) ___-__-__
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

    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreement) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: "Необходимо согласие с политикой обработки данных",
      });
      return;
    }

    if (!formData.service || !formData.car || !formData.phone) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: "Пожалуйста, заполните все обязательные поля",
      });
      return;
    }

    // Очищаем телефон от скобок и тире для отправки
    const cleanPhone = formData.phone.replace(/[^\d+]/g, "");

    setStatus({ loading: true, success: false, error: false, message: "" });

    try {
      const response = await fetch("/api/send-to-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone: cleanPhone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при отправке");
      }

      setStatus({
        loading: false,
        success: true,
        error: false,
        message:
          "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
      });

      // Очищаем форму
      setFormData({
        service: "",
        car: "",
        phone: "",
        agreement: false,
      });

      // Сбрасываем статус успеха через 5 секунд
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false, message: "" }));
      }, 5000);
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: "Произошла ошибка при отправке. Попробуйте позже.",
      });
    }
  };

  // Обработчик клавиш для телефона
  const handlePhoneKeyDown = (e) => {
    // Разрешаем Backspace, Delete, Tab, Escape, Enter, стрелки
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Tab" ||
      e.key === "Escape" ||
      e.key === "Enter" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "Home" ||
      e.key === "End"
    ) {
      return;
    }

    // Разрешаем только цифры
    if (!/^\d$/.test(e.key) && e.key !== "+") {
      e.preventDefault();
    }
  };

  return (
    <section className={module.hero}>
      <div className={module.overlay} />

      <div className={module.content}>
        <div className={module.count}>
          10 000 +
          <span>
            Обслуженных <br /> автомобилей
          </span>
        </div>

        <h1 className={module.title}>Автосервис в Кемерово</h1>
        <p>
          Диагностика, ТО и ремонт. Согласуем работы и стоимость до начала — без
          сюрпризов.
        </p>

        <form onSubmit={handleSubmit} className={module.form}>
          <div className={module.form_row}>
            <div className={module.input_group}>
              <label>* Услуга</label>
              <input
                placeholder="Услуга"
                name="service"
                value={formData.service}
                onChange={handleChange}
                disabled={status.loading}
              />
            </div>

            <div className={module.input_group}>
              <label>* Автомобиль</label>
              <input
                placeholder="Марка и модель"
                name="car"
                value={formData.car}
                onChange={handleChange}
                disabled={status.loading}
              />
            </div>

            <div className={module.input_group}>
              <label>* Телефон</label>
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                onKeyDown={handlePhoneKeyDown}
                disabled={status.loading}
                maxLength="18"
              />
            </div>

            <button type="submit" disabled={status.loading}>
              {status.loading ? "Отправка..." : "Оставить заявку"}
            </button>
          </div>

          <div className={module.checkbox_group}>
            <label className={module.checkbox_label}>
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                disabled={status.loading}
              />
              <span>
                Я соглашаюсь на обработку персональных данных и с{" "}
                <a href="/privacy-policy.pdf" target="_blank">
                  политикой конфиденциальности
                </a>
              </span>
            </label>
          </div>

          {status.message && (
            <div
              className={`${module.message} ${status.success ? module.success : module.error}`}
            >
              {status.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
