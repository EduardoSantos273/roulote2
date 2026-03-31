let clients = [];
let currentProducts = [];
let special = '';

function selectSpecial(s) {
    special = s;
}

function addProduct(name, price) {
    if (special) {
        name = special + " " + name;
        special = '';
    }

    const item = currentProducts.find(p => p.name === name);

    if (item) item.quantity++;
    else currentProducts.push({ name, price, quantity: 1 });

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
    const name = document.getElementById("clientName").value || "Cliente";

    clients.push({
        id: Date.now(),
        name,
        products: [...currentProducts],
        total: currentProducts.reduce((t, p) => t + p.price * p.quantity, 0),
        paid: false
    });

    currentProducts = [];
    document.getElementById("clientName").value = "";
    renderOrder();
    renderClients();
}

function togglePaid(id) {
    const c = clients.find(x => x.id === id);
    c.paid = !c.paid;
    renderClients();
}

function removeClient(id) {
    clients = clients.filter(c => c.id !== id);
    renderClients();
}

function renderClients() {
    const div = document.getElementById("clients");
    div.innerHTML = "";

    clients.forEach(c => {
        const box = document.createElement("div");
        box.className = "client";

        box.innerHTML = `
            <div class="status-dot ${c.paid ? 'paid' : 'unpaid'}"></div>
            <h3>${c.name}</h3>
            <p><strong>Total:</strong> ${c.total.toFixed(2)}€</p>
            <button onclick="removeClient(${c.id})">Apagar</button>
        `;

        box.onclick = () => togglePaid(c.id);

        div.appendChild(box);
    });
}

function clearOrder() {
    currentProducts = [];
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
