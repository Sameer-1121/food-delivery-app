let cart = [];

// 🛒 CART FUNCTIONS
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

// 🌐 LOAD FROM BACKEND
async function loadRestaurants() {
  try {
    const res = await fetch("https://food-delivery-app-dvpw.onrender.com/restaurants");
    const data = await res.json();

    displayBackendRestaurants(data);
  } catch (err) {
    console.log("Error loading restaurants:", err);
  }
}

// 🔥 SHOW BACKEND DATA
function displayBackendRestaurants(data) {
  const container = document.querySelector(".slider");
  container.innerHTML = "";

  data.forEach((r) => {
    container.innerHTML += `
      <div class="restaurant-card">
        <img src="${r.image || "https://source.unsplash.com/300x200/?food"}">
        <h3>${r.name}</h3>
        <p>⭐ ${r.rating || "4.0"} • ₹${r.price}</p>
        <button onclick="viewMenu('${r.name}')">View Menu</button>
      </div>
    `;
  });
}

// 📍 LOCATION + REAL API
async function getNearbyRestaurants() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;

      const query = `
        [out:json];
        node["amenity"="restaurant"](around:3000, ${userLat}, ${userLon});
        out;
      `;

      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query
      });

      const data = await res.json();

      displayNearbyRestaurants(data.elements, userLat, userLon);
    });
  } else {
    alert("Geolocation not supported");
  }
}

// 📍 SHOW NEARBY
function displayNearbyRestaurants(restaurants, userLat, userLon) {
  const container = document.querySelector(".slider");
  container.innerHTML = "";

  restaurants.slice(0, 10).forEach((r) => {
    const dist = calculateDistance(userLat, userLon, r.lat, r.lon);

    container.innerHTML += `
      <div class="restaurant-card">
        <img src="https://source.unsplash.com/300x200/?food,restaurant" />
        <h3>${r.tags.name || "Restaurant"}</h3>
        <p>📍 ${dist} km away</p>
        <button onclick="viewMenu('${r.tags.name || "Restaurant"}')">
          View Menu
        </button>
      </div>
    `;
  });
}

// 📏 DISTANCE
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
}

// 🍔 MENU BUTTON
function viewMenu(name) {
  alert("Opening menu for " + name);
}

// 🔍 SEARCH (REAL FILTER)
document.querySelectorAll("input")[1]?.addEventListener("keyup", function () {
  const value = this.value.toLowerCase();

  document.querySelectorAll(".restaurant-card").forEach((card) => {
    const name = card.querySelector("h3").innerText.toLowerCase();

    card.style.display = name.includes(value) ? "block" : "none";
  });
});

// 🚀 INIT
loadRestaurants();