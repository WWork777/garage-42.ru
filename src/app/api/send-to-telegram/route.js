import { NextResponse } from "next/server";

// В продакшене используйте переменные окружения
const TELEGRAM_BOT_TOKEN = "8674335217:AAGz4GRDop_-Q6tH4AkekI8aycD654D2DFA";
const TELEGRAM_CHAT_ID = "-5256763945";

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      service, 
      car, 
      phone, 
      name, 
      source,
      // Поля из калькулятора
      tasks,
      needsParts,
      carModel,
      currentMileage,
      // Поле из модалки
      carType,
    } = body;

    // Валидация - телефон обязателен всегда
    if (!phone) {
      return NextResponse.json(
        { error: "Телефон обязателен для заполнения" },
        { status: 400 },
      );
    }

    // Определяем источник и формируем сообщение
    let message = "";
    let formattedService = service;

    // 1. Заявка из калькулятора (CalcQuiz)
    if (source === 'quiz_calc' || (tasks && carModel)) {
      formattedService = tasks || 'Расчёт стоимости';
      message = `
🆕 <b>НОВАЯ ЗАЯВКА ИЗ КАЛЬКУЛЯТОРА</b>

🔧 <b>Работы:</b> ${formattedService}
🚗 <b>Автомобиль:</b> ${carModel || car || 'Не указан'}
📏 <b>Пробег:</b> ${currentMileage || 'Не указан'}
🔩 <b>Запчасти:</b> ${needsParts || 'Не указано'}
👤 <b>Имя:</b> ${name || 'Не указано'}
📞 <b>Телефон:</b> ${phone}
🕐 <b>Время:</b> ${new Date().toLocaleString("ru-RU")}
      `;
    }
    // 2. Заказ звонка (OrderModal)
    else if (source === 'modal_callback' || carType) {
      formattedService = `Заказ звонка (${carType || 'Не указан'})`;
      message = `
🆕 <b>НОВАЯ ЗАЯВКА — ЗАКАЗ ЗВОНКА</b>

🔧 <b>Тип услуги:</b> ${formattedService}
👤 <b>Имя:</b> ${name || 'Не указано'}
📞 <b>Телефон:</b> ${phone}
🕐 <b>Время:</b> ${new Date().toLocaleString("ru-RU")}
      `;
    }
    // 3. Заявка с главной формы Hero (есть car, нет name)
    else if (car && !name) {
      formattedService = service || 'Заявка с главной';
      message = `
🆕 <b>НОВАЯ ЗАЯВКА С ГЛАВНОЙ ФОРМЫ</b>

🔧 <b>Услуга:</b> ${formattedService}
🚗 <b>Автомобиль:</b> ${car}
📞 <b>Телефон:</b> ${phone}
🕐 <b>Время:</b> ${new Date().toLocaleString("ru-RU")}
      `;
    }
    // 4. Заявка из модального окна Services (есть name, нет car)
    else if (name && !car) {
      formattedService = service || 'Заявка на услугу';
      message = `
🆕 <b>НОВАЯ ЗАЯВКА НА УСЛУГУ</b>

👤 <b>Имя:</b> ${name}
🔧 <b>Услуга:</b> ${formattedService}
📞 <b>Телефон:</b> ${phone}
🕐 <b>Время:</b> ${new Date().toLocaleString("ru-RU")}
      `;
    }
    // 5. Универсальная заявка (если ничего не подошло)
    else {
      formattedService = service || 'Заявка с сайта';
      message = `
🆕 <b>НОВАЯ ЗАЯВКА</b>

🔧 <b>Услуга:</b> ${formattedService}
${car ? `🚗 <b>Автомобиль:</b> ${car}\n` : ''}
${name ? `👤 <b>Имя:</b> ${name}\n` : ''}
📞 <b>Телефон:</b> ${phone}
🕐 <b>Время:</b> ${new Date().toLocaleString("ru-RU")}
      `;
    }

    // Отправляем в Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    const data = await response.json();

    if (!data.ok) {
      console.error("Telegram API error:", data);
      return NextResponse.json(
        { error: "Ошибка при отправке в Telegram" },
        { status: 500 },
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Заявка отправлена",
      source: source || 'unknown'
    });
  } catch (error) {
    console.error("Send to Telegram error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}