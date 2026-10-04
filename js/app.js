// Ficheiro principal da aplicação ShopSphere
// Controla a interface, pesquisa, filtros, ordenação e interações

// Estado atual dos filtros e pesquisa
var estadoFiltros = {
  pesquisa: "",
  categoria: "todas",
  precoMin: null,
  precoMax: null,
  soPromocoes: false,
  soFavoritos: false,
  ordenacao: "recomendados"
};

// Produto atualmente selecionado no modal de detalhes
var produtoSelecionado = null;

// Inicialização quando a página carrega
document.addEventListener("DOMContentLoaded", function() {
  inicializarAplicacao();
});

function inicializarAplicacao() {
  // Atualiza contadores a partir do localStorage
  atualizarContadorCarrinho();
  atualizarContadorFavoritos();

  // Preenche as categorias no filtro e na secção de categorias
  preencherCategorias();

  // Mostra os produtos iniciais
  atualizarCatalogo();

  // Configura os eventos dos botões e campos
  configurarEventos();

  // Atualiza o ano no rodapé
  var anoRodape = document.getElementById("ano-atual");
  if (anoRodape) {
    anoRodape.textContent = new Date().getFullYear();
  }

  // Mostra produtos em destaque na página inicial
  mostrarProdutosDestaque();
}

// Preenche os selects e botões de categorias
function preencherCategorias() {
  var categorias = obterCategorias();
  var selectCategoria = document.getElementById("filtro-categoria");
  var contentorCategorias = document.getElementById("lista-categorias");

  if (selectCategoria) {
    // Limpa opções existentes (exceto "Todas")
    while (selectCategoria.options.length > 1) {
      selectCategoria.remove(1);
    }
    for (var i = 0; i < categorias.length; i++) {
      var opcao = document.createElement("option");
      opcao.value = categorias[i];
      opcao.textContent = categorias[i];
      selectCategoria.appendChild(opcao);
    }
  }

  if (contentorCategorias) {
    contentorCategorias.innerHTML = "";
    // Botão "Todos"
    var btnTodos = document.createElement("button");
    btnTodos.className = "categoria-btn ativo";
    btnTodos.textContent = "Todos";
    btnTodos.setAttribute("data-categoria", "todas");
    btnTodos.addEventListener("click", function() {
      selecionarCategoria("todas");
    });
    contentorCategorias.appendChild(btnTodos);

    for (var j = 0; j < categorias.length; j++) {
      var btn = document.createElement("button");
      btn.className = "categoria-btn";
      btn.textContent = categorias[j];
      btn.setAttribute("data-categoria", categorias[j]);
      btn.addEventListener("click", function(evento) {
        var cat = evento.target.getAttribute("data-categoria");
        selecionarCategoria(cat);
      });
      contentorCategorias.appendChild(btn);
    }
  }
}

// Seleciona uma categoria e atualiza o catálogo
function selecionarCategoria(categoria) {
  estadoFiltros.categoria = categoria;
  estadoFiltros.soFavoritos = false;

  // Atualiza visualmente os botões
  var botoes = document.querySelectorAll(".categoria-btn");
  for (var i = 0; i < botoes.length; i++) {
    if (botoes[i].getAttribute("data-categoria") === categoria) {
      botoes[i].classList.add("ativo");
    } else {
      botoes[i].classList.remove("ativo");
    }
  }

  // Sincroniza o select de filtro
  var select = document.getElementById("filtro-categoria");
  if (select) {
    select.value = categoria;
  }

  // Scroll para o catálogo
  var secaoCatalogo = document.getElementById("catalogo");
  if (secaoCatalogo) {
    secaoCatalogo.scrollIntoView({ behavior: "smooth" });
  }

  atualizarCatalogo();
}

// Configura todos os event listeners
function configurarEventos() {
  // Pesquisa
  var campoPesquisa = document.getElementById("campo-pesquisa");
  var btnLimparPesquisa = document.getElementById("btn-limpar-pesquisa");

  if (campoPesquisa) {
    campoPesquisa.addEventListener("input", function() {
      estadoFiltros.pesquisa = campoPesquisa.value.trim();
      atualizarCatalogo();
    });
  }

  if (btnLimparPesquisa) {
    btnLimparPesquisa.addEventListener("click", function() {
      if (campoPesquisa) {
        campoPesquisa.value = "";
      }
      estadoFiltros.pesquisa = "";
      atualizarCatalogo();
    });
  }

  // Filtros
  var selectCategoria = document.getElementById("filtro-categoria");
  if (selectCategoria) {
    selectCategoria.addEventListener("change", function() {
      estadoFiltros.categoria = selectCategoria.value;
      atualizarCatalogo();
    });
  }

  var inputPrecoMin = document.getElementById("filtro-preco-min");
  if (inputPrecoMin) {
    inputPrecoMin.addEventListener("change", function() {
      var valor = parseFloat(inputPrecoMin.value);
      if (!isNaN(valor) && valor >= 0) {
        estadoFiltros.precoMin = valor;
      } else {
        estadoFiltros.precoMin = null;
        inputPrecoMin.value = "";
      }
      atualizarCatalogo();
    });
  }

  var inputPrecoMax = document.getElementById("filtro-preco-max");
  if (inputPrecoMax) {
    inputPrecoMax.addEventListener("change", function() {
      var valor = parseFloat(inputPrecoMax.value);
      if (!isNaN(valor) && valor >= 0) {
        estadoFiltros.precoMax = valor;
      } else {
        estadoFiltros.precoMax = null;
        inputPrecoMax.value = "";
      }
      atualizarCatalogo();
    });
  }

  var checkPromocoes = document.getElementById("filtro-promocoes");
  if (checkPromocoes) {
    checkPromocoes.addEventListener("change", function() {
      estadoFiltros.soPromocoes = checkPromocoes.checked;
      atualizarCatalogo();
    });
  }

  var selectOrdenacao = document.getElementById("filtro-ordenacao");
  if (selectOrdenacao) {
    selectOrdenacao.addEventListener("change", function() {
      estadoFiltros.ordenacao = selectOrdenacao.value;
      atualizarCatalogo();
    });
  }

  var btnLimparFiltros = document.getElementById("btn-limpar-filtros");
  if (btnLimparFiltros) {
    btnLimparFiltros.addEventListener("click", limparFiltros);
  }

  // Botões do cabeçalho
  var btnCarrinho = document.getElementById("btn-abrir-carrinho");
  if (btnCarrinho) {
    btnCarrinho.addEventListener("click", abrirCarrinho);
  }

  var btnFavoritos = document.getElementById("btn-abrir-favoritos");
  if (btnFavoritos) {
    btnFavoritos.addEventListener("click", mostrarFavoritos);
  }

  var btnFecharCarrinho = document.getElementById("btn-fechar-carrinho");
  if (btnFecharCarrinho) {
    btnFecharCarrinho.addEventListener("click", fecharCarrinho);
  }

  var overlayCarrinho = document.getElementById("overlay-carrinho");
  if (overlayCarrinho) {
    overlayCarrinho.addEventListener("click", fecharCarrinho);
  }

  // Modal de detalhes
  var btnFecharModal = document.getElementById("btn-fechar-modal");
  if (btnFecharModal) {
    btnFecharModal.addEventListener("click", fecharModalDetalhes);
  }

  var overlayModal = document.getElementById("overlay-modal");
  if (overlayModal) {
    overlayModal.addEventListener("click", fecharModalDetalhes);
  }

  // Botão explorar produtos
  var btnExplorar = document.getElementById("btn-explorar");
  if (btnExplorar) {
    btnExplorar.addEventListener("click", function() {
      var secao = document.getElementById("catalogo");
      if (secao) {
        secao.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Menu mobile
  var btnMenu = document.getElementById("btn-menu-mobile");
  if (btnMenu) {
    btnMenu.addEventListener("click", function() {
      var nav = document.getElementById("nav-principal");
      if (nav) {
        nav.classList.toggle("aberto");
      }
    });
  }
}

// Limpa todos os filtros
function limparFiltros() {
  estadoFiltros.pesquisa = "";
  estadoFiltros.categoria = "todas";
  estadoFiltros.precoMin = null;
  estadoFiltros.precoMax = null;
  estadoFiltros.soPromocoes = false;
  estadoFiltros.soFavoritos = false;
  estadoFiltros.ordenacao = "recomendados";

  var campoPesquisa = document.getElementById("campo-pesquisa");
  if (campoPesquisa) campoPesquisa.value = "";

  var selectCategoria = document.getElementById("filtro-categoria");
  if (selectCategoria) selectCategoria.value = "todas";

  var inputMin = document.getElementById("filtro-preco-min");
  if (inputMin) inputMin.value = "";

  var inputMax = document.getElementById("filtro-preco-max");
  if (inputMax) inputMax.value = "";

  var checkPromo = document.getElementById("filtro-promocoes");
  if (checkPromo) checkPromo.checked = false;

  var selectOrd = document.getElementById("filtro-ordenacao");
  if (selectOrd) selectOrd.value = "recomendados";

  // Atualiza botões de categoria
  var botoes = document.querySelectorAll(".categoria-btn");
  for (var i = 0; i < botoes.length; i++) {
    if (botoes[i].getAttribute("data-categoria") === "todas") {
      botoes[i].classList.add("ativo");
    } else {
      botoes[i].classList.remove("ativo");
    }
  }

  atualizarCatalogo();
  mostrarNotificacao("Filtros limpos");
}

// Filtra e ordena os produtos de acordo com o estado atual
function obterProdutosFiltrados() {
  var lista = produtos.slice(); // Cópia do array

  // Filtro de pesquisa
  if (estadoFiltros.pesquisa !== "") {
    var termo = estadoFiltros.pesquisa.toLowerCase();
    lista = lista.filter(function(produto) {
      var nome = produto.nome.toLowerCase();
      var cat = produto.categoria.toLowerCase();
      var desc = produto.descricao.toLowerCase();
      return nome.indexOf(termo) !== -1 ||
             cat.indexOf(termo) !== -1 ||
             desc.indexOf(termo) !== -1;
    });
  }

  // Filtro de categoria
  if (estadoFiltros.categoria !== "todas") {
    lista = lista.filter(function(produto) {
      return produto.categoria === estadoFiltros.categoria;
    });
  }

  // Filtro de preço mínimo
  if (estadoFiltros.precoMin !== null) {
    lista = lista.filter(function(produto) {
      return produto.preco >= estadoFiltros.precoMin;
    });
  }

  // Filtro de preço máximo
  if (estadoFiltros.precoMax !== null) {
    lista = lista.filter(function(produto) {
      return produto.preco <= estadoFiltros.precoMax;
    });
  }

  // Apenas promoções
  if (estadoFiltros.soPromocoes) {
    lista = lista.filter(function(produto) {
      return produto.precoAnterior !== null;
    });
  }

  // Apenas favoritos
  if (estadoFiltros.soFavoritos) {
    var favoritos = obterFavoritos();
    lista = lista.filter(function(produto) {
      return favoritos.indexOf(produto.id) !== -1;
    });
  }

  // Ordenação
  if (estadoFiltros.ordenacao === "menor-preco") {
    lista.sort(function(a, b) {
      return a.preco - b.preco;
    });
  } else if (estadoFiltros.ordenacao === "maior-preco") {
    lista.sort(function(a, b) {
      return b.preco - a.preco;
    });
  } else if (estadoFiltros.ordenacao === "nome-az") {
    lista.sort(function(a, b) {
      return a.nome.localeCompare(b.nome, "pt");
    });
  } else if (estadoFiltros.ordenacao === "melhor-classificacao") {
    lista.sort(function(a, b) {
      return b.classificacao - a.classificacao;
    });
  }
  // "recomendados" mantém a ordem original

  return lista;
}

// Atualiza a grelha de produtos no catálogo
function atualizarCatalogo() {
  var contentor = document.getElementById("grelha-produtos");
  var mensagemVazia = document.getElementById("mensagem-vazia");
  var contadorResultados = document.getElementById("contador-resultados");

  if (!contentor) return;

  var lista = obterProdutosFiltrados();

  contentor.innerHTML = "";

  if (lista.length === 0) {
    if (mensagemVazia) {
      mensagemVazia.style.display = "block";
    }
    if (contadorResultados) {
      contadorResultados.textContent = "0 produtos encontrados";
    }
    return;
  }

  if (mensagemVazia) {
    mensagemVazia.style.display = "none";
  }

  if (contadorResultados) {
    contadorResultados.textContent = lista.length + " produto" + (lista.length !== 1 ? "s" : "") + " encontrado" + (lista.length !== 1 ? "s" : "");
  }

  for (var i = 0; i < lista.length; i++) {
    var cartao = criarCartaoProduto(lista[i]);
    contentor.appendChild(cartao);
  }
}

// Cria o elemento HTML de um cartão de produto
function criarCartaoProduto(produto) {
  var artigo = document.createElement("article");
  artigo.className = "cartao-produto";
  artigo.setAttribute("data-id", produto.id);

  // Etiqueta
  var etiquetaHtml = "";
  if (produto.etiqueta) {
    var classeEtiqueta = "etiqueta";
    if (produto.etiqueta === "Promoção") classeEtiqueta += " etiqueta-promocao";
    if (produto.etiqueta === "Novo") classeEtiqueta += " etiqueta-novo";
    if (produto.etiqueta === "Popular") classeEtiqueta += " etiqueta-popular";
    etiquetaHtml = '<span class="' + classeEtiqueta + '">' + produto.etiqueta + "</span>";
  }

  // Preço
  var precoHtml = '<span class="preco-atual">' + formatarPreco(produto.preco) + "</span>";
  if (produto.precoAnterior) {
    precoHtml = '<span class="preco-anterior">' + formatarPreco(produto.precoAnterior) + "</span> " + precoHtml;
  }

  // Classificação com estrelas simples
  var estrelas = gerarEstrelas(produto.classificacao);

  // Estado do favorito
  var classeFavorito = estaNosFavoritos(produto.id) ? "btn-favorito ativo" : "btn-favorito";
  var textoFavorito = estaNosFavoritos(produto.id) ? "Remover dos favoritos" : "Adicionar aos favoritos";

  artigo.innerHTML =
    '<div class="cartao-imagem">' +
      etiquetaHtml +
      '<img src="' + produto.imagem + '" alt="' + produto.nome + '" loading="lazy" onerror="this.src=\'https://via.placeholder.com/400x400?text=Produto\'">' +
    '</div>' +
    '<div class="cartao-info">' +
      '<span class="cartao-categoria">' + produto.categoria + '</span>' +
      '<h3 class="cartao-nome">' + produto.nome + '</h3>' +
      '<div class="cartao-classificacao">' + estrelas + ' <span>(' + produto.avaliacoes + ')</span></div>' +
      '<div class="cartao-preco">' + precoHtml + '</div>' +
      '<div class="cartao-acoes">' +
        '<button class="btn btn-primario btn-adicionar" data-id="' + produto.id + '" aria-label="Adicionar ' + produto.nome + ' ao carrinho">Adicionar</button>' +
        '<button class="' + classeFavorito + '" data-id="' + produto.id + '" aria-label="' + textoFavorito + '" title="' + textoFavorito + '">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>' +
        '</button>' +
        '<button class="btn-detalhes" data-id="' + produto.id + '" aria-label="Ver detalhes de ' + produto.nome + '">Detalhes</button>' +
      '</div>' +
    '</div>';

  // Eventos dos botões do cartão
  var btnAdicionar = artigo.querySelector(".btn-adicionar");
  btnAdicionar.addEventListener("click", function() {
    adicionarAoCarrinho(produto.id, 1);
    mostrarNotificacao(produto.nome + " adicionado ao carrinho");
  });

  var btnFav = artigo.querySelector(".btn-favorito");
  btnFav.addEventListener("click", function() {
    var agoraFavorito = alternarFavorito(produto.id);
    if (agoraFavorito) {
      btnFav.classList.add("ativo");
      btnFav.setAttribute("aria-label", "Remover dos favoritos");
      mostrarNotificacao(produto.nome + " adicionado aos favoritos");
    } else {
      btnFav.classList.remove("ativo");
      btnFav.setAttribute("aria-label", "Adicionar aos favoritos");
      mostrarNotificacao(produto.nome + " removido dos favoritos");
    }
    // Se estiver na vista de favoritos, atualiza o catálogo
    if (estadoFiltros.soFavoritos) {
      atualizarCatalogo();
    }
  });

  var btnDetalhes = artigo.querySelector(".btn-detalhes");
  btnDetalhes.addEventListener("click", function() {
    abrirModalDetalhes(produto.id);
  });

  // Clique na imagem ou nome também abre detalhes
  var img = artigo.querySelector(".cartao-imagem");
  img.style.cursor = "pointer";
  img.addEventListener("click", function() {
    abrirModalDetalhes(produto.id);
  });

  return artigo;
}

// Gera HTML de estrelas baseado na classificação
function gerarEstrelas(classificacao) {
  var html = '<span class="estrelas" aria-label="Classificação: ' + classificacao + ' de 5">';
  var cheias = Math.floor(classificacao);
  var meia = (classificacao - cheias) >= 0.5;

  for (var i = 0; i < 5; i++) {
    if (i < cheias) {
      html += '<span class="estrela cheia">★</span>';
    } else if (i === cheias && meia) {
      html += '<span class="estrela meia">★</span>';
    } else {
      html += '<span class="estrela vazia">☆</span>';
    }
  }
  html += '</span>';
  return html;
}

// Mostra produtos em destaque (os com etiqueta Popular ou Novo)
function mostrarProdutosDestaque() {
  var contentor = document.getElementById("produtos-destaque");
  if (!contentor) return;

  var destacados = produtos.filter(function(p) {
    return p.etiqueta === "Popular" || p.etiqueta === "Novo";
  }).slice(0, 4);

  contentor.innerHTML = "";
  for (var i = 0; i < destacados.length; i++) {
    contentor.appendChild(criarCartaoProduto(destacados[i]));
  }
}

// Abre o modal de detalhes do produto
function abrirModalDetalhes(idProduto) {
  var produto = obterProdutoPorId(idProduto);
  if (!produto) return;

  produtoSelecionado = produto;

  var modal = document.getElementById("modal-detalhes");
  var overlay = document.getElementById("overlay-modal");

  document.getElementById("modal-imagem").src = produto.imagem;
  document.getElementById("modal-imagem").alt = produto.nome;
  document.getElementById("modal-nome").textContent = produto.nome;
  document.getElementById("modal-categoria").textContent = produto.categoria;
  document.getElementById("modal-descricao").textContent = produto.descricao;
  document.getElementById("modal-classificacao").innerHTML = gerarEstrelas(produto.classificacao) + " (" + produto.avaliacoes + " avaliações)";

  var precoHtml = formatarPreco(produto.preco);
  if (produto.precoAnterior) {
    precoHtml = '<span class="preco-anterior">' + formatarPreco(produto.precoAnterior) + '</span> ' + precoHtml;
  }
  document.getElementById("modal-preco").innerHTML = precoHtml;

  // Quantidade
  var inputQtd = document.getElementById("modal-quantidade");
  if (inputQtd) {
    inputQtd.value = 1;
  }

  // Botão favorito no modal
  var btnFavModal = document.getElementById("modal-btn-favorito");
  if (btnFavModal) {
    if (estaNosFavoritos(produto.id)) {
      btnFavModal.classList.add("ativo");
      btnFavModal.textContent = "Remover dos favoritos";
    } else {
      btnFavModal.classList.remove("ativo");
      btnFavModal.textContent = "Adicionar aos favoritos";
    }
  }

  if (modal) modal.classList.add("aberto");
  if (overlay) overlay.classList.add("aberto");
  document.body.style.overflow = "hidden";
}

// Fecha o modal de detalhes
function fecharModalDetalhes() {
  var modal = document.getElementById("modal-detalhes");
  var overlay = document.getElementById("overlay-modal");
  if (modal) modal.classList.remove("aberto");
  if (overlay) overlay.classList.remove("aberto");
  document.body.style.overflow = "";
  produtoSelecionado = null;
}

// Adiciona ao carrinho a partir do modal
function adicionarDoModal() {
  if (!produtoSelecionado) return;
  var inputQtd = document.getElementById("modal-quantidade");
  var qtd = 1;
  if (inputQtd) {
    qtd = parseInt(inputQtd.value, 10);
    if (isNaN(qtd) || qtd < 1) qtd = 1;
  }
  adicionarAoCarrinho(produtoSelecionado.id, qtd);
  mostrarNotificacao(produtoSelecionado.nome + " adicionado ao carrinho");
  fecharModalDetalhes();
}

// Alterna favorito a partir do modal
function alternarFavoritoModal() {
  if (!produtoSelecionado) return;
  var agoraFavorito = alternarFavorito(produtoSelecionado.id);
  var btn = document.getElementById("modal-btn-favorito");
  if (btn) {
    if (agoraFavorito) {
      btn.classList.add("ativo");
      btn.textContent = "Remover dos favoritos";
      mostrarNotificacao(produtoSelecionado.nome + " adicionado aos favoritos");
    } else {
      btn.classList.remove("ativo");
      btn.textContent = "Adicionar aos favoritos";
      mostrarNotificacao(produtoSelecionado.nome + " removido dos favoritos");
    }
  }
  atualizarCatalogo();
}

// Abre o painel do carrinho
function abrirCarrinho() {
  renderizarCarrinho();
  var painel = document.getElementById("painel-carrinho");
  var overlay = document.getElementById("overlay-carrinho");
  if (painel) painel.classList.add("aberto");
  if (overlay) overlay.classList.add("aberto");
  document.body.style.overflow = "hidden";
}

// Fecha o painel do carrinho
function fecharCarrinho() {
  var painel = document.getElementById("painel-carrinho");
  var overlay = document.getElementById("overlay-carrinho");
  if (painel) painel.classList.remove("aberto");
  if (overlay) overlay.classList.remove("aberto");
  document.body.style.overflow = "";
}

// Renderiza o conteúdo do carrinho
function renderizarCarrinho() {
  var contentor = document.getElementById("lista-carrinho");
  var totalEl = document.getElementById("total-carrinho");
  var vazioEl = document.getElementById("carrinho-vazio");
  var acoesEl = document.getElementById("acoes-carrinho");

  if (!contentor) return;

  var carrinho = obterCarrinho();
  contentor.innerHTML = "";

  if (carrinho.length === 0) {
    if (vazioEl) vazioEl.style.display = "block";
    if (acoesEl) acoesEl.style.display = "none";
    if (totalEl) totalEl.textContent = formatarPreco(0);
    return;
  }

  if (vazioEl) vazioEl.style.display = "none";
  if (acoesEl) acoesEl.style.display = "block";

  for (var i = 0; i < carrinho.length; i++) {
    var item = carrinho[i];
    var produto = obterProdutoPorId(item.id);
    if (!produto) continue;

    var subtotal = produto.preco * item.quantidade;

    var div = document.createElement("div");
    div.className = "item-carrinho";
    div.innerHTML =
      '<img src="' + produto.imagem + '" alt="' + produto.nome + '" onerror="this.src=\'https://via.placeholder.com/80x80?text=P\'">' +
      '<div class="item-info">' +
        '<h4>' + produto.nome + '</h4>' +
        '<p class="item-preco-unitario">' + formatarPreco(produto.preco) + ' / un.</p>' +
        '<div class="item-quantidade">' +
          '<button class="btn-qtd diminuir" data-id="' + produto.id + '" aria-label="Diminuir quantidade">−</button>' +
          '<span>' + item.quantidade + '</span>' +
          '<button class="btn-qtd aumentar" data-id="' + produto.id + '" aria-label="Aumentar quantidade">+</button>' +
        '</div>' +
      '</div>' +
      '<div class="item-direita">' +
        '<p class="item-subtotal">' + formatarPreco(subtotal) + '</p>' +
        '<button class="btn-remover" data-id="' + produto.id + '" aria-label="Remover ' + produto.nome + '">Remover</button>' +
      '</div>';

    contentor.appendChild(div);
  }

  // Eventos dos botões de quantidade e remover
  var botoesAumentar = contentor.querySelectorAll(".aumentar");
  for (var a = 0; a < botoesAumentar.length; a++) {
    botoesAumentar[a].addEventListener("click", function(e) {
      var id = parseInt(e.target.getAttribute("data-id"), 10);
      aumentarQuantidade(id);
      renderizarCarrinho();
    });
  }

  var botoesDiminuir = contentor.querySelectorAll(".diminuir");
  for (var d = 0; d < botoesDiminuir.length; d++) {
    botoesDiminuir[d].addEventListener("click", function(e) {
      var id = parseInt(e.target.getAttribute("data-id"), 10);
      diminuirQuantidade(id);
      renderizarCarrinho();
    });
  }

  var botoesRemover = contentor.querySelectorAll(".btn-remover");
  for (var r = 0; r < botoesRemover.length; r++) {
    botoesRemover[r].addEventListener("click", function(e) {
      var id = parseInt(e.target.getAttribute("data-id"), 10);
      removerDoCarrinho(id);
      renderizarCarrinho();
      mostrarNotificacao("Produto removido do carrinho");
    });
  }

  if (totalEl) {
    totalEl.textContent = formatarPreco(calcularTotalCarrinho());
  }
}

// Limpa o carrinho com confirmação visual
function limparCarrinhoCompleto() {
  limparCarrinho();
  renderizarCarrinho();
  mostrarNotificacao("Carrinho limpo");
}

// Finalizar compra (demonstrativo)
function finalizarCompra() {
  var carrinho = obterCarrinho();
  if (carrinho.length === 0) {
    mostrarNotificacao("O carrinho está vazio");
    return;
  }

  var total = calcularTotalCarrinho();
  var mensagem =
    "Esta é uma loja demonstrativa.\n\n" +
    "Resumo da encomenda fictícia:\n" +
    "Total: " + formatarPreco(total) + "\n\n" +
    "Nenhuma compra real foi efetuada.\n" +
    "Não foram recolhidos dados de pagamento.";

  alert(mensagem);
  // Opcionalmente limpar o carrinho após "compra"
  // limparCarrinho();
  // renderizarCarrinho();
  // fecharCarrinho();
}

// Mostra a vista de favoritos
function mostrarFavoritos() {
  estadoFiltros.soFavoritos = true;
  estadoFiltros.categoria = "todas";

  // Atualiza visual dos botões de categoria
  var botoes = document.querySelectorAll(".categoria-btn");
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].classList.remove("ativo");
  }

  var secao = document.getElementById("catalogo");
  if (secao) {
    secao.scrollIntoView({ behavior: "smooth" });
  }

  // Atualiza título temporário
  var titulo = document.getElementById("titulo-catalogo");
  if (titulo) {
    titulo.textContent = "Os meus favoritos";
  }

  atualizarCatalogo();

  // Restaura título quando sair dos favoritos (através de limpar filtros)
}

// Sistema de notificações simples
function mostrarNotificacao(mensagem) {
  var contentor = document.getElementById("notificacoes");
  if (!contentor) return;

  var nota = document.createElement("div");
  nota.className = "notificacao";
  nota.textContent = mensagem;
  contentor.appendChild(nota);

  // Animação de entrada
  setTimeout(function() {
    nota.classList.add("visivel");
  }, 10);

  // Remove após 3 segundos
  setTimeout(function() {
    nota.classList.remove("visivel");
    setTimeout(function() {
      if (nota.parentNode) {
        nota.parentNode.removeChild(nota);
      }
    }, 300);
  }, 3000);
}

// Controlo de quantidade no modal
function alterarQuantidadeModal(delta) {
  var input = document.getElementById("modal-quantidade");
  if (!input) return;
  var valor = parseInt(input.value, 10);
  if (isNaN(valor)) valor = 1;
  valor = valor + delta;
  if (valor < 1) valor = 1;
  input.value = valor;
}
