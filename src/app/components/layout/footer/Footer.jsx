import module from "./Footer.module.scss";
import Link from "next/link";

export default function Footer() {
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

        <form action="">
          <input type="text" placeholder="Введите ваше имя" />
          <input type="tel" placeholder="Введите ваш номер телефона" />
          <button type="submit">Оставить заявку</button>
        </form>

        <span className={module.privacy_note}>
          Оставляя заявку на нашем сайте, вы даете свое согласие на обработку
          персональных данных и соглашаетесь с политикой конфиденциальности
        </span>
      </div>

      <div className={module.copyright}>
        <span>© 2026 — Гараж АвтоТехЦентр. Все права защищены.</span>

        <div className={module.links}>
          <Link href="/policies">Политики обработки данных</Link>
          <Link href="/privacy-policy">Политика конфиденциальности</Link>
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
