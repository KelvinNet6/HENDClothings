// Load cart from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Hide checkout modal on page load
document.addEventListener("DOMContentLoaded", function() {
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutOverlay = document.getElementById("checkout-modal-overlay");
  
  if (checkoutModal) checkoutModal.style.display = "none";
  if (checkoutOverlay) checkoutOverlay.style.display = "none";
});

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
function addToCart(productName, price, image) {
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
    // Otherwise, add the item to the cart with image
    cart.push({ productName, price, quantity: 1, image });
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

 // Function to update the cart total in the checkout modal
function updateCheckoutTotal() {
  const checkoutTotal = document.getElementById("checkout-total");
  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  checkoutTotal.textContent = `$${totalAmount.toFixed(2)}`; // Display total with 2 decimal places
}

// Open the Checkout Modal when the "Go to Checkout" button is clicked
document.getElementById("checkout-button").addEventListener("click", function() {
  // Hide any other modals if they are open
  document.getElementById("cart-modal").style.display = "none"; // Hide cart modal when going to checkout

  // Calculate and display total amount in Checkout Modal
  const checkoutTotal = document.getElementById("checkout-total");
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  checkoutTotal.textContent = `$${totalAmount.toFixed(2)}`;

  // Show the checkout modal
  showCheckoutModal();
   updateCheckoutTotal();
});

// Function to show the checkout modal and overlay
function showCheckoutModal() {
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutOverlay = document.getElementById("checkout-modal-overlay");
  
  checkoutModal.style.display = "block";
  checkoutOverlay.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Open the Checkout Modal when the "Go to Checkout" button is clicked
document.getElementById("checkout-button").addEventListener("click", function() {
  // Hide the cart modal if open
  document.getElementById("cart-modal").style.display = "none";

  // Calculate and display the total amount in the checkout modal
  const checkoutTotal = document.getElementById("checkout-total");
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  checkoutTotal.textContent = `$${totalAmount.toFixed(2)}`;

  // Show the checkout modal
  showCheckoutModal();
});



// Function to hide the checkout modal and overlay
function hideCheckoutModal() {
  document.getElementById("checkout-modal").style.display = "none";
  document.getElementById("checkout-modal-overlay").style.display = "none";
  document.body.style.overflow = "auto";
}

// Close Checkout Modal when the close button is clicked
document.getElementById("close-checkout-modal").addEventListener("click", function() {
  hideCheckoutModal();
});

// Close Checkout Modal when clicking outside the modal (on overlay)
document.getElementById("checkout-modal-overlay").addEventListener("click", function() {
  hideCheckoutModal();
});


// Handle Pay Button Click to reveal the password field
document.getElementById("pay-button").addEventListener("click", function() {
  // Show password field when the Pay button is clicked
  document.getElementById("password-field").style.display = "block";
  document.getElementById("pay-button").textContent = "Submit Payment";  // Change the button text to 'Submit Payment'
});


// Simulate a payment API call (this can be replaced with real payment API logic)
function processPayment(paysheetNumber, paysheetPassword, totalAmount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock successful payment response (You can replace this logic with your real payment API)
      if (paysheetNumber && paysheetPassword) {
        resolve({
          status: "success",
          message: `Payment of $${totalAmount} successful!`
        });
      } else {
        reject("Invalid Paysheet details.");
      }
    }, 2000);  // Simulating a delay of 2 seconds (this would be the actual API call)
  });
}

// Initialize PayPal when the checkout modal is shown
function showCheckoutModal() {
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutOverlay = document.getElementById("checkout-modal-overlay");
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Initialize PayPal button
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: totalAmount.toFixed(2)
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        // Payment successful
        const paymentStatus = document.getElementById("payment-status");
        paymentStatus.textContent = "Payment successful! Thank you for your purchase.";
        
        // Clear cart
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        
        // Close modal after 3 seconds
        setTimeout(() => {
          hideCheckoutModal();
          paymentStatus.textContent = '';
        }, 3000);
      });
    }
  }).render('#paypal-button-container');

  checkoutModal.style.display = "block";
  checkoutOverlay.style.display = "block";
  document.body.style.overflow = "hidden";
}
