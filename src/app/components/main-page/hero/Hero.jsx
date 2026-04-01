'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Hero.module.scss';
import OrderModal from '../ModalNew/ModalNew';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className={styles.repair_section}>
        <div className={styles.main_container}>
          <div className={styles.content_wrapper}>
            
            {/* Левый столбец (Текст) */}
            <div className={styles.content_info}>
              <h1 className={styles.main_title}>
                РЕМОНТ И ОБСЛУЖИВАНИЕ АВТОМОБИЛЕЙ <br /> 
                <span className={styles.highlight}>В КЕМЕРОВО</span>
              </h1>
              <p className={styles.description}>
                Сделаем так, чтобы не пришлось возвращаться. 
              </p>

              <div className={styles.services_list}>
                <div className={styles.service_item}>
                  <Image className={styles.icons_points} src="/icons/airplay.svg" width={25} height={25} alt="Диагностика" />
                  <span>Диагностика</span>
                </div>
                <div className={styles.service_item}>
                  <Image className={styles.icons_points} src="/icons/timer.svg" width={25} height={25} alt="Обслуживание" />
                  <span>Обслуживание</span>
                </div>
                <div className={styles.service_item}>
                  <Image className={styles.icons_points} src="/icons/key.svg" width={25} height={25} alt="Ремонт" />
                  <span>Ремонт</span>
                </div>
              </div>

              <div className={styles.actions}>
                <div className="cont1">
                  <button className={styles.btn_red} onClick={() => setIsModalOpen(true)}>
                    <span className={styles.icon}>→</span>
                    Записаться на диагностику
                  </button>
                  <p className={styles.promo}>🔥 Запишись сейчас — диагностика <strong>бесплатно</strong></p>
                </div>
                <button className={styles.btn_glass}>
                  <img src="/icons/calc.svg" alt="calc" width="20" height="20"/>
                  Рассчитать стоимость
                </button>
              </div>
            </div>

            {/* Правый столбец — Виджет с Яндекс.Картой */}
            <div className={styles.content_media}>
              <div className={styles.status_card}>
                <div className={styles.status_header}>
                  <div className={styles.status_title}>
                    <h3>Статус сервиса</h3>
                    <p>Обновлено: только что</p>
                  </div>
                  <div className={styles.online_indicator}></div>
                </div>

                <div className={styles.stats_grid}>
                  <div className={styles.stat_box}>
                    <img src="/icons/meh.svg" alt="подъемники" width="24" height="24"/>
                    <div className={styles.stat_val}>2</div>
                    <div className={styles.stat_label}>СВОБОДНЫХ БОКСА</div>
                  </div>
                  <div className={styles.stat_box}>
                    <img src="/icons/time.svg" alt="время" width="24" height="24"/>
                    <div className={styles.stat_val}>10:00 - 20:00</div>
                    <div className={styles.stat_label}>ВРЕМЯ РАБОТЫ</div>
                  </div>
                </div>

                {/* Контейнер для Яндекс.Карты (iframe) */}
                <div className={styles.map_container}>
                  <iframe 
                    className={styles.map_frame}
                    src="https://yandex.ru/map-constructor/?um=constructor%3Ab190f6592e4ae252d8a8ab561ed086b4d907057a7c98ade45adab1d838ef3029&amp;width=100%25&amp;height=240&amp;lang=ru_RU&amp;scroll=false"
                    width="100%" 
                    height="240" 
                    frameBorder="0" 
                    allowFullScreen
                    title="Яндекс.Карта сервиса в Кемерово"
                    loading="lazy"
                  />
                  <div className={styles.map_overlay_btn}>
                    <button type="button">Найти ближайший сервис</button>
                  </div>
                </div>

                <div className={styles.status_footer}>
                  <div className={styles.info_icon}>i</div>
                  <p>Работаем во всех районах Кемерово. Принимаем карты, наличные и переводы.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Hero;