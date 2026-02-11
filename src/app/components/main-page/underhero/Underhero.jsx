import module from "./Underhero.module.scss";

export default function UnderHero() {
  return (
    <section className={module.underhero_section}>
      <div className={module.underhero_container}>
        <img src="/svg/underhero/first.svg" alt="" />
        <span>Честная диагностика и согласование работ до ремонта</span>
      </div>
      <div className={module.underhero_container}>
        <img src="/svg/underhero/second.svg" alt="" />
        <span>Гарантия на выполненные работы и запчасти по чеку</span>
      </div>
      <div className={module.underhero_container}>
        <img src="/svg/underhero/threed.svg" alt="" />
        <span>Быстрый приём по записи и аккуратная работа</span>
      </div>
    </section>
  );
}
