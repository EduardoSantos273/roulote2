let totalPrice = 0;

document.querySelectorAll('.calculator button').forEach(button => {
    button.addEventListener('click', function() {
        const price = parseFloat(this.getAttribute('data-price'));
        const item = this.textContent.split(' - ')[0]; // Ajuste para pegar apenas o nome do item
        totalPrice += price;

        const orderSummary = document.getElementById('order-summary');
        const newItem = document.createElement('li');
        newItem.textContent = `${item} - ${price.toFixed(2)}€`;
        orderSummary.appendChild(newItem);

        document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    });
});

document.getElementById('add-client').addEventListener('click', function() {
    const clientName = document.getElementById('client-name').value || `Cliente ${document.getElementById('order-list').children.length + 1}`;
    const orderSummary = document.getElementById('order-summary').innerHTML;
    const total = document.getElementById('total-price').textContent;

    const orderList = document.getElementById('order-list');
    const newOrder = document.createElement('li');
    newOrder.innerHTML = `<strong>${clientName}</strong><br>Pedido: <ul>${orderSummary}</ul>Total: ${total}€`;
    orderList.appendChild(newOrder);

    document.getElementById('client-name').value = '';
    document.getElementById('order-summary').innerHTML = '';
    document.getElementById('total-price').textContent = '0';
    totalPrice = 0;
});

document.getElementById('reset').addEventListener('click', function() {
    document.getElementById('client-name').value = '';
    document.getElementById('order-summary').innerHTML = '';
    document.getElementById('total-price').textContent = '0';
    totalPrice = 0;
});
