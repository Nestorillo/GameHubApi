document.addEventListener('DOMContentLoaded', async function(event) {
    const id = getQueryParam('id');

    const cartLink = document.querySelector('.cart-link');
    const cartCounter = document.createElement('span');
    cartCounter.classList.add('cart-counter');
    cartLink.appendChild(cartCounter);
    
    updateCartCounter();

    const data = await cargarDatos(id);

    loadData(data);
    
});

function updateCartCounter() {
    const cartCounter = document.querySelector('.cart-counter');
    const cartItems = Object.keys(localStorage).length;
    
    if (cartCounter) {
        cartCounter.textContent = cartItems;
        cartCounter.style.display = cartItems > 0 ? 'block' : 'none';
    }
}


async function cargarDatos(id) {
    try {
        const response = await fetch('../js/games.JSON'); 
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }

        const data = await response.json();
        return data.data.find(game => game.id === id);
    } catch (error) {
        console.error('Hubo un problema:', error);
    }
}


function loadData(data) {
    const main = document.querySelector('main');
    main.innerHTML = '';
    
    const gameDetails = document.createElement('div');
    gameDetails.classList.add('game-details');
    
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    const image = document.createElement('img');
    image.src = data.image.url;
    image.alt = data.title;
    imageContainer.appendChild(image);
    
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');
    
    const title = document.createElement('h1');
    title.textContent = data.title;
    
    const about = document.createElement('h2');
    about.textContent = 'About the Game';
    
    const description = document.createElement('p');
    description.textContent = data.description;
    
    const genreTitle = document.createElement('h3');
    genreTitle.textContent = 'Genre';
    
    const genre = document.createElement('p');
    genre.textContent = data.genre;
    
    const releaseTitle = document.createElement('h3');
    releaseTitle.textContent = 'Release Date';
    
    const release = document.createElement('p');
    release.textContent = data.released;
    
    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container');
    
    const priceCircle = document.createElement('div');
    priceCircle.classList.add('price-circle');
    priceCircle.textContent = data.price > 0 ? `$${data.price.toFixed(2)}` : 'Free';
    
    const addToCartBtn = document.createElement('a');
    addToCartBtn.classList.add('add-to-cart-btn', 'button-link');
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.addEventListener('click', function(event){

        addToCart(data)
    })
    
    priceContainer.appendChild(priceCircle);
    priceContainer.appendChild(addToCartBtn);
    
    infoContainer.append(title, about, description, genreTitle, genre, releaseTitle, release, priceContainer);
    gameDetails.append(imageContainer, infoContainer);
    main.appendChild(gameDetails);
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}





function addToCart(game){
    localStorage.setItem(game.id, JSON.stringify(game))
    updateCartCounter();
    alert(game.title + ' has been added to cart')
}
