// Shopping cart logic
let cart = [];

function addToCart(productName, price) {
  cart.push({ productName, price });
  alert(`${productName} has been added to your cart!`);
  console.log(cart); // Display cart in console for testing purposes
}
