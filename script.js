
/* Estou Logado*/

let nome = [];
let chatSheetos = [];

let nome1 = prompt("Qual seu nome:");

/*Função que pergunta o nome e manda para o axios*/
function perguntaNome(){

    let user = {
        name: nome1
    };

    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promessa.then(nomeChegou);
    promessa.catch(errou);
}
perguntaNome();
/*Função que verifica se chegou*/
function nomeChegou(resposta) {
    nome = resposta.data;
}
/*Função que verifica se ainda esta logado*/
function persistoEntaoExistoMeDaUmMisto(){
  let confirma = {
    name: nome1
  }
  axios.post('https://mock-api.driven.com.br/api/v6/uol/status', confirma);
}

setInterval(persistoEntaoExistoMeDaUmMisto, 5000);

/*Função que pega os dados*/
function pegarDadosMs() {
  const promessa = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );
  promessa.then(chegaramMs);
}
pegarDadosMs();

/*Função que verifica se errou e se o nome for repetido, repete o nome novamente*/
function errou() {
  alert("Algo de errado não esta certo");
  nome1 = prompt("Qual seu nome:");

  user = {
    name: nome1
  };
  axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promessa.then(nomeChegou);
    promessa.catch(errou);
}

/*Função que verifica se a mensagem chegou*/
function chegaramMs(resposta) {
  chatSheetos = resposta.data;
  console.log(chatSheetos);
  renderizarMs();
}

/*Função que escrola até a ultima mensagem mandada*/
function ultimaMs() {
  let chat = document.querySelector('.sheetos');
  let ultima = chat.lastElementChild;
  console.log(ultima);
  ultima.scrollIntoView();
}

/*Função que Renderiza Todas as mensagens*/
function renderizarMs() {
  const ul = document.querySelector(".sheetos");
  ul.innerHTML = "";

  for (let i = 0; i < chatSheetos.length; i++) {
    ul.innerHTML =
      ul.innerHTML +
      `
       <li class="${chatSheetos[i].type}">
          <span>[${chatSheetos[i].time}]</span>
          <span class="negrito">${chatSheetos[i].from}</span> para <span class="negrito">${chatSheetos[i].to}</span> : ${chatSheetos[i].text}
       </li>
    `;

    if(chatSheetos[i].type  === 'private_message' && nome1 === chatSheetos[i].to){
      ul.innerHTML =
      ul.innerHTML +
      `
       <li class="${chatSheetos[i].type}">
          <span>[${chatSheetos[i].time}]</span>
          <span class="negrito">${chatSheetos[i].from}</span> para <span class="negrito">${chatSheetos[i].to}</span> : ${chatSheetos[i].text}
       </li>
    `;
    }
  }
  ultimaMs();
}

setInterval(pegarDadosMs, 3000);



let elementoMensagem = "";

/*Função Para mandar a mensagem para o sheetos*/
function addSheetos() {
  // const elementoUsuario = prompt("Qual seu nome: ");
  // const elementoDestinatario = prompt("Nome do destinatário: ");
  elementoMensagem = document.querySelector('.digite-no-sheetos').value;
  console.log(elementoMensagem);
  // const elementoTipo = prompt("Qual tipo de mensagem[publico/privado]:");

  let novaMensagem = {
    from: nome1,
    to: "Todos",
    text: elementoMensagem,
    type: "message"
  };
  console.log(novaMensagem);

  let promessa = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/messages",
    novaMensagem
  );
  promessa.then(renderizarMs);
  promessa.catch(window.location.reload());

  renderizarMs();
  ultimaMs();
}