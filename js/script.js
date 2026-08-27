let userInfo = document.querySelector("#user_info");
let userD = document.querySelector("#user");
let links = document.querySelector("#links");

if (localStorage.getItem("fristname")) {
    links.remove();
    userInfo.style.display = "flex";
    userD.innerHTML = localStorage.getItem("fristname") + " " + localStorage.getItem("lastname");
}

let logOutBtn = document.querySelector("#logout");
logOutBtn.addEventListener("click", function () {
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    }, 1500);
});

///////////////////////////////////////////////////////////////////
let allProducts = document.querySelector(".products");
let products = [
    { id: 1, title: "LENDI VZ Lavender Lotion", detail: "Soothing Hydration", category: "Skin Care", price: 25, imageUrl: "Images/loation.jpg" },
    { id: 2, title: "Chanel Chance Eau Splendide", detail:"Floral Elegance", category: "Perfume",price: 160, imageUrl: "Images/perfum.jpg" },
    { id: 3, title: "KBL Lavender Skincare Set", detail:"Luxury Glow", category: "Skin Care", price: 45, imageUrl: "Images/Glowing Skin Group.jpg" },
    { id: 4, title: "LANEIGE Lip Glowy Balm", detail:"Juicy Blueberry Hydration", category: "Skin Care", price: 18, imageUrl: "Images/Lip Glowy Balm.jpg" },
    { id: 5, title: "Herbivore Amethyst Polish", detail:"Exfoliating Glow", category: "Skin Care", price: 35, imageUrl: "Images/Exfoliating Body Polish.jpg" },
    { id: 6, title: "Herbivore Amethyst Set", detail:"Wellness Set - Natural Radianc", category: "Skin Care", price: 40, imageUrl: "Images/Glowing Skin Group5.jpg" },
    { id: 7, title: "Lavender Fresh Conditioner", detail:"Soft & Easy Styling", category: "Hair Care", price: 20, imageUrl: "Images/conditioner.jpg" },
    { id: 8, title: "MIXIT LAB Hyaluronic set", detail:"Nourishing & Mattifyin", category: "Hair Care", price: 35, imageUrl: "Images/Hair Serum.jpg" },
    { id: 9, title: "Herbivore Bakuchiol Serum", detail:"Retinol + free Rose Quartz Roller", category: "Skin Care", price: 37, imageUrl: "Images/Glowing Skin Group4.jpg" }
];

function drawItems() {
    let y = products.map((item) => {
        return `
        <div class="card">
            <img src="${item.imageUrl}" alt="product-img">
            <h5>${item.title}</h5>
            <h6>${item.detail}</h6>
            <p class="price">Price: ${item.price}$</p>
            <p class="category">Category: ${item.category}</p>
            <div class="btnsDiv">
                <i class="fa-solid fa-heart addToFavBtn" onclick="addToFav(${item.id})"></i>
                <button class="addToCartBtn" onclick="addToCart(${item.id}, this)">Add To Cart <i class="fa-solid fa-cart-shopping"></i></button>
            </div>
        </div>
        `;
    });
    allProducts.innerHTML = y.join("");

    // تحديث حالة الأزرار بعد الرسم
    let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];
    cartItems.forEach(item => {
        let btn = document.querySelector(`.addToCartBtn[onclick="addToCart(${item.id}, this)"]`);
        if (btn) {
            btn.innerHTML = "Added ✔";
            btn.style.backgroundColor = "#9ECCA4";
        }
    });

    let favItems = JSON.parse(localStorage.getItem("favorites")) || [];
    favItems.forEach(item => {
        let favIcon = document.querySelector(`.addToFavBtn[onclick="addToFav(${item.id})"]`);
        if (favIcon) {
            favIcon.classList.add("active");
        }
    });
}
drawItems();

let cartProductDiv = document.querySelector(".cart-products div");
let badge = document.querySelector(".badge");

let addedItem = localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")) : [];

if (addedItem.length > 0) {
    addedItem.forEach(item => {
    cartProductDiv.innerHTML += `
    <div class="cart-litle-div">
        <p>${item.title}</p>
        <p>Price: ${item.price}$</p>
        <div class="qty-control">
            <button class="minus">-</button>
            <span class="count">${item.qty}</span>
            <button class="plus">+</button>
        </div>
    </div>`;
});
    badge.style.display = "flex";
    badge.innerHTML = addedItem.length;
}

function addToCart(id, btn) {
    let email = localStorage.getItem("email");

    if (email && email.trim() !== "") {
        let chosenItem = products.find(item => item.id === id); 

        let existingItem = addedItem.find(item => item.id === id);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            chosenItem.qty = 1;
            addedItem.push(chosenItem);
        }

        localStorage.setItem("productsInCart", JSON.stringify(addedItem));
        updateCartDropdown();

        badge.style.display = "flex";
        badge.innerHTML = addedItem.length;

        btn.innerHTML = "Added ✔";
        btn.style.backgroundColor = "#9ECCA4";
    } else {
        window.location = "login.html"; 
    }
}

function updateCartDropdown() {
    cartProductDiv.innerHTML = "";
    let total = 0;

    addedItem.forEach(item => {
        total += item.price * item.qty;
        cartProductDiv.innerHTML += `
        <div class="cart-litle-div">
            <p>${item.title}</p>
            <p>Total: ${item.price * item.qty}$</p>
            <div class="qty-control">
                <button class="minus" onclick="decreaseQty(${item.id})">-</button>
                <span class="count">${item.qty}</span>
                <button class="plus" onclick="increaseQty(${item.id})">+</button>
            </div>
        </div>`;
    });

    cartProductDiv.innerHTML += `<hr><p><strong>Total: ${total}$</strong></p>`;
}

function increaseQty(id) {
    addedItem.forEach(item => {
        if (item.id === id) {
            item.qty += 1;
        }
    });
    localStorage.setItem("productsInCart", JSON.stringify(addedItem));
    updateCartDropdown();
    badge.innerHTML = addedItem.length;
}

function decreaseQty(id) {
    addedItem.forEach(item => {
        if (item.id === id) {
            item.qty -= 1;
        }
    });

    let beforeFilter = [...addedItem];

    // نشيل المنتجات اللي وصلت صفر
    addedItem = addedItem.filter(item => item.qty > 0);

    localStorage.setItem("productsInCart", JSON.stringify(addedItem));
    updateCartDropdown();
    badge.innerHTML = addedItem.length;

    let wasRemoved = beforeFilter.some(item => item.id === id && item.qty <= 0);
    if (wasRemoved) {
        let productCardBtn = document.querySelector(`.addToCartBtn[onclick="addToCart(${id}, this)"]`);
        if (productCardBtn) {
            productCardBtn.innerHTML = `Add To Cart <i class="fa-solid fa-cart-shopping"></i>`;
            productCardBtn.style.backgroundColor = ""; 
        }
    }
}


let shoppingCartIcon = document.querySelector(".shopping-cart");
let cartProducts = document.querySelector(".cart-products");

shoppingCartIcon.addEventListener("click", opencart);
function opencart() {
    if (cartProductDiv.innerHTML != "") {
        let isOpen = cartProducts.style.display === "block";
        cartProducts.style.display = isOpen ? "none" : "block";
        shoppingCartIcon.classList.toggle("active", !isOpen);
    }
}

let favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

function addToFav(id) {
    let email = localStorage.getItem("email");

    if (email && email.trim() !== "") {
        let chosenItem = products.find(item => item.id === id);
        let favIcon = document.querySelector(`.addToFavBtn[onclick="addToFav(${id})"]`);

        let existingFav = favorites.find(item => item.id === id);
        if (existingFav) {
            favorites = favorites.filter(item => item.id !== id);
            favIcon.classList.remove("active"); 
        } else {
            favorites.push(chosenItem);
            favIcon.classList.add("active"); 
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
        drawFavorites();
    } else {
        window.location = "login.html";
    }
}


function drawFavorites() {
    let favContainer = document.querySelector(".favorates-container");
    if (!favContainer) return; 

    favContainer.innerHTML = "";
    favorites.forEach(item => {
        favContainer.innerHTML += `
        <div class="card">
            <img src="${item.imageUrl}" alt="fav-img">
            <h5>${item.title}</h5>
            <p class="price">Price: ${item.price}$</p>
            <p class="category">Category: ${item.category}</p>
        </div>
        `;
    });
}
drawFavorites();
//////////////////////search ////////////////////////////
let searchInput = document.querySelector(".search_input");
let categorySelect = document.querySelector(".form-select");

searchInput.addEventListener("keyup", function () {
    let searchValue = searchInput.value.toLowerCase().trim();
    let selectedCategory = categorySelect.value;

    let filteredProducts = products.filter(item => {
        let matchName = item.title.toLowerCase().includes(searchValue);
        let matchCategory = (selectedCategory === "" || item.category === selectedCategory);
        return matchName && matchCategory;
    });

    drawFilteredItems(filteredProducts);
});

categorySelect.addEventListener("change", function () {
    let searchValue = searchInput.value.toLowerCase().trim();
    let selectedCategory = categorySelect.value;

    let filteredProducts = products.filter(item => {
        let matchName = item.title.toLowerCase().includes(searchValue);
        let matchCategory = (selectedCategory === "" || item.category === selectedCategory);
        return matchName && matchCategory;
    });

    drawFilteredItems(filteredProducts);
});

function drawFilteredItems(filteredProducts) {
    let y = filteredProducts.map((item) => {
        return `
        <div class="card">
            <img src="${item.imageUrl}" alt="product-img">
            <h5>${item.title}</h5>
            <h6>${item.detail}</h6>
            <p class="price">Price: ${item.price}$</p>
            <p class="category">Category: ${item.category}</p>
            <div class="btnsDiv">
                <i class="fa-solid fa-heart addToFavBtn" onclick="addToFav(${item.id})"></i>
                <button class="addToCartBtn" onclick="addToCart(${item.id}, this)">Add To Cart <i class="fa-solid fa-cart-shopping"></i></button>
            </div>
        </div>
        `;
    });
    allProducts.innerHTML = y.join("");

    if (filteredProducts.length === 0) {
        allProducts.innerHTML = `
        <div class="no-results">
            <i class="fa-solid fa-search"></i>
            <p>No products found for your search.<br>
            Please try another keyword or category.</p>
        </div>`;
    }
}
//////////////////cart dropdown ////////////
document.addEventListener("DOMContentLoaded", function() {
    updateCartDropdown();

    let shoppingCartIcon = document.querySelector(".shopping-cart");
    let cartProducts = document.querySelector(".cart-products");

    shoppingCartIcon.addEventListener("click", function(e) {
        e.stopPropagation();
    });

    cartProducts.addEventListener("click", function(e) {
        e.stopPropagation();
    });

    document.addEventListener("click", function() {
        cartProducts.style.display = "none";
        shoppingCartIcon.classList.remove("active");
    });
});

