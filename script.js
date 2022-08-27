
/* Estou Logado*/

let nome = [];

function perguntaNome(){
    let nome1 = prompt("Qual seu nome:");

    let user = {
        name: nome1
    };

    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promessa.then(nomeChegou);
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
}

function chegaramMs(resposta) {
  chatSheetos = resposta.data;
  renderizarMs();
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
          <span>${chatSheetos[i].from}</span> para : ${chatSheetos[i].text}
       </li>
    `;
  }
}
renderizarMs();

let elementoMensagem = "";

function addSheetos() {
  // const elementoUsuario = prompt("Qual seu nome: ");
  // const elementoDestinatario = prompt("Nome do destinatário: ");
  elementoMensagem = document.querySelector('.digite-no-sheetos').value;
  console.log(elementoMensagem);
  // const elementoTipo = prompt("Qual tipo de mensagem[publico/privado]:");

  let novaMensagem = {
    from: "João",
    to: "Todos",
    text: elementoMensagem,
    type: "message"
  };
  console.log(novaMensagem);

  let promessa = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/messages",
    novaMensagem
  );
  promessa.then(pegarDadosMs);
  promessa.catch(errou);

  renderizarMs();
}