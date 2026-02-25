"use client";

import { useState } from "react";
import module from "./Footer.module.scss";
import Link from "next/link";

export default function Footer() {
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

  // Обработчик клавиш для телефона
  const handlePhoneKeyDown = (e) => {
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

    if (!/^\d$/.test(e.key) && e.key !== "+") {
      e.preventDefault();
    }
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
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: "Необходимо согласие с политикой обработки данных",
      });
      return;
    }

    if (!formData.name || !formData.phone) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: "Пожалуйста, заполните все обязательные поля",
      });
      return;
    }

    // Очищаем телефон от всех нецифровых символов
    const cleanPhone = formData.phone.replace(/\D/g, "");

    // Проверяем длину номера (11 цифр: 7 + 10 цифр)
    if (cleanPhone.length < 11) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: "Пожалуйста, введите корректный номер телефона",
      });
      return;
    }

    setStatus({ loading: true, success: false, error: false, message: "" });

    try {
      const response = await fetch("/api/send-to-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: "Диагностика (футер)",
          name: formData.name,
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
        name: "",
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

  return (
    <footer className={module.footer}>
      <div className={module.footer_content}>
        <div className={module.item}>
          <span>///</span>
          <p>Консультация</p>
        </div>

        <h3>ОСТАВЬТЕ ЗАЯВКУ НА ДИАГНОСТИКУ</h3>

        <p>
          Оставьте свои контактные данные и мы уточним задачу и запишем на
          удобное время. Стоимость согласуем до начала работ.
        </p>

        <form onSubmit={handleSubmit} className={module.form}>
          <div className={module.form_fields}>
            <input
              type="text"
              name="name"
              placeholder="Введите ваше имя"
              value={formData.name}
              onChange={handleChange}
              disabled={status.loading}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="+7 (___) ___-__-__"
              value={formData.phone}
              onChange={handlePhoneChange}
              onKeyDown={handlePhoneKeyDown}
              disabled={status.loading}
              maxLength="18"
              required
            />
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
                required
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

      <div className={module.copyright}>
        <span>© 2026 — Гараж АвтоТехЦентр. Все права защищены.</span>

        <div className={module.links}>
          <Link href="/cookie-policy.pdf" target="_blank">
            Политики обработки данных
          </Link>
          <Link href="/privacy-policy.pdf" target="_blank">
            Политика конфиденциальности
          </Link>
          <Link href="/user-agreement.pdf" target="_blank">
            Пользовательское соглашение
          </Link>
        </div>

        <a
          href="https://www.avito.ru/"
          target="_blank"
          rel="noopener noreferrer"
          className={module.avito_link}
        >
          Мы на Авито
          <img src="/svg/footer/avito.svg" alt="Авито" />
        </a>
      </div>
    </footer>
  );
}
