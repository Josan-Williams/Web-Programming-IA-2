// Products array - IA#2 2d
// Purpose: Stores all available products in an array of objects
// Structure: Each product has an id, name, price, image path, and description
const products = [
    { id: 1, name: 'Organic Dog & Cat Treats', price: 15.99, image: '../Assets/dog-treats.jpg', description: 'Delicious organic treats for dogs.' },
    { id: 2, name: 'Cat Toy Set', price: 12.99, image: '../Assets/cat-toy.jpeg', description: 'Fun toys for cats.' },
    { id: 3, name: 'Pet Grooming Kit', price: 25.99, image: '../Assets/grooming-kit.jpeg', description: 'Complete grooming kit for pets.' },
    { id: 4, name: 'Dog Clothing', price: 20.99, image: '../Assets/dog-clothing.jpg', description: 'Stylish clothing for dogs.' },
    { id: 5, name: 'Cat Clothing', price: 18.99, image: '../Assets/cat-clothing.jpg', description: 'Comfortable clothing for cats.' },
    { id: 6, name: 'Dog Eating Bowl', price: 10.99, image: '../Assets/dog-eating.jpg', description: 'Durable bowl for dog food.' },
    { id: 7, name: 'Cat Eating Bowl', price: 9.99, image: '../Assets/cat-eating.jpg', description: 'Elegant bowl for cat food.' },
    { id: 8, name: 'Dogs Having Fun', price: 30.99, image: '../Assets/dogs-having-fun.jpg', description: 'Interactive toy for dogs.' },
    { id: 9, name: 'Cats Having Fun', price: 28.99, image: '../Assets/cats-having-fun.jpg', description: 'Play set for cats.' },
    { id: 10, name: 'Dog Clothing 2', price: 22.99, image: '../Assets/dog-clothing-2.jpeg', description: 'Additional dog clothing options.' },
    { id: 11, name: 'Cat Clothing 2', price: 19.99, image: '../Assets/cat-clothing-2.jpg', description: 'More cat clothing styles.' },
    { id: 12, name: 'Pet-Care Stickers', price: 5.99, image: '../Assets/logo.jpg', description: 'Pet-Care logo merchandise.' }
];

// Load products on products page - IA#2 2a
// Purpose: Dynamically display products on the products page
// Structure: Iterates through the products array and creates HTML elements for each product
if (document.getElementById('product-list')) {
    loadProducts();
}

// Load cart on cart page - IA#2 2a
// Purpose: Display items in the cart on the cart page
// Structure: Retrieves cart data from localStorage and displays each item with its details
if (document.getElementById('cart-items')) {
    loadCart();
}

// Load checkout summary on checkout page - IA#2 2a
// Purpose: Show a summary of the cart during checkout
// Structure: Calculates totals and displays them in the checkout summary section
if (document.getElementById('checkout-summary')) {
    loadCheckoutSummary();
}

// Function to load products - IA#2 2a
// Purpose: Create and display product elements on the products page
// Structure: Loops through the products array and appends HTML for each product to the product list
function loadProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 200px; height: 150px; object-fit: cover;">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Add to cart event listener - IA#2 2b
// Purpose: Handle click events on "Add to Cart" buttons
// Structure: Listens for clicks on buttons with the class 'add-to-cart' and calls addToCart function
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        addToCart(productId);
    }
});

// Function to add to cart - IA#2 2d
// Purpose: Add selected product to the cart stored in localStorage
// Structure: Checks if the product is already in the cart and updates quantity or adds new item
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
}

// Function to load cart - IA#2 2a
// Purpose: Display cart items and calculate totals on the cart page
// Structure: Retrieves cart from localStorage, displays each item, and calculates subtotal, discount, tax, and total
function loadCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML = '';
    let subTotal = 0;
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)} <button class="remove-btn" data-index="${index}">Remove</button></p>
        `;
        cartItems.appendChild(itemDiv);
        subTotal += item.price * item.quantity;
    });
    const discount = subTotal * 0.1;
    const tax = (subTotal - discount) * 0.15;
    const total = subTotal - discount + tax;
    cartTotal.innerHTML = `
        <p>Sub-total: $${subTotal.toFixed(2)}</p>
        <p>Discount (10%): $${discount.toFixed(2)}</p>
        <p>Tax (15%): $${tax.toFixed(2)}</p>
        <p>Total: $${total.toFixed(2)}</p>
    `;
}

// Remove from cart event listener - IA#2 2b
// Purpose: Handle click events on "Remove" buttons in the cart
// Structure: Listens for clicks on buttons with the class 'remove-btn' and calls removeFromCart function
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-btn')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        removeFromCart(index);
    }
});

// Function to remove from cart - IA#2 2d
// Purpose: Remove an item from the cart based on its index
// Structure: Splices the item from the cart array and updates localStorage
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Reload cart to update display
}

// Function to load checkout summary - IA#2 2a
// Purpose: Display a summary of the cart during checkout
// Structure: Calculates subtotal, discount, tax, and total, then displays them in the checkout summary section
function loadCheckoutSummary() {
    const checkoutSummary = document.getElementById('checkout-summary');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subTotal = 0;
    cart.forEach(item => {
        subTotal += item.price * item.quantity;
    });
    const discount = subTotal * 0.1;
    const tax = (subTotal - discount) * 0.15;
    const total = subTotal - discount + tax;
    checkoutSummary.innerHTML = `
        <h3>Cart Summary</h3>
        <p>Sub-total: $${subTotal.toFixed(2)}</p>
        <p>Discount (10%): $${discount.toFixed(2)}</p>
        <p>Tax (15%): $${tax.toFixed(2)}</p>
        <p>Total: $${total.toFixed(2)}</p>
    `;
}

// Form validation for login - IA#2 2c
// Purpose: Validate login form inputs
// Structure: Checks if username and password fields are filled before submission
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (!username || !password) {
            document.getElementById('login-error').textContent = 'All fields are required.';
            return;
        }
        alert('Login successful!');
    });
}

// Form validation for register - IA#2 2c
// Purpose: Validate registration form inputs
// Structure: Checks if all fields are filled and email format is correct before submission
if (document.getElementById('register-form')) {
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (!name || !dob || !email || !username || !password) {
            document.getElementById('register-error').textContent = 'All fields are required.';
            return;
        }
        if (!validateEmail(email)) {
            document.getElementById('register-error').textContent = 'Invalid email format.';
            return;
        }
        alert('Registration successful!');
    });
}

// Form validation for checkout - IA#2 2c
// Purpose: Validate checkout form inputs
// Structure: Checks if shipping details and amount paid are valid before submission
if (document.getElementById('checkout-form')) {
    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const shipName = document.getElementById('ship-name').value;
        const shipAddress = document.getElementById('ship-address').value;
        const amountPaid = parseFloat(document.getElementById('amount-paid').value);
        if (!shipName || !shipAddress || isNaN(amountPaid)) {
            document.getElementById('checkout-error').textContent = 'All fields are required and amount must be a number.';
            return;
        }
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let subTotal = 0;
        cart.forEach(item => {
            subTotal += item.price * item.quantity;
        });
        const discount = subTotal * 0.1;
        const tax = (subTotal - discount) * 0.15;
        const total = subTotal - discount + tax;
        if (amountPaid < total) {
            document.getElementById('checkout-error').textContent = 'Amount paid is less than total.';
            return;
        }
        alert('Checkout successful!');
        localStorage.removeItem('cart');
    });
}

// Clear all button - IA#2 2b
// Purpose: Clear all items from the cart
// Structure: Removes 'cart' from localStorage and resets checkout form
if (document.getElementById('clear-all')) {
    document.getElementById('clear-all').addEventListener('click', function() {
        localStorage.removeItem('cart');
        loadCheckoutSummary();
        document.getElementById('checkout-form').reset();
    });
}

// Close button - IA#2 2b
// Purpose: Redirect to index.html when close button is clicked
// Structure: Listens for click event on element with id 'close-btn' and changes window location
if (document.getElementById('close-btn')) {
    document.getElementById('close-btn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
}

// Email validation function - IA#2 2c
// Purpose: Validate email format using regular expression
// Structure: Uses regex to test if the email string is in a valid format
function validateEmail(email) {
    const check4foolishness = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return check4foolishness.test(email);
}