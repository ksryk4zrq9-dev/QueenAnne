document.addEventListener("DOMContentLoaded", () => {
  iniciarAreaCliente();
  ativarMascaraTelefoneCliente();
});

function iniciarAreaCliente() {
  const formLogin = document.getElementById("formLogin");
  const formCadastro = document.getElementById("formCadastro");

  if (formLogin) {
    formLogin.addEventListener("submit", entrarCliente);
  }

  if (formCadastro) {
    formCadastro.addEventListener("submit", cadastrarCliente);
  }

  carregarDadosClienteNaTela();

  if (window.location.pathname.includes("meus-pedidos.html")) {
    const clienteLogado = JSON.parse(localStorage.getItem("qa_cliente_logado"));

    if (!clienteLogado) {
      window.location.href = "entrar.html";
    }
  }
}

function cadastrarCliente(event) {
  event.preventDefault();

  const nome = document.getElementById("cadNome").value.trim();
  const email = document.getElementById("cadEmail").value.trim();
  const telefone = aplicarMascaraTelefone(document.getElementById("cadTelefone").value.trim());
  const senha = document.getElementById("cadSenha").value.trim();
  const confirmar = document.getElementById("cadConfirmar").value.trim();
  const newsletter = document.getElementById("cadNewsletter").checked;

  if (!nome || !email || !senha || !confirmar) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  if (senha !== confirmar) {
    alert("As senhas não conferem.");
    return;
  }

  const cliente = {
    nome,
    email,
    telefone,
    senha,
    newsletter,
    criadoEm: new Date().toISOString()
  };

  localStorage.setItem("qa_cliente_cadastro", JSON.stringify(cliente));
  localStorage.setItem("qa_cliente_logado", JSON.stringify(cliente));

  alert("Conta criada com sucesso!");
  window.location.href = "meus-pedidos.html";
}

function entrarCliente(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const senha = document.getElementById("loginSenha").value.trim();

  if (!email || !senha) {
    alert("Digite seu e-mail e senha.");
    return;
  }

  const clienteSalvo = JSON.parse(localStorage.getItem("qa_cliente_cadastro"));

  if (clienteSalvo) {
    if (clienteSalvo.email !== email || clienteSalvo.senha !== senha) {
      alert("E-mail ou senha incorretos.");
      return;
    }

    localStorage.setItem("qa_cliente_logado", JSON.stringify(clienteSalvo));
    window.location.href = "meus-pedidos.html";
    return;
  }

  const clienteTemporario = {
    nome: "Cliente",
    email,
    telefone: "",
    newsletter: false,
    criadoEm: new Date().toISOString()
  };

  localStorage.setItem("qa_cliente_logado", JSON.stringify(clienteTemporario));
  window.location.href = "meus-pedidos.html";
}

function carregarDadosClienteNaTela() {
  const cliente = JSON.parse(localStorage.getItem("qa_cliente_logado"));

  if (!cliente) return;

  const primeiroNome = cliente.nome ? cliente.nome.split(" ")[0] : "Cliente";
  const telefoneFormatado = aplicarMascaraTelefone(cliente.telefone || "");

  preencherTexto("clienteNomeTela", primeiroNome);
  preencherTexto("clienteNomeDados", cliente.nome || "Cliente Queen Anne");
  preencherTexto("clienteEmailDados", cliente.email || "cliente@email.com");
  preencherTexto("clienteTelefoneDados", telefoneFormatado || "(00) 00000-0000");
  preencherTexto("clienteEmailLista", cliente.email || "cliente@email.com");
  preencherTexto("clienteTelefoneLista", telefoneFormatado || "(00) 00000-0000");
}

function preencherTexto(id, valor) {
  const el = document.getElementById(id);

  if (el) {
    el.innerText = valor;
  }
}

function sairCliente() {
  localStorage.removeItem("qa_cliente_logado");
  window.location.href = "entrar.html";
}

function toggleSenha(id) {
  const input = document.getElementById(id);

  if (!input) return;

  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  carregarFormularioMeusDados();
  ativarMascaraTelefoneCliente();
});

function carregarFormularioMeusDados() {
  const form = document.getElementById("formMeusDados");

  if (!form) return;

  const cliente = JSON.parse(localStorage.getItem("qa_cliente_logado"));

  if (!cliente) {
    window.location.href = "entrar.html";
    return;
  }

  preencherCampo("dadosNome", cliente.nome || "");
  preencherCampo("dadosEmail", cliente.email || "");
  preencherCampo("dadosTelefone", cliente.telefone || "");
  preencherCampo("dadosCpf", cliente.cpf || "");
  preencherCampo("dadosNascimento", cliente.nascimento || "");

  const newsletter = document.getElementById("dadosNewsletter");
  if (newsletter) {
    newsletter.checked = !!cliente.newsletter;
  }

  form.addEventListener("submit", salvarMeusDados);
}

function preencherCampo(id, valor) {
  const campo = document.getElementById(id);

  if (campo) {
    campo.value = valor;
  }
}

function salvarMeusDados(event) {
  event.preventDefault();

  const clienteAtual = JSON.parse(localStorage.getItem("qa_cliente_logado")) || {};

  const clienteAtualizado = {
    ...clienteAtual,
    nome: document.getElementById("dadosNome").value.trim(),
    email: document.getElementById("dadosEmail").value.trim(),
    telefone: aplicarMascaraTelefone(document.getElementById("dadosTelefone").value.trim()),
    cpf: document.getElementById("dadosCpf").value.trim(),
    nascimento: document.getElementById("dadosNascimento").value,
    newsletter: document.getElementById("dadosNewsletter").checked
  };

  const novaSenha = document.getElementById("dadosSenha").value.trim();

  if (novaSenha) {
    clienteAtualizado.senha = novaSenha;
  }

  localStorage.setItem("qa_cliente_logado", JSON.stringify(clienteAtualizado));
  localStorage.setItem("qa_cliente_cadastro", JSON.stringify(clienteAtualizado));

  alert("Dados atualizados com sucesso!");
  window.location.href = "meus-pedidos.html";
}
document.addEventListener("DOMContentLoaded", () => {
  carregarProdutosVistosCliente();
  ativarMascaraTelefoneCliente();
});

function carregarProdutosVistosCliente() {
  const lista = document.getElementById("listaFavoritosCliente");
  const vazio = document.getElementById("favoritosVazio");

  if (!lista) return;

  const produtos = JSON.parse(localStorage.getItem("qa_produtos_vistos")) || [];

  lista.innerHTML = "";

  if (produtos.length === 0) {
    if (vazio) vazio.style.display = "block";
    return;
  }

  if (vazio) vazio.style.display = "none";

  produtos.forEach(produto => {
    const precoFormatado = formatarPrecoCliente(produto.preco);

    const card = document.createElement("article");
    card.className = "cliente-favorito-card";

    card.innerHTML = `
      <button class="cliente-favorito-remove" type="button" onclick="removerProdutoVisto('${produto.id}')">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <img src="${produto.imagem}" alt="${produto.nome}">

      <h3>${produto.nome}</h3>

      <p class="cliente-favorito-preco">${precoFormatado}</p>

      <div class="cliente-favorito-actions">
        <a href="${produto.url || 'produto.html?id=' + produto.id}" class="cliente-action-btn">Ver produto</a>
        <button type="button" class="cliente-btn-red small" onclick="adicionarProdutoVistoAoCarrinho('${produto.id}')">
          Adicionar ao carrinho
        </button>
      </div>
    `;

    lista.appendChild(card);
  });
}

function formatarPrecoCliente(preco) {
  const valor = Number(preco);

  if (Number.isNaN(valor)) {
    return preco || "Consulte";
  }

  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function removerProdutoVisto(id) {
  const produtos = JSON.parse(localStorage.getItem("qa_produtos_vistos")) || [];

  const novaLista = produtos.filter(produto => String(produto.id) !== String(id));

  localStorage.setItem("qa_produtos_vistos", JSON.stringify(novaLista));

  carregarProdutosVistosCliente();
}

function adicionarProdutoVistoAoCarrinho(id) {
  const produtos = JSON.parse(localStorage.getItem("qa_produtos_vistos")) || [];
  const produto = produtos.find(item => String(item.id) === String(id));

  if (!produto) {
    alert("Produto não encontrado.");
    return;
  }

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.push({
    id: produto.id,
    nome: produto.nome,
    preco: produto.preco,
    imagem: produto.imagem
  });

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  if (typeof atualizarContadorCarrinho === "function") {
    atualizarContadorCarrinho();
  }

  alert("Produto adicionado ao carrinho!");
}
function aplicarMascaraTelefone(valor) {
  let numeros = String(valor || "").replace(/\D/g, "");

  if (numeros.length > 11) {
    numeros = numeros.slice(0, 11);
  }

  if (numeros.length <= 2) {
    return numeros;
  }

  if (numeros.length <= 7) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  }

  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}
function ativarMascaraTelefoneCliente() {
  const camposTelefone = [
    document.getElementById("cadTelefone"),
    document.getElementById("dadosTelefone")
  ];

  camposTelefone.forEach(campo => {
    if (!campo) return;

    campo.value = aplicarMascaraTelefone(campo.value);

    campo.addEventListener("input", () => {
      campo.value = aplicarMascaraTelefone(campo.value);
    });
  });
}