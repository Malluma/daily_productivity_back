const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const server = express();
server.use(cors());

//делаем наш парсинг в формате json
server.use(bodyParser.json());

// парсит запросы по типу: application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));

//  простой response - request
server.get("/", (req, res) => {
  res.json({ message: "Это стартовая страница нашего приложения" });
});

server.get("/test", (req, res) => {
    res.json([{name: 'john'}, {name:"Jane"}])
    }
   );

require("./app/routes/intervals.routes.js")(server);

// установить порт, и слушать запросы
server.listen(3001, () => {
  console.log("Сервер запущен на 3001 порту");
});