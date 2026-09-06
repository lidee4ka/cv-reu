# Лидия Мялкина — CV для РЭУ

Адаптивная страница резюме: UX/UI внутренних страниц и сервисов. Редакция собрана под РЭУ им. Г. В. Плеханова. Кейсы, Behance, опыт, образование, оценка по ТЗ.

Живой адрес после публикации: **https://lidee4ka.github.io/cv-reu/**

Имя репозитория — `cv-reu`, не `cv`. Короткое `cv` оставляем свободным для другой редакции.

## Что вписать на странице Create a new repository

Откройте https://github.com/new под аккаунтом **lidee4ka** и заполните так:

| Поле | Что поставить |
| --- | --- |
| **Owner** | `lidee4ka` (уже стоит) |
| **Repository name** | `cv-reu` |
| **Description** | `CV Лидии Мялкиной: UX/UI внутренних страниц РЭУ им. Г. В. Плеханова` |
| **Choose visibility** | **Public** (уже стоит). Для бесплатных GitHub Pages репозиторий должен быть публичным. |
| **Add README** | **Off** (уже стоит) |
| **Add .gitignore** | **No .gitignore** |
| **Add license** | **No license** |

Нажмите зелёную кнопку **Create repository**. README, gitignore и лицензию не включайте: они помешают залить уже готовую папку проекта.

После создания репозиторий будет пустым. Дальше:

1. **Settings → Pages → Build and deployment → Source:** GitHub Actions.
2. Залить этот проект в `https://github.com/lidee4ka/cv-reu` (GitHub Desktop или `git push`).
3. Сайт откроется по адресу **https://lidee4ka.github.io/cv-reu/**

## Что где лежит

- Сайт CV — `index.html`, локально порт 43217
- Скриншоты — `public/sites/` и `public/cases/`
- PDF ТурГения — `public/files/`
- Тексты резюме — `yandex-disk/Резюме/` (скопировать в `C:\Users\Лидия\Yandex.Disk\Резюме\`)

## Как запустить локально

```bash
npm install
npm run dev
```

Сборка: `npm run build` → содержимое `dist/`.

## Контакты

lv@mialkina.ru · [Telegram](https://t.me/LidaMialkina) · [LinkedIn](https://www.linkedin.com/in/lidiia-mialkina/) · [Behance](https://www.behance.net/lidee4ka)  
Ярославль · удалённо · московское время (MSK)
