
/* Estou Logado*/

let nome = [];

function perguntaNome(){
    const nome = prompt("Qual seu nome:");

    let user = {
        name: nome
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

function errou(erro) {
  console.log(erro);
  alert("Algo de errado não esta certo");
}

function chegaramMs(resposta) {
  console.log(resposta);
  console.log(resposta.data);
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
       <div class="${chatSheetos[i].type}">
          <strong>${chatSheetos[i].from}</strong> para <strong>${chatSheetos[i].to}</strong>: ${chatSheetos[i].text}
       </div>
    `;
  }
}
renderizarMs();

function addSheetos() {
  // const elementoUsuario = prompt("Qual seu nome: ");
  // const elementoDestinatario = prompt("Nome do destinatário: ");
  const elementoMensagem = document.querySelector(".digite-no-sheetos");
  // const elementoTipo = prompt("Qual tipo de mensagem[publico/privado]:");

  const novaMensagem = {
    from: "João",
    to: "Matilda",
    text: elementoMensagem.value,
    type: "normais"
  };

  const promessa = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/messages",
    novaMensagem
  );
  promessa.then(pegarDadosMs);
  promessa.cath(errou);

  renderizarMs();
}