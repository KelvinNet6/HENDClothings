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

// Function to show a toast notification
function showToastMessage(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;

  document.body.appendChild(toast);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Function to add items to the cart
function addToCart(productName, price) {
  // Check if cart exists
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Check if item already exists in cart
  const existingItem = cart.find(item => item.productName === productName);

  // If the item exists, increment the quantity
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Otherwise, add the item to the cart
    cart.push({ productName, price, quantity: 1 });
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the cart count in the UI
  updateCartCount();

  // Show toast message
  showToastMessage(`${productName} added to cart!`);
}

// Restore cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount();
});
