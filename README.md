# Riobet Landing Page & AMP 

Мобильный лендинг Riobet Casino с адаптивной версией и поддержкой Google AMP.

## Ссылки на демо (GitHub Pages)
- **Основной лендинг**: [https://lelyaler.github.io/riobet/index.html](https://lelyaler.github.io/riobet/index.html)
- **AMP-версия**: [https://lelyaler.github.io/riobet/index.amp.html](https://lelyaler.github.io/riobet/index.amp.html)

## Особенности
- **Работа без VPN**: сайт стабильно работает и доступен при отключенном VPN.
- **Скорость загрузки на мобильных устройствах**: результаты и высокую скорость загрузки на мобильных устройствах можно посмотреть на скриншоте: `Screenshot from 2026-07-28 22-04-07.png`.

![Скорость загрузки на мобильных](./Screenshot%20from%202026-07-28%2022-04-07.png)

## Стек
- HTML5 (семантическая верстка, Mobile-first)
- Vanilla CSS (Flexbox, CSS Grid)
- Vanilla JS (без jQuery и фреймворков)
- Google AMP (amp-carousel, amp-script, amp-accordion)
- Оптимизированный WebP (адаптивный picture)

## Структура
- `index.html` — основная версия лендинга
- `index.amp.html` — AMP-версия
- `assets/css/style.css` — стили проекта
- `js/script.js` — скрипты меню и копирования

## Запуск
```bash
python3 -m http.server 8000
```
Открыть http://localhost:8000/index.html или http://localhost:8000/index.amp.html
