// cart.js


// 1) INICIALIZAÇÃO

console.log("cart.js carregado");

// Recupera o carrinho do localStorage ou começa vazio
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Helper: atualiza badge de quantidade do carrinho (para o navbar)
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById("cart-count");
    if (badge) badge.textContent = count;
}
let descontoAplicado = 0; // variável para armazenar o desconto
let cupomUsado = ""; // nome do cupom (opcional)

// 2) RENDERIZA O CONTEÚDO DO CARRINHO (PARA MODAL E PÁGINA DEDICADA)

function renderCart() {
    const tbody = document.getElementById("cart-items");
    if (!tbody) return; // Se não encontrar a tbody, significa que não está na página do carrinho/modal

    tbody.innerHTML = ""; // Limpa o conteúdo atual

    let total = 0;
    if (cart.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">Seu carrinho está vazio.</td></tr>';
    } else {
        cart.forEach(item => {
            total += item.price * item.qty;
            tbody.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-sm btn-outline-secondary adjust-qty" data-id="${item.id}" data-action="decrease">-</button>
                            <span class="mx-2">${item.qty}</span>
                            <button class="btn btn-sm btn-outline-secondary adjust-qty" data-id="${item.id}" data-action="increase">+</button>
                        </div>
                    </td>
                    <td>R$ ${item.price.toFixed(2)}</td>
                    <td>R$ ${(item.price * item.qty).toFixed(2)}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-danger remove-item" data-id="${item.id}">
                            &times;
                        </button>
                    </td>
                </tr>`;
        });
    }

    // Aplica desconto, se houver cupom válido
if (descontoAplicado > 0) {
    total = total - (total * descontoAplicado);
}

const totalEl = document.getElementById("cart-total");
if (totalEl) totalEl.textContent = total.toFixed(2);

    // Garante que o total geral (com frete) seja atualizado
    updateGrandTotal();
}

document.getElementById("aplicar-cupom")?.addEventListener("click", () => {
    const cupomInput = document.getElementById("cupom").value.trim().toUpperCase();
    const mensagemEl = document.getElementById("mensagem-cupom");

    if (cupomInput === "PRIMEIRACOMPRA") {
        descontoAplicado = 0.10;
        cupomUsado = cupomInput;
        mensagemEl.textContent = "Cupom aplicado: 10% de desconto!";
        mensagemEl.classList.remove("text-danger");
        mensagemEl.classList.add("text-success");
    } else {
        descontoAplicado = 0;
        cupomUsado = "";
        mensagemEl.textContent = "Cupom inválido.";
        mensagemEl.classList.remove("text-success");
        mensagemEl.classList.add("text-danger");
    }
    
    localStorage.setItem("descontoAplicado", descontoAplicado);
    localStorage.setItem("cupomUsado", cupomUsado);

    renderCart(); // Recalcula o total com ou sem desconto
});


// Salva no localStorage e atualiza UI do carrinho
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // Atualiza badge da navbar
    renderCart();      // Re-renderiza o conteúdo do carrinho (modal ou página)
}


// 3) EVENTOS DO CARRINHO


// Adicionar ao carrinho (em todas as páginas que têm botões .add-to-cart)
document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        const id    = btn.dataset.id;
        const name  = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);
        if (!id || !name || isNaN(price)) {
            console.error("Dados de produto inválidos:", btn.dataset);
            return;
        }

        const existing = cart.find(i => i.id === id);
        if (existing) {
            existing.qty++;
        } else {
            cart.push({ id, name, price, qty: 1 });
        }
        saveCart();
        alert(`"${name}" adicionado ao carrinho!`); // Feedback visual para o usuário
    });
});

// Remover/Ajustar quantidade de item do carrinho (delegation na tbody)
document.getElementById("cart-items")?.addEventListener("click", e => {
    const target = e.target;
    if (target.classList.contains("remove-item")) {
        const id = target.dataset.id;
        cart = cart.filter(i => i.id !== id);
        saveCart();
    } else if (target.classList.contains("adjust-qty")) {
        const id = target.dataset.id;
        const action = target.dataset.action; // 'increase' ou 'decrease'
        const item = cart.find(i => i.id === id);

        if (item) {
            if (action === 'increase') {
                item.qty++;
            } else if (action === 'decrease') {
                item.qty--;
                if (item.qty <= 0) { // Se a quantidade chegar a zero ou menos, remove o item
                    cart = cart.filter(i => i.id !== id);
                }
            }
            saveCart();
        }
    }
});

// === BLOCO PARA INICIALIZAR E FECHAR O MODAL  ===
let cartModalInstance = null; // Variável para armazenar a instância do modal

// Abre o modal do carrinho (na navbar)
document.getElementById("cart-button")?.addEventListener("click", () => {
    renderCart(); // Renderiza o conteúdo do carrinho antes de abrir
    
    const cartModalElement = document.getElementById("cartModal");
    if (cartModalElement) {
        // Cria uma única instância do modal Bootstrap se ainda não existir
        if (!cartModalInstance) {
            cartModalInstance = new bootstrap.Modal(cartModalElement);
        }
        cartModalInstance.show(); // Exibe o modal
    }
});

// Listener para quando o modal *começa* a ser escondido (evento 'hide.bs.modal')
document.getElementById("cartModal")?.addEventListener("hide.bs.modal", () => {
    document.body.classList.remove("modal-open");
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    
    setTimeout(() => {
        const existingBackdrops = document.querySelectorAll('.modal-backdrop');
        existingBackdrops.forEach(backdrop => {
            backdrop.remove();
        });
    }, 50); // Um atraso menor aqui, focado na limpeza inicial
});

// Listener para quando o modal *termina* de ser escondido (evento 'hidden.bs.modal')
document.getElementById("cartModal")?.addEventListener("hidden.bs.modal", () => {
    document.body.classList.remove("modal-open");
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    const remainingBackdrops = document.querySelectorAll('.modal-backdrop');
    remainingBackdrops.forEach(backdrop => {
        if (backdrop && backdrop.parentNode) {
            backdrop.parentNode.removeChild(backdrop);
        }
    });
    document.getElementById("cart-button")?.focus();
});


// Botão finalizar compra 
document.getElementById("finish-button")?.addEventListener("click", () => {
    // Ao clicar em finalizar no modal da navbar, vai para a página do carrinho
    window.location.href = "carrinho.html";
});

// Inicializa badge de quantidade do carrinho na navbar ao carregar a página
updateCartCount();


// 4) CÁLCULO DE FRETE (NA PÁGINA DO CARRINHO)

// Função para recalcular e atualizar o total geral
function updateGrandTotal() {
    const subtotalEl = document.getElementById("cart-total");
    const shippingEl = document.getElementById("shipping-cost");
    const descontoEl = document.getElementById("desconto-valor");
    const grandTotalEl = document.getElementById("grand-total");

    let subtotal = parseFloat(subtotalEl?.textContent) || 0;
    const shipping = parseFloat(shippingEl?.textContent) || 0;

    // Calcula desconto
    const descontoValor = subtotal * descontoAplicado;
    const totalComDesconto = subtotal - descontoValor;

    const grandTotal = totalComDesconto + shipping;

    // Atualiza o campo de desconto
    if (descontoEl) {
        descontoEl.textContent = descontoValor.toFixed(2);
    }

    // Atualiza o total geral
    if (grandTotalEl) {
        grandTotalEl.textContent = grandTotal.toFixed(2);
    }

    // Atualiza o total no modal também
    const modalTotalElement = document.querySelector('#cartModal #cart-total');
    if (modalTotalElement) {
        modalTotalElement.textContent = grandTotal.toFixed(2);
    }
}






if (document.getElementById("shipping-form")) {
    document.getElementById("shipping-form").addEventListener("submit", e => {
        e.preventDefault();
        let cep = document.getElementById("zipcode").value.replace(/\D/g, "");
        let cost = 0; // Custo inicial do frete
        if (cep.length === 8) { // Valida um CEP simples
            if (cep.startsWith("2")) {
                cost = 15;
            } else if (cep.startsWith("3")) {
                cost = 20;
            } else {
                cost = 25;
            }
        } else {
            alert("Por favor, insira um CEP válido com 8 dígitos.");
            return; // Impede atualização se CEP inválido
        }
        
        document.getElementById("shipping-cost").textContent = cost.toFixed(2);
        updateGrandTotal(); // Atualiza o total geral após o frete ser calculado
    });
}


// 5) GERAR BOLETO E PIX (NA PÁGINA DO CARRINHO)

// Função para alternar a exibição dos campos de pagamento
function setupPaymentMethodToggle() {
    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const cardInfo = document.getElementById('card-info');
    const boletoInfo = document.getElementById('boleto-info');
    const pixInfo = document.getElementById('pix-info');
    const btnBoleto = document.getElementById('btn-boleto-print'); 
    const btnPix = document.getElementById('btn-pix-generate'); 

    function togglePaymentFields() {
        const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;

        // Esconde todos os campos primeiro
        cardInfo?.classList.add('d-none');
        boletoInfo?.classList.add('d-none');
        pixInfo?.classList.add('d-none');
        btnBoleto?.classList.add('d-none'); // Esconde o botão de boleto
        btnPix?.classList.add('d-none');   // Esconde o botão de pix

        // Exibe os campos baseados no método selecionado
        if (selectedMethod === 'card') {
            cardInfo?.classList.remove('d-none');
        } else if (selectedMethod === 'boleto') {
            boletoInfo?.classList.remove('d-none');
            btnBoleto?.classList.remove('d-none'); // Mostra o botão de boleto
        } else if (selectedMethod === 'pix') {
            pixInfo?.classList.remove('d-none');
            btnPix?.classList.remove('d-none');   // Mostra o botão de pix
            document.getElementById("qrcode").innerHTML = ""; // Limpa QR code ao mudar
        }
    }

    // Adiciona listeners para os radios de pagamento
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', togglePaymentFields);
    });

    // Chama a função uma vez para configurar o estado inicial
    togglePaymentFields();


// Finalizar compra com cartão
document.getElementById("btn-card-submit")?.addEventListener("click", () => {
    updateGrandTotal(); // Garante cálculo atualizado com frete e desconto
    alert("Compra finalizada com sucesso!\nTotal com desconto e frete: R$ " +
        (document.getElementById("grand-total")?.textContent || "0.00")
    );
});





}
console.log("Tentando configurar listener para o boleto.");
// Funções de geração de Boleto e Pix (usando os IDs de botão corretos)
if (window.jspdf && window.jspdf.jsPDF && document.getElementById("btn-boleto-print")) {
     console.log("Condição para boleto atendida: window.jsPDF existe e botão encontrado.");
    document.getElementById("btn-boleto-print").addEventListener("click", () => {
        console.log("Botão 'Imprimir Boleto' clicado e listener disparado!");
        const jsPDF = window.jspdf.jsPDF;
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Boleto de Teste Beauren", 20, 20);
        doc.setFontSize(12);
        doc.text(
            "23790.00009 00123.456789 01234.567890 1 67890000010000",
            20, 40
        );
        const total = document.getElementById("cart-total")?.textContent || "0.00"; // Usar o total da página
        doc.text(`Vencimento: 10/07/2025   Valor: R$ ${total}`, 20, 50);
        doc.save("boleto_beauren.pdf");
         console.log("Boleto deveria ter sido gerado após clique.");
    });
} else {
    console.warn("Condição para boleto NÃO atendida. window.jsPDF:", typeof window.jsPDF, "Botão encontrado:", !!document.getElementById("btn-boleto-print")); 
}
if (window.QRCode && document.getElementById("btn-pix-generate")) {
    document.getElementById("btn-pix-generate").addEventListener("click", () => {
        const payloadPix =
             "https://google.com";
        const qrcodeEl = document.getElementById("qrcode");
        if (qrcodeEl) {
            qrcodeEl.innerHTML = "";
            new QRCode(qrcodeEl, { text: payloadPix, width: 200, height: 200 });
            console.log("QR Code gerado com sucesso!");
        }
    });
}


// 7) TOGGLE MODO CLARO / ESCURO
// -----------------------------------------------
(function() {
    const darkOn = localStorage.getItem('theme') === 'dark';
    document.documentElement.classList.toggle('dark-mode', darkOn);

    const toggle = document.createElement('button');
    toggle.id    = 'theme-toggle';
    toggle.textContent = darkOn ? '☀️ Claro' : '🌙 Escuro';
    toggle.className   = 'btn btn-outline-dourado ms-3';

    const newsWrapper = document.getElementById('newsletter-wrapper'); // Alterado para o wrapper
    if (newsWrapper) {
        // Cria uma div para o botão e insere dentro do newsletter-wrapper
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'd-flex justify-content-center mt-3'; // Centraliza o botão
        toggleContainer.appendChild(toggle);
        newsWrapper.appendChild(toggleContainer);
    }
    
    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        toggle.textContent = isDark ? '☀️ Claro' : '🌙 Escuro';
    });
})();
