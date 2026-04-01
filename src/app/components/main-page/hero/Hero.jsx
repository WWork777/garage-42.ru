'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Hero.module.scss';
import OrderModal from '../ModalNew/ModalNew';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Функция плавного скролла к якорю
  const scrollToAnchor = (targetId) => {
    let attempts = 0;
    const maxAttempts = 10;
    
    const tryScroll = () => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerHeight = 200; // Увеличенный отступ чтобы останавливаться выше
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
        return true;
      }
      
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(tryScroll, 100);
      }
      return false;
    };
    
    tryScroll();
  };

  // Обработчик клика "Рассчитать стоимость"
  const handleCalculateClick = () => {
    scrollToAnchor('calc');
    // Обновляем URL (опционально)
    window.history.pushState(null, '', '/#calc');
  };

  return (
    <>
      <section className={styles.repair_section}>
        <div className={styles.main_container}>
          <div className={styles.content_wrapper}>
            
            {/* Левый столбец — Текст и кнопки */}
            <div className={styles.content_info}>
              <h1 className={styles.main_title}>
                РЕМОНТ И ОБСЛУЖИВАНИЕ <br />
                <span className={styles.highlight}>АВТОМОБИЛЕЙ В КЕМЕРОВО</span>
              </h1>
              
              <p className={styles.description}>
                Сделаем так, чтобы не пришлось возвращаться.
              </p>

              {/* Список услуг */}
              <div className={styles.services_list}>
                <div className={styles.service_item}>
                  <Image className={styles.icons_points} src="/icons/airplay.svg" width={28} height={28} alt="Диагностика" />
                  <span>Диагностика</span>
                </div>
                <div className={styles.service_item}>
                  <Image className={styles.icons_points} src="/icons/timer.svg" width={28} height={28} alt="Обслуживание" />
                  <span>Обслуживание</span>
                </div>
                <div className={styles.service_item}>
                  <Image className={styles.icons_points} src="/icons/key.svg" width={28} height={28} alt="Ремонт" />
                  <span>Ремонт</span>
                </div>
              </div>

              {/* Кнопки */}
              <div className={styles.actions}>
                <button 
                  className={styles.btn_red} 
                  onClick={() => setIsModalOpen(true)}
                  aria-label="Записаться на бесплатную диагностику"
                >
                  <span className={styles.icon}>→</span>
                  Записаться на диагностику
                </button>
                
                {/* Кнопка "Рассчитать стоимость" */}
                <button 
                  type="button" 
                  className={styles.btn_glass}
                  onClick={handleCalculateClick}
                >
                  <Image src="/icons/calc.svg" alt="" width={20} height={20} />
                  Рассчитать стоимость
                </button>
              </div>

              <p className={styles.promo}>
                🔥 Запишись сейчас — диагностика <strong>бесплатно</strong>
              </p>
            </div>

            {/* Правый столбец — Карточка статуса и карта */}
            <div className={styles.content_media}>
              <div className={styles.status_card}>
                
                <div className={styles.status_header}>
                  <div className={styles.status_title}>
                    <h3>Статус сервиса</h3>
                    <p>Обновлено: только что</p>
                  </div>
                  <div className={styles.online_indicator} aria-label="Сервис онлайн"></div>
                </div>

                <div className={styles.stats_grid}>
                  <div className={styles.stat_box}>
                    <Image src="/icons/meh.svg" alt="" width={24} height={24} />
                    <div className={styles.stat_val}>2</div>
                    <div className={styles.stat_label}>Свободных бокса</div>
                  </div>
                  <div className={styles.stat_box}>
                    <Image src="/icons/time.svg" alt="" width={24} height={24} />
                    <div className={styles.stat_val}>10:00 - 20:00</div>
                    <div className={styles.stat_label}>Время работы</div>
                  </div>
                </div>

                {/* Карта */}
                <div className={styles.map_container}>
                  <div className={styles.map_wrapper}>
                    <iframe 
                      src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab190f6592e4ae252d8a8ab561ed086b4d907057a7c98ade45adab1d838ef3029&amp;source=constructor"
                      className={styles.map_frame}
                      loading="lazy"
                      title="Наш автосервис на Яндекс.Картах"
                    />
                  </div>
                  <div className={styles.map_overlay_btn}>
                    <a href="https://yandex.ru/maps/-/CPbkNP3a" target="_blank" rel="noopener noreferrer">
                      <button type="button" className={styles.map_btn}>
                        Автосервис на картах ↗
                      </button>
                    </a>
                  </div>
                </div>

                <div className={styles.status_footer}>
                  <div className={styles.info_icon} aria-hidden="true">i</div>
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