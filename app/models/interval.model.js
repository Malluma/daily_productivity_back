const sql = require("./db.js");

 // конструктор интервала
 const Interval = function(interval) {
    this.activity_type   = interval.activity_type;
    this.interval_start    = interval.interval_start;
    this.user_id = interval.user_id;
  }

  Interval.create = (newInterval, result) => {
    sql.query("INSERT INTO intervals SET ?", newInterval, (err, res) => {
      //операция вставки из SQL
      if (err) {
        console.log("error: ", err);
        result(err, null);
        //немного бедная обработка ошибок, но на первое время хватит
        return;
      }
  
      //console.log("Интервал добавлен: ", { id: res.insertId, ...newInterval });
      console.log("Интервал добавлен: ", newInterval);
      result(null, newInterval);
    });
  };

  Interval.read = (params, result) => {
    
    let sqlWhere = '';
    let values = [];

    if (params.hasOwnProperty("user_id")) {
      sqlWhere = `${sqlWhere} ${(sqlWhere === '')? 'WHERE ' : "and "} user_id = ?`;
      values.push(params.user_id);
    }

    if (params.hasOwnProperty("activity_type")) {
      sqlWhere = `${sqlWhere} ${(sqlWhere === '')? 'WHERE ' : "and "} activity_type = ?`;
      values.push(params.activity_type);
    }

    if (params.hasOwnProperty("interval_start")) {
      sqlWhere = `${sqlWhere} ${(sqlWhere === '')? 'WHERE ' : "and "} interval_start >= ?`;
      values.push(params.interval_start);
    }
    
    sql.query(`SELECT *, 
    DATE_FORMAT(interval_start, '%Y-%m-%d') as day, DATE_FORMAT(interval_start, '%k:%i') as time, (HOUR(interval_start)*60 + MINUTE(interval_start)) as minutes FROM intervals ${sqlWhere} ORDER BY user_id, interval_start`, values, (err, res) => {
      //операция вставки из SQL
      if (err) {
        console.log("error: ", err);
        result(err, null);
        //немного бедная обработка ошибок, но на первое время хватит
        return;
      }

      console.log("Данные успешно прочитаны по параметрам: ", params);
      result(null, res);
    });
  };

Interval.update = (interval, result) => {
  sql.query('UPDATE intervals SET activity_type = ? WHERE user_id = ? AND interval_start = ?',
    [interval.activity_type, interval.user_id, interval.interval_start], (err, res) => {

      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Обновлен интервал ", { activity_type: interval.activity_type, ...interval });
      result(null, { activity_type: interval.activity_type, ...interval });
    }
  );
};

  Interval.remove = (inner_key, result) => {

    /*sql.query("DELETE FROM intervals WHERE id_ = ?", inner_key, (err, res) => {
      if (err) {
        console.log("error: ", err); 
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        //  если интервал не удалось получить по inner_key
        result({ kind: "не найдено" }, null);
        return;
      }
  
      console.log("Удален интервал с id ", inner_key);
      result(null, res);
    }); */
  };

  module.exports = Interval;