// Initialize cart from localStorage or set to 0
let cartCount = localStorage.getItem('texuraCart') ? parseInt(localStorage.getItem('texuraCart')) : 0;

// Update the number on the screen immediately when page loads
updateCartDisplay();

function addToCart() {
    cartCount++;
    // Save the new number to the browser's "notebook"
    localStorage.setItem('texuraCart', cartCount);
    updateCartDisplay();
    alert("Added to your Texura bag!");
}

function updateCartDisplay() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.innerText = cartCount;
    }
}

// Check if we are on the Shopping Bag page (cart.html)
if (window.location.pathname.includes('cart.html')) {
    const cartSection = document.querySelector('.cart-section');
    if (cartCount > 0) {
        cartSection.innerHTML = `
            <h1>Shopping Bag</h1>
            <p>You have ${cartCount} item(s) in your bag.</p>
            <button class="btn" onclick="clearCart()">Clear Bag</button>
            <a href="shop.html" class="btn" style="display:inline-block; margin-top:20px; text-decoration:none;">Continue Shopping</a>
        `;
    }
}

function clearCart() {
    localStorage.removeItem('texuraCart');
    location.reload(); // Refresh to show empty cart
}
