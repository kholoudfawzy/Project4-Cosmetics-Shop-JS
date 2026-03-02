let productsInCart = localStorage.getItem("productsInCart")
let allFavorates = document.querySelector(".favorates")

if(productsInCart){
    let item = JSON.parse(productsInCart);
    drawCartProducts(item)
}

function drawCartProducts(products){
  let total = 0;

  let y = products.map((item) => {
    total += item.price * item.qty; // حساب السعر الكلي لكل منتج

    return `
      <div class="cart_item">
        <img src="${item.imageUrl}" alt="product-img">

        <div class="card-data">
          <h5>${item.title}</h5>
          <p class="price">Price: ${item.price}$</p>
          <p class="category">Category: ${item.category}</p>

          <div class="qty-control">
            <button onclick="decrease(${item.id})">-</button>
            <span>${item.qty}</span>
            <button onclick="increase(${item.id})">+</button>
          </div>
          <div>
            <button class="remove_from_cart"
            onclick="removeFromCart(${item.id})">
            Remove From Cart
            </button>
          </div>    
        </div>
      </div>
    `;
  });

  allFavorates.innerHTML = y.join("");

  // تحديث التوتال في الـ span
  let totalPriceSpan = document.querySelector(".totalPrice");
  if(totalPriceSpan){
    totalPriceSpan.textContent = total;
  }
}


function removeFromCart(id){

    let cart = JSON.parse(localStorage.getItem("productsInCart"));

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem("productsInCart", JSON.stringify(cart));

    drawCartProducts(cart);
}


function increase(id){
    let cart = JSON.parse(localStorage.getItem("productsInCart")) || [];

    cart.forEach(item=>{
        if(item.id === id){
            item.qty += 1;
        }
    });

    localStorage.setItem("productsInCart", JSON.stringify(cart));
    drawCartProducts(cart);
}

function decrease(id){
    let cart = JSON.parse(localStorage.getItem("productsInCart")) || [];

    cart.forEach(item=>{
        if(item.id === id){
            item.qty -= 1;
        }
    });

    cart = cart.filter(item=> item.qty > 0);

    localStorage.setItem("productsInCart", JSON.stringify(cart));
    drawCartProducts(cart);
}
/////////////////////////// favorates ///////////////
let favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
let favContainer = document.querySelector(".favorates-container");

function drawFavorites() {
    favContainer.innerHTML = "";
    favorites.forEach(item => {
        favContainer.innerHTML += `
        <div class="card">
            <img src="${item.imageUrl}" alt="fav-img">
            <h5>${item.title}</h5>
            <p class="price">Price: ${item.price}$</p>
            <p class="category">Category: ${item.category}</p>
            <i class="fa-solid fa-heart liked addToFavBtn" onclick="toggleFav(${item.id})"></i>
        </div>
        `;
    });
}
drawFavorites();

function toggleFav(id) {
    let existingFav = favorites.find(item => item.id === id);
    if (existingFav) {
        favorites = favorites.filter(item => item.id !== id);
    } else {
        let chosenItem = products.find(item => item.id === id);
        favorites.push(chosenItem);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    drawFavorites();
}













