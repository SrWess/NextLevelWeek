function populateUFs() {
  //Selecionando select do Estado
  const ufSelect = document.querySelector("select[name=uf]")

  //Fetch se trata de uma Promisse
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res =>
      //Função anônima que está retornando valor
      //Recebendo resposta da API e transformando em JSON
      //Se torna uma nova Promisse
      res.json()
    )
    .then(states => {
      //States se trata de um array de Estados
      //Para cada estado de Estados dos 27 realizar seguinte procedimento
      for(const state of states) {
        //Pegando ID do state e Nome
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

populateUFs()

//Pegando as cidade
function getCities(event) {
  //Pegando o evento selecionado, no caso pegando a cidade
  const citySelect = document.querySelector("select[name=city]")
  //Selecionando input hidden
  const stateSelect = document.querySelector("input[name=state]")
  //Pegando o ID do Estado que foi selecionado
  const ufValue = event.target.value

  //Coletando o ID do Estado
  const indexOfSelectedState = event.target.selectedIndex
  //Atualizando valor do Estado, pegando o texto e colocando no value
  stateSelect.value = event.target.options[indexOfSelectedState].text

  //URL Da API, atribuindo ID do Estado na URL
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  

  fetch(url)
    .then(res =>
      res.json()
    )
    .then(cities => {
      for(const city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
      }
      //Habilitando select Cidades
      citySelect.disabled = false;
    });
}

//Selecionando campo select Estado
document.querySelector("select[name=uf]")
  .addEventListener("change", getCities)