const mysql = require('mysql2')

const connection = mysql.createConnection({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
})

connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar com o banco de dados:', err.stack);
      return;
    }
    console.log('Conectado ao banco de dados com sucesso.');
  });
  
  module.exports = connection;
