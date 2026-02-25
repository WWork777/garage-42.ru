import { NextResponse } from "next/server";

// В продакшене используйте переменные окружения
const TELEGRAM_BOT_TOKEN = "8674335217:AAGz4GRDop_-Q6tH4AkekI8aycD654D2DFA";
const TELEGRAM_CHAT_ID = "-5256763945";

export async function POST(request) {
  try {
    const body = await request.json();
    const { service, car, phone, name } = body;

    // Валидация - проверяем наличие обязательных полей
    if (!service || !phone) {
      return NextResponse.json(
        { error: "Услуга и телефон обязательны для заполнения" },
        { status: 400 },
      );
    }

    // Определяем, откуда пришла заявка (главная форма или модалка услуг)
    let message = "";

    if (car) {
      // Заявка с главной формы Hero
      message = `
🆕 Новая заявка с главной формы!

📋 Услуга: ${service}
🚗 Автомобиль: ${car}
📞 Телефон: ${phone}
🕐 Время: ${new Date().toLocaleString("ru-RU")}
      `;
    } else if (name) {
      // Заявка из модального окна Services
      message = `
🆕 Новая заявка на услугу!

👤 Имя: ${name}
🔧 Услуга: ${service}
📞 Телефон: ${phone}
🕐 Время: ${new Date().toLocaleString("ru-RU")}
      `;
    } else {
      return NextResponse.json(
        { error: "Неверный формат данных" },
        { status: 400 },
      );
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

    return NextResponse.json({ success: true, message: "Заявка отправлена" });
  } catch (error) {
    console.error("Send to Telegram error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
