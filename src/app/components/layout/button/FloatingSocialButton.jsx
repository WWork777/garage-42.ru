"use client";
import { useState, useEffect, useRef } from "react";
import module from "./FloatingSocialButton.module.scss";

export default function FloatingSocialButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    // Добавляем обработчик при открытии
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    // Удаляем обработчик при закрытии и размонтировании
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Закрытие при нажатии Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className={module.floating_social_container} ref={containerRef}>
      {/* Социальные иконки */}
      <div
        className={`${module.social_icons} ${isOpen ? module.social_icons_open : ""}`}
      >
        <a
          href="https://t.me/avtohelp142"
          target="_blank"
          rel="noopener noreferrer"
          className={module.social_icon}
          style={{ transitionDelay: "0.1s" }}
          onClick={() => setIsOpen(false)} // Закрываем после клика
        >
          <img src="/svg/socials/tg.svg" alt="Telegram" />
        </a>
        <a
          href="https://max.ru/u/f9LHodD0cOJKIJtCLzt9R39PdOR-MG1fi9sdMh9cEZzuXB-ca-EqbrqgtN4"
          target="_blank"
          rel="noopener noreferrer"
          className={module.social_icon}
          style={{ transitionDelay: "0.3s" }}
          onClick={() => setIsOpen(false)} // Закрываем после клика
        >
          <img src="/svg/socials/max.svg" alt="Max" />
        </a>
        <a
          href="tel:+79235670063"
          className={module.social_icon}
          style={{ transitionDelay: "0.4s" }}
          onClick={() => setIsOpen(false)} // Закрываем после клика
        >
          📞
        </a>
      </div>

      {/* Главная кнопка */}
      <button
        className={`${module.floating_button} ${isOpen ? module.floating_button_active : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <span className={module.floating_button_close}>×</span>
        ) : (
          <>
            <span className={module.floating_button_text}>
              Связаться с нами
            </span>
          </>
        )}
      </button>
    </div>
  );
}
