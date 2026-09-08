const loadFragment = async (selector, urls) => {
  const target = document.querySelector(selector);
  if (!target) return;

  let lastError = null;

  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      target.innerHTML = await response.text();
      return;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error(`Could not load ${selector}`);
};

(async () => {
  try {
    await loadFragment(".navbar", ["navber.html", "navbar.html"]);
    await loadFragment(".footer", ["footer.html"]);
    await loadFragment(".about", ["about.html"]);
  } catch (error) {
    console.error("Failed to load page fragments:", error);
  }
})();

document.addEventListener("click", (event) => {
  const loginTrigger = event.target.closest("#loginBtn");
  const loginPopup = document.querySelector("#loginPopup");

  if (loginTrigger) {
    event.preventDefault();
    if (loginPopup) {
      loginPopup.classList.add("active");
    }
  }

  if (event.target.id === "closeBtn" && loginPopup) {
    loginPopup.classList.remove("active");
  }

  if (event.target.id === "loginSubmit") {
    const emailInput = document.querySelector("#loginEmail");
    const passwordInput = document.querySelector("#loginPassword");

    if (!emailInput || !passwordInput) return;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email);

    if (!user) {
      alert("Email not found. Please register first.");
      return;
    }

    if (user.password !== password) {
      alert("Incorrect password.");
      return;
    }

    alert("You have successfully logged in");
    loginPopup.classList.remove("active");
    emailInput.value = "";
    passwordInput.value = "";
  }
});

const subscribe = document.querySelector(".sub");

if (subscribe) {
  subscribe.addEventListener("click", () => {
    const nameInput = document.querySelector("#subscribeName");
    const emailInput = document.querySelector("#subscribeEmail");
    const ageInput = document.querySelector("#subscribeAge");
    const passwordInput = document.querySelector("#subscribePassword");

    if (!nameInput || !emailInput || !ageInput || !passwordInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const age = ageInput.value.trim();
    const password = passwordInput.value.trim();

    if (!name || !email || !age || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some((user) => user.email === email);
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
  