const database = require('./db');

module.exports = {
  all: async function (table) {
    const connect = await database();
    const sql = `SELECT * FROM ${process.env.DATABASE_NAME}.${table}`;
    const rows = await connect.query(sql);

    let rowsList = [];

    rows[0].map((row) => {
      rowsList.push(row);
    });

    return rowsList;
  },
  find: async function (table, column, field, isFirst = false) {
    const connect = await database();
    const sql = `select * from ${table} where ${column} like '%${field}%'`;
    const rows = await connect.query(sql);

    let rowsList = [];

    rows[0].map((row) => {
      rowsList.push(row);
    });

    if (isFirst) {
      return rowsList[0];
    }

    return rowsList;
  },
}