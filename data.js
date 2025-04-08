// data.js
const products = [
    { id: "1", type: "base_acai", name: "Açaí Tradicional", description: "Açaí puro", price: 12.90, isVisible: true },
    { id: "2", type: "base_acai", name: "Açaí com Morango", description: "Açaí com morango", price: 15.90, isVisible: true },
    { id: "3", type: "base_acai", name: "Açaí com Pistache", description: "Açaí com pistache", price: 18.90, isVisible: false },
    { id: "4", type: "base_sorvete", name: "Sorvete de Chocolate", description: "Sorvete cremoso de chocolate", price: 10.90, isVisible: true },
    { id: "5", type: "base_sorvete", name: "Sorvete de Baunilha", description: "Sorvete cremoso de baunilha", price: 10.90, isVisible: true },
    { id: "6", type: "base_sorvete", name: "Sorvete de Morango", description: "Sorvete cremoso de morango", price: 10.90, isVisible: false },
    { id: "7", type: "acompanhamento", name: "Granola", description: "Granola extra", price: 5.00, isVisible: true },
    { id: "8", type: "acompanhamento", name: "Morango", description: "Morangos frescos", price: 6.00, isVisible: true },
    { id: "9", type: "acompanhamento", name: "Leite Condensado", description: "Leite condensado extra", price: 3.90, isVisible: true }
];

// Funções para gerenciar o carrinho no localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(item) {
    const cart = getCart();
    cart.push(item);
    saveCart(cart);
}

function clearCart() {
    localStorage.removeItem('cart');
}