const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  const { username, email } = req.body;
  res.render("result", { name: username, email: email });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
