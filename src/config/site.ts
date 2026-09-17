/**
 * Единая точка правды по контактам и интеграциям.
 * TODO (перед запуском): заменить телефон, мессенджеры, адрес и реквизиты на реальные.
 */
export const site = {
  brand: 'ТАМГА',
  tagline: 'Бухгалтерия, за которую отвечаем как за свою',
  phone: '+7 (961) 000-00-00', // TODO: реальный номер
  phoneHref: 'tel:+79610000000',
  whatsapp: '79610000000', // TODO: номер без "+" для wa.me
  telegram: 'tamga_buh', // TODO: username без "@"
  max: 'https://max.ru/', // TODO: ссылка на профиль/чат в мессенджере MAX
  email: 'info@tamga-buh.ru', // TODO
  address: 'Республика Калмыкия, г. Элиста', // TODO: улица, офис
  workHours: 'Пн–Пт 9:00–19:00, Сб 10:00–15:00 (МСК)',
  /**
   * Куда отправлять заявки. Варианты:
   *  1) Formspree / любой endpoint, принимающий JSON POST — укажите URL.
   *  2) Пусто — заявка уходит в WhatsApp/Telegram готовым сообщением (работает без бэкенда).
   */
  formEndpoint: '',
  /** Основной канал, если formEndpoint пуст */
  fallbackChannel: 'whatsapp' as 'whatsapp' | 'telegram',
  requisites: {
    name: 'ООО «ТАМГА»', // TODO
    inn: '0800000000', // TODO
    ogrn: '1230800000000', // TODO
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
