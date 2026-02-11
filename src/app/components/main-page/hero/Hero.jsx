import module from "./Hero.module.scss";

export default function Hero() {
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

        <h1 className={module.title}>РЕМОНТ И ОБСЛУЖИВАНИЕ АВТОМОБИЛЕЙ</h1>
        <p>
          Диагностика, ТО и ремонт. Согласуем работы и стоимость до начала — без
          сюрпризов.
        </p>

        <form>
          <div className={module.input_group}>
            <label>* Услуга</label>
            <input placeholder="Услуга" />
          </div>

          <div className={module.input_group}>
            <label>* Автомобиль</label>
            <input placeholder="Марка и модель" />
          </div>

          <div className={module.input_group}>
            <label>* Телефон</label>
            <input placeholder="+7 ___ ___-__-__" />
          </div>

          <button>Оставить заявку</button>
        </form>
      </div>
    </section>
  );
}
