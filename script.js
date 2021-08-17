  let products = [];
let cart = [];


console.log(cart);


//* Fetching Products from the Api*//
fetch("https://guarded-lowlands-69569.herokuapp.com/get-Point_of_Sales/")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    products = data;
    showproducts(products);
  });

//* Show-Products Button*//
function showproducts(products) {
  let product_container = document.querySelector("#products");
  product_container.innerHTML = "";
  products.data.forEach((product) => {
    product_container.innerHTML += `
    <div class = "products" ">
        <img src="${product.images}" class = "product-images">
        <div class= "product-content">
        <h4 class = "product-title"> ${product.product_name}</h4>
        <p class = "product-price">R${product.price} </p>
        <button onclick="addToCart(${product.id})"> Add to cart</button>
        </div>
    </div>

    `;
  });
}

// Function to render Cart When items are being added//
function renderCart(cartItems) {
  cartItems.length > 0;
  let cartContainer = document.querySelector("#items");
  if (cartItems.length > 0) {
    cartItems.map((cartItem) => {
      cartContainer.innerHTML += `
      <div class = "prod">
            <div class = "product-content"> 
                <h4 class = "product-title"> ${cartItem.product_name}</h4>
                <p class = "product-description"> ${cartItem.description}</p>
                <p class = "product-price">R${cartItem.price} </p>
                <button class ="revome_cart"  onclick="removeItem(${cartItem.id})">Remove item</button>
            </div>
            
        </div>
      
      
      `;
    });
    let totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    cartContainer.innerHTML += `<h3>Total is: ${totalPrice} </h3>`;
  } else {
    cartContainer.innerHTML = "<h2> No items in cart</h2>";
  }
}

//* Add to cart functions*//
function addToCart(id) {
  let product = products.data.find((item) => {
    return (item.id = id);
  });
  console.log(product);
  cart.push(product);
  renderCart(cart);
  console.log("See Cart Items Here: ", cart);
}

// Function to toggleCart //

function toggleCart() {
  document.querySelector("#cart").classList.toggle("active");
}

// Deleting Items from the cart //

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
      if (data["message"] == "Product deleted successfully.") {
        alert("Deleted succesfully");
      } else {
        alert("Products Not Deleted");
      }
    });

  console.log(product);
  console.log(cart);
}

// Remove Items from Cart //
function removeItem(id) {
  let product = products.data.find((item) => {
    return item.id == id;
  });

  cart.splice(
    cart.findIndex((a) => a.id === product.id),
    1
  );
  renderCart(cart);
}

// Addding Products //

function addtocatalogue() {
  fetch("https://guarded-lowlands-69569.herokuapp.com/get-Point_of_Sales/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${mystorage.getItem("jwt-token")}`,
    },
    body: JSON.stringify({
      prod_name: document.getElementById("product_name").value,
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
