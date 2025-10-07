require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.log("❌ Database Connection Error:", err));

const User = require("./models/user");

const secretKey = process.env.JWT_SECRET || "supersecretkey";

app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const token = jwt.sign({ username: user.username }, secretKey);
    res.json({ message: "Login successful!", token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(403).send("Access denied");
  try {
    jwt.verify(token, secretKey);
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
}

app.get("/dashboard", verifyToken, (req, res) => {
  res.send("Welcome to your secure dashboard 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
