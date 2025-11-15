const db = require("../config/db.config");

exports.query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.execute(sql, params)
      .then(([results, fields]) => {
        resolve(results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
