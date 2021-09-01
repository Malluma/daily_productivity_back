module.exports = app => {
  //импортируем наш контроллер, что бы можно было передать им функции по запросу
  const intervals = require("../controllers/interval.controller.js");

  app.post("/intervals", intervals.create);

  app.get("/intervals", intervals.read);

  app.delete("/intervals/:intervalId", intervals.delete);

  app.put("/intervals/update", intervals.update);

};
