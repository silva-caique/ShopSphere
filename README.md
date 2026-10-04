# ShopSphere — Loja Online Demonstrativa

Projeto de portefólio de uma loja online moderna de produtos tecnológicos, desenvolvida exclusivamente com **HTML5**, **CSS3** e **JavaScript puro (Vanilla JS)**.

---

## Descrição

A **ShopSphere** é uma loja online fictícia focada em gadgets, periféricos e acessórios digitais. O objetivo deste projeto é demonstrar competências de desenvolvimento frontend com código simples, legível e adequado a quem está a aprender programação web.

Não se trata de um template genérico: todas as funcionalidades principais (pesquisa, filtros, carrinho, favoritos, detalhes de produto) estão implementadas e funcionam sem necessidade de backend.

---

## Objetivos do projeto

- Criar uma experiência de compra online completa no frontend
- Utilizar apenas tecnologias web fundamentais (HTML, CSS e JS)
- Manter o código organizado, comentado e fácil de estudar
- Aplicar boas práticas de responsividade e acessibilidade básica
- Servir como peça de portefólio no GitHub

---

## Funcionalidades implementadas

### Catálogo e produtos
- 14 produtos de demonstração (auscultadores, ratos, teclados, monitores, colunas, relógios, acessórios e gadgets)
- Cartões de produto com imagem, nome, categoria, preço, classificação e etiquetas
- Vista de detalhes em modal com seletor de quantidade
- Fallback visual quando uma imagem falha

### Pesquisa
- Pesquisa em tempo real por nome, categoria ou descrição
- Ignora maiúsculas/minúsculas
- Botão para limpar a pesquisa
- Mensagem quando não há resultados

### Filtros e ordenação
- Filtro por categoria
- Preço mínimo e máximo (com validação)
- Apenas produtos em promoção
- Vista de favoritos
- Ordenação: recomendados, menor/maior preço, nome A–Z, melhor classificação
- Botão para limpar todos os filtros
- Filtros combináveis entre si

### Carrinho de compras
- Adicionar produtos (com quantidade)
- Aumentar / diminuir quantidades
- Remover produtos individuais
- Limpar o carrinho completo
- Cálculo automático de subtotais e total
- Contador de unidades no cabeçalho
- Persistência com `localStorage`
- Painel lateral com animação
- Checkout demonstrativo (sem pagamentos reais)

### Favoritos
- Adicionar e remover favoritos
- Estado visual distinto nos botões
- Vista dedicada aos favoritos
- Persistência com `localStorage`

### Interface e experiência
- Design moderno, elegante e minimalista
- Cabeçalho sticky com pesquisa e ações
- Secção hero, categorias, destaques e promoções
- Notificações visuais ao adicionar ao carrinho/favoritos
- Estados vazios (carrinho e resultados)
- Responsivo (mobile, tablet e desktop)
- Respeito por `prefers-reduced-motion`
- Navegação por teclado e foco visível
- HTML semântico e atributos ARIA básicos

---

## Tecnologias utilizadas

| Tecnologia | Utilização |
|------------|------------|
| HTML5 | Estrutura semântica das páginas |
| CSS3 | Layout (Grid + Flexbox), design, animações e responsividade |
| JavaScript (Vanilla) | Toda a lógica: DOM, eventos, filtros, carrinho, favoritos e localStorage |

**Não foram utilizados:** React, Vue, Angular, TypeScript, Bootstrap, Tailwind, jQuery, Node.js, bases de dados ou qualquer framework de backend.

---

## Estrutura das pastas

```
ShopSphere/
├── index.html          # Página principal
├── README.md           # Este ficheiro
├── css/
│   └── style.css       # Todos os estilos
├── js/
│   ├── products.js     # Dados dos produtos
│   ├── app.js          # Lógica principal (filtros, pesquisa, UI)
│   ├── cart.js         # Operações do carrinho
│   └── favorites.js    # Gestão dos favoritos
└── assets/
    └── images/         # Pasta reservada para imagens locais (opcional)
```

---

## Como executar localmente

### Opção 1 — Visual Studio Code + Live Server (recomendado)

1. Abra a pasta `ShopSphere` no Visual Studio Code.
2. Instale a extensão **Live Server** (por Ritwick Dey), se ainda não a tiver.
3. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.
4. O site abre automaticamente no navegador.

### Opção 2 — Abrir diretamente no navegador

1. Extraia o ficheiro ZIP.
2. Abra a pasta `ShopSphere`.
3. Faça duplo clique em `index.html` (ou arraste o ficheiro para o navegador).

> Nota: Algumas funcionalidades de `localStorage` funcionam normalmente em ficheiros locais. O Live Server é preferível para uma experiência mais próxima de um servidor real.

### Opção 3 — Servidor Python simples (opcional)

Se tiver Python instalado:

```bash
cd ShopSphere
python -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador.

---

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (por exemplo `shopsphere`).
2. Faça upload de todos os ficheiros da pasta `ShopSphere`.
3. Vá a **Settings → Pages**.
4. Em **Source**, escolha a branch `main` e a pasta `/ (root)`.
5. Guarde. Após alguns minutos o site ficará disponível em:
   `https://SEU-UTILIZADOR.github.io/shopsphere/`

---

## Limitações conhecidas

- Não existe backend nem base de dados real.
- Não há sistema de autenticação de utilizadores.
- O checkout é apenas demonstrativo — nenhuma compra é processada.
- As imagens dos produtos são carregadas a partir de URLs públicas (Unsplash). Podem ficar temporariamente indisponíveis; existe fallback com placeholder.
- Não há paginação (todos os produtos filtrados são mostrados de uma vez).
- Os dados de classificação e número de avaliações são fictícios.

---

## Aviso importante

**Esta é uma loja meramente demonstrativa.**

- Não existem vendas reais.
- Não são processados pagamentos.
- Não são recolhidos dados pessoais nem informações bancárias.
- Os preços, stocks e avaliações são inventados para efeitos de demonstração.

---

## Capturas de ecrã

*(Adicione aqui capturas de ecrã do projeto após o publicar ou testar localmente.)*

| Página inicial | Catálogo | Carrinho |
|----------------|----------|----------|
| *inserir imagem* | *inserir imagem* | *inserir imagem* |

---

## Ideias para futuras melhorias

- Página de produto dedicada (em vez de modal)
- Sistema de avaliações interativo
- Comparação de produtos
- Modo escuro
- Mais animações subtis de microinterações
- Testes automatizados com Playwright ou Cypress
- Integração com uma API real de produtos (quando aprender backend)
- Suporte a múltiplas línguas

---

## Autor

Projeto desenvolvido no âmbito de estudos de programação web.

Sinta-se livre de estudar, modificar e adaptar o código.

---

**ShopSphere** — Código simples. Experiência completa.
