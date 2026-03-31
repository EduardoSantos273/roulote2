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
    actionHistory.push({ type: 'addProduct', name, price });
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

function addClient() {
    const clientName = document.getElementById('clientName').value || `Cliente ${clientIdCounter++}`;
    const client = {
        id: clientIdCounter,
        name: clientName,
        products: [...currentProducts],
        total: currentProducts.reduce((sum, product) => sum + product.price * product.quantity, 0),
        paid: false
    };

    if (editingClientId !== null) {
        const index = clients.findIndex(client => client.id === editingClientId);
        clients[index] = { ...client, id: editingClientId };
        editingClientId = null;
        document.getElementById('addClientButton').textContent = 'Adicionar';
    } else {
        clients.push(client);
    }

    actionHistory.push({ type: 'addClient', client });
    currentProducts = [];
    document.getElementById('clientName').value = '';
    renderClients();
    renderCurrentOrder();
}

function editClient(id) {
    const client = clients.find(client => client.id === id);
    currentProducts = [...client.products];
    document.getElementById('clientName').value = client.name;
    editingClientId = id;
    renderCurrentOrder();
    backToMain();
    document.getElementById('addClientButton').textContent = 'Confirmar';
}

function removeClient(id) {
    const client = clients.find(client => client.id === id);
    actionHistory.push({ type: 'removeClient', client });
    clients = clients.filter(client => client.id !== id);
    renderClients();
}

function clearOrder() {
    actionHistory.push({ type: 'clearOrder', products: [...currentProducts] });
    currentProducts = [];
    renderCurrentOrder();
}

function togglePaid(id) {
    const client = clients.find(c => c.id === id);
    client.paid = !client.paid;
    renderClients();
}

function renderClients() {
    const clientsDiv = document.getElementById('clients');
    clientsDiv.innerHTML = '';
    clients.forEach(client => {
        const clientDiv = document.createElement('div');
        clientDiv.className = 'client';
        clientDiv.innerHTML = `
            <div class="paid-indicator ${client.paid ? 'paid' : 'not-paid'}" onclick="togglePaid(${client.id})"></div>
            <h3>${client.name}</h3>
            <ul>
                ${client.products.map(product => `<li>${product.name} - ${product.price}€ (${product.quantity})</li>`).join('')}
            </ul>
            <p>Total: ${client.total.toFixed(2)}€</p>
            <button onclick="editClient(${client.id})">Editar</button>
            <button onclick="removeClient(${client.id})">Excluir</button>
        `;
        clientsDiv.appendChild(clientDiv);
    });
}

function showClients() {
    document.getElementById('mainScreen').style.display = 'none';
    document.getElementById('clientsScreen').style.display = 'flex';
}

function backToMain() {
    document.getElementById('clientsScreen').style.display = 'none';
    document.getElementById('mainScreen').style.display = 'flex';
}

function undoAction() {
    const lastAction = actionHistory.pop();
    if (!lastAction) return;

    switch (lastAction.type) {
        case 'addProduct':
            break;
        case 'addClient':
            break;
        case 'removeClient':
            break;
        case 'clearOrder':
            break;
    }
}
