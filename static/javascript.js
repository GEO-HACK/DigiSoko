// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Get all the "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
    // Add click event listener to each button
    addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCart);
    });
  });
  
  function addToCart(event) {
    event.preventDefault();
  
    // Get the selected product ID
    const productId = event.target.dataset.productId;
  
    // Send the selected product ID to the server
    fetch('/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: productId })
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      updateCartTable(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  function updateCartTable(data) {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear existing items
  
    // Loop through received data and add items to cart table
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.price}</td>
      `;
      cartItems.appendChild(row);
    });
  }
  