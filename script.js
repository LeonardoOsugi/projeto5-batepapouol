
/* Estou Logado*/

let nome = [];

let nome1 = prompt("Qual seu nome:");

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

function nomeChegou(resposta) {
    nome = resposta.data;
}


/* Tentativa Falha de Enviar menssagem, mas veja pelo lado bom pelo menos agora aparece alguma coisa no sheetos */
let chatSheetos = [];

function pegarDadosMs() {
  const promessa = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );
  promessa.then(chegaramMs);
}
pegarDadosMs();

function errou() {
  alert("Algo de errado não esta certo");
  nome1 = prompt("Qual seu nome:");

  user = {
    name: nome1
  };
  axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promessa.then(nomeChegou);
}

function chegaramMs(resposta) {
  chatSheetos = resposta.data;
  console.log(chatSheetos);
  renderizarMs();
}

function ultimaMs() {
  let chat = document.querySelector('.sheetos');
  let ultima = chat.lastElementChild;
  console.log(ultima);
  ultima.scrollIntoView();
}

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

/*while(chatSheetos.type !== 'status' && chatSheetos.text !== 'sai da sala...'){
  setTimeout(renderizarMs, 3000);
}*/



let elementoMensagem = "";

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
  promessa.catch(errou);

  renderizarMs();
  ultimaMs();
}