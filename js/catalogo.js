
// 1) CATALOGO DE PRODUTOS (BUSCA, FILTROS, PAGINAÇÃO)

// Só roda se estivermos na página de catálogo (verifica um elemento-chave)
if (document.getElementById("search-input")) {
  // Dados dos produtos
  const products = [
    { id:1, name:'Hidratante Facial',      category:'Hidratantes',   price:96.00,   image:'img/P1.jpg' },
    { id:2, name:'Shampoo Hidratação',     category:'Cabelos',     price:69.90,   image:'img/500.png' },
    { id:3, name:'Perfume Rosé',           category:'Perfumes',   price:259.90, image:'img/A2.png' },
    { id:4, name:'Iluminador Corporal',    category:'Maquiagem',price:139.90,   image:'img/E2.png' },
    { id:5, name:'Paleta de Sombras',      category:'Maquiagem',price:249.90,   image:'img/G2.png' },
    { id:6, name:'Sérum Radiante',       category:'Maquiagem',price:189.90,   image:'img/Q2.png' },
    { id:7, name:'Blush Cintilante',       category:'Maquiagem',price:129.90,   image:'img/K2.png' },
    { id:8, name:'Primer Facial',        category:'Maquiagem',price:159.90,   image:'img/R2.png' },
    { id:9, name:'Base Soft Matte',        category:'Maquiagem',price:159.90,   image:'img/I1.png' },
    { id:10, name:'Kit Hidratação',        category:'Cabelos',price:369.90,   image:'img/H1.png' },
    { id:11, name:'Contorno em pó',        category:'Maquiagem',price:79.90,   image:'img/J1.png' },
    { id:12, name:'Creme Hidratante Corporal',       category:'Hidratantes',price:89.90,   image:'img/B2.png' },
    { id:13, name:'Necessaire Beauren',       category:'Acessórios',price:149.90,   image:'img/F4.png' },
    { id:14, name:'Batom Matte',        category:'Maquiagem',price:89.90,   image:'img/N2.png' },
    { id:15, name:'Kit de sabonetes',       category:'Sabonetes',price:129.90,   image:'img/D2.png' },
    { id:16, name:'Kit Banho Premium',       category:'Sabonetes',price:299.90,   image:'img/M2.png' },
  ];

  let currentPage   = 1;
  const itemsPerPage = 8;

  // Aplica filtros, ordena e renderiza
  function applyFilters() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const cat    = document.getElementById('category-filter').value;
    const min    = parseFloat(document.getElementById('price-min').value) || 0;
    const max    = parseFloat(document.getElementById('price-max').value) || Infinity;
    const sort   = document.getElementById('sort-select').value;

    let filtered = products.filter(p =>
      p.name.toLowerCase().includes(search) &&
      (cat === "" || p.category === cat) &&
      p.price >= min && p.price <= max
    );

    // Ordenação
    if (sort === 'price-asc')   filtered.sort((a,b)=>a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a,b)=>b.price - a.price);
    if (sort === 'name-asc')   filtered.sort((a,b)=>a.name.localeCompare(b.name));
    if (sort === 'name-desc')   filtered.sort((a,b)=>b.name.localeCompare(a.name));

    renderProducts(filtered);
    renderPagination(filtered.length);
  }

  // Renderiza produtos na página atual
  function renderProducts(list) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    const start     = (currentPage - 1) * itemsPerPage;
    const pageItems = list.slice(start, start + itemsPerPage);

    pageItems.forEach(p => {
      const col = document.createElement('div');
      col.className = 'col';
      col.innerHTML = `
        <div class="card h-100 card-borda-dourada product-card" 
             data-category="${p.category}" data-price="${p.price}">
          <img src="${p.image}" class="card-img-top" alt="${p.name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text text-muted mb-2">R$ ${p.price.toFixed(2)}</p>
            <div class="mt-auto d-flex gap-2">
              <a href="#" class="btn btn-dourado">Comprar</a>
              <a href="#" class="btn btn-outline-dourado">Detalhes</a>
            </div>
          </div>
        </div>`;
      container.appendChild(col);
    });
  }

  // Renderiza paginação
  function renderPagination(totalItems) {
    const pages = Math.ceil(totalItems / itemsPerPage);
    const ul    = document.getElementById('pagination');
    ul.innerHTML = '';

    for (let i = 1; i <= pages; i++) {
      const li = document.createElement('li');
      li.className = `page-item ${i === currentPage ? 'active' : ''}`;
      li.innerHTML = `<a class="page-link link-dourado" href="#">${i}</a>`;
      li.addEventListener('click', e => {
        e.preventDefault();
        currentPage = i;
        applyFilters();
      });
      ul.appendChild(li);
    }
  }

  // Listener do botão “Aplicar Filtros”
  document.getElementById('apply-filters')
           .addEventListener('click', e => {
             e.preventDefault();
             currentPage = 1;
             applyFilters();
           });

  // Executa no carregamento
  window.addEventListener('load', applyFilters);
}