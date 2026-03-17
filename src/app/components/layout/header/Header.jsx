"use client";
import module from "./Header.module.scss";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔥 Helper для вызова целей Яндекс.Метрики
  const trackGoal = (goalName: string) => {
    if (typeof window !== 'undefined' && typeof window.ym === 'function') {
      window.ym(106779809, 'reachGoal', goalName);
    }
  };

  // 🔥 Обработка скролла + инициализация на основе пути
  useEffect(() => {
    const isNotHome = pathname !== '/';
    
    if (isNotHome) {
      setScrolled(true);
    } else {
      const handleScroll = () => {
        const isScrolled = window.scrollY > 50;
        if (isScrolled !== scrolled) {
          setScrolled(isScrolled);
        }
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname, scrolled]);

  // 🔥 Блокировка скролла при открытом меню
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className={`${module.header} ${scrolled ? module.scrolled : ""}`}>
        <img src="/svg/logo/garagelogo.svg" alt="Logo" />

        <div className={module.nav}>
          <Link href="/#services" onClick={closeMenu}>Услуги</Link>
          <Link href="/#how" onClick={closeMenu}>Как работаем</Link>
          <Link href="/#reviews" onClick={closeMenu}>Отзывы</Link>
          <Link href="/#faq" onClick={closeMenu}>Ответы на вопросы</Link>
        </div>

        <div>
          {/* 🔥 Max.ru с целью "max" */}
          <Link
            href="https://max.ru/u/f9LHodD0cOJKIJtCLzt9R39PdOR-MG1fi9sdMh9cEZzuXB-ca-EqbrqgtN4"
            target="_blank"
            onClick={() => trackGoal('max')}
          >
            <img src="/svg/socials/max.svg" alt="Max" />
          </Link>
          
          {/* 🔥 Telegram с целью "telegram" */}
          <Link
            href="https://t.me/avtohelp142"
            target="_blank"
            onClick={() => trackGoal('telegram')}
          >
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
          {/* 🔥 Телефоны с целью "telephone" */}
          <Link 
            href="tel:+79235670063" 
            className={module.phone}
            onClick={() => trackGoal('telephone')}
          >
            +7 (923) 567-00-63
          </Link>
          <Link 
            href="tel:+73842670063" 
            className={module.phone}
            onClick={() => trackGoal('telephone')}
          >
            +7 (384) 267-00-63
          </Link>
          <span className={module.time}>Пн-Сб: 10:00 - 20:00</span>
        </div>
      </div>

      <div className={`${module.mobile_menu} ${menuOpen ? module.active : ""}`}>
        <div className={module.mobile_logo}>
          <img src="/svg/logo/garagelogo.svg" alt="Logo" />
        </div>

        <div className={module.close_button} onClick={closeMenu}></div>

        <div className={module.mobile_nav}>
          <Link href="/#services" onClick={closeMenu}>Услуги</Link>
          <Link href="/#how" onClick={closeMenu}>Как работаем</Link>
          <Link href="/#reviews" onClick={closeMenu}>Отзывы</Link>
          <Link href="/#faq" onClick={closeMenu}>Ответы на вопросы</Link>
        </div>

        <div className={module.mobile_contacts}>
          {/* 🔥 Телефоны в мобильном меню тоже с целью */}
          <Link 
            href="tel:+79235670063" 
            className={module.phone}
            onClick={() => trackGoal('telephone')}
          >
            +7 (923) 567-00-63
          </Link>
          <Link 
            href="tel:+73842670063" 
            className={module.phone}
            onClick={() => trackGoal('telephone')}
          >
            +7 (384) 267-00-63
          </Link>
          <span className={module.time}>Пн-Сб: 10:00 - 20:00</span>
        </div>

        <div className={module.mobile_socials}>
          {/* 🔥 Соцсети в мобильном меню */}
          <Link
            href="https://max.ru/u/f9LHodD0cOJKIJtCLzt9R39PdOR-MG1fi9sdMh9cEZzuXB-ca-EqbrqgtN4"
            target="_blank"
            onClick={() => trackGoal('max')}
          >
            <img src="/svg/socials/max.svg" alt="Max" />
          </Link>
          <Link
            href="https://t.me/avtohelp142"
            target="_blank"
            onClick={() => trackGoal('telegram')}
          >
            <img src="/svg/socials/tg.svg" alt="Telegram" />
          </Link>
        </div>
      </div>
    </>
  );
}