/**
 * Единая точка правды по контактам и интеграциям.
 */
export const site = {
  brand: 'ТАМГАБУХ',
  tagline: 'Бухгалтерия, за которую отвечаем как за свою',
  phone: '+7 (961) 545-39-19',
  phoneHref: 'tel:+79615453919',
  whatsapp: '79615453919',
  telegram: 'korney88_elista',
  max: 'https://max.ru/u/f9LHodD0cOIf0sXOypqB6GPIc2Hb2yQOi_Ls-IAmmGI8Z08hNiJJP9Nhqac',
  email: 'korney88_elista@mail.ru',
  address: 'Республика Калмыкия, г. Элиста', // TODO: адрес офиса (улица, дом), если нужен на сайте
  workHours: 'Пн–Пт 9:00–19:00, Сб 10:00–15:00 (МСК)',
  /**
   * Куда отправлять заявки: URL веб-приложения Google Apps Script (см. integrations/README.md).
   * Скрипт кладёт заявку в Google-таблицу, шлёт письмо на e-mail и сообщение в Telegram-бот.
   * Пока пусто — заявка открывает WhatsApp с готовым сообщением (работает без бэкенда).
   */
  formEndpoint: '',
  /** Общий секрет (если задан SECRET в свойствах скрипта). Не защита от людей, но отсекает случайные запросы. */
  formSecret: '',
  /** Канал, в который уходит заявка, если formEndpoint пуст или недоступен */
  fallbackChannel: 'whatsapp' as 'whatsapp' | 'telegram',
  /** Владелец / основатель */
  owner: {
    name: 'Корней Надвидов',
    fullName: 'Надвидов Корней Мергенович',
    shortName: 'Корней Мергенович',
    role: 'Основатель и руководитель ТамгаБух',
  },
  /** Свидетельство на товарный знак (Роспатент). Номер по просьбе заказчика на сайте не показываем. */
  trademark: {
    name: 'ТАМГАБУХ',
    priority: '4 февраля 2026',
    registered: '2 июня 2026',
    validUntil: '4 февраля 2036',
  },
  requisites: {
    name: 'ИП Надвидов Корней Мергенович',
    inn: '081409504874',
    ogrnip: '320081600002895',
  },
  social: {
    vk: 'https://vk.com/', // TODO
    telegramChannel: 'https://t.me/', // TODO
  },
}

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
export const tgLink = (text?: string) =>
  `https://t.me/${site.telegram}${text ? `?text=${encodeURIComponent(text)}` : ''}`
