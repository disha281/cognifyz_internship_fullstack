const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let submissions = [];

app.get("/", (req, res) => {
  res.render("form", { error: null });
});

app.post("/submit", (req, res) => {
  const { name, email, age, gender, message } = req.body;

  if (!name || !email || !age || !gender) {
    return res.render("form", {
      error: "All fields except message are required!",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.render("form", { error: "Please enter a valid email address." });
  }

  submissions.push({
    name,
    email,
    age,
    gender,
    message,
    time: new Date().toLocaleString(),
  });

  console.log("Current submissions:", submissions);

  res.render("success", { name });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
