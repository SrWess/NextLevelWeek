//Configuração do Banco de dados

//Importação da dependencia do sqlite3
//Retorna um objeto / verbose é um método para ver mensagem no console
const sqlite3 = require("sqlite3").verbose();

//Criação do objeto que irá fazer operações no banco de dados
//Iniciando um novo Objeto para db
//Criação de um Banco de dados no caminho mencionado
const db = new sqlite3.Database("./src/database/database.db"); //Constructor ou Classe

//Exportando DB
module.exports = db

//Utilizar o objeto de banco de dados para nossa operações
//Seriealize > Informa que irá executar uma sequencia de código
db.serialize(() => {
  //Utilizando comandos SQL:

  //1 Criar uma tabela para o Banco de dados

  // db.run(`
  //   CREATE TABLE IF NOT EXISTS places (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     image TEXT,
  //     name TEXT,
  //     address TEXT,
  //     address2 TEXT,
  //     state TEXT,
  //     city TEXT,
  //     items TEXT
  //   );
  // `);

  // //2 Inserir dados na tabela

  // //Inserir na tabela places (os cammos) valores (os valores)
  // const query = `
  //   INSERT INTO places (
  //     image,
  //     name,
  //     address,
  //     address2,
  //     state, 
  //     city,
  //     items
  //   ) VALUES (?, ?, ?, ?, ?, ?, ?);
  // `;

  // const values = [
  //   "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
  //   "Papersider",
  //   "Guilherme Gemballa, Jardim América",
  //   "Nº 260",
  //   "Santa Catarina",
  //   "Rio do Sul",
  //   "Papéis e Papelão"
  // ];
  
  // function afterInsertDate(err) {
  //   //Err - verificando para evitar erro
  //   if(err) {
  //     return console.log(err) //Verificando o erro
  //   }

  //   //Caso não tenha erro irá executar
  //   console.log('Cadastrado com sucesso');
  //   //Referenciado a resposta que o run está
  //   console.log(this);
  // }
  
  // //2º param Fazendo a troca dos valores por um array, em cada posição terá um valor correspondente
  // //3 º param Função irá rodar após inserção no BD (callback)
  // db.run(query, values, afterInsertDate); //Insere dados

  //3 Consultar os dados da tabela
  //1 arg - query sql (Selecionar todas os campos da tabela places )
  //2 arg - Callback (err e rows para registros)
  // * Pode trocar pelo registro que deseja buscar
  // db.all(`SELECT * FROM places`, function (err, rows) {
  //   //Rows é os registros da tabela que vem no formato de array
  //   if(err) {
  //     //Verificando o erro
  //     return console.log(err) 
  //   }

  //   //Caso não tenha erro
  //   console.log('Aqui estão os seus registros');
  //   console.log(rows); //Vendo os registros
    
    
  // })

  //4 Deletar um dado da tabela
  //Deletando registro onde o ID é igual a 1
  // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
  //   if(err) {
  //     //Verificando o erro
  //     return console.log(err) 
  //   }

  //   //Se funcionar sem erros
  //   console.log('Registro deletado com sucesso!');
    
  // }) 
});


