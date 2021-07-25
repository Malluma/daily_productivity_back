const sql = require("./db.js");

 // конструктор интервала
 const Interval = function(interval) {
    this.value_   = interval.value_;
    this.from_    = interval.from_;
    this.to_      = interval.to_;
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
  
      console.log("Интервал добавлен: ", { id: res.insertId, ...newInterval });
      result(null, {id: res.insertId, ...newInterval});
    });
  };

  Interval.read = (params, result) => {
    
    let sqlWhere = '';
    let values = [];

    if (params.hasOwnProperty("user_id")) {
      sqlWhere = `${sqlWhere} ${(sqlWhere === '')? 'WHERE ' : "and "} user_id = ?`;
      values.push(params.user_id);
    }

    if (params.hasOwnProperty("value_")) {
      sqlWhere = `${sqlWhere} ${(sqlWhere === '')? 'WHERE ' : "and "} value_ = ?`;
      values.push(params.value_);
    }

    if (params.hasOwnProperty("from_")) {
      sqlWhere = `${sqlWhere} ${(sqlWhere === '')? 'WHERE ' : "and "} from_ >= ?`;
      values.push(params.from_);
    }

    if (params.hasOwnProperty("to_")) {
      sqlWhere = `${sqlWhere} ${(sqlWhere === '')? 'WHERE ' : "and "} to_ <= ?`;
      values.push(params.to_);
    }
    
    sql.query(`SELECT *, 
    DATE_FORMAT(from_, '%Y-%m-%d') as day, DATE_FORMAT(from_, '%k:%i') as time, (HOUR(from_)*60 + MINUTE(from_)) as minutes FROM intervals ${sqlWhere} ORDER BY user_id, from_`, values, (err, res) => {
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

  Interval.updateById = (id, interval, result) => {
    sql.query('UPDATE intervals SET ? WHERE id_ = ?',
      [interval, id], (err, res) => {

        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
        }

        console.log("Обновлен интервал ", { id: id, ...interval });
        result(null, { id: id, ...interval});
      }
    );
  }; 

  Interval.remove = (inner_key, result) => {

    console.log("ОТЛАДКА MODEL:");
    console.log(inner_key);

    sql.query("DELETE FROM intervals WHERE id_ = ?", inner_key, (err, res) => {
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
    });
  };

  module.exports = Interval;