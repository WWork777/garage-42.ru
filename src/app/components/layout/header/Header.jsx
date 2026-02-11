"use client";
import module from "./Header.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className={`${module.header} ${scrolled ? module.scrolled : ""}`}>
        <img src="/svg/logo/logo.svg" alt="Logo" />

        <div className={module.nav}>
          <Link href="#services" onClick={closeMenu}>
            Услуги
          </Link>
          <Link href="#how" onClick={closeMenu}>
            Как работаем
          </Link>
          <Link href="#reviews" onClick={closeMenu}>
            Отзывы
          </Link>
          <Link href="#faq" onClick={closeMenu}>
            Ответы на вопросы
          </Link>
        </div>

        <div>
          <Link
            href="https://max.ru/u/f9LHodD0cOJKIJtCLzt9R39PdOR-MG1fi9sdMh9cEZzuXB-ca-EqbrqgtN4"
            target="_blank"
          >
            <img src="/svg/socials/max.svg" alt="Max" />
          </Link>
          <Link href="https://t.me/avtohelp142" target="_blank">
            <img src="/svg/socials/tg.svg" alt="Telegram" />
          </Link>
          <div
            className={`${module.burger} ${menuOpen ? module.active : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div>
          <Link href="tel:+79234807070" className={module.phone}>
            +7 (923) 480-70-70
          </Link>
          <span className={module.time}>Пн-Сб: 09:00 - 21:00</span>
        </div>
      </div>

      <div className={`${module.mobile_menu} ${menuOpen ? module.active : ""}`}>
        {/* Логотип в меню */}
        <div className={module.mobile_logo}>
          <img src="/svg/logo/logo.svg" alt="Logo" />
        </div>

        {/* Крестик для закрытия */}
        <div className={module.close_button} onClick={closeMenu}></div>

        <div className={module.mobile_nav}>
          <Link href="#services" onClick={closeMenu}>
            Услуги
          </Link>
          <Link href="#how" onClick={closeMenu}>
            Как работаем
          </Link>
          <Link href="#reviews" onClick={closeMenu}>
            Отзывы
          </Link>
          <Link href="#faq" onClick={closeMenu}>
            Ответы на вопросы
          </Link>
        </div>

        <div className={module.mobile_contacts}>
          <a href="tel:+79234807070" className={module.phone}>
            +7 (923) 480-70-70
          </a>
          <span className={module.time}>Пн-Сб: 09:00 - 21:00</span>
        </div>

        <div className={module.mobile_socials}>
          <Link
            href="https://max.ru/u/f9LHodD0cOJKIJtCLzt9R39PdOR-MG1fi9sdMh9cEZzuXB-ca-EqbrqgtN4"
            target="_blank"
          >
            <img src="/svg/socials/max.svg" alt="Max" />
          </Link>
          <Link href="https://t.me/avtohelp142" target="_blank">
            <img src="/svg/socials/tg.svg" alt="Telegram" />
          </Link>
        </div>
      </div>
    </>
  );
}
