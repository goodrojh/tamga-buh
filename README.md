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

1. **`src/config/site.ts`** — Telegram-username, ссылка на MAX (`site.max`), адрес офиса, соцсети. Телефон, e-mail и реквизиты уже реальные.
2. **`site.formEndpoint`** — URL веб-приложения Google Apps Script. Полная инструкция (Telegram-бот, Google-таблица с лидами,
   письма на почту): **[integrations/README.md](integrations/README.md)**. Пока пусто — заявка открывает WhatsApp с готовым текстом.
3. **`src/data/pricing.ts`** — цены сопровождения взяты из прайса (колонка «Будет с учётом изменений»).
   Разовые услуги помечены `estimate: true` — это ориентиры, их нужно подтвердить.
4. **`public/media/`** — сгенерированные фото/видео (Nano Banana Pro, Kling 3.0). Фото владельца (`owner.webp`) и
   1-я страница свидетельства на товарный знак (`trademark.webp`) — реальные.
   **`site.owner.name`** — сейчас только фамилия «Надвидов», добавить имя и отчество.
5. **Кейсы** в `src/sections/Cases.tsx` — обобщённые примеры, заменить на реальные при наличии.
6. **Политика конфиденциальности** — добавить страницу/документ по ссылке `#policy`.

## Структура

- `src/sections/*` — секции страницы в порядке появления (см. `src/App.tsx`).
- `src/components/LeadModal.tsx` — единая модальная форма; любая кнопка вызывает `useLead().open({...})`
  со своим заголовком и темой заявки.
- `src/components/Navbar.tsx` — фиксированное меню (ширина = ширине контента).
- `src/components/MobileBar.tsx` — липкая панель «Позвонить / WhatsApp / Telegram / MAX / Заявка» на мобильных.
- `src/components/ArticleModal.tsx` + `src/data/articles.ts` — статьи блога, открываются в окне с начала.
- `src/data/pricing.ts` — матрица прайса и функция `calculate()` для калькулятора.
