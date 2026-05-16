// 1. This helps the browser remember a full list of items instead of just a number
let cart = JSON.parse(localStorage.getItem('texuraCartList')) || [];

// 2. Run these functions as soon as the page loads to sync the view
document.addEventListener("DOMContentLoaded", () => {
    updateCartDisplay();
    displayCartStatus();
});

// 3. Updated function that receives the Name, Price, and Image Link from the button
function addToCart(name, price, imageUrl) {
    const item = {
        name: name,
        price: price,
        image: imageUrl
    };
    
    cart.push(item);
    localStorage.setItem('texuraCartList', JSON.stringify(cart));
    
    updateCartDisplay();
    alert(name + " added to your Texura bag!");
}

// 4. Updates the number indicator link in your navigation menu header
function updateCartDisplay() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.innerText = cart.length;
    }
}

// 5. This handles drawing the actual selected products and images inside the shopping bag page
function displayCartStatus() {
    const cartSection = document.querySelector('.cart-section');
    if (!cartSection) return;

    if (cart.length === 0) {
        cartSection.innerHTML = `
            <h1>Shopping Bag</h1>
            <p style="color:#888;">Your bag is completely empty.</p>
            <br>
            <a href="shop.html" class="btn" style="display:inline-block; text-decoration:none; text-align:center;">Add Items</a>
        `;
        return;
    }

    // Start building the screen view layout
    let htmlContent = `
        <h1>Shopping Bag</h1>
        <p>You have <strong>${cart.length}</strong> item(s) in your bag.</p>
        <button class="btn" onclick="clearCart()" style="margin-bottom: 20px;">Clear Bag</button>
        <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 15px;">
    `;

    let grandTotal = 0;

    // Loop through each product item and sum the pricing values
    cart.forEach((item, index) => {
        // Strip out 'rs' or other letters to extract clean calculation numbers
        const numericPrice = parseFloat(String(item.price).replace(/[^\d.]/g, '')) || 0;
        grandTotal += numericPrice;

        htmlContent += `
            <div style="display: flex; align-items: center; justify-content: space-between; background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${item.image || 'https://via.placeholder.com/60'}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;">
                    <div>
                        <h4 style="margin: 0; font-size: 0.95rem; font-weight: 600; color: #111;">${item.name}</h4>
                        <p style="margin: 4px 0 0 0; font-size: 0.85rem; color: #666;">Rs. ${item.price}</p>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ff4d4d; cursor: pointer; font-size: 0.9rem;">Remove</button>
            </div>
        `;
    });

    // Close the cart container structure and add the live calculated Grand Total Row
    htmlContent += `
        </div>
        <div style="text-align: right; padding: 20px 10px; font-size: 1.25rem; font-weight: bold; border-top: 2px solid #111; margin-top: 20px;">
            Total Price: Rs. ${grandTotal.toLocaleString('en-IN')}
        </div>
        <br><br>
        <a href="shop.html" class="btn" style="display:inline-block; text-decoration:none; text-align:center;">Add More Items</a>
    `;

    cartSection.innerHTML = htmlContent;
}

// 6. Allows removing individual items out of your bag list rows directly
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('texuraCartList', JSON.stringify(cart));
    updateCartDisplay();
    displayCartStatus();
}

// 7. Clears out the entire array list sequence
function clearCart() {
    localStorage.removeItem('texuraCartList');
    cart = [];
    updateCartDisplay();
    displayCartStatus();
}
