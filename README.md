## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start:dev или npm run start:dev:vite - запускаем проект
```

----

# Скрипты

`start` - запуск frontend проекта через webpack,
`start:vite` - запуск frontend проекта через vite,
`start:dev` - запуск frontend проекта через webpack + запуск сервера,
`start:dev:vite` - запуск frontend проекта через vite + запуск сервера,
`start:dev:server` - запуск сервера,
`build:prod` - сборка в прод режиме,
`build:dev` - сборка в дев режиме",
`lint:ts` - проверка ts файлов линтером,
`lint:ts:fix` - исправление ts файлов линтером,
`lint:scss` - проверка scss файлов style линтером,
`lint:scss:fix` - исправление scss файлов style линтером,
`test:unit` - запуск юнит тестов с jest,
`test:ui` - запуск скриншотных тестов с loki,
`test:ui:ok` - подтверждение скриншотных тестов с loki,
`test:ui:ci` - запуск скриншотных тестов в CI,
`storybook` - запуск Storybook,
`storybook:build` - сборка Storybook билда,
`prepare` - прекоммит хуки,
`generate:slice` - скрипт для генерации FSD слайсов

----

# Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию [fsd](https://feature-sliced.design/)

----

# Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Для комфортной работы рекомендую установить плагин vscode.

Документация i18next [https://react.i18next.com/](https://react.i18next.com/)