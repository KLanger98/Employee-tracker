const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'karl170798',
    database: 'employee_management_system_db'
  },
  console.log(`Connected to the employee_management_system_db database.`)
);

module.exports = db;