document.addEventListener("DOMContentLoaded", function () {
  // ===== CARREGAR HEADER E FOOTER =====
  const headerEl = document.getElementById("header");
  const footerEl = document.getElementById("footer");

  if (headerEl) {
    fetch("header.html")
      .then(res => {
        if (!res.ok) throw new Error("Header não encontrado");
        return res.text();
      })
      .then(html => {
  headerEl.innerHTML = html;

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const contador = document.getElementById("contadorCarrinho");

  if (contador) {
    contador.innerText = carrinho.length;
  }


  // Atualiza o contador depois que o header já existe na tela
  atualizarContadorCarrinho();

  // Ativa a busca nas páginas que usam apenas script.js
  if (!document.querySelector('script[src="busca-inteligente.js"]')) {
    const buscaScript = document.createElement("script");
    buscaScript.src = "busca-inteligente.js";
    document.body.appendChild(buscaScript);
  }
})
      .catch(err => console.error("Erro ao carregar header:", err));
  }

  if (footerEl) {
    fetch("footer.html")
      .then(res => {
        if (!res.ok) throw new Error("Footer não encontrado");
        return res.text();
      })
      .then(html => {
        footerEl.innerHTML = html;
      })
      .catch(err => console.error("Erro ao carregar footer:", err));
  }
  // ===== PRODUTOS =====
  const produtos = [
    { id: 1, nome: "PlayStation 5 (PS5)Slim 1TB", preco: 497.90, categoria: "Consoles", images: ["img/imgps5.jpg"], desc: "Console PlayStation 5 Slim com 1TB.", video: "https://www.youtube.com/embed/RkC0l4iekYo" },
    { id: 2, nome: "TV LED Samsung 32 Smart", preco: 119.90, categoria: "TVs", images: ["img/tv-samsung-32.jpg"], desc: "Smart TV Samsung 32 polegadas." },
    { id: 4, nome: "Ar Gree 24000 BTU", preco: 599.00, categoria: "Eletrodomésticos", images: ["img/ar-gree-24000.jpg"], desc: "Ar-condicionado Gree 24000 BTU." },
    { id: 5, nome: "Ar Smartfy 12000 BTU", preco: 234.99, categoria: "Eletrodomésticos", images: ["img/ar-smartfy-12000.jpg"], desc: "Ar Smartfy 12000 BTU." },
    { id: 6, nome: "TV LED 32” Marson MAS32 Smart Android", preco: 79.99, categoria: "TVs", images: ["img/tv-32-marson.jpg"], desc: "Smart TV LED Marson 32 polegadas com sistema Android.", video: "" },
    { id: 7, nome: "Panela de Arroz Smartfy", preco: 17.50, categoria: "Eletrodomésticos", images: ["img/panela-arroz.jpg"], desc: "Panela elétrica Smartfy." },
    { id: 8, nome: "Perfume Intrude EDP", preco: 13.99, categoria: "Perfumes", images: ["img/intrude.jpg"], desc: "Perfume Intrude Eau de Parfum." },
    { id: 9, nome: "Perfume Mont Blanc Signature", preco: 38.50, categoria: "Perfumes", images: ["img/montblanc.jpg"], desc: "Mont Blanc Signature EDP." },
    { id: 10, nome: "Chave de Impacto Dewalt", preco: 249.99, categoria: "Ferramentas", images: ["img/dewalt.jpg"], desc: "Chave de impacto Dewalt." },
    { id: 11, nome: "Amazon Fire TV Stick", preco: 20.00, categoria: "Eletrônicos", images: ["img/fire-tv.jpg"], desc: "Fire TV Stick HD." },
    { id: 12, nome: "Robot Xiaomi X20", preco: 520.00, categoria: "Eletrônicos", images: ["img/robot-xiaomi.jpg"], desc: "Aspirador robô Xiaomi X20." },
    { id: 13, nome: "Xiaomi Poco M7", preco: 189.00, categoria: "Celulares", images: ["img/poco-m7.jpg"], desc: "Smartphone Xiaomi Poco M7." },
    { id: 14, nome: "Samsung A36", preco: 279.00, categoria: "Celulares", images: ["img/samsung-a36.jpg"], desc: "Samsung Galaxy A36." },
    { id: 15, nome: "Ventilador Mondial", preco: 29.00, categoria: "Eletrodomésticos", images: ["img/ventilador-mondial.jpg"], desc: "Ventilador Mondial 40cm." },
    { id: 18, nome: "Amazon Fire TV Stick HD (2024)", preco: 30.50, categoria: "Eletrônicos", images: ["img/fire-tv-2024.jpg"], desc: "Fire TV Stick HD versão 2024." },
    { id: 19, nome: "Receptor IPTV BTV13 4K", preco: 148.90, categoria: "Eletrônicos", images: ["img/btv13.jpg"], desc: "Receptor IPTV BTV13 com suporte 4K." },
    { id: 20, nome: "Projetor Smartfy PJ01W", preco: 49.00, categoria: "Eletrônicos", images: ["img/projetor-smartfy.jpg"], desc: "Projetor Smartfy modelo PJ01W." },
    { id: 21, nome: "Tablet TCL 11\" 4GB/128GB", preco: 145.00, categoria: "Eletrônicos", images: ["img/tablet-tcl-11.jpg"], desc: "Tablet TCL 11 polegadas com 128GB." },
    { id: 22, nome: "Microfone Audisat X Vlog", preco: 18.00, categoria: "Eletrônicos", images: ["img/microfone-audisat.jpg"], desc: "Microfone Audisat X para vlog." },
    { id: 23, nome: "Câmera Xiaomi Outdoor AW300", preco: 36.90, categoria: "Eletrônicos", images: ["img/xiaomi-aw300.jpg"], desc: "Câmera de segurança Xiaomi Outdoor AW300." },
    { id: 24, nome: "Ar Climax 18000 BTU Inverter", preco: 455.00, categoria: "Eletrodomésticos", images: ["img/ar-climax-18000.jpg"], desc: "Ar-condicionado Climax 18000 BTU Inverter." },
    { id: 25, nome: "Air Fryer RCA 3L", preco: 20.00, categoria: "Eletrodomésticos", images: ["img/airfryer-rca.jpg"], desc: "Air Fryer RCA com capacidade de 3 litros." },
    { id: 26, nome: "Jarra Elétrica Maryland", preco: 15.50, categoria: "Eletrodomésticos", images: ["img/jarra-maryland.jpg"], desc: "Jarra elétrica Maryland." },
    { id: 27, nome: "Moedor de Café Electrobras", preco: 33.00, categoria: "Eletrodomésticos", images: ["img/moedor-electrobras.jpg"], desc: "Moedor de café Electrobras." },
    { id: 28, nome: "Solda Energy Inverter 100A", preco: 35.00, categoria: "Ferramentas", images: ["img/solda-energy.jpg"], desc: "Solda Energy Inverter 100A." },
    { id: 29, nome: "Esmerilhadeira Dewalt DCG412B", preco: 129.99, categoria: "Ferramentas", images: ["img/esmerilhadeira-dewalt.jpg"], desc: "Esmerilhadeira Dewalt DCG412B." },
    { id: 30, nome: "Parafusadeira Dewalt DCD796D2", preco: 240.00, categoria: "Ferramentas", images: ["img/parafusadeira-dewalt.jpg"], desc: "Parafusadeira/Furadeira Dewalt." },
    { id: 31, nome: "Dream Brand G-021 80ml", preco: 8.90, categoria: "Perfumes", images: ["img/dream-g021.jpg"], desc: "Perfume Dream Brand G-021." },
    { id: 32, nome: "Dream Brand G-181 100ml", preco: 8.50, categoria: "Perfumes", images: ["img/dream-g181.jpg"], desc: "Perfume Dream Brand G-181." },
    { id: 33, nome: "Azzaro Pour Homme EDT", preco: 24.39, categoria: "Perfumes", images: ["img/azzaro.jpg"], desc: "Perfume Azzaro Pour Homme." },
    { id: 34, nome: "Sistelle Paris Venitiene", preco: 22.90, categoria: "Perfumes", images: ["img/sistelle.jpg"], desc: "Perfume Sistelle Paris Venitiene." },
    { id: 35, nome: "Lattafa Queen of Arabia", preco: 24.50, categoria: "Perfumes", images: ["img/lattafa-queen.jpg"], desc: "Perfume Lattafa Queen of Arabia." },
    { id: 36, nome: "Lattafa Khamrah", preco: 14.75, categoria: "Perfumes", images: ["img/lattafa-khamrah.jpg"], desc: "Perfume Lattafa Khamrah." },
    { id: 37, nome: "Camiseta Adidas", preco: 22.00, categoria: "Outros", images: ["img/camiseta-adidas.jpg"], desc: "Camiseta Adidas." },
    { id: 38, nome: "Tênis Adidas Infantil", preco: 33.00, categoria: "Outros", images: ["img/tenis-adidas-infantil.jpg"], desc: "Tênis Adidas Infantil." },
    { id: 40, nome: "Maleta 8kg", preco: 12.50, categoria: "Outros", images: ["img/maleta.jpg"], desc: "Maleta de viagem 8kg." },
    { id: 41, nome: "Colchão Inflável Intex", preco: 16.99, categoria: "Outros", images: ["img/colchao-intex.jpg"], desc: "Colchão inflável Intex." },
    { id: 42, nome: "TV LED 40” Marson MAS40 Smart Android", preco: 122.99, categoria: "TVs", images: ["img/tv-40-marson.jpg"], desc: "Smart TV LED Marson 40 polegadas com sistema Android.", video: "" },
    { id: 43, nome: "TV LED 50” Marson MAS50 Smart Android", preco: 199.99, categoria: "TVs", images: ["img/tv-50-marson.jpg"], desc: "Smart TV LED Marson 50 polegadas com sistema Android.", video: "" },
    { id: 44, nome: "Ar Midea 24000 BTU Inverter com Kit", preco: 620.00, categoria: "Ar Condicionado", images: ["img/ar-midea-24000.jpg"], desc: "Ar-condicionado Midea 24000 BTU inverter com kit de instalação.", video: "" },
    { id: 45, nome: "Ar Clímax 12000 BTU Inverter Wi-Fi com Kit", preco: 310.00, categoria: "Ar Condicionado", images: ["img/ar-climax-12000.jpg"], desc: "Ar-condicionado Clímax 12000 BTU inverter com Wi-Fi e kit.", video: "" },
    { id: 46, nome: "Ar Clímax 18000 BTU Inverter com Kit", preco: 455.00, categoria: "Ar Condicionado", images: ["img/ar-climax-18000.jpg"], desc: "Ar-condicionado Clímax 18000 BTU inverter com kit de instalação.", video: "" },
    { id: 47, nome: "Omeleteira Britânia 220V", preco: 15.50, categoria: "Eletroportáteis", images: ["img/omeleteira-britania.jpg"], desc: "Omeleteira Britânia prática e eficiente para o dia a dia.", video: "" },
    { id: 48, nome: "Air Fryer Instant 25 Litros", preco: 65.00, categoria: "Eletroportáteis", images: ["img/airfryer-instant-25l.jpg"], desc: "Air Fryer Instant com grande capacidade de 25 litros.", video: "" },
    { id: 49, nome: "Air Fryer RCA 5 Litros 110V", preco: 23.00, categoria: "Eletroportáteis", images: ["img/airfryer-rca-5l.jpg"], desc: "Air Fryer RCA 5 litros ideal para preparo rápido.", video: "" },
    { id: 50, nome: "Escova Giratória Smartfy ES01P 1200W", preco: 20.00, categoria: "Beleza", images: ["img/escova-smartfy.jpg"], desc: "Escova giratória Smartfy 1200W bivolt.", video: "" },
    { id: 51, nome: "Kit Onida Removedor de Pelos ON-2025", preco: 15.00, categoria: "Beleza", images: ["img/removedor-onida.jpg"], desc: "Kit removedor de pelos Onida ON-2025 bivolt.", video: "" },
    { id: 52, nome: "Aparador de Barba Quanta QTCAS21", preco: 19.00, categoria: "Beleza", images: ["img/aparador-quanta.jpg"], desc: "Aparador de barba Quanta QTCAS21 bivolt.", video: "" },
    { id: 53, nome: "Chapinha Britânia Titanium Blue", preco: 20.00, categoria: "Beleza", images: ["img/chapinha-britania.jpg"], desc: "Chapinha Britânia Titanium Blue com alta temperatura.", video: "" },
    { id: 54, nome: "Secador Mondial SC-32 Rose 2000W", preco: 19.00, categoria: "Beleza", images: ["img/secador-mondial.jpg"], desc: "Secador Mondial SC-32 Rose com 2000W.", video: "" },
    { id: 55, nome: "Ondulador Onida ON-057 28mm", preco: 18.00, categoria: "Beleza", images: ["img/ondulador-onida.jpg"], desc: "Ondulador Onida 28mm bivolt.", video: "" },
    { id: 56, nome: "Máscara Karseell 500ml", preco: 5.29, categoria: "Beleza", images: ["img/mascara-karseell.jpg"], desc: "Máscara capilar Karseell 500ml.", video: "" },
    { id: 57, nome: "Bola Adidas Green", preco: 18.00, categoria: "Esportes", images: ["img/bola-adidas.jpg"], desc: "Bola Adidas Green para treino e lazer.", video: "" },
    { id: 58, nome: "Tênis Masculino Adidas Runfalcon", preco: 56.00, categoria: "Calçados", images: ["img/tenis-runfalcon.jpg"], desc: "Tênis Adidas Runfalcon masculino.", video: "" },
    { id: 59, nome: "Viva Bike Aro 29", preco: 235.00, categoria: "Esportes", images: ["img/bike-aro29.jpg"], desc: "Bicicleta Viva Bike aro 29.", video: "" },
    { id: 60, nome: "Patinete Interbras 10.5 Pro Max", preco: 267.99, categoria: "Esportes", images: ["img/patinete-promax.jpg"], desc: "Patinete elétrico Interbras 10.5 Pro Max.", video: "" },
    { id: 61, nome: "Toys Motor Master", preco: 68.00, categoria: "Brinquedos", images: ["img/toys-motor.jpg"], desc: "Brinquedo Toys Motor Master.", video: "" },
    { id: 62, nome: "Carruagem da Princesa Inflável Intex", preco: 15.00, categoria: "Brinquedos", images: ["img/carruagem-intex.jpg"], desc: "Carruagem inflável Intex para crianças.", video: "" },
    { id: 63, nome: "Esmerilhadeira Dewalt DCG412B", preco: 129.99, categoria: "Ferramentas", images: ["img/esmerilhadeira-dewalt.jpg"], desc: "Esmerilhadeira angular Dewalt sem bateria.", video: "" },
    { id: 64, nome: "Politriz Ingco 20V APLI20151", preco: 115.00, categoria: "Ferramentas", images: ["img/politriz-ingco.jpg"], desc: "Politriz Ingco 20V modelo APLI20151.", video: "" },
    { id: 65, nome: "Soprador Térmico UHG160078", preco: 14.99, categoria: "Ferramentas", images: ["img/soprador-termico.jpg"], desc: "Soprador térmico UHG160078.", video: "" },
    { id: 66, nome: "Lattafa Al Noble Wazeer 100ml", preco: 17.99, categoria: "Perfumes", images: ["img/lattafa-wazeer.jpg"], desc: "Perfume Lattafa Al Noble Wazeer 100ml.", video: "" },
    { id: 67, nome: "Lattafa Yara Elixir EDP 100ml", preco: 22.00, categoria: "Perfumes", images: ["img/lattafa-yara.jpg"], desc: "Perfume Lattafa Yara Elixir EDP 100ml.", video: "" },
    { id: 68, nome: "Carolina Herrera 212 VIP Black 100ml", preco: 58.95, categoria: "Perfumes", images: ["img/212-vip-black.jpg"], desc: "Perfume Carolina Herrera 212 VIP Black.", video: "" },
    { id: 69, nome: "Chanel Allure Homme Sport 100ml", preco: 106.00, categoria: "Perfumes", images: ["img/chanel-allure.jpg"], desc: "Perfume Chanel Allure Homme Sport.", video: "" },
    { id: 70, nome: "Orientica Royal Amber 80ml", preco: 49.00, categoria: "Perfumes", images: ["img/orientica-amber.jpg"], desc: "Perfume Orientica Royal Amber 80ml.", video: "" },
    { id: 72, nome: "Arqus La Bella EDP 100ml", preco: 8.90, categoria: "Perfumes", images: ["img/arqus-labella.jpg"], desc: "Perfume Arqus La Bella EDP 100ml.", video: "" },
    { id: 73, nome: "Espumante Villa Sandi Rosé 750ml", preco: 8.99, categoria: "Bebidas", images: ["img/villa-sandi.jpg"], desc: "Espumante Villa Sandi Rosé 750ml.", video: "" },
    { id: 74, nome: "Espumante Henkell Chardonnay 750ml", preco: 9.50, categoria: "Bebidas", images: ["img/henkell.jpg"], desc: "Espumante Henkel Chardonnay 750ml.", video: "" },
    { id: 75, nome: "Espumante Freixenet Ice Blanco 750ml", preco: 10.20, categoria: "Bebidas", images: ["img/freixenet-ice.jpg"], desc: "Espumante Freixenet Ice Blanco 750ml.", video: "" },
    { id: 76, nome: "Espumante Monte Paschoal Brut Rosé 750ml", preco: 6.70, categoria: "Bebidas", images: ["img/monte-paschoal.jpg"], desc: "Espumante Monte Paschoal Brut Rosé.", video: "" },
    { id: 77, nome: "Espumante Fontana Fredda 750ml", preco: 9.30, categoria: "Bebidas", images: ["img/fontana-fredda.jpg"], desc: "Espumante Fontana Fredda 750ml.", video: "" },
    { id: 78, nome: "Espumante Mionetto DOC Brut 750ml", preco: 9.50, categoria: "Bebidas", images: ["img/mionetto.jpg"], desc: "Espumante Mionetto DOC Brut 750ml.", video: "" },
    { id: 79, nome: "Vinho Catena Cabernet Sauvignon 750ml", preco: 11.99, categoria: "Bebidas", images: ["img/catena.jpg"], desc: "Vinho Catena Cabernet Sauvignon 750ml.", video: "" },
    { id: 80, nome: "Vinho Bramare Cabernet Sauvignon 750ml", preco: 29.50, categoria: "Bebidas", images: ["img/bramare.jpg"], desc: "Vinho Bramare Cabernet Sauvignon 750ml.", video: "" },
    { id: 81, nome: "Xiaomi Poco C85 8GB/256GB", preco: 112.99, categoria: "Celulares", images: ["img/poco-c85.jpg"], desc: "Smartphone Xiaomi Poco C85 com 256GB.", video: "" },
    { id: 82, nome: "Oppo Reno 13 5G 12GB/512GB", preco: 457.99, categoria: "Celulares", images: ["img/oppo-reno13.jpg"], desc: "Smartphone Oppo Reno 13 5G.", video: "" },
    { id: 83, nome: "IPhone 17 Pro 256GB Orange", preco: 1199.00, categoria: "Celulares", images: ["img/iphone-17pro.jpg"], desc: "Smartphone Phone 17 Pro 256GB.", video: "" },
    { id: 84, nome: "VGA RX9060XT ASRock 8GB", preco: 350.00, categoria: "Informática", images: ["img/rx9060xt.jpg"], desc: "Placa de vídeo ASRock RX9060XT 8GB.", video: "" },
    { id: 85, nome: "CPU Intel i9-12900KS", preco: 310.00, categoria: "Informática", images: ["img/i9-12900ks.jpg"], desc: "Processador Intel Core i9-12900KS.", video: "" },
    { id: 86, nome: "Receptor IPTV Cine Box C+", preco: 41.90, categoria: "Eletrônicos", images: ["img/cinebox.jpg"], desc: "Receptor IPTV Cine Box C+.", video: "" },
    { id: 87, nome: "Multimídia Hetzer Argon Max HB20", preco: 199.99, categoria: "Automotivo", images: ["img/argon-max.jpg"], desc: "Central multimídia Hetzer Argon Max.", video: "" },
    { id: 88, nome: "JBL PartyBox Encore 100W (2 Mic)", preco: 275.90, categoria: "Áudio", images: ["img/jbl-encore.jpg"], desc: "Caixa de som JBL PartyBox Encore com microfones.", video: "" },
    { id: 89, nome: "Câmera Espiã Quanta QTCC80", preco: 23.00, categoria: "Segurança", images: ["img/quanta-qtcc80.jpg"], desc: "Câmera espiã Quanta QTCC80.", video: "" },
    { id: 90, nome: "Câmera Corporal Satellite Body CS06", preco: 40.00, categoria: "Segurança", images: ["img/body-cs06.jpg"], desc: "Câmera corporal Satellite Body CS06.", video: "" },
    { id: 91, nome: "Impressora HP LaserJet Pro 4303FDW", preco: 450.00, categoria: "Informática", images: ["img/hp-4303fdw.jpg"], desc: "Impressora HP LaserJet Pro 4303FDW color.", video: "" }
  ];

  window.produtos = produtos;

  // ===== CONTADOR CARRINHO =====
// Menu lateral de categorias (usado no header)
function toggleCategorias() {
  const el = document.getElementById("categoriasLateral");
  if (!el) return;
  el.classList.toggle("aberto");
}

// deixa a funcao disponivel globalmente (onclick no HTML)
window.toggleCategorias = toggleCategorias;

 function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const contador = document.getElementById("contadorCarrinho");
  if (contador) contador.innerText = carrinho.length;
}

window.atualizarContadorCarrinho = atualizarContadorCarrinho;

atualizarContadorCarrinho();

  // ===== ELEMENTOS =====
  const listaProdutos = document.getElementById("listaProdutos");
  const botoesCategorias = document.querySelectorAll(".categorias-lateral button");
  const campoBusca = document.getElementById("buscaProduto");

  // ===== NORMALIZAR TEXTO =====
  function normalizar(txt) {
    return txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // ===== RENDER PRODUTOS =====
  function renderProdutos(cat = "Todos", termo = "") {
    if (!listaProdutos) return;
    listaProdutos.innerHTML = "";

    produtos
      .filter(p =>
        (cat === "Todos" || p.categoria === cat) &&
        normalizar(p.nome).includes(normalizar(termo))
      )
      .forEach(p => {
        let link = `produto.html?id=${p.id}`;
        if (p.id === 1) link = "ps5.html";
        if (p.id === 3) link = "soundbar-jbl.html";
        if (p.id === 12) link = "robot-xiaomi-x20.html";

        listaProdutos.innerHTML += `
          <div class="produto-card">
            <a href="${link}">
              <img src="${p.images[0]}" alt="${p.nome}">
            </a>
            <h3>${p.nome}</h3>
            <p class="preco">U$ ${p.preco.toFixed(2)}</p>
            <a href="${link}" class="btn-ver">Ver produto</a>
          </div>
        `;
      });
  }




  // ===== INICIAL =====
  renderProdutos();

  // ===== BANNER HOME =====
  const banners = ["img/banner1.jpg","img/banner2.jpg","img/banner3.jpg","img/banner4.jpg","img/banner5.jpg","img/banner6.jpg"];
  let bannerAtual = 0;
  const bannerImg = document.getElementById("bannerImg");
  const btnPrev = document.getElementById("prevBanner");
  const btnNext = document.getElementById("nextBanner");

 function trocarBanner(index) {
  if (!bannerImg) return;

  bannerImg.style.opacity = "0";

  setTimeout(() => {
    bannerImg.src = banners[index];

    bannerImg.onload = () => {
      bannerImg.style.opacity = "1";
    };
  }, 450);
}

  if (btnNext) btnNext.onclick = () => {
    bannerAtual = (bannerAtual + 1) % banners.length;
    trocarBanner(bannerAtual);
  };

  if (btnPrev) btnPrev.onclick = () => {
    bannerAtual = (bannerAtual - 1 + banners.length) % banners.length;
    trocarBanner(bannerAtual);
  };

  setInterval(() => {
    bannerAtual = (bannerAtual + 1) % banners.length;
    trocarBanner(bannerAtual);
  }, 5000);

  // ===== SLIDER 2 LINHAS ALEATÓRIO =====
  const linha1 = document.getElementById("linha1");
  const linha2 = document.getElementById("linha2");

  function embaralhar(lista) {
    return [...lista].sort(() => Math.random() - 0.5);
  }

  function criarCardProduto(p) {
    let link = `produto.html?id=${p.id}`;
    if (p.id === 1) link = "ps5.html";
    if (p.id === 3) link = "soundbar-jbl.html";
    if (p.id === 12) link = "robot-xiaomi-x20.html";

    return `
      <div class="produto-card">
        <a href="${link}">
          <img src="${p.images[0]}" alt="${p.nome}">
        </a>
        <h3>${p.nome}</h3>
        <p class="preco">U$ ${p.preco.toFixed(2)}</p>
        <a href="${link}" class="btn-ver">Ver produto</a>
      </div>
    `;
  }

  function montarSlider() {
  if (!linha1 || !linha2) return;

  linha1.innerHTML = "";
  linha2.innerHTML = "";

  const lista = embaralhar(produtos);

  lista.forEach((p, i) => {
    (i % 2 === 0 ? linha1 : linha2).innerHTML += criarCardProduto(p);
  });

  // clona os cards para loop real
  const clone1 = linha1.innerHTML;
  const clone2 = linha2.innerHTML;

  linha1.innerHTML += clone1;
  linha2.innerHTML += clone2;
}
function carregarProdutosParaVoce() {
  const area = document.getElementById("produtosParaVoce");
  if (!area) return;

  const vistos = JSON.parse(localStorage.getItem("produtosVistos")) || [];
  const secao = area.closest(".produtos-para-voce");

  if (!vistos.length) {
    if (secao) secao.style.display = "none";
    return;
  }

  if (secao) secao.style.display = "block";

  const categorias = vistos.map(v => v.categoria);

  const recomendados = produtos
    .filter(p => categorias.includes(p.categoria))
    .filter(p => !vistos.some(v => Number(v.id) === Number(p.id)))
    .slice(0, 12);

  area.innerHTML = recomendados.map(p => {
    const link = `produto.html?id=${p.id}`;

    return `
      <div class="produto-card">
        <a href="${link}">
          <img src="${p.images[0]}" alt="${p.nome}">
        </a>
        <h3>${p.nome}</h3>
        <p class="preco">U$ ${p.preco.toFixed(2)}</p>
        <a href="${link}" class="btn-ver">Ver produto</a>
      </div>
    `;
  }).join("");

 const prev = document.querySelector(".pfv-car-left");
 const next = document.querySelector(".pfv-car-right");

  function atualizarSetas() {
    if (!prev || !next) return;

    prev.style.display = area.scrollLeft > 10 ? "flex" : "none";

    next.style.display =
      area.scrollLeft < area.scrollWidth - area.clientWidth - 10
        ? "flex"
        : "none";
  }

  if (prev) {
    prev.onclick = () => {
      area.scrollBy({ left: -767, behavior: "smooth" });
    };
  }

  if (next) {
    next.onclick = () => {
      area.scrollBy({ left: 767, behavior: "smooth" });
    };
  }

  area.addEventListener("scroll", atualizarSetas);

  setTimeout(atualizarSetas, 100);
}

carregarProdutosParaVoce();

montarSlider();
});
window.addEventListener("load", () => {
  document.querySelectorAll(".linha").forEach(linha => {
    linha.style.animation = "none";
    linha.offsetHeight; // força reflow
    linha.style.animation = "";
  });
});
/* =====================================================
   PRODUTOS PARA VOCÊ — PRODUTOS VISUALIZADOS
===================================================== */

function iniciarProdutosParaVoce() {
  carregarProdutosParaVoce();

  setTimeout(carregarProdutosParaVoce, 500);
  setTimeout(carregarProdutosParaVoce, 1200);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarProdutosParaVoce);
} else {
  iniciarProdutosParaVoce();
}

window.addEventListener("load", iniciarProdutosParaVoce);

function carregarProdutosParaVoce() {
  const container = document.getElementById("produtosParaVoce");

  if (!container) return;

  const vistos = JSON.parse(localStorage.getItem("qa_produtos_vistos")) || [];

  container.innerHTML = "";

  if (vistos.length === 0) {
    container.innerHTML = `
      <div class="produtos-para-voce-vazio">
        <h3>Nenhum produto visto ainda</h3>
        <p>Ao visualizar produtos, eles aparecerão aqui para você encontrar de novo com facilidade.</p>
      </div>
    `;
    return;
  }

  vistos.slice(0, 7).forEach(produto => {
    const preco = Number(produto.preco || 0).toFixed(2);
    const link = produto.url || `produto.html?id=${produto.id}`;

    const imagem =
      produto.imagem ||
      produto.image ||
      "img/placeholder.jpg";

    container.innerHTML += `
      <div class="produto-card">
        <a href="${link}">
          <img src="${imagem}" alt="${produto.nome}">
        </a>

        <h3>${produto.nome}</h3>

        <p class="preco">U$ ${preco}</p>

        <a href="${link}" class="btn-ver">
          Ver produto
        </a>
      </div>
    `;
  });
}
