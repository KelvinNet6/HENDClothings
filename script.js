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

// Function to display cart items in the modal
function displayCartModal() {
  const cartModal = document.getElementById("cart-modal");
  const cartItemsElement = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  // Clear any previous content
  cartItemsElement.innerHTML = "";

  let total = 0;

  // Loop through each cart item and display it in a compact format
  cart.forEach(item => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");

    // Create product image, if available
    const productImage = document.createElement("img");
    productImage.src = item.image || "default-product-image.jpg"; // Use default image if not available
    productImage.alt = item.productName;

    // Create product name, price, and quantity display
    const productDetails = document.createElement("p");
    productDetails.textContent = `${item.productName} - $${item.price} x ${item.quantity}`;

    cartItemElement.appendChild(productImage);
    cartItemElement.appendChild(productDetails);

    cartItemsElement.appendChild(cartItemElement);

    total += item.price * item.quantity;
  });

  // Display total price
  cartTotalElement.textContent = `Total: $${total}`;

  // Show the modal
  cartModal.style.display = "block";
}

// Function to close the cart modal
function closeCartModal() {
  const cartModal = document.getElementById("cart-modal");
  cartModal.style.display = "none";
}

// Open the modal when the cart icon is clicked
document.getElementById("cart-icon").addEventListener("click", displayCartModal);

// Close the modal when the close button is clicked
document.getElementById("close-modal").addEventListener("click", closeCartModal);

// Close the modal when the user clicks outside the modal content
window.addEventListener("click", function(event) {
  const cartModal = document.getElementById("cart-modal");
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

// Update cart count on page load
document.addEventListener("DOMContentLoaded", updateCartCount);
