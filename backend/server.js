require("dotenv").config();

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
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword
  });

  await user.save();
  res.send("User registered");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).send("Wrong password");

  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({ token });
});
