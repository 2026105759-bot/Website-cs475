/* =====================================
   BOBO'S CHOCOLATE WORLD
   SHOPPING CART & ORDER SYSTEM
===================================== */

// LOAD CART
let cart = JSON.parse(localStorage.getItem("boboCart")) || [];


// SAVE CART
function saveCart() {
    localStorage.setItem("boboCart", JSON.stringify(cart));
}


// ADD TO CART
function addToCart(name, price) {

    price = Number(price);

    let item = cart.find(product => product.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCart();

    alert(name + " added to cart! ♡");
}


// UPDATE CART
function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalPrice = document.getElementById("total-price");

    if (!cartItems || !cartCount || !totalPrice) return;

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty ♡</p>";
    }

    cart.forEach(item => {

        let subtotal = item.price * item.quantity;

        total += subtotal;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <span>${item.name}</span>

                <span>RM ${item.price.toFixed(2)}</span>

                <button onclick="changeQuantity('${item.name}', -1)">-</button>

                ${item.quantity}

                <button onclick="changeQuantity('${item.name}', 1)">+</button>

                <button onclick="removeFromCart('${item.name}')">
                    Remove
                </button>

                <span>RM ${subtotal.toFixed(2)}</span>

            </div>
        `;
    });

    cartCount.textContent = count;
    totalPrice.textContent = "RM " + total.toFixed(2);
}


// CHANGE QUANTITY
function changeQuantity(name, amount) {

    let item = cart.find(product => product.name === name);

    if (item) {

        item.quantity += amount;

        if (item.quantity <= 0) {
            cart = cart.filter(product => product.name !== name);
        }
    }

    saveCart();
    updateCart();
}


// REMOVE ITEM
function removeFromCart(name) {

    cart = cart.filter(product => product.name !== name);

    saveCart();
    updateCart();
}


// CHECKOUT
// PRODUCT PAGE TO CONTACT PAGE
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    saveCart();

    window.location.href = "contact.html";
}


// SUBMIT CUSTOMER DETAILS
function submitOrder(event) {

    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const name = document.getElementById("customer-name").value;
    const email = document.getElementById("customer-email").value;
    const phone = document.getElementById("customer-phone").value;
    const address = document.getElementById("delivery-address").value;
    const payment = document.getElementById("payment-method").value;
    const message = document.getElementById("customer-message").value;

    let total = 0;

    // RECEIPT DESIGN
    let receipt = `

        <div class="receipt">

            <h2 style="text-align:center;">
                ♡ BOBO'S CHOCOLATE WORLD ♡
            </h2>

            <h3 style="text-align:center;">
                ORDER RECEIPT
            </h3>

            <hr>

            <h3>Customer Details</h3>

            <p><b>Name:</b> ${name}</p>

            <p><b>Email:</b> ${email}</p>

            <p><b>Phone:</b> ${phone}</p>

            <p><b>Delivery Address:</b> ${address}</p>

            <p><b>Payment Method:</b> ${payment}</p>

            <p><b>Message:</b> ${message || "None"}</p>

            <hr>

            <h3>Order Items</h3>

    `;


    // DISPLAY PRODUCTS
    cart.forEach(item => {

        let subtotal = item.price * item.quantity;

        total += subtotal;

        receipt += `

            <div style="
                display:flex;
                justify-content:space-between;
                margin:10px 0;
            ">

                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <span>
                    RM ${subtotal.toFixed(2)}
                </span>

            </div>

        `;
    });


    // TOTAL PRICE
    receipt += `

            <hr>

            <h2 style="text-align:right;">
                Total: RM ${total.toFixed(2)}
            </h2>

            <hr>

            <h3 style="text-align:center;">
                Thank You For Your Order! ♡
            </h3>

            <p style="text-align:center;">
                Sweetness in Every Bite!
            </p>

        </div>

    `;


    // SHOW RECEIPT
    document.getElementById("order-summary").innerHTML = receipt;

    document.getElementById("order-form").style.display = "none";

    document.getElementById("order-confirmation").style.display = "block";

    document.getElementById("order-confirmation").scrollIntoView({
        behavior: "smooth"
    });
}


// PLACE ORDER
function placeOrder() {

    if (cart.length === 0) {
        return;
    }

    alert("Your order has been placed successfully! ♡");

    // CLEAR SHOPPING CART
    cart = [];

    localStorage.removeItem("boboCart");

    updateCart();

    // CLEAR CUSTOMER DETAILS
    const form = document.getElementById("customer-form");

    if (form) {
        form.reset();
    }

    // CLEAR OLD RECEIPT
    document.getElementById("order-summary").innerHTML = "";

    // HIDE CONFIRMATION
    document.getElementById("order-confirmation").style.display = "none";

    // SHOW CUSTOMER FORM AGAIN
    document.getElementById("order-form").style.display = "block";

    // GO BACK TO CUSTOMER FORM
    document.getElementById("order-form").scrollIntoView({
        behavior: "smooth"
    });
}


// LOAD CART WHEN PAGE OPENS
document.addEventListener("DOMContentLoaded", function() {

    cart = JSON.parse(localStorage.getItem("boboCart")) || [];

    updateCart();

});