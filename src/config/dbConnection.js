const mysql = require('mysql');

module.exports = () => {
  return mysql.createConnection({
    host: '192.168.3.10',
    port : 3306,
    user: 'root',
    password: 'root',
    database: 'sdtienda'
  });
}