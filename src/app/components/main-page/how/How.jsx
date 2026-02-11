import module from "./How.module.scss";

export default function How() {
  return (
    <section className={module.how_section} id="how">
      <div className={module.how_container__top}>
        <h2>КАК МЫ РАБОТАЕМ</h2>
        <div className={module.how_container__top__line}>
          <span className={module.how_container__top__line__span}>///</span>
          <span>Сервис</span>
        </div>
      </div>
      <div className={module.how_container__cards}>
        <div className={module.how_container__card}>
          <h3>01</h3>
          <span>ОСТАВЛЯЕТЕ ЗАЯВКУ</span>
          <p>
            Оставляете заявку на сайте или звоните — уточняем задачу и
            записываем на удобное время.
          </p>
        </div>
        <img src="/svg/how/arrow.svg" alt="" />
        <div className={module.how_container__card_red}>
          <h3>02</h3>
          <span>ДИАГНОСТИКА</span>
          <p>
            Проверяем, составляем перечень работ и стоимость. Начинаем только
            после вашего подтверждения.
          </p>
        </div>
        <img src="/svg/how/arrow.svg" alt="" />
        <div className={module.how_container__card}>
          <h3>03</h3>
          <span>ВЫДАЧА АВТОМОБИЛЯ</span>
          <p>
            Выполняем работы, проверяем результат и выдаём авто. При
            необходимости — фото/видео по запросу.
          </p>
        </div>
      </div>
    </section>
  );
}
