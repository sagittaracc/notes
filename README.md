# Установка
## База данных
- Запустите сервер базы данных (MySQL)

`docker run --name notes-db -p 3307:3306 -e MYSQL_ROOT_PASSWORD=verysecret -d mysql:9`

- Создайте базу данных с именем `notes`

`docker exec -it notes-db bash`

`mysql -u root -p`

`create database notes;`

- Склонируйте репозиторий

`git clone https://github.com/sagittaracc/notes.git`

- Скопируйте файл настроек

`cp .env.local .env`

- Установите приложение

`npm install`

- Выполните миграции

`npx prisma migrate deploy`

- Запустите сборку

`npm run build`

- Запустите приложение

`npm run start`
