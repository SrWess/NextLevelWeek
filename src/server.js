//Importanto expressa
const express = require("express")
//Executando o express
const server = express() 
//Importando Banco de dados
const db = require('./database/db')

//Configurando pasta public para ficar visível
//Static é função que aguarda um argumento
//Deve ser mencionado a pasta que deseja ficar disponível
server.use(express.static("public"))

//Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))

//Utilizando template engine
const nunjucks = require("nunjucks")

//Primeiro argumento: Onde está os html
//Segundo argumento: um objeto
nunjucks.configure("src/views", {
  //Informando qual é o servidor express
  express: server,
  //Destivando o armazenamento de cache 
  noCache: true
})

//Configurar caminhos da aplicação
//Pagina inicial

//Primeiro parametro é /
//Segundo parametro é uma função que deve receber req e res
server.get("/", (req, res) => {
  //Req - Requisição (Pedido)
  //Res - Resposta
  //res.send > Enviando um arquivo como resposta para página inicial
  //dirname pega diretório atual
  
  //Pegando o html para realizar rendarização
  //Render já compreende que possui nunjucks no local
  //Segundo argumento de render é um objeto
  //Necessário colocar return
  return res.render("index.html", {
    //Enviando variável para index
    //Chave tem que refletir com que está na página index.html
    //Chave é como se fosse a variável
    title: "Seu marketplace de coleta de resíduos"
  })
})




server.get("/create-point", (req, res) => {
  //Req - Requisição (Pedido)
  //Res - Resposta

  //Req.query - Query Strings da nossa URL
  // console.log(req.query);

  return res.render("create-point.html")


})


server.post("/savepoint", (req, res) => {
  

  //Req.body: O corpo do nosso formulário
  // console.log(req.body);

  //Inserindo dados no banco de dados
  
  //Inserir na tabela places (os cammos) valores (os valores)
  const query = `
    INSERT INT places (
      image,
      name,
      address,
      address2,
      state, 
      city,
      items
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ];
  
  function afterInsertDate(err) {
    //Err - verificando para evitar erro
    if(err) {
      return res.render("create-point.html", {saved : false})
    }

    //Caso não tenha erro irá executar
    console.log('Cadastrado com sucesso');
    //Referenciado a resposta que o run está
    console.log(this);

    //Retornar somente após ter sido realizado o cadastro
    return res.render("create-point.html", { saved: true} )//Enviando um objeto como saved
  }
  
  //2º param Fazendo a troca dos valores por um array, em cada posição terá um valor correspondente
  //3 º param Função irá rodar após inserção no BD (callback)
  db.run(query, values, afterInsertDate); //Insere dados


  
})



server.get("/search", (req, res) => {
  const search = req.query.search

  if(search == "") {
    //Pesquisa vazia
    return res.render("search-results.html", {total: 0})
  }


  //Pegar os dados do banco de dados
  //where: Onde city é igual a search
  //Search contém a cidade
  //Variável deve ficar em aspas simples pois SQL deve entender como string
  //LIKE %valor Search% : Pode colocar qualquer valor antes ou depois, se tiver o SEARCH mencionado será mostrado
  db.all(`SELECT * FROM places WHERE city = '${search}'`, function (err, rows) {
    if(err) {
      //Verificando o erro
      return console.log(err) 
    }
    //Pegando quantidade de elementos que possui dentro do array
    const total = rows.length

    //Rows é todos os places
    //console.log(rows);
    

    //Mostrar a página com HTML e mostrar com os dados do banco de dados
    //Está na propridade com nome places
    return res.render("search-results.html", {places: rows, total}) //passando propriedade
  })

  
})

//Ligando o servidor
server.listen(3000)
