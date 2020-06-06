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
  
  //Realizando a limpeza do conteúdo citySelect
  citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
  //Desabilitando o campo cidade
  citySelect.disabled = true;

  fetch(url)
    .then(res =>
      res.json()
    )
    .then(cities => {
      for(const city of cities) {
        //Pegando nome da cidade para realizar o salvamento
        //Vai coletar o nome do Estado e a Cidade
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }
      //Habilitando select Cidades
      citySelect.disabled = false;
    });
}

//Selecionando campo select Estado
document.querySelector("select[name=uf]")
  .addEventListener("change", getCities)

// Itens de coleta

//Pegando todos li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

//Para cada item capturado será realizado uma ação
for(const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

//Pegando input hidden que irá armazenar os items de coleta que foi selecionado
const collectedItems = document.querySelector("input[name=items]")

//Itens selecionados
let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target

  //Adicionar ou remover classe do itemLi
  //Caso não tenha classe ele adiciona
  //Caso tenha classe selected ele retira  
  itemLi.classList.toggle("selected")


  //Coletando data-id
  const itemId = itemLi.dataset.id;

  //console.log('ITEM ID', itemId);
  

  //Verificar se existe items selecionado, se sim
  //Pegar os itens selecionados

  const alreadySelected = selectedItems.findIndex(item => {
    //Para cada item que for coletado será realizado procedimento
    return item == itemId //Retorna true ou false
  })

  //Se já estiver selecionado, tirar da seleção
  //-1 Não está selecionado

  //Se alreadySelected for maior ou igual a 0 então já possui index selecionado
  if(alreadySelected >= 0) {
    //Tirando da seleção que está no array
    const filteredItems = selectedItems.filter(item => {
      //Caso retorne false retira ele do novo array, sendo filtrado
      //Caso retorne true adiciona ele no novo array (itemIsDifferente)
      const itemIsDifferente = item != itemId
      return itemIsDifferente
    })

    //Recebendo os itens filtrados
    selectedItems = filteredItems
    
  } else {
    //Se não estiver selecionado, adicionar à seleção
    selectedItems.push(itemId)
  }
 
  //console.log('SELECIONADOS', selectedItems);

  //Atualizando o campo escondido com os itens selecionados
  collectedItems.value = selectedItems

}