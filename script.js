let clients = [];
let currentProducts = [];
let editingClientId = null;
let clientIdCounter = 1;
let selectedSpecial = '';
let actionHistory = [];

function addProduct(name, price) {
    if (selectedSpecial) {
        name = `${selectedSpecial} ${name}`;
        selectedSpecial = '';
    }
    const existingProduct = currentProducts.find(product => product.name === name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        currentProducts.push({ name, price, quantity: 1 });
    }
    actionHistory.push({ action: 'add', product: { name, price } });
    renderCurrentOrder();
}

function selectSpecial(special) {
    selectedSpecial = special;
}

function renderCurrentOrder() {
    const orderList = document.getElementById('orderList');
    const orderTotal = document.getElementById('orderTotal');
    orderList.innerHTML = '';
    let total = 0;
    currentProducts.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.price}€ (${product.quantity})`;
        orderList.appendChild(li);
        total += product.price * product.quantity;
    });
    orderTotal.textContent = total.toFixed(2);
}

function undoLastAction() {
    const lastAction = actionHistory.pop();
    if (lastAction) {
        if (lastAction.action === 'add') {
            const productIndex = currentProducts.findIndex(product => product.name === lastAction.product.name);
            if (productIndex !== -1) {
                currentProducts[productIndex].quantity -= 1;
                if (currentProducts[productIndex].quantity === 0) {
                    currentProducts.splice(productIndex, 1);
                }
            }
        }
        renderCurrentOrder();
    }
}

function clearOrder() {
    currentProducts = [];
    actionHistory = [];
    renderCurrentOrder();
}
