document.getElementById('add-client').addEventListener('click', function() {
    const clientName = document.getElementById('client-name').value;
    const orderList = document.getElementById('order-list');
    const newOrder = document.createElement('li');
    newOrder.textContent = clientName;
    orderList.appendChild(newOrder);
});

document.getElementById('reset').addEventListener('click', function() {
    document.getElementById('client-name').value = '';
    document.getElementById('order-list').innerHTML = '';
});
