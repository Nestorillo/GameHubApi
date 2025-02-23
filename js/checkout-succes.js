document.addEventListener('DOMContentLoaded', function(event) {
    const total = getQueryParam('total');
    ordersContainer = document.getElementById('orders')
    orderTotal = document.getElementById('total-amount')

    orderTotal.innerHTML = total + '$';

    const keys = Object.keys(localStorage);
    const games = keys.map(key => JSON.parse(localStorage.getItem(key)));

    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
    
        card.innerHTML = `
            <img src="${game.image.url}" alt="${game.image.alt}" class="game-image">
            <div class="game-info">
                <h3 class="game-name">${game.title}</h3>
                <p class="game-description">${game.description}</p>
                <p class="game-price">${game.discountedPrice.toFixed(2)} €</p>
            </div>
        `;
    
        ordersContainer.appendChild(card);
    })
    localStorage.clear()
    
});

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}