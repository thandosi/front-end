/*product = [];
let cart = [];
  
  
  fetch("https://guarded-lowlands-69569.herokuapp.com/get-Point_of_Sales/")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    products = data;
    showproducts(products);
  });

function showproducts(products) {
  let product_container = document.querySelector("#products");
  product_container.innerHTML = "";
  products.data.forEach((product) => {
    product_container.innerHTML += `
    <div class = "products">
        <img src="${product.images}" class = "product-images">
        <div class= "product-content">
        <h4 class = "product-title"> ${product.product_name}</h4>
        <p class = "product-description"> ${product.description}</p>
        <p class = "product-price">R${product.price} </p>
        <button onclick="addToCart(${product.id})"> Add to cart</button>
        </div>
    </div>

    `;
  });
} 

function addToCart(id) {
    let product = products.data.find((item) => {
      return (item.id = id);
  });
    console.log(product);
    cart.push(product);
    console.log("See Cart Items Here: ", cart);
  }

//   search for items

function searchForItems(){
    let searchTerm = document.querySelector("#searchTerm").value;
    console.log(searchTerm)

    let searchedProducts = product.filter(product => product.product_name.toLowerCase().startwith(searchTerm.toLowerCase()));
    console.log(searchedProducts);


    if (searchTerm.length == 0){
        document.querySelector("#products").innerHTML = "<h2>sorry no products found</h2>";

    }else{
        showproducts(searchedProducts)
    }
}*/
let products = [];
let cart = [];

function getData() {
  fetch("https://guarded-lowlands-69569.herokuapp.com/get-Point_of_Sales/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      products = data;
      make_products(data);
    });
}

getData();

function make_products(products) {
  let product_container = document.querySelector("#products");
  product_container.innerHTML = "";
  if (products.data == undefined) {
    products.data.forEach((product) => {
      product_container.innerHTML += `
        <div class = "products">
            <img src="${product.image}" class = "product-image">
            <div class = "product-content"> 
                <h4 class = "product-title"> ${product.product_name}</h4>
                <p class = "product-description"> ${product.description}</p>
                <p class = "product-price">R${product.price} </p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            
            </div>
            
        </div>
        `;
    });
  } else {
    products.data.forEach((product) => {
      product_container.innerHTML += `
        <div class = "products">
            <img src="${product.image}" class = "product-image">
            <div class = "product-content"> 
                <h4 class = "product-title"> ${product.product_name}</h4>
                <p class = "product-description"> ${product.description}</p>
                <p class = "product-price">R${product.price} </p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
                <button onclick="deleteProduct(${product.id})"> Delete product</button>
            </div>
            
        </div>
        `;
    });
  }
}

function renderCart(cartItems) {
  let cartContainer = document.querySelector("#cart");
  cartContainer.innerHTML = "";
  if (cartItems.length > 0) {
    cartItems.map((cartItem) => {
      cartContainer.innerHTML += `
      <div class = "products">
            <img src="${cartItem.image}" class = "product-image">
            <div class = "product-content"> 
                <h4 class = "product-title"> ${cartItem.product_name}</h4>
                <p class = "product-description"> ${cartItem.description}</p>
                <p class = "product-price">R${cartItem.price} </p>
                <button class ="revome_cart" onclick="removeItem()">Remove item</button>
            </div>
            
        </div>
      
      
      `;
    });
    let totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    cartContainer.innerHTML += `<h3> Your total is: ${totalPrice} </h3>`;
  } else {
    cartContainer.innerHTML = "<h2> No items in cart</h2>";
  }
}

function addToCart(id) {
  console.log(products.data);
  let product = products.data.find((item) => {
    return item.id == id;
  });
  console.log(product);
  cart.push(product);
  console.log(cart);
  renderCart(cart);
}

function deleteProduct(id1) {
  let product = products.data.find((item) => {
    return item.id == id1;
  });
  let prod_id = product.id;
  console.log(prod_id);

  fetch("https://guarded-lowlands-69569.herokuapp.com/get-Point_of_Sales/", {
    method: "POST",
    body: JSON.stringify({
      id: prod_id,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data["message"] == "Product post deleted successfully.") {
        alert("Deleted succesfully");
      } else {
        alert("did not work");
      }
    });

  console.log(product);
  console.log(cart);
}

function removeItem() {
  console.log(cart);
}

function searchForProducts() {
  let searchTerm = document.querySelector("#searchTerm").value;
  console.log(searchTerm);
  console.log(products.data);
  let searchedProducts = products.data.filter((product) =>
    product.product_name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  console.log(Object.entries(searchedProducts));
  make_products(Object.entries(searchForProducts));
}

const mystorage = window.localStorage;

function login() {
  fetch("https://evening-island-91230.herokuapp.com/auth", {
    method: "POST",
    body: JSON.stringify({
      username: document.getElementById("auth_username").value,
      password: document.getElementById("auth_password").value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data["description"] == "Invalid credentials") {
        alert(
          "Username or password is incorrect. Please enter correct details"
        );
      } else {
        console.log(data["access_token"]);
        mystorage.setItem("jwt-token", data["access_token"]);
        window.location.href = "./products.html";
      }
    });
}



function addtocatalogue() {
  fetch("https://evening-island-91230.herokuapp.com/create-products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${mystorage.getItem("jwt-token")}`,
    },
    body: JSON.stringify({
      prod_name: document.getElementById("prod_name").value,
      price: document.getElementById("price").value,
      description: document.getElementById("description").value,
      image: document.getElementById("image").value,
    }),
  })
    .then((response) => response.json)
    .then((data) => {
      console.log(data);
      console.log("success");
      if (data["description"] == "Product added succesfully") {
        alert("product added successfuly");
        window.location.href = "./products.html";
      } else {
        alert("did not add!, please make sure the information is correct.");
        window.location.href = "./products.html";
      }
    });
}

// Cart

function toggleCart() {
  document.querySelector("#cart").classList.toggle("active");
}

//auhugytrdfcgvhbjn


const addForm = document.getElementById('add-form')
const inputName = document.getElementById('name')
const inputPrice = document.getElementById('price')
const itemsList = document.getElementById('items')
const divTotal = document.getElementById('total')

addForm.onsubmit = function(e) {
  e.preventDefault()
  const name = inputname.value
  const price = inputprice.value
  
  addToCart(name, price)
  showCart()
}

itemsList.onclick = function(e) {
  console.log(e.target)
  if (e.target && e.target.classList.contains('remove')) {
    console.log(e.target.dataset.name)
    removeFromCart(e.target.dataset.name)
  } else if (e.target && e.target.classList.contains('add-one')) {
    addToCart(e.target.dataset.name)
  } else if (e.target && e.target.classList.contains('remove-one')) {
    removeFromCart(e.target.dataset.name, 1)
  }
}

itemsList.onchange = function(e) {
  if (e.target && e.target.classList.contains('update')) {
    const qty = parseInt(e.target.value)
    const name = e.target.dataset.name
    updateCart(name, qty)

  }
}

function addToCart(name, price) {
  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].name === name) {
      cart[i].qty += 1
      showCart()
      return true
    }
  }
  cart.push({ name, price, qty: 1})
  showCart()
}

function removeFromCart(name, qty = 0) {
  console.log(name, qty)
  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].name === name) {
      if (qty) {
        let newQty = cart[i].qty - qty
        if (newQty > 0) {
          cart[i].qty = newQty
        } else {
          cart.splice(i, 1)
        }
      } else {
        cart.splice(i, 1)
      }
    }
  }

  showCart()
}

function showCart() {
  let str = ''
  for (let i = 0; i < cart.length; i += 1) {
    str += `<li>
      <span>
        ${cart[i].name} ${cart[i].price} each 
        x ${cart[i].qty} = ${(cart[i].qty * cart[i].price).toFixed(2)}
      </span>
      <span>
        <button class="remove" data-name="${cart[i].product_name}">remove</button>
        <button class="add-one" data-name="${cart[i].prodduct_name}"> + </button>
        <button class="remove-one" data-name="${cart[i].product_name}"> - </button>
        <input class="update" data-name="${cart[i].product_name}" type="number">
      </span>
    </li>`
  }
}

function getTotal() {
  let total = 0
  for (let i = 0; i < cart.length; i += 1) {
    total += cart[i].price * cart[i].qty
  }
  return total.toFixed(2)
}

function updateCart(name, qty) {
  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].name === name) {
      cart[i].qty = qty
      showCart()
      return true
    }
  }
  return false
}

showCart()

getTotal()


