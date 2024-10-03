const mysql = require('mysql2')

const connection = mysql.createConnection({
  database: 'railway',
  user: 'root',
  password:'tBOUKEhVymcFkYLQsnouWEDIkcqshEAa',
  host:'junction.proxy.rlwy.net',
  port: '35011'
})

connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar com o banco de dados:', err.stack);
      return;
    }
    console.log('Conectado ao banco de dados com sucesso.');
  });
  
  module.exports = connection;
