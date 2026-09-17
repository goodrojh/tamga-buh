# ТАМГА — сайт бухгалтерских услуг (Калмыкия)

Лендинг для компании бухгалтерского сопровождения ИП и ООО. Vite + React + TypeScript + Tailwind + framer-motion.

**Демо:** https://goodrojh.github.io/tamga-buh/

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173/tamga-buh/
npm run build    # сборка в dist/
npm run deploy   # публикация на GitHub Pages (ветка gh-pages)
```

## Что заменить перед запуском

1. **`src/config/site.ts`** — телефон, WhatsApp, Telegram, e-mail, адрес, реквизиты, ссылки на соцсети.
2. **`site.formEndpoint`** — URL для приёма заявок (Formspree, свой бэкенд, Telegram-бот через прокси).
   Пока пусто — заявка открывает WhatsApp/Telegram с готовым текстом (работает без бэкенда).
3. **`src/data/pricing.ts`** — цены сопровождения взяты из прайса (колонка «Будет с учётом изменений»).
   Разовые услуги помечены `estimate: true` — это ориентиры, их нужно подтвердить.
4. **`public/media/`** — сгенерированные фото/видео (Nano Banana Pro, Kling 3.0). Портрет главбуха
   (`chief-accountant.webp`) желательно заменить на реальное фото.
5. **Кейсы** в `src/sections/Cases.tsx` — обобщённые примеры, заменить на реальные при наличии.
6. **Политика конфиденциальности** — добавить страницу/документ по ссылке `#policy`.

## Структура

- `src/sections/*` — секции страницы в порядке появления (см. `src/App.tsx`).
- `src/components/LeadModal.tsx` — единая модальная форма; любая кнопка вызывает `useLead().open({...})`
  со своим заголовком и темой заявки.
- `src/components/MobileBar.tsx` — липкая панель «Позвонить / WhatsApp / Telegram / Заявка» на мобильных.
- `src/data/pricing.ts` — матрица прайса и функция `calculate()` для калькулятора.
