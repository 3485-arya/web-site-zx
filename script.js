// This part helps the browser remember your items
let cartCount = localStorage.getItem('texuraCart') ? parseInt(localStorage.getItem('texuraCart')) : 0;

// Run these functions as soon as the page loads
updateCartDisplay();
displayCartStatus();

function addToCart() {
    cartCount++;
    localStorage.setItem('texuraCart', cartCount); // Save to memory
    updateCartDisplay();
    alert("Added to your Texura bag!");
}

function updateCartDisplay() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.innerText = cartCount;
    }
}

function displayCartStatus() {
    // This finds the section you have in 1000073628.jpg
    const cartSection = document.querySelector('.cart-section');
    
    if (cartSection && cartCount > 0) {
        cartSection.innerHTML = `
            <h1>Shopping Bag</h1>
            <p>You have <strong>${cartCount}</strong> item(s) in your bag.</p>
            <button class="btn" onclick="clearCart()">Clear Bag</button>
            <br><br>
            <a href="shop.html" class="btn" style="display:inline-block; text-decoration:none;">Add More Items</a>
        `;
    }
}

function clearCart() {
    localStorage.removeItem('texuraCart');
    location.reload(); // Refresh the page to show it's empty
}
