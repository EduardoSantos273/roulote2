let clients = [];
let currentProducts = [];
let special = '';
let clientCounter = 1;
let editingClientId = null;

function selectSpecial(s) {
    special = s;
}

function addProduct(name, price) {
    if (special) {
        name = special + " " + name;
        special = '';
    }

    const item = currentProducts.find(p => p.name === name);

    if (item) {
        item.quantity++;
    } else {
        currentProducts.push({ name, price, quantity: 1 });
    }

    renderOrder();
}

function renderOrder() {
    const list = document.getElementById("orderList");
    const totalSpan = document.getElementById("orderTotal");

    list.innerHTML = "";
    let total = 0;

    currentProducts.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.name} (${p.quantity}) - ${p.price}€`;
        list.appendChild(li);
        total += p.price * p.quantity;
    });

    totalSpan.textContent = total.toFixed(2);
}

function addClient() {
    const nameInput = document.getElementById("clientName").value;
    const name = nameInput || `Cliente ${clientCounter++}`;
    const total = currentProducts.reduce((t, p) => t + p.price * p.quantity, 0);

    if (currentProducts.length === 0) return;

    if (editingClientId !== null) {
        const index = clients.findIndex(c => c.id === editingClientId);
        if (index !== -1) {
            clients[index] = {
                ...clients[index],
                name,
                products: currentProducts.map(p => ({ ...p })),
                total
            };
        }
        editingClientId = null;
        document.getElementById("addClientButton").textContent = "Adicionar Cliente";
    } else {
        clients.push({
            id: Date.now(),
            name,
            products: currentProducts.map(p => ({ ...p })),
            total,
            paid: false
        });
    }

    currentProducts = [];
    document.getElementById("clientName").value = "";
    renderOrder();
    renderClients();
}

function togglePaid(id) {
    const c = clients.find(x => x.id === id);
    if (!c) return;
    c.paid = !c.paid;
    renderClients();
}

function removeClient(id, event) {
    if (event) event.stopPropagation();
    clients = clients.filter(c => c.id !== id);
    renderClients();
}

function editClient(id, event) {
    if (event) event.stopPropagation();
    const client = clients.find(c => c.id === id);
    if (!client) return;

    currentProducts = client.products.map(p => ({ ...p }));
    document.getElementById("clientName").value = client.name;
    editingClientId = id;
    renderOrder();
    backToMain();
    document.getElementById("addClientButton").textContent = "Guardar Alterações";
}

function renderClients() {
    const div = document.getElementById("clients");
    div.innerHTML = "";

    clients.forEach(c => {
        const box = document.createElement("div");
        box.className = "client";

        const productsHtml = c.products
            .map(p => `<li>${p.name} (${p.quantity})</li>`)
            .join("");

        box.innerHTML = `
            <div class="status-dot ${c.paid ? 'paid' : 'unpaid'}"></div>
            <h3>${c.name}</h3>
            <ul>${productsHtml}</ul>
            <p><strong>Total:</strong> ${c.total.toFixed(2)}€</p>
            <button class="edit-btn" onclick="editClient(${c.id}, event)">Editar</button>
            <button class="delete-btn" onclick="removeClient(${c.id}, event)">Apagar</button>
        `;

        box.onclick = () => togglePaid(c.id);

        div.appendChild(box);
    });
}

function clearOrder() {
    currentProducts = [];
    editingClientId = null;
    document.getElementById("addClientButton").textContent = "Adicionar Cliente";
    renderOrder();
}

function showClients() {
    document.getElementById("mainScreen").style.display = "none";
    document.getElementById("clientsScreen").style.display = "block";
}

function backToMain() {
    document.getElementById("clientsScreen").style.display = "none";
    document.getElementById("mainScreen").style.display = "flex";
}
