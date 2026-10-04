// Gestão dos produtos favoritos
// Utiliza localStorage para guardar os favoritos

var CHAVE_FAVORITOS = "shopsphere_favoritos";

// Obtém a lista de IDs dos favoritos
function obterFavoritos() {
  var dados = localStorage.getItem(CHAVE_FAVORITOS);
  if (dados) {
    try {
      return JSON.parse(dados);
    } catch (erro) {
      console.log("Erro ao ler favoritos:", erro);
      return [];
    }
  }
  return [];
}

// Guarda a lista de favoritos
function guardarFavoritos(lista) {
  localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(lista));
}

// Verifica se um produto está nos favoritos
function estaNosFavoritos(idProduto) {
  var favoritos = obterFavoritos();
  return favoritos.indexOf(idProduto) !== -1;
}

// Adiciona um produto aos favoritos
function adicionarAosFavoritos(idProduto) {
  var favoritos = obterFavoritos();
  if (favoritos.indexOf(idProduto) === -1) {
    favoritos.push(idProduto);
    guardarFavoritos(favoritos);
  }
  atualizarContadorFavoritos();
  return favoritos;
}

// Remove um produto dos favoritos
function removerDosFavoritos(idProduto) {
  var favoritos = obterFavoritos();
  var novaLista = [];
  for (var i = 0; i < favoritos.length; i++) {
    if (favoritos[i] !== idProduto) {
      novaLista.push(favoritos[i]);
    }
  }
  guardarFavoritos(novaLista);
  atualizarContadorFavoritos();
  return novaLista;
}

// Alterna o estado de favorito (adiciona ou remove)
function alternarFavorito(idProduto) {
  if (estaNosFavoritos(idProduto)) {
    removerDosFavoritos(idProduto);
    return false;
  } else {
    adicionarAosFavoritos(idProduto);
    return true;
  }
}

// Atualiza o contador de favoritos no cabeçalho (opcional)
function atualizarContadorFavoritos() {
  var contador = document.getElementById("contador-favoritos");
  if (contador) {
    var total = obterFavoritos().length;
    contador.textContent = total;
    if (total > 0) {
      contador.classList.add("ativo");
    } else {
      contador.classList.remove("ativo");
    }
  }
}
