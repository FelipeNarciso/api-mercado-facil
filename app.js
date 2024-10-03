// app.js
const express = require('express');
const connection = require('./db'); // Importe a conexão com o banco de dados
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json()); // Isso é necessário para que o Express entenda JSON

const port = process.env.PORT || 3001;


app.get('/', (req, res) => {
  return res.json("Hello World")
});
app.get('/api/all_users', (req, res) => {
  // Exemplo de uma query para buscar dados do banco
  const query = 'SELECT * FROM usuarios';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Erro ao buscar usuários: ' + error);
    }
    res.json(results); // Retorna os dados em formato JSON
  });
});

app.post('/api/users', (req, res) => {

  const { email, senha} = req.body;
  // Exemplo de uma query para buscar dados do banco
  const query = 'SELECT emailUsuario, senhaUsuario FROM usuarios WHERE emailUsuario = ? AND senhaUsuario = ?';
  connection.query(query, [email, senha], (error, results) => {
    if (error) {
      return res.status(500).send('Erro ao buscar usuários: ' + error);
    }

    if(results.length == 0){
     return res.json({usuarioEncontrado: false})
    }

    res.json({usuarioEncontrado: true})
  });
});


app.post('/api/cadastrar', (req, res) => {
    const { nome, email, senha} = req.body; // Altere os nomes aqui

    const query = 'INSERT INTO usuarios (nomeUsuario, emailUsuario, senhaUsuario) VALUES (?, ?, ?)';


    connection.query(query, [nome, email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            return res.status(500).json({ error: 'Erro ao inserir usuário' });
        }
        res.status(201).json({ message: 'Usuário inserido com sucesso', userId: result.insertId });
    });
});

app.delete('/api/deletar', (req, res) => {
  const { nome } = req.body; // Recebe o nome do usuário a ser deletado

  const query = 'SELECT idUsuario FROM usuarios WHERE nomeUsuario = ?';
  
  connection.query(query, [nome], (err, results) => {
      if (err) {
          console.error('Erro ao buscar usuário:', err);
          return res.status(500).json({ error: 'Erro ao buscar usuário' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const id = results[0].idUsuario

      const query2 = 'DELETE FROM usuarios WHERE idUsuario = ?';
      
      connection.query(query2, [id], (err, result) => {
          if (err) {
              console.error('Erro ao deletar usuário:', err);
              return res.status(500).json({ error: 'Erro ao deletar usuário' });
          }

          res.status(200).json({ message: 'Usuário deletado com sucesso' });
      });
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
