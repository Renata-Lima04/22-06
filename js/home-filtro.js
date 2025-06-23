document.addEventListener('DOMContentLoaded', function() {
    console.log("home-filtro.js carregado e DOM pronto."); 

    // Seleciona os elementos do filtro
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    const priceMinInput = document.getElementById('priceMin');
    const priceMaxInput = document.getElementById('priceMax');
    const filterBtn = document.getElementById('filter-btn');
    
    // Seleciona todos os cards de produto na seção "Mais Vendidos"
    const productsContainer = document.querySelector('section.container > div.row > div.col-md-9 > div.row');
    const productCards = productsContainer ? productsContainer.querySelectorAll('[product-card]') : [];

    // logs para verificar se os elementos estão sendo encontrados
    console.log("Checkboxes de categoria encontrados:", categoryCheckboxes.length);
    console.log("Input Preço Mínimo:", priceMinInput);
    console.log("Input Preço Máximo:", priceMaxInput);
    console.log("Botão de Filtro:", filterBtn);
    console.log("Contêiner de produtos:", productsContainer);
    console.log("Cards de produto encontrados:", productCards.length);


    // Função para aplicar os filtros
    function applyHomeFilters() {
        console.log("Função applyHomeFilters foi chamada."); 
        // 1. Coleta as categorias selecionadas
        const selectedCategories = Array.from(categoryCheckboxes)
                                       .filter(checkbox => checkbox.checked)
                                       .map(checkbox => checkbox.value);
        console.log("Categorias selecionadas:", selectedCategories); 

        // 2. Coleta os valores de preço
        let minPrice = parseFloat(priceMinInput.value.replace(',', '.')) || 0;
        let maxPrice = parseFloat(priceMaxInput.value.replace(',', '.')) || Infinity;
        console.log("Preço Mínimo:", minPrice, "Preço Máximo:", maxPrice); 

        if (minPrice > maxPrice && maxPrice !== Infinity) {
            alert('O preço mínimo não pode ser maior que o preço máximo. Filtro de preço resetado.');
            minPrice = 0; 
            maxPrice = Infinity;
            priceMinInput.value = '';
            priceMaxInput.value = '';
            console.log("Filtro de preço resetado."); 
        }

        // 3. Itera sobre cada card de produto
        productCards.forEach(card => {
            const productCategory = card.getAttribute('data-category');
            const priceText = card.querySelector('.card-preco').textContent;
            const productPrice = parseFloat(priceText.replace('R$', '').replace(',', '.'));

            const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(productCategory);
            const isPriceMatch = productPrice >= minPrice && productPrice <= maxPrice;

            //  log para cada card
            console.log(`Produto: ${card.querySelector('.card-nome-produto').textContent}, Categoria: ${productCategory}, Preço: ${productPrice}`);
            console.log(`  Match Categoria: ${isCategoryMatch}, Match Preço: ${isPriceMatch}, Visível: ${isCategoryMatch && isPriceMatch}`);

            if (isCategoryMatch && isPriceMatch) {
                 card.classList.remove('d-none'); // Mostra o card (removendo a classe que esconde)
            } else {
                card.classList.add('d-none');    // Esconde o card (adicionando a classe d-none)
            }
        });
    }

    // Adiciona event listeners
    if (filterBtn) {
        filterBtn.addEventListener('click', applyHomeFilters);
        console.log("Listener para o botão de filtro adicionado."); 
    }
    applyHomeFilters(); // Chamada inicial
    console.log("applyHomeFilters chamado na inicialização."); 
});