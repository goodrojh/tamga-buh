// Страница «Спасибо» — тот же SPA-бандл по адресу /spasibo/ (GitHub Pages отдаёт его со статусом 200).
import { copyFileSync, mkdirSync } from 'node:fs'
mkdirSync('dist/spasibo', { recursive: true })
copyFileSync('dist/index.html', 'dist/spasibo/index.html')
console.log('postbuild: dist/spasibo/index.html created')
