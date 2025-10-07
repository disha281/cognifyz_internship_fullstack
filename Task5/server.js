const express = require("express");
const app = express();
const PORT = 3000;

//Middleware
app.use(express.json());
app.use(express.static("public")); // Serve frontend

//Dummy Data
let users = [
  { id: 1, name: "Disha" },
  { id: 2, name: "Whale" },
];

//READ - Get all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

//CREATE - Add user
app.post("/api/users", (req, res) => {
  const newUser = { id: users.length + 1, name: req.body.name };
  users.push(newUser);
  res.status(201).json(newUser);
});

//UPDATE - Edit user
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).send("User not found");
  user.name = req.body.name;
  res.json(user);
});

app.delete("/api/users/:id", (req, res) => {
  users = users.filter((u) => u.id != req.params.id);
  res.json({ message: "User deleted" });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
