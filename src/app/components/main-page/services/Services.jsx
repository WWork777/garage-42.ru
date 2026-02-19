"use client";
import module from "./Services.module.scss";
import { useState, useRef } from "react";
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
            {/* <div className={module.services_modal_info_item}>
              <span>Гарантия</span>
              <p>{service.garanty}</p>
            </div> */}
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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить отправку данных на сервер
    console.log({ name, phone, service: serviceTitle });
    setSubmitted(true);
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setSubmitted(false);
    onClose();
  };

  return (
    <div className={module.services_modal_overlay} onClick={handleClose}>
      <div
        className={`${module.services_modal_content} ${module.services_booking_modal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={module.services_modal_close} onClick={handleClose}>
          ×
        </button>

        <div className={module.services_modal_body}>
          {!submitted ? (
            <>
              <h3>Записаться на услугу</h3>
              <div className={module.services_service_name}>{serviceTitle}</div>

              <form
                onSubmit={handleSubmit}
                className={module.services_booking_form}
              >
                <div className={module.services_form_group}>
                  <label htmlFor="name">Ваше имя *</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Введите ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className={module.services_form_group}>
                  <label htmlFor="phone">Номер телефона *</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className={module.services_booking_actions}>
                  <button
                    type="submit"
                    className={module.services_booking_submit}
                  >
                    Отправить заявку
                  </button>
                  <button
                    type="button"
                    className={module.services_booking_cancel}
                    onClick={handleClose}
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className={module.services_success_message}>
              <div className={module.services_success_icon}>✓</div>
              <h4>Спасибо за заявку!</h4>
              <p>Мы свяжемся с вами в ближайшее время</p>
              <button onClick={handleClose}>Закрыть</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ServicesCard({
  title,
  time,
  image,
  price,
  garanty,
  onMoreClick,
  fullDescription,
  onBookingClick,
}) {
  return (
    <div className={module.services_card}>
      <img src={image} alt={title} />
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
          <p>
            {
              typeof price === "string" && price.includes("/")
                ? price // Если есть слеш (например, "20 руб./шип"), показываем как есть
                : `${price} ₽` // Иначе добавляем значок рубля
            }
          </p>
        </div>
      </div>
      <div className={module.services_card__buttons}>
        <button
          className={module.services_card__buttons__cta}
          onClick={() =>
            onBookingClick({
              title,
              time,
              image,
              price,
              garanty,
              fullDescription,
            })
          }
        >
          Записаться
        </button>
        <button
          className={module.services_card__buttons__more}
          onClick={() =>
            onMoreClick({ title, time, image, price, garanty, fullDescription })
          }
        >
          Подробнее
        </button>
      </div>
    </div>
  );
}

const allServices = [
  {
    title: "Сварочные работы",
    time: "от 1 часа",
    image: "/images/services/Сварочные работы.webp",
    price: "от 1000",
    garanty: "6 мес",
    fullDescription:
      "Выполняем все виды сварочных работ любой сложности. Аргонодуговая, полуавтоматическая и электродуговая сварка. Ремонтируем трещины в кузове, раме, подрамнике и выхлопной системе. Восстанавливаем резьбовые соединения, кронштейны и элементы подвески. Используем профессиональное оборудование и качественные расходные материалы. После сварки проводим антикоррозийную обработку швов.",
  },
  {
    title: "Аппаратная заправка кондиционера",
    time: "1-2 часа",
    image: "/images/services/Выхлопная система.webp",
    price: "от 1 500",
    garanty: "12 мес",
    fullDescription:
      "Полный цикл обслуживания автокондиционеров. Компьютерная диагностика системы, проверка герметичности, вакуумирование, замена масла в компрессоре, дозаправка фреоном с контролем давления. Используем сертифицированные хладагенты и современный заправочный стенд. Восстанавливаем работоспособность кондиционера и устраняем причины утечек.",
  },
  {
    title: "Промывка системы охлаждения",
    time: "от 1 часа",
    image: "/images/services/Автоэлектрика.webp",
    price: "от 2 500",
    garanty: "6 мес",
    fullDescription:
      "Комплексная очистка системы охлаждения двигателя от накипи, ржавчины, отложений и продуктов разложения антифриза. Используем профессиональные двухкомпонентные составы, безопасные для алюминиевых радиаторов и пластиковых патрубков. Промывка восстанавливает циркуляцию охлаждающей жидкости и предотвращает перегрев двигателя.",
  },
  {
    title: "Ремонт тормозной системы",
    time: "30-60 мин",
    image: "/images/services/Замена жидкостей.webp",
    price: "от 1 200",
    garanty: "1 мес",
    fullDescription:
      "Полная диагностика и ремонт тормозной системы. Замена тормозных колодок, дисков, суппортов, тормозных цилиндров и трубок. Прокачка и замена тормозной жидкости на специализированном стенде. Регулировка ручного тормоза. Используем оригинальные запчасти и качественные аналоги. Проводим тестирование эффективности торможения после ремонта.",
  },
  {
    title: "Замена тех. жидкостей",
    time: "1-2 часа",
    image: "/images/services/Тормозная система.webp",
    price: "от 800",
    garanty: "12 мес",
    fullDescription:
      "Профессиональная замена всех технических жидкостей: моторное масло с фильтром, трансмиссионное масло, антифриз, тормозная жидкость, масло ГУР. Используем масла ведущих мировых производителей, точно подбираем вязкость и допуски по VIN-коду. Обязательная промывка системы при необходимости. Утилизация отработанных жидкостей.",
  },
  {
    title: "Сварка и правка литых дисков",
    time: "1-3 часа",
    image: "/images/services/Система охлаждения.webp",
    price: "от 1 500",
    garanty: "6 мес",
    fullDescription:
      "Восстановление геометрии и внешнего вида литых дисков. Устранение сколов, царапин, коррозии и сдиров. Правка дисков без нагрева на гидравлическом стенде. Аргонодуговая сварка при серьезных повреждениях. Полный цикл покраски в камере: пескоструйная обработка, грунтование, покраска в цвет RAL, нанесение защитного лака.",
  },
  {
    title: "Прокачка стоек амортизатора",
    time: "1-3 часа",
    image: "/images/services/Прокачка стоек амортизатора.jpg",
    price: "от 800",
    garanty: "6 мес",
    fullDescription:
      "Восстановление работоспособности масляных и газомасляных амортизаторов. Удаление воздуха из гидравлической системы, прокачка на специальном стенде до полного восстановления демпфирующих свойств. Проверка герметичности сальников и штока. Услуга позволяет продлить срок службы амортизаторов и избежать преждевременной замены.",
  },
  {
    title: "Промывка форсунок",
    time: "1-3 часа",
    image: "/images/services/Промывка форсунок.jpg",
    price: "от 1 000",
    garanty: "6 мес",
    fullDescription:
      "Ультразвуковая очистка и промывка топливных форсунок на профессиональном стенде. Удаление смолистых отложений, нагара и лаковых образований. Восстановление факела распыла и герметичности форсунок. Проверка производительности и коррекция кодов адаптации. Результат: снижение расхода топлива, восстановление динамики, стабильный холостой ход.",
  },
  {
    title: "Сход развал 3D",
    time: "1-3 часа",
    image: "/images/services/Сход развал 3 D.jpg",
    price: "от 2 000",
    garanty: "6 мес",
    fullDescription:
      "Компьютерная 3D-диагностика и регулировка углов установки колес на современном стенде. Одновременное сканирование всех колес высокоточными камерами, построение 3D-модели положения осей. Регулировка схождения, развала, кастера. Выявление деформаций подвески и кузова. Рекомендации по ремонту при невозможности корректировки.",
  },
  {
    title: "Капитальный ремонт ДВС",
    time: "1-3 часа",
    image: "/images/services/Капитальный ремонт ДВС.jpg",
    price: "от 30 000",
    garanty: "6 мес",
    fullDescription:
      "Полная переборка двигателя внутреннего сгорания. Дефектовка блока цилиндров, расточка и хонинговка, замена поршневой группы, коленвала, вкладышей, маслосъемных колпачков. Ремонт ГБЦ: замена направляющих втулок, притирка клапанов, замена сальников. Проверка и ремонт масляного насоса. После сборки — обкатка на стенде.",
  },
  {
    title: "Ремонт подвески",
    time: "2-4 часа",
    image: "/images/services/Ремонт подвески.webp",
    price: "от 700",
    garanty: "6 мес",
    fullDescription:
      "Комплексная диагностика и ремонт ходовой части автомобиля. Замена шаровых опор, сайлентблоков, стоек и втулок стабилизатора, амортизаторов, пружин. Восстановление геометрии подвески. Использование гидравлических прессов для запрессовки сайлентблоков. После ремонта обязательная регулировка углов установки колес.",
  },
  // {
  //   title: "Ремонт ДВС",
  //   time: "от 4 часов",
  //   image: "/images/services/Ремонт ДВС.webp",
  //   price: "от 1 000",
  //   garanty: "12 мес",
  //   fullDescription:
  //     "Узловой ремонт двигателя без полной разборки. Замена прокладок и сальников, ремонт системы вентиляции картера, замена ремней и цепей ГРМ, помпы, термостата. Диагностика и устранение посторонних шумов, вибраций, масложора, падения мощности. Подбор оптимального решения: ремонт или замена на контрактный двигатель.",
  // },
  {
    title: "Ремонт трансмиссии",
    time: "2-5 часов",
    image: "/images/services/Ремонт трансмиссии.webp",
    price: "от 7 000",
    garanty: "12 мес",
    fullDescription:
      "Ремонт механических и автоматических коробок передач, вариаторов, редукторов, раздаточных коробок. Диагностика, замена масла, ремонт гидроблоков, замена фрикционов, соленоидов, гидротрансформаторов. Компьютерная адаптация АКПП после ремонта. Работаем с любыми типами трансмиссий отечественных и импортных авто.",
  },
  // {
  //   title: "Рулевое управление",
  //   time: "1-3 часа",
  //   image: "/images/services/Рулевое управление.webp",
  //   price: "от 800",
  //   garanty: "6 мес",
  //   fullDescription:
  //     "Ремонт и обслуживание рулевого управления. Диагностика люфтов, замена наконечников, тяг, реек, усилителей. Регулировка зазоров, восстановление шлицевых соединений. Замена масла в ГУР, ремонт насоса гидроусилителя. Ремонт электроусилителя руля. Обязательная регулировка углов установки колес после ремонта.",
  // },
  {
    title: "Шиномонтаж комплекс",
    time: "1-2 часа",
    image: "/images/services/Шиномонтаж комплекс.jpg",
    price: "от 2 000",
    garanty: "12 мес",
    fullDescription:
      "Полный комплекс шиномонтажных работ: демонтаж/монтаж шин, балансировка колес, ремонт проколов (грибок/жгут), вентили и золотники. Используем современные балансировочные стенды и профессиональный инструмент, исключающий повреждение дисков.",
  },
  {
    title: "Эндоскопия двигателя",
    time: "от 30 мин",
    image: "/images/services/Эндоскопия двигателя.jpg",
    price: "от 3 000",
    garanty: "—",
    fullDescription:
      "Визуальная диагностика внутренних полостей двигателя без разбора с помощью промышленного эндоскопа. Позволяет оценить состояние цилиндров, поршней, клапанов и стенок ГБЦ. Выявляем нагар, задиры, прогар клапанов и наличие посторонних предметов.",
  },
  {
    title: "Компьютерная диагностика",
    time: "30-60 мин",
    image: "/images/services/Компьютерная диагностика.jpg",
    price: "от 1 000",
    garanty: "—",
    fullDescription:
      "Считывание и анализ кодов ошибок электронных блоков управления (двигатель, АКПП, ABS, SRS и др.). Проверка параметров работы датчиков в реальном времени (лямбда-зонд, ДМРВ, температура и т.д.), сброс ошибок и адаптация после ремонта.",
  },
  {
    title: "Проверка дымогенератором, диагностика утечек",
    time: "от 30 мин",
    image: "/images/services/Проверка дымогенератором.jpg",
    price: "от 800",
    garanty: "—",
    fullDescription:
      "Поиск скрытых утечек воздуха (неучтенного подсоса) в впускном коллекторе, вакуумных магистралях и системе вентиляции картера. Подача безвредного дыма под давлением точно показывает место разгерметизации, что критично для стабильной работы двигателя.",
  },
  {
    title: "Проверка автомобиля газоанализатором",
    time: "20-30 мин",
    image: "/images/services/Проверка автомобиля газоанализатором.jpg",
    price: "от 800",
    garanty: "—",
    fullDescription:
      "Анализ состава выхлопных газов (CO, CH, CO2, O2, лямбда). Позволяет оценить эффективность сгорания топлива, правильность работы катализатора и лямбда-зондов. Помогает выявить проблемы с топливоподачей и зажиганием.",
  },
  {
    title: "Ошиповка шин",
    time: "от 2 часов",
    image: "/images/services/Ошиповка шин.jpg",
    price: "от 20 руб./шип",
    garanty: "6 мес",
    fullDescription:
      "Восстановление шипованной резины. Ремонт посадочных мест, очистка отверстий и установка новых шипов профессиональным пистолетом. Подбор шипов по размеру (под разные слои протектора). Восстанавливаем сцепление на льду и продлеваем жизнь зимней резине.",
  },
  {
    title: "Удаление катализатора",
    time: "2-4 часа",
    image: "/images/services/Удаление катализатора.jpg",
    price: "от 3 500",
    garanty: "12 мес",
    fullDescription:
      "Демонтаж штатного катализатора (механическое удаление керамического/металлического блока). Установка пламегасителя или стронгера для снижения шума. Обязательная программная адаптация ЭБУ (чип-тюнинг) для отключения ошибок по кислородным датчикам.",
  },
  {
    title: "Перепрессовка сайлентблоков",
    time: "от 1 часа",
    image: "/images/services/Перепрессовка сайлентблоков.jpg",
    price: "от 600",
    garanty: "12 мес",
    fullDescription:
      "Замена изношенных сайлентблоков, резинометаллических шарниров (РМШ) рычагов подвески. Выпрессовка старых и запрессовка новых деталей гидравлическим прессом со специальными оправками. Сохраняем геометрию рычагов, исключаем перекосы и продлеваем срок службы новой резины.",
  },
];

export default function Services() {
  const [showAll, setShowAll] = useState(false);
  const [moreModalOpen, setMoreModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const servicesSectionRef = useRef(null);
  // Показываем первые 6 или все услуги
  const displayedServices = showAll ? allServices : allServices.slice(0, 6);

  const toggleServices = () => {
    if (showAll) {
      // Если сейчас показываются все услуги и мы их скрываем
      setShowAll(false);
      // Прокручиваем к началу секции
      servicesSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      setShowAll(true);
    }
  };

  const handleMoreClick = (service) => {
    setSelectedService(service);
    setMoreModalOpen(true);
  };

  const handleBookingClick = (service) => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  const closeMoreModal = () => {
    setMoreModalOpen(false);
    setSelectedService(null);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section
      className={module.services_section}
      id="services"
      ref={servicesSectionRef}
    >
      <div className={module.services_container__top}>
        <h2>НАШИ УСЛУГИ</h2>
        <div className={module.services_container__top__line}>
          <span className={module.services_container__top__line__span}>
            ///
          </span>
          <span>Услуги</span>
        </div>
      </div>

      <div className={module.services_container__grid}>
        {displayedServices.map((service, index) => (
          <ServicesCard
            key={index}
            {...service}
            onMoreClick={handleMoreClick}
            onBookingClick={handleBookingClick}
          />
        ))}
      </div>

      <button
        className={module.services_container__button}
        onClick={toggleServices}
      >
        {showAll ? "Скрыть" : "Посмотреть все услуги"}
      </button>

      {/* Модальные окна */}
      <MoreModal
        isOpen={moreModalOpen}
        onClose={closeMoreModal}
        service={selectedService}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={closeBookingModal}
        serviceTitle={selectedService?.title}
      />
    </section>
  );
}
