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

  const boxes = document.querySelectorAll('.card');
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = 1; // Reveal the element
          }
      });
  });

  // Observe each box
  boxes.forEach(card => {
      observer.observe(card);
  });  

//scroll reveal for the products from bottom to top
// ScrollReveal(
//     {
//         origin: 'bottom',
//         distance: '50px',
//         duration: 1000,
//         easing: 'ease-in-out',
//         reset: true
//     }
// ).reveal('.card', {interval: 200}

// );

const myslde = document.querySelectorAll(".myslider");
const dots = document.querySelectorAll(".dot");

let counter = 1;
slidefun(counter);

let timer = setInterval(autoslide, 8000);

function autoslide() {
  counter += 1;
  slidefun(counter);
}

function plusSlides(n) {
  counter += n;
  slidefun(counter);
  resetTimer();
}

function currentSlide(n) {
  counter = n;
  slidefun(counter);
  resetTimer();
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(autoslide, 8000);
}

function slidefun(n) {
  let i;
  for (i = 0; i < myslde.length; i++) {
    myslde[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  if (n > myslde.length) {
    counter = 1;
  }
  if (n < 1) {
    counter = myslde.length;
  }
  myslde[counter - 1].style.display = "block";
  dots[counter - 1].classList.add("active");
}

  