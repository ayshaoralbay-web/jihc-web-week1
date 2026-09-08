fetch("navber.html")
  .then((res) => res.text())
  .then((data) => (document.querySelector(".navbar").innerHTML = data));

fetch("footer.html")
  .then((res) => res.text())
  .then((data) => (document.querySelector("footer").innerHTML = data));

fetch("about.html")
  .then((res) => res.text())
  .then((data) => (document.querySelector(".about").innerHTML = data));


document.addEventListener("click", (event) => {
  if (event.target.closest("#loginBtn")) {
    event.preventDefault();
    document.querySelector("#loginPopup").classList.add("active");
  }

  if (event.target.id === "closeBtn") {
    document.querySelector("#loginPopup").classList.remove("active");
  }

  if (event.target.id === "loginSubmit") {
    const email = document.querySelector("#loginEmail").value.trim();
    const password = document.querySelector("#loginPassword").value.trim();

    if (!email || !password) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

  //checkingggg
    const user = users.find(user => user.email === email);

    if (!user) {
      alert("Email not found. Please register first.");
      return;
    }

    if (user.password !== password) {
      alert("Incorrect password.");
      return;
    }

    alert("You have successfully logged in");
    document.querySelector("#loginPopup").classList.remove("active");
    document.querySelector("#loginEmail").value = "";
    document.querySelector("#loginPassword").value = "";
  }
});


const subscribe = document.querySelector(".sub");

if (subscribe) {
  subscribe.addEventListener("click", () => {
    const nameInput = document.querySelector("#subscribeName");
    const emailInput = document.querySelector("#subscribeEmail");
    const ageInput = document.querySelector("#subscribeAge");
    const passwordInput = document.querySelector("#subscribePassword"); // жаңа өріс

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const age = ageInput.value.trim();
    const password = passwordInput.value.trim();

    if (!name || !email || !age || !password) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      alert("You have already registered");
      return;
    }

    users.push({ name, email, age, password });
    localStorage.setItem("users", JSON.stringify(users));

    nameInput.value = "";
    emailInput.value = "";
    ageInput.value = "";
    passwordInput.value = "";
    alert("You have successfully registered");
    window.location.href = "users.html";
  });
}
