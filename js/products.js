// Dados dos produtos da loja ShopSphere
// Array de objetos simples com informação de cada produto

const produtos = [
  {
    id: 1,
    nome: "Auscultadores Bluetooth Pro",
    categoria: "Auscultadores",
    preco: 79.99,
    precoAnterior: 99.99,
    descricao: "Auscultadores sem fios com cancelamento de ruído ativo, bateria de 30 horas e som de alta qualidade.",
    imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    classificacao: 4.7,
    avaliacoes: 234,
    etiqueta: "Promoção",
    disponivel: true
  },
  {
    id: 2,
    nome: "Rato Gaming RGB",
    categoria: "Ratos",
    preco: 45.90,
    precoAnterior: null,
    descricao: "Rato ergonómico para jogos com sensor óptico de alta precisão e iluminação RGB personalizável.",
    imagem: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    classificacao: 4.5,
    avaliacoes: 156,
    etiqueta: "Popular",
    disponivel: true
  },
  {
    id: 3,
    nome: "Teclado Mecânico Compacto",
    categoria: "Teclados",
    preco: 89.00,
    precoAnterior: 119.00,
    descricao: "Teclado mecânico 75% com switches azuis, retroiluminação LED e design compacto ideal para espaços reduzidos.",
    imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    classificacao: 4.8,
    avaliacoes: 312,
    etiqueta: "Promoção",
    disponivel: true
  },
  {
    id: 4,
    nome: "Monitor 27\" Full HD",
    categoria: "Monitores",
    preco: 199.99,
    precoAnterior: null,
    descricao: "Monitor IPS de 27 polegadas com resolução Full HD, taxa de atualização de 75Hz e suporte VESA.",
    imagem: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    classificacao: 4.6,
    avaliacoes: 89,
    etiqueta: "Novo",
    disponivel: true
  },
  {
    id: 5,
    nome: "Coluna Portátil Bluetooth",
    categoria: "Colunas",
    preco: 59.90,
    precoAnterior: 79.90,
    descricao: "Coluna portátil resistente à água com som estéreo potente e autonomia de 12 horas.",
    imagem: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    classificacao: 4.4,
    avaliacoes: 201,
    etiqueta: "Promoção",
    disponivel: true
  },
  {
    id: 6,
    nome: "Relógio Inteligente Fit",
    categoria: "Relógios",
    preco: 129.00,
    precoAnterior: null,
    descricao: "Smartwatch com monitorização de saúde, GPS integrado e ecrã AMOLED de alta resolução.",
    imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    classificacao: 4.3,
    avaliacoes: 178,
    etiqueta: "Novo",
    disponivel: true
  },
  {
    id: 7,
    nome: "Capa MagSafe para iPhone",
    categoria: "Acessórios Telemóvel",
    preco: 24.99,
    precoAnterior: null,
    descricao: "Capa protetora compatível com MagSafe, material silicone de qualidade e proteção completa.",
    imagem: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
    classificacao: 4.2,
    avaliacoes: 95,
    etiqueta: null,
    disponivel: true
  },
  {
    id: 8,
    nome: "Suporte para Portátil",
    categoria: "Acessórios PC",
    preco: 34.50,
    precoAnterior: 44.50,
    descricao: "Suporte ergonómico em alumínio ajustável para portáteis até 17 polegadas, melhora a postura.",
    imagem: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    classificacao: 4.6,
    avaliacoes: 67,
    etiqueta: "Promoção",
    disponivel: true
  },
  {
    id: 9,
    nome: "Webcam Full HD 1080p",
    categoria: "Gadgets",
    preco: 49.99,
    precoAnterior: null,
    descricao: "Webcam com microfone integrado, resolução Full HD e autofoco para videochamadas nítidas.",
    imagem: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop",
    classificacao: 4.5,
    avaliacoes: 143,
    etiqueta: "Popular",
    disponivel: true
  },
  {
    id: 10,
    nome: "Carregador Wireless 15W",
    categoria: "Acessórios Telemóvel",
    preco: 29.90,
    precoAnterior: 39.90,
    descricao: "Carregador sem fios rápido compatível com a maioria dos smartphones, design minimalista.",
    imagem: "https://images.unsplash.com/photo-1609091839311-b4b0c5c1b0b0?w=400&h=400&fit=crop",
    classificacao: 4.1,
    avaliacoes: 112,
    etiqueta: "Promoção",
    disponivel: true
  },
  {
    id: 11,
    nome: "Teclado e Rato Sem Fios",
    categoria: "Teclados",
    preco: 39.99,
    precoAnterior: null,
    descricao: "Conjunto teclado e rato sem fios com recetor USB, bateria de longa duração e design silencioso.",
    imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    classificacao: 4.0,
    avaliacoes: 88,
    etiqueta: null,
    disponivel: true
  },
  {
    id: 12,
    nome: "Auscultadores Gaming",
    categoria: "Auscultadores",
    preco: 69.90,
    precoAnterior: null,
    descricao: "Auscultadores para jogos com microfone destacável, som surround virtual e almofadas confortáveis.",
    imagem: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop",
    classificacao: 4.7,
    avaliacoes: 267,
    etiqueta: "Popular",
    disponivel: true
  },
  {
    id: 13,
    nome: "Hub USB-C 7 em 1",
    categoria: "Acessórios PC",
    preco: 42.00,
    precoAnterior: 55.00,
    descricao: "Hub multifunções com portas HDMI, USB 3.0, leitor de cartões e carregamento PD.",
    imagem: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop",
    classificacao: 4.4,
    avaliacoes: 76,
    etiqueta: "Promoção",
    disponivel: true
  },
  {
    id: 14,
    nome: "Powerbank 20000mAh",
    categoria: "Gadgets",
    preco: 35.90,
    precoAnterior: null,
    descricao: "Bateria externa de alta capacidade com carregamento rápido e duas portas USB.",
    imagem: "https://images.unsplash.com/photo-1609091839311-b4b0c5c1b0b0?w=400&h=400&fit=crop",
    classificacao: 4.5,
    avaliacoes: 198,
    etiqueta: "Novo",
    disponivel: true
  }
];

// Função auxiliar para obter um produto pelo ID
function obterProdutoPorId(id) {
  return produtos.find(function(produto) {
    return produto.id === id;
  });
}

// Função auxiliar para obter todas as categorias únicas
function obterCategorias() {
  var categorias = [];
  for (var i = 0; i < produtos.length; i++) {
    var cat = produtos[i].categoria;
    if (categorias.indexOf(cat) === -1) {
      categorias.push(cat);
    }
  }
  return categorias;
}
