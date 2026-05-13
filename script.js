// This script handles the cart functionality for Texura
let cartCount = 0;

function addToCart() {
    cartCount++;
    const countElement = document.getElementById('cart-count');
    
    if (countElement) {
        countElement.innerText = cartCount;
    }
    
    alert("Added to your Texura bag!");
}

// Optional: Form submission alert for the contact page
document.addEventListener('submit', function(e) {
    if(e.target.id === 'contactForm') {
        e.preventDefault();
        alert("Thank you! Your message has been sent to Texura support.");
        e.target.reset();
    }
});
