//Pegando botão Pesquisar ponto de coleta
const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
  //Ao clicar no botão search realizar ação de abrir o modal
  modal.classList.remove("hide")
})

//Ação para fechar o Modal
close.addEventListener("click", () => {
  modal.classList.add("hide")
})