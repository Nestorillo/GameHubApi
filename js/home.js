function updateCartCounter() {
    const cartCounter = document.querySelector('.cart-counter');
    const cartItems = Object.keys(localStorage).length;
    
    if (cartCounter) {
        cartCounter.textContent = cartItems;
        cartCounter.style.display = cartItems > 0 ? 'block' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', async function(event) {
    console.log("sdf")
    game_card = document.getElementById('games-grid');
    
    // Create the cart counter
    const cartLink = document.querySelector('.cart-link');
    const cartCounter = document.createElement('span');
    cartCounter.classList.add('cart-counter');
    cartLink.appendChild(cartCounter);
    
    // Update the initial counter
    updateCartCounter();
    
    const data = await loadGames();

    loadData(data.data, 'all');
    console.log("sdf")
});

async function loadGames() {
    try {
        const response = await fetch('../js/games.JSON'); 
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hubo un problema:', error);
    }
}

function loadData(data, genre) {
    const gameCardContainer = document.getElementById('games-grid');
    gameCardContainer.innerHTML = '';

    const filteredGames = data.filter(game => game.genre === genre || genre === 'all').slice(0, 3);

    filteredGames.forEach(game => {
        let card = document.createElement('div');
        card.classList.add('game-card');

        let img = document.createElement('img');
        img.src = game.image.url;
        img.alt = game.title;

        let title = document.createElement('h2');
        title.textContent = game.title.toUpperCase();

        let price = document.createElement('p');
        price.textContent = `$${game.price}`;

        const addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('add-to-cart-btn', 'button-link');
        addToCartBtn.textContent = 'Add to Cart';

        addToCartBtn.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            addToCart(game);
        });

        card.addEventListener('click', () => {
            window.location.href = `./games-page.html?id=${game.id}`;
        });

        let descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('description-container');

        let descriptionContent = document.createElement('div');
        descriptionContent.classList.add('game-description');
        descriptionContent.textContent = game.description;

        descriptionContainer.appendChild(descriptionContent);

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(addToCartBtn);
        card.appendChild(descriptionContainer);

        gameCardContainer.appendChild(card);
    });
}

function addToCart(game){
    localStorage.setItem(game.id, JSON.stringify(game));
    updateCartCounter();
    alert(game.title + ' has been added to cart');
}