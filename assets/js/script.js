/* FOI CRIADA A VARIÁVEL "PEOPLE" PARA QUE GUARDE AS INFORMAÇÕES DAS PESSOAS. */
/* A VARIÁVEL "PEOPLE" ESTÁ COM UM ARRAY "[]" E DENTRO DESSE ARRAY TEMOS OBJETOS "{}". */

//CRIA O LOCALSTORAGE
var peopleRaw = localStorage.getItem("people");
if (peopleRaw !== null) {
  var people = JSON.parse(peopleRaw);
} else {
  var people = [];
}

//FUNÇÃO QUE EDITA A TABELA SE CASO FOR REMOVIDO UM ITEM DELA.
function desenhaTabela() {
  currentLines = [
    ...document.querySelectorAll("table.lista tbody .dinamic-content"),
  ];
  // O "FOREACH" TRAZ O ELEMENTO INTEIRO.
  // O "(() => {})" É O AERO FUNCTION A VANTAGEM DELE É QUE OS ITENS DA FUNÇÃO PODEM SER USADOS FORA DA FUNÇÃO EM COMPARAÇÃO
  // A FUNÇÃO QUE SÓ SE PODE USAR DENTRO DELA.
  // DENTRO DO PARÂMETRO DO "FOREACH" SEMPRE SERÁ "ELEMENT" COMO PADRÃO.
  currentLines.forEach((element) => {
    element.remove();
  });

  /* console.log(document.querySelector("table.lista tbody").innerHTML); */
  /* USAR "TABLE.LISTA" É CRIAR UMA TABELA COM O TABLE E OBTER O CONTEÚDO DA "LISTA" QUE NO CASO É O NOME QUE DEMOS A CLASSE. */
  /* USAR O INNERHTML É OBTER O CONTEÚDO DENTRO DA TAG. */

  for (person in people) {
    // USANDO "PERSON" SIGNIFICA QUE É UM ÍNDICE DOS OBJETOS.
    // USANDO PEOPLE[PERSON] SIGNIFICA QUE É UM OBJETO
    // TR E TD É UMA TABELA COM SUA LISTA SENDO "TR" A TABELA E "TD" ITENS DA LISTA.
    document.querySelector("table.lista tbody").innerHTML += ` 
    <tr class="dinamic-content" style="background-color: ${
      person % 2 === 0 ? "#fff" : "#eee"
    }">

      <td> 
        ${people[person].name}
      </td>

      <td> 
        ${people[person].tel}
      </td>

      <td>
        ${
          people[person].xp
            ? "<strong style=color:green>Sim</strong>"
            : "<strong style=color:red>Não</strong>"
        } 
        
      </td>

      
      <td>
        <button onclick="deleteUser(${person})"> Excluir </button>
        <a href="../../formulario.html?person=${person}"> Editar </a>
     </td>

  </tr>`;
    //A FUNÇÃO ONCLICK NO BOTÃO É ACONTECER ALGO QUANDO FOR CLICADO, SELECIONANDO A VARIÁVEL "PEOPLE" E COLOCANDO ".SPLICE"
    //SPLICE ADICIONA OU REMOVE ENTRE OUTRAS FUNÇÕES EXISTENTES, ASSIM SELECIONANDO O OBJETO E A QUANTIDADE A SE MANIPULAR
  }
}

//Função criada para usar as funções criadas de deletar usuário e localStorage.
function deleteUser(p) {
  people.splice(p, 1);
  desenhaTabela();
  localStorage.setItem("people", JSON.stringify(people));
}
//A FUNÇÃO "desenhaTabela" FOI ADICIONADA AO BOTÃO PARA PODER FUNCIONAR TODA A FUNÇÃO CRIADA DE REMOÇÃO
desenhaTabela();

// O SINAL DE `` SERVE PARA COMENTAR QUALQUER TIPO DE CONTEÚDO QUE POSSUA SEJA LÁ QUAL FOR.

// O sinal += serve para ir adicionando mais conteúdo que tenha na lista além do primeiro, até acabar o conteúdo.

//        ${people[person].name}
//        AQUI O CAMINHO SERIA (PEOPLE -> PERSON(OBJETO) -> (.name) UM DOS ATRIBUTOS QUE TEM DENTRO DO OBJETO.

// O SINAL DE " ? " SERIA COMO O IF, JÁ O SINAL " : " SERIA COMO O ELSE.

// console.log(people[person].name); PEOPLE É O ARRAY, PERSON É UM OBJETO DENTRO DA ARRAY E NAME É O TIPO DE VARIÁVEL DENTRO DO OBJETO
