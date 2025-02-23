function updateCartCounter() {
    const cartCounter = document.querySelector('.cart-counter');
    const cartItems = Object.keys(localStorage).length;
    
    if (cartCounter) {
        cartCounter.textContent = cartItems;
        cartCounter.style.display = cartItems > 0 ? 'block' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', async function(event) {
    game_card = document.getElementById('games-grid');
    
    const cartLink = document.querySelector('.cart-link');
    const cartCounter = document.createElement('span');
    cartCounter.classList.add('cart-counter');
    cartLink.appendChild(cartCounter);
    
    updateCartCounter();
    
    const data = await loadGames();
    loadGenre(data.data) 
    loadData(data.data, 'all');
});

async function loadGames() {
    try {
        const response = await fetch('../js/games.JSON'); 
        if (!response.ok) {throw new Error('Error al cargar el archivo JSON');}

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Hubo un problema:', error);
    }
}

function loadGenre(data){
    genre_ul = document.getElementById('genre_ul');
    let array_genre = new Set();
    data.forEach(game => {
        genre = game.genre;
        array_genre.add(genre);
    })
    array_genre.forEach(genre => {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = "#"
        a.addEventListener('click', function(event){
            game_card.innerHTML = '';
            loadData(data, a.textContent)
        })
        a.textContent = genre;
        li.appendChild(a);
        genre_ul.appendChild(li)
    })
}

function loadData(data, genre) {
    data.forEach(game => {
        if (game.genre === genre || genre === 'all') {
            let cardContainer = document.createElement('div');
            cardContainer.classList.add('card-wrapper');

            let card = document.createElement('div');
            card.classList.add('game-card');
        
            let img = document.createElement('img');
            img.src = game.image.url;
            img.alt = game.title;

            let gameInfo = document.createElement('div');
            gameInfo.classList.add('game-info');
        
            let title = document.createElement('h3');
            title.textContent = game.title;

            let price = document.createElement('p');
            price.textContent = `$${game.price}`;

            const addToCartBtn = document.createElement('button');
            addToCartBtn.classList.add('add-to-cart-btn');
            addToCartBtn.textContent = 'Add to Cart';

            const descriptionContainer = document.createElement('div');
            descriptionContainer.classList.add('description-container');

            const descriptionContent = document.createElement('div');
            descriptionContent.classList.add('game-description');
            descriptionContent.textContent = game.description;

            addToCartBtn.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                addToCart(game);
            });

            card.addEventListener('click', () => {
                window.location.href = `./games-page.html?id=${game.id}`;
            });

            card.addEventListener('mouseenter', function(event) {
                document.querySelectorAll('.description-container.active').forEach(container => {
                    container.classList.remove('active');
                });
                
                descriptionContainer.classList.add('active');
            });
            
            card.addEventListener('mouseleave', function(event) {
                descriptionContainer.classList.remove('active');
            });
            
            gameInfo.appendChild(title);
            gameInfo.appendChild(price);
            gameInfo.appendChild(addToCartBtn);
            
            card.appendChild(img);
            card.appendChild(gameInfo);
            
            descriptionContainer.appendChild(descriptionContent);
            
            cardContainer.appendChild(card);
            cardContainer.appendChild(descriptionContainer);

            game_card.appendChild(cardContainer);
        }
    });
}

function addToCart(game){
    localStorage.setItem(game.id, JSON.stringify(game))
    updateCartCounter();
    alert(game.title + ' has been added to cart')
}