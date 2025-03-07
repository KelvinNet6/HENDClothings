// Load cart from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update cart count in UI
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
  }
}

// Function to add items to the cart
function addToCart(productName, price) {
  // Ensure cart is an array
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Check if the product already exists in the cart
  const existingItem = cart.find(item => item.productName === productName);

  if (existingItem) {
    existingItem.quantity += 1; // Increase quantity if item exists
  } else {
    cart.push({ productName, price, quantity: 1 }); // Add new item
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the cart count in the UI
  updateCartCount();

  alert(`${productName} has been added to your cart!`);
  console.log(cart); // Display cart contents in console for testing
}

// Restore cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart again
  updateCartCount(); // Update cart count display
});
