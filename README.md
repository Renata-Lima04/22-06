
Integrantes do grupo: Beatriz Soares Barrada e Renata Pereira Lima de Aguiar

- Beauren Cosméticos - Beleza que Transforma
Um e-commerce de cosméticos moderno e responsivo, focado em produtos de alta qualidade, inspirados na beleza natural e na sustentabilidade. Explore nossa coleção de maquiagens, cuidados com a pele, perfumes exclusivos e muito mais.

- Visão Geral
Este é o projeto front-end do site "Beauren Cosméticos", desenvolvido com foco em uma experiência de usuário intuitiva e um design elegante. O site apresenta diversas funcionalidades interativas para uma jornada de compra completa.

- Funcionalidades
Navegação Intuitiva: Barra de navegação responsiva com links para as principais seções do site (Início, Promoções, Catálogo, Contato, etc.).
Carrossel de Banners: Destaque visual para promoções e novos produtos na página inicial.
Listagem de Produtos: Seções "Mais Vendidos" e "Novidades" exibindo produtos em cards interativos.
Filtros de Produtos (Página Inicial/Catálogo):
Filtragem por categorias (Maquiagem, Cabelos, Perfumes, Hidratantes, Sabonetes, Acessórios).
Filtragem por faixa de preço (mínimo e máximo).
Aplicação de filtro por botão (garantindo controle do usuário).
Carrinho de Compras:
Adição de produtos ao carrinho com persistência de dados via localStorage.
Pré-visualização do carrinho em um modal acessível pela navbar.
Ajuste de quantidade e remoção de itens diretamente no carrinho.
Página dedicada ao carrinho com resumo detalhado.
Processo de Checkout (Simulado):
Cálculo de frete baseado em CEP (simulado).
Seleção de forma de pagamento (Cartão de Crédito, Boleto, PIX) com campos dinâmicos.
Geração de boleto (PDF) e QR Code PIX (simulados via bibliotecas JS).
Temas (Modo Claro/Escuro): Alternância entre modo claro e escuro para melhor conforto visual.
Páginas Institucionais: "Nossa História", "Perguntas Frequentes", "Política de Privacidade" e "Contatos" com formulário e mapa (ficício).
Rodapé Completo: Links úteis, redes sociais e formulário de newsletter.


- Tecnologias Utilizadas
HTML5: Estrutura semântica das páginas.
CSS3: Estilização personalizada para a identidade visual da Beauren.
Bootstrap 5: Framework front-end para responsividade e componentes pré-estilizados.
JavaScript (Vanilla JS): Lógica interativa do site, filtros, carrinho e funcionalidades dinâmicas.
Bootstrap Icons: Conjunto de ícones vetoriais.
Google Fonts: Fonte "Playfair Display" para um design elegante.
jsPDF: Biblioteca JavaScript para geração de documentos PDF (simulação de boleto).
QRCode.js: Biblioteca JavaScript para geração de QR Codes (simulação de PIX).


- Estrutura do Projeto
.
├── css/
│   ├── bootstrap.css       # Estilos base do Bootstrap
│   └── style.css           # Estilos personalizados da Beauren
├── img/                    # Imagens e ativos do site (banners, produtos, logo)
├── js/
│   ├── bootstrap.bundle.js # Arquivos JS do Bootstrap
│   ├── cart.js             # Lógica do carrinho de compras e checkout
│   ├── home-filtro.js      # Lógica de filtragem da página inicial
│   └── catalog.js          # Lógica de filtragem e paginação do catálogo (se implementado em arquivo separado)
├── home.html               # Página inicial do site
├── catalogo.html           # Página de catálogo de produtos
├── carrinho.html           # Página dedicada ao carrinho de compras
├── detalhes_produto        # Página com foto do produto em tamanho maior e descrição completa
├── meus_pedidos            # Página com o histórico de pedidos do cliente
├── historia.html           # Página "Nossa História"
├── contato.html            # Página de contatos
├── promocoes               # Página para exibir os produtos em promoção
├── perguntas_frequentes.html # Página de FAQ
├── politicas_privacidade.html # Página de Política de Privacidade
└── README.md               # Este arquivo!


- Como Executar o Projeto Localmente
Clone o repositório:

Bash

git clone (https://github.com/Renata-Lima04/BeaurenFinalizado.git)

Navegue até a pasta do projeto:

Bash

cd site_Beauren
Abra o home.html:

Você pode simplesmente abrir o arquivo home.html no seu navegador favorito.
Recomendado: Use uma extensão de servidor local como o Live Server para VS Code. Basta clicar com o botão direito no home.html e selecionar "Open with Live Server". Isso ajuda a simular um ambiente de servidor e lida melhor com o carregamento de recursos.


- Como Usar o Site
Navegação: Use a barra superior para navegar entre as seções.
Adicionar ao Carrinho: Clique no botão "Comprar" nos cards de produto.
Visualizar Carrinho: Clique no ícone de carrinho na navbar para abrir o modal.
Gerenciar Carrinho: Na página carrinho.html, ajuste quantidades ou remova itens.
Filtrar Produtos: Na página inicial ou no catálogo, use o sidebar esquerdo para filtrar por categoria e/ou preço, e clique em "Aplicar Filtro".
Alternar Tema: Use o botão "🌙 Escuro" / "☀️ Claro" no rodapé.

