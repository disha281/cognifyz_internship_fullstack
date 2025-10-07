function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value.trim();
  const gender = document.getElementById("gender").value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !age || !gender) {
    alert("Please fill out all required fields!");
    return false;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address!");
    return false;
  }

  if (isNaN(age) || age <= 0) {
    alert("Please enter a valid age!");
    return false;
  }

  return true;
}
