//Importanto expressa
const express = require("express")
//Executando o express
const server = express() 

//Configurando pasta public para ficar visível
//Static é função que aguarda um argumento
//Deve ser mencionado a pasta que deseja ficar disponível
server.use(express.static("public"))

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
  return res.render("create-point.html")
})

server.get("/search", (req, res) => {
  return res.render("search-results.html")
})

//Ligando o servidor
server.listen(3000)
