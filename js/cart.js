// Gestão do carrinho de compras
// Utiliza localStorage para guardar os dados entre sessões

// Chave usada no localStorage
var CHAVE_CARRINHO = "shopsphere_carrinho";

// Obtém o carrinho atual a partir do localStorage
function obterCarrinho() {
  var dados = localStorage.getItem(CHAVE_CARRINHO);
  if (dados) {
    try {
      return JSON.parse(dados);
    } catch (erro) {
      console.log("Erro ao ler o carrinho:", erro);
      return [];
    }
  }
  return [];
}

// Guarda o carrinho no localStorage
function guardarCarrinho(carrinho) {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

// Adiciona um produto ao carrinho (ou aumenta a quantidade se já existir)
function adicionarAoCarrinho(idProduto, quantidade) {
  if (!quantidade || quantidade < 1) {
    quantidade = 1;
  }

  var carrinho = obterCarrinho();
  var itemExistente = null;

  // Procura se o produto já está no carrinho
  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id === idProduto) {
      itemExistente = carrinho[i];
      break;
    }
  }

  if (itemExistente) {
    // Aumenta a quantidade
    itemExistente.quantidade = itemExistente.quantidade + quantidade;
  } else {
    // Adiciona novo item
    carrinho.push({
      id: idProduto,
      quantidade: quantidade
    });
  }

  guardarCarrinho(carrinho);
  atualizarContadorCarrinho();
  return carrinho;
}

// Remove um produto completamente do carrinho
function removerDoCarrinho(idProduto) {
  var carrinho = obterCarrinho();
  var novoCarrinho = [];

  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id !== idProduto) {
      novoCarrinho.push(carrinho[i]);
    }
  }

  guardarCarrinho(novoCarrinho);
  atualizarContadorCarrinho();
  return novoCarrinho;
}

// Atualiza a quantidade de um produto no carrinho
function atualizarQuantidade(idProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    return removerDoCarrinho(idProduto);
  }

  var carrinho = obterCarrinho();

  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id === idProduto) {
      carrinho[i].quantidade = novaQuantidade;
      break;
    }
  }

  guardarCarrinho(carrinho);
  atualizarContadorCarrinho();
  return carrinho;
}

// Aumenta a quantidade de um produto em 1
function aumentarQuantidade(idProduto) {
  var carrinho = obterCarrinho();
  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id === idProduto) {
      return atualizarQuantidade(idProduto, carrinho[i].quantidade + 1);
    }
  }
  return carrinho;
}

// Diminui a quantidade de um produto em 1
function diminuirQuantidade(idProduto) {
  var carrinho = obterCarrinho();
  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id === idProduto) {
      return atualizarQuantidade(idProduto, carrinho[i].quantidade - 1);
    }
  }
  return carrinho;
}

// Limpa todo o carrinho
function limparCarrinho() {
  guardarCarrinho([]);
  atualizarContadorCarrinho();
  return [];
}

// Calcula o total de unidades no carrinho
function calcularTotalUnidades() {
  var carrinho = obterCarrinho();
  var total = 0;
  for (var i = 0; i < carrinho.length; i++) {
    total = total + carrinho[i].quantidade;
  }
  return total;
}

// Calcula o valor total do carrinho
function calcularTotalCarrinho() {
  var carrinho = obterCarrinho();
  var total = 0;

  for (var i = 0; i < carrinho.length; i++) {
    var produto = obterProdutoPorId(carrinho[i].id);
    if (produto) {
      total = total + (produto.preco * carrinho[i].quantidade);
    }
  }

  return total;
}

// Atualiza o contador visível no cabeçalho
function atualizarContadorCarrinho() {
  var contador = document.getElementById("contador-carrinho");
  if (contador) {
    var total = calcularTotalUnidades();
    contador.textContent = total;
    if (total > 0) {
      contador.classList.add("ativo");
    } else {
      contador.classList.remove("ativo");
    }
  }
}

// Formata um valor em euros (formato português)
function formatarPreco(valor) {
  return valor.toFixed(2).replace(".", ",") + " €";
}
