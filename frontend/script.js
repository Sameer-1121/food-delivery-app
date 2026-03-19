const restaurants = [
  {
    name: "Pizza Hub",
    menu: [
      { item: "Pizza", price: 200 },
      { item: "Burger", price: 100 }
    ]
  },
  {
    name: "Indian Tadka",
    menu: [
      { item: "Paneer", price: 250 },
      { item: "Roti", price: 20 }
    ]
  }
];

let cart = [];

function showRestaurants() {
  const container = document.getElementById("restaurant-list");

  container.innerHTML = ""; // important

  restaurants.forEach((res) => {
    const div = document.createElement("div");
    div.classList.add("restaurant");

    div.innerHTML = `<h3><i class="fa-solid fa-store"></i> ${res.name}</h3>`;

    res.menu.forEach((food) => {
      const foodDiv = document.createElement("div");
      foodDiv.classList.add("food-item");

      foodDiv.innerHTML = `
        <span>${food.item} - ₹${food.price}</span>
        <button onclick='addToCart("${food.item}", ${food.price})'>
          <i class="fa-solid fa-plus"></i>
        </button>
      `;

      div.appendChild(foodDiv);
    });

    container.appendChild(div);
  });
}

function addToCart(item, price) {
  cart.push({ item, price });
  showCart();
}

function showCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  cart.forEach((c) => {
    cartDiv.innerHTML += `<p>${c.item} - ₹${c.price}</p>`;
  });
}

function placeOrder() {
  alert("Order placed!");
}

// 🔥 THIS IS IMPORTANT
showRestaurants();

// 🔍 Search button functionality
document.querySelectorAll("input")[1].addEventListener("keyup", function() {
  let value = this.value.toLowerCase();
  alert("Searching for: " + value);
});

// 🔘 Explore buttons
document.querySelectorAll(".card button").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Opening restaurants...");
  });
});

// 🔐 Sign In
document.querySelector("a[href='#']").addEventListener("click", () => {
  alert("Sign In feature coming soon!");
});

// 📲 Get App / Coming Soon
document.querySelector(".nav-links button").addEventListener("click", () => {
  alert("App coming soon 🚀");
});

// 🍔 Restaurant click
document.querySelectorAll(".restaurant-card").forEach(card => {
  card.addEventListener("click", () => {
    alert("Opening restaurant menu...");
  });
});

async function loadRestaurants() {
  const res = await fetch("https://food-delivery-app-dvpw.onrender.com/restaurants");
  const data = await res.json();

  const container = document.querySelector(".slider");
  container.innerHTML = "";

  data.forEach((r) => {
    container.innerHTML += `
      <div class="restaurant-card">
        <img src="${r.image}">
        <h3>${r.name}</h3>
        <p>⭐ ${r.rating} • ₹${r.price}</p>
      </div>
    `;
  });
}

// 🔥 call function
loadRestaurants();