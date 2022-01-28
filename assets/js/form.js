function testaFormulario(e) {
  //PREVINE A AÇÃO PADRÃO DO EVENTO.
  e.preventDefault();

  /* EDITA CAMPO TELEFONE */

  //TESTA O CAMPO TELEFONE SEM EXPRESSÃO REGULAR.
  //GARANTE QUE APENAS NÚMEROS VÃO CONTER NO CAMPO.
  // for (i in e.target.elements["phone"].value) {
  //   if ("0123456789".indexOf(e.target.elements["phone"].value[i]) == -1) {
  //     alert("Apenas número são permitidos no campo telefone!");
  //     return false;
  //   }
  // }

  //PHONEPATTER = TELEFONE PADRÃO
  //CONDIÇÃO QUE IDENTIFICA SE POSSUI NÚMEROS PARA QUE SE MANTENHA APENAS COM NÚMEROS.
  //O SINAL DE ˆ É DE NEGAÇÃO, ENTÃO TUDO QUE NÃO TIVER NA LISTA ELE IRÁ BLOQUEAR.
  //COM O SINAL DE + ELE PEGA TODO O CONTEÚDO.
  var phonePattern = /[^0-9-() ]+/g;
  if (phonePattern.test(e.target.elements["phone"].value)) {
    alert("Apenas números são permitidos no campo telefone!");
    return false;
  }

  //TESTE DO CAMPO TELEFONE QUE VERIFICA SE O NÚMERO ESTÁ CORRETO COM MAIS DE 11 NÚMEROS.
  //replace vai tirar todos os caracteres para verificar se os números são condizentes a mais que 11
  if (e.target.elements["phone"].value.replace(/[-()]/g, "").length < 11) {
    alert("Número inválido!");
    return false;
  }

  //EXPRESSÃO REGULAR NO CAMPO TELEFONE
  //CONDIÇÃO QUE IDENTIFICA LETRAS PARA QUE TENHA SOMENTE NÚMEROS NO CAMPO TELEFONE.
  /* var temLetras = e.target.elements["phone"].value.match(/[a-z A-Z]/g);
  if (temLetras && temLetras.length) {
    alert("Apenas números são permitidos no campo telefone!");
    return false;
  }
 */
  //LOCALSTORAGE
  var peopleRaw = localStorage.getItem("people");
  if (peopleRaw != null) {
    var people = JSON.parse(peopleRaw);
  } else {
    var people = [];
  }

  /* EDITANDO TABELA COM A PÁGINA CADASTRO */

  //IF PARA EDITAR UM OBJETO JÁ CRIADO
  if (id !== null) {
    people[id] = {
      name: e.target.elements["name"].value,
      tel: e.target.elements["phone"].value,
      xp: e.target.elements["xp"].value == "true",
    };
  } else {
    //PUSH ADICIONA UM ELEMENTO NOVO.
    people.push({
      name: e.target.elements["name"].value,
      tel: e.target.elements["phone"].value,
      xp: e.target.elements["xp"].value == "true",
      //PUXA OS ELEMENTOS DA PÁGINA CADASTRO.
    });
  }
  //USA A VARIÁVEL CRIADA DENTRO DE "peopleRaw" E A VARIÁVEL CRIADA EM SCRIPT.JS "people"
  localStorage.setItem("people", JSON.stringify(people));

  document.getElementById("goHome").click();
}

//PEGA A INFORMAÇÃO DA URL
var urlPrincipal = new URL(window.location.href);

//UNE A URL COM O OBJETO CRIADO
var id = urlPrincipal.searchParams.get("person");

//SE O ID FOR DIFERENTE DE NULL
if (id !== null) {
  //GARANTE QUE EXISTA UMA VARIÁVEL COM O LOCALSTORAGE
  var peopleRaw = localStorage.getItem("people");
  if (peopleRaw != null) {
    var people = JSON.parse(peopleRaw);
  } else {
    var people = [];
  }

  //EDITA OS INPUTS DO FORMULÁRIO PARA QUE PUXE A INFORMAÇÃO DA TABELA
  document.getElementById("name").value = people[id].name;
  document.getElementById("phone").value = people[id].tel;
  if (people[id].xp) {
    document.getElementById("xp-yes").checked = true;
  } else {
    document.getElementById("xp-no").checked = true;
  }
}

//FUNÇÃO PRA ADICIONAR SOMENTE NÚMEROS NO CAMPO TELEFONE.
function testaCampoTelefone(e) {
  e.preventDefault();
  console.log(e);

  //MÁSCARAS PARA O CAMPO TELEFONE.

  if (e.target.value.length == 0) {
    e.target.value += "(";
  }

  if (e.target.value.length == 3) {
    e.target.value += ")";
  }
  if (e.target.value.length == 4) {
    e.target.value += " ";
  }

  if (e.target.value.length == 10) {
    e.target.value += "-";
  }

  //O CAMPO IRÁ POSSUIR SOMENTE NÚMERO E O TAMANHO DO CAMPO IRÁ SER DE 15 CARACTERES.
  if (/[0-9]/g.test(e.key) && e.target.value.length < 15) {
    e.target.value += e.key;
  }
}

//FUNÇÃO PRA TESTAR SE O CAMPO DO TELEFONE ESSA CERTO, SE NÃO ELE SOLTA UM AVISO QUE ESTÁ INCORRETO.
/* function testaCampoTelefone(texto) {
  var phonePattern = /[^0-9 ()]+/g;
  if (phonePattern.test(texto)) {
    alert("Apenas números são permitidos no campo telefone!");
    return false;
  }
} */
