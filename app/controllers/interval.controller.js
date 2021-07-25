const Interval = require("../models/interval.model.js");

//Создаем и сохраняем новый интервал
exports.create = (req, res) => {
  
  //  Валидизируем запрос
  if (!req.body) {
    res.status(400).send({
      message: "Не переданы данные в body!"
        });
  }

  let sendData = []

  req.body.forEach(element => {
    // создание интервала
    const interval = new Interval({
      value_: element.value_,
      from_: element.from_,
      to_: element.to_,
      user_id: element.user_id
    });

    Interval.create(interval, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Произошла ошибка во время выполнения кода"
        });
      else sendData.push(data);
    }); 
  });

  res.send(sendData)

};

//  Найти записи по различным параметрам
exports.read = (req, res) => {

  console.log(req.query)

  if (!req.query) {
    res.status(400).send({
      message: "Не переданы данные в query!"
    });
  }

  Interval.read(req.query, (err, data) => {

    console.log(data);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Не найдено данных по такому набору параметров: ${req.query}.`
        });
      } 
    } else res.send(data);
  });
};

// Обновление интервала по id
exports.update = (req, res) => {
  // валидизируем запрос
  if (!req.body) {
    res.status(400).send({
      message: "Не переданы данные в body!"
    });
  }

  Interval.updateById(
    req.params.intervalId,
    new Interval(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Не найден интервал с id ${req.params.intervalId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating interval with id " + req.params.intervalId
          });
        }
      } else res.send(data);
    }
  );
};

// удалить интервал по id
exports.delete = (req, res) => {
  Interval.remove(req.params.intervalId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Не найдена запись с id ${req.params.intervalId}.`
        });
      } else {
        res.status(500).send({
          message: "Не могу удалить интервал с id " + req.params.intervalId
        });
      }
    } else res.send({ message: `Интервал был успешно удален.` });
  });
};