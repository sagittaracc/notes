## Установка
- Запустите сервер базы данных (MySQL)

`$ docker run --name notes-db -p 3307:3306 -e MYSQL_ROOT_PASSWORD=verysecret -d mysql:9`

- Создайте базу данных с именем `notes`

`$ docker exec -it notes-db bash`

`# mysql -u root -p`

`# create database notes;`

- Склонируйте репозиторий

`$ git clone https://github.com/sagittaracc/notes.git`

- Скопируйте файл настроек и отредактируйте

`$ cp .example.env .env`

- Установите приложение

`$ npm install`

- Запустите сборку

`$ npm run build`

- Переменные окружения должны быть настроены верно

`$ export DATABASE_URL=mysql://root:verysecret@localhost:3307/notes`

- Выполните миграции

`$ npx prisma migrate deploy`

- Запустите приложение

`$ npm run start`
