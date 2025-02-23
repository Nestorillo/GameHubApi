function removeFromCart(gameId) {
    localStorage.removeItem(gameId);
    updateCartCounter()
    loadCart();
}

function calculateTotal(games) {
    const subtotal = games.reduce((total, game) => total + game.price, 0);
    const tax = 9.99;
    const shipping = 5.99;
    const total = subtotal + tax + shipping;
    return { subtotal, tax, shipping, total };
}

function loadCart() {
    const cartContainer = document.querySelector('.cart-container');
    cartContainer.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = 'Cart';
    cartContainer.appendChild(title);

    const keys = Object.keys(localStorage);
    const games = keys.map(key => JSON.parse(localStorage.getItem(key)));

    games.forEach(game => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const gameImage = document.createElement('img');
        gameImage.src = game.image.url;
        gameImage.alt = game.image.alt;
        gameImage.classList.add('game-image');

        const gameTitle = document.createElement('span');
        gameTitle.textContent = game.title;

        const gamePrice = document.createElement('span');
        gamePrice.textContent = `${game.price.toFixed(2)}$`;

        const trashIcon = document.createElement('img');
        trashIcon.src = '../assets/images/icon/icon-delete.png';
        trashIcon.alt = 'Remove';
        trashIcon.classList.add('trash-icon');
        trashIcon.addEventListener('click', () => removeFromCart(game.id));

        cartItem.appendChild(gameImage);
        cartItem.appendChild(gameTitle);
        cartItem.appendChild(gamePrice);
        cartItem.appendChild(trashIcon);

        cartContainer.appendChild(cartItem);
    });

    if (games.length > 0) {
        const { subtotal, tax, shipping, total } = calculateTotal(games);

        const cartTotal = document.createElement('div');
        cartTotal.classList.add('cart-total');

        const totalPrice = document.createElement('span');
        totalPrice.classList.add('total-price');
        totalPrice.textContent = `TOTAL: ${total.toFixed(2)}$`;

        const totalDetails = document.createElement('div');
        totalDetails.classList.add('total-details');
        totalDetails.innerHTML = `
            <span>Tax: ${tax.toFixed(2)}$</span><br>
            <span>Shipping: ${shipping.toFixed(2)}$</span>
        `;

        cartTotal.appendChild(totalPrice);
        cartTotal.appendChild(totalDetails);
        cartContainer.appendChild(cartTotal);
    } else {
        const emptyMessage = document.createElement('div');
        emptyMessage.classList.add('empty-cart-message');
        emptyMessage.textContent = 'Your cart is empty';
        cartContainer.appendChild(emptyMessage);
    }
}

function updateCartCounter() {
    const cartCounter = document.querySelector('.cart-counter');
    const cartItems = Object.keys(localStorage).length;
    
    if (cartCounter) {
        cartCounter.textContent = cartItems;
        cartCounter.style.display = cartItems > 0 ? 'block' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', function(event) {
    const cartLink = document.querySelector('.cart-link');
    const cartCounter = document.createElement('span');
    cartCounter.classList.add('cart-counter');
    cartLink.appendChild(cartCounter);
    
    updateCartCounter();
    loadCart();

    const btn = document.getElementById('checkout-succes');
    btn.addEventListener('click', function(event) {
        if (localStorage.length === 0) {
            alert('Any games selected');
        } else {
            const keys = Object.keys(localStorage);
            const games = keys.map(key => JSON.parse(localStorage.getItem(key)));
            const { total } = calculateTotal(games); 

            window.location.href = `checkout-succes.html?total=${encodeURIComponent(total.toFixed(2))}`;
            
        }
    });
});
