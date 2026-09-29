// Страница «Спасибо» — тот же SPA-бандл по адресу /spasibo/ (хостинг отдаёт его со статусом 200).
import { copyFileSync, mkdirSync } from 'node:fs'

const out = process.argv[2] || 'dist'
mkdirSync(`${out}/spasibo`, { recursive: true })
copyFileSync(`${out}/index.html`, `${out}/spasibo/index.html`)
console.log(`postbuild: ${out}/spasibo/index.html created`)
