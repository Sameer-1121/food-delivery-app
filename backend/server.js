const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 🔥 Middlewares
app.use(cors());
app.use(express.json());

// 🔥 MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/foodapp")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// 🔥 Schema (Restaurant)
const restaurantSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  price: Number,
  image: String
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// 🔥 Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// 🔥 Get all restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const data = await Restaurant.find();
    res.json(data);
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
});

// 🔥 Add restaurant
app.post("/add", async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.send("✅ Restaurant Added");
  } catch (err) {
    res.status(500).send("Error saving data");
  }
});

// 🔥 Server start
app.listen(3000, () => {
  console.log("🔥 Server running on http://localhost:3000");
});