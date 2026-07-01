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
