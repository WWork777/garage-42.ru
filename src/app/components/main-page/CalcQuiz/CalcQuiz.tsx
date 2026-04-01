'use client';

import React, { useState } from 'react';
import styles from './CalcQuiz.module.scss';

type QuizData = {
  tasks: string;
  needsParts: string;
  carModel: string;
  currentMileage: string;
  name: string;
  phone: string;
};

const totalSteps = 5;

const CalcQuiz = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuizData>({
    tasks: '',
    needsParts: '',
    carModel: '',
    currentMileage: '',
    name: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Отправка данных в API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Формируем данные в формате, который ожидает API
      const payload = {
        service: formData.tasks || 'Расчёт стоимости', // Обязательно
        phone: formData.phone.replace(/\D/g, ''),       // Обязательно, только цифры
        car: `${formData.carModel}, пробег: ${formData.currentMileage}`.trim(), // Опционально
        name: formData.name || undefined,               // Опционально
        source: 'quiz_calc',                            // Доп. поле для аналитики
      };

      const response = await fetch('/api/send-to-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Ошибка отправки');
      }

      setSubmitStatus('success');
      // Сброс формы через 2 секунды
      setTimeout(() => {
        setFormData({
          tasks: '',
          needsParts: '',
          carModel: '',
          currentMileage: '',
          name: '',
          phone: '',
        });
        setSubmitStatus('idle');
        setCurrentStep(1);
      }, 2000);
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.step_body}>
            <h3 className={styles.step_title}>1. НАПИШИТЕ КАКИЕ РАБОТЫ НУЖНО СДЕЛАТЬ:</h3>
            <p className={styles.step_subtitle}>Если есть проблема которую давно не можете решить, пишите так же <span className={styles.required}>*</span></p>
            <textarea
              name="tasks"
              placeholder="Например: замена масла, ремня ГРМ др."
              value={formData.tasks}
              onChange={handleInputChange}
              className={styles.textarea}
              required
            />
          </div>
        );
      case 2:
        return (
          <div className={styles.step_body}>
            <h3 className={styles.step_title}>2. НУЖНЫ ЛИ ВАМ ЗАПЧАСТИ:</h3>
            <div className={styles.radio_group}>
              {[
                'Да, мне нужен полный комплект',
                'Да, мне возможно понадобится что то докупить',
                'Нет, у меня свои запчасти',
              ].map((option) => (
                <label key={option} className={styles.radio_label}>
                  <input
                    type="radio"
                    name="needsParts"
                    value={option}
                    checked={formData.needsParts === option}
                    onChange={handleInputChange}
                  />
                  <span className={styles.custom_radio} />
                  {option}
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className={styles.step_body}>
            <h3 className={styles.step_title}>3. УКАЖИТЕ МАРКУ И МОДЕЛЬ, ОБЪЕМ ДВИГАТЕЛЯ И ГОД АВТОМОБИЛЯ:</h3>
            <p className={styles.step_subtitle}>Напишите в поле ниже, через запятую <span className={styles.required}>*</span></p>
            <input
              type="text"
              name="carModel"
              placeholder="Например: Toyota Camry, 2.5, 2021"
              value={formData.carModel}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
        );
      case 4:
        return (
          <div className={styles.step_body}>
            <h3 className={styles.step_title}>4. УКАЖИТЕ ТЕКУЩИЙ ПРОБЕГ АВТОМОБИЛЯ:</h3>
            <p className={styles.step_subtitle}>Напишите в поле ниже <span className={styles.required}>*</span></p>
            <input
              type="text"
              name="currentMileage"
              placeholder="Например: 75000 км"
              value={formData.currentMileage}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
        );
      case 5:
        return (
          <div className={styles.step_body}>
            <h3 className={styles.step_title}>5. ОСТАВЬТЕ КОНТАКТЫ ДЛЯ ПОЛУЧЕНИЯ РАСЧЕТА:</h3>
            <div className={styles.contacts_row}>
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input}
              />
              <input
                type="tel"
                name="phone"
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className={styles.quiz_section}>
      <div className={styles.main_container}>
        <h2 className={styles.main_title}>
          ЗАПОЛНИТЕ ОПРОСНИК <span className={styles.dimmed}>ДЛЯ РАСЧЕТА ТОЧНОЙ <br /> СТОИМОСТИ РАБОТ И ЗАПЧАСТЕЙ</span>
        </h2>

        <div className={styles.quiz_card}>
          {/* Степпер */}
          <div className={styles.stepper}>
            {[...Array(totalSteps)].map((_, index) => {
              const stepNum = index + 1;
              return (
                <div key={stepNum} className={`${styles.step} ${currentStep >= stepNum ? styles.active : ''}`}>
                  <div className={styles.step_circle}>{stepNum}</div>
                  <span className={styles.step_label}>Шаг {stepNum}</span>
                  {stepNum < totalSteps && <div className={styles.line} />}
                </div>
              );
            })}
          </div>

          {/* Форма */}
          <form className={styles.content_form} onSubmit={handleSubmit}>
            {renderStepContent()}

            {/* Статусы отправки */}
            {submitStatus === 'success' && (
              <p className={styles.successMsg}>✅ Заявка отправлена! Мы свяжемся с вами.</p>
            )}
            {submitStatus === 'error' && (
              <p className={styles.errorMsg}>❌ Ошибка. Попробуйте позвонить нам напрямую.</p>
            )}

            {/* Кнопки навигации */}
            <div className={styles.actions}>
              {currentStep > 1 && (
                <button type="button" className={styles.btn_back} onClick={prevStep} disabled={isSubmitting}>
                  Назад
                </button>
              )}
              {currentStep < totalSteps ? (
                <button type="button" className={styles.btn_next} onClick={nextStep} disabled={isSubmitting}>
                  Далее <span className={styles.icon}>→</span>
                </button>
              ) : (
                <button 
                  type="submit" 
                  className={styles.btn_submit}
                  disabled={isSubmitting || submitStatus === 'success'}
                >
                  {isSubmitting ? 'Отправка...' : submitStatus === 'success' ? 'Отправлено ✓' : 'Получить расчет'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CalcQuiz;