// Inicializar a lista de produtos (carrega do localStorage ou usa uma lista padrão)
let products = JSON.parse(localStorage.getItem('products')) || [
    { id: '1', name: 'Açaí 300ml', price: 12.90, isHidden: false },
    { id: '2', name: 'Açaí 500ml', price: 18.90, isHidden: false },
    { id: '3', name: 'Açaí 700ml', price: 22.90, isHidden: false },
    { id: '4', name: 'Adicional Granola', price: 5.00, isHidden: false },
    { id: '5', name: 'Adicional Morango', price: 6.00, isHidden: false },
    { id: '6', name: 'Adicional Banana', price: 5.00, isHidden: true },
    { id: '7', name: 'Adicional Leite Condensado', price: 3.90, isHidden: false },
    { id: '8', name: 'Adicional Mel', price: 2.90, isHidden: false }
];

// Função para salvar os produtos no localStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Função para renderizar a lista de produtos em ordem alfabética
function renderProductList() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    // Ordenar produtos por nome (alfabética)
    products.sort((a, b) => a.name.localeCompare(b.name));

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <div class="product-info">
                <span>${product.name} - R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                <span class="status ${product.isHidden ? 'hidden' : 'available'}">
                    ${product.isHidden ? 'Oculto' : 'Disponível'}
                </span>
            </div>
            <div class="product-actions">
                <button onclick="editProduct('${product.id}')">Editar</button>
                <button onclick="deleteProduct('${product.id}')">Excluir</button>
                <button onclick="toggleProductVisibility('${product.id}')">
                    ${product.isHidden ? 'Reativar' : 'Ocultar'}
                </button>
            </div>
        `;
        productList.appendChild(productItem);
    });
}

// Função para adicionar ou editar um produto
function handleProductFormSubmit(event) {
    event.preventDefault();

    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value.trim();
    const productPrice = parseFloat(document.getElementById('productPrice').value);

    if (!productName || isNaN(productPrice) || productPrice <= 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    if (productId) {
        // Editar produto existente
        const product = products.find(p => p.id === productId);
        if (product) {
            product.name = productName;
            product.price = productPrice;
        }
    } else {
        // Adicionar novo produto
        const newProduct = {
            id: Date.now().toString(), // Gera um ID único baseado no timestamp
            name: productName,
            price: productPrice,
            isHidden: false
        };
        products.push(newProduct);
    }

    saveProducts();
    renderProductList();
    resetForm();
}

// Função para editar um produto
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('cancelEdit').style.display = 'inline';
        document.querySelector('#productForm button[type="submit"]').textContent = 'Atualizar Produto';
    }
}

// Função para excluir um produto
function deleteProduct(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        renderProductList();
    }
}

// Função para ocultar/reativar um produto
function toggleProductVisibility(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.isHidden = !product.isHidden;
        saveProducts();
        renderProductList();
    }
}

// Função para resetar o formulário
function resetForm() {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('cancelEdit').style.display = 'none';
    document.querySelector('#productForm button[type="submit"]').textContent = 'Salvar Produto';
}

// Configurar eventos
document.getElementById('productForm').addEventListener('submit', handleProductFormSubmit);
document.getElementById('cancelEdit').addEventListener('click', resetForm);

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    renderProductList();
});