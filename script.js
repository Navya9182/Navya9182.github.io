let cart = [];
let total = 0;

// Carousel slider
const carousel = document.querySelector('.carousel-slide');
const slides = document.querySelectorAll('.pizza-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let index = 0;
const slideWidth = slides[0]?.clientWidth + 20;

function updateCarousel() {
  carousel.style.transform = `translateX(${-index * slideWidth}px)`;
}
nextBtn?.addEventListener('click', () => {
  if (index < slides.length - 1) index++;
  updateCarousel();
});
prevBtn?.addEventListener('click', () => {
  if (index > 0) index--;
  updateCarousel();
});

// Cart functions
function addToCart(name, price) {
  let found = cart.find(i => i.name === name);
  if (found) found.qty++;
  else cart.push({ name, price, qty: 1 });
  updateCart();
}
function updateCart() {
  let cartList = document.getElementById("cartList");
  cartList.innerHTML = "";
  total = 0;
  cart.forEach((item,i) => {
    let li = document.createElement("li");
    let amt = item.qty * item.price;
    total += amt;
    li.innerHTML = `${item.name} x${item.qty} - ₹${amt} <button onclick="removeItem(${i})">❌</button>`;
    cartList.appendChild(li);
  });
  document.getElementById("totalPrice").textContent = total;
}
function removeItem(i) {
  cart.splice(i,1);
  updateCart();
}
function placeOrder() {
  let nm = document.getElementById("name").value;
  let addr = document.getElementById("address").value;
  if (!nm||!addr) {
    alert("Please fill details!");
    return;
  }
  if (cart.length===0) {
    alert("Cart is empty!");
    return;
  }
  alert(`Order placed! 🍕\nName: ${nm}\nAddress: ${addr}\nTotal: ₹${total}`);
}

// Search
function searchPizzas() {
  let val = document.getElementById("searchInput").value.toLowerCase();
  slides.forEach(sl => {
    let name = sl.getAttribute("data-name").toLowerCase();
    sl.style.display = name.includes(val) ? "block" : "none";
  });
}