document.addEventListener("DOMContentLoaded", function () {
    const currentUsername = localStorage.getItem("currentUser");
  
    // Redirect to dashboard if the user is already logged in
    if (currentUsername) {
      window.location.href = "dashboard.html";
      return;
    }
  
    // User and Product classes
    class Product {
      constructor(id, name, price, quantity = 1) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
      }
    }
  
    class User {
      constructor(username, password) {
        this.username = username;
        this.password = password;
        this.cart = [];
      }
  
      addToCart(product) {
        const existingProduct = this.cart.find((p) => p.id === product.id);
        if (existingProduct) {
          existingProduct.quantity += product.quantity;
        } else {
          this.cart.push(product);
        }
        User.saveCart(this.username, this.cart);
      }
  
      static saveCart(username, cart) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.username === username);
        if (user) {
          user.cart = cart;
          localStorage.setItem("users", JSON.stringify(users));
        }
      }
  
      static getCart(username) {
        const user = User.getUser(username);
        return user ? user.cart : [];
      }
  
      static saveUser(user) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some((u) => u.username === user.username)) {
          return false;
        }
  
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        return true;
      }
  
      static getUser(username) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        return users.find((user) => user.username === username);
      }
  
      static validateLogin(username, password) {
        const user = User.getUser(username);
        return user && user.password === password;
      }
  
      static setCurrentUser(username) {
        localStorage.setItem("currentUser", username);
      }
  
      static getCurrentUser() {
        const username = localStorage.getItem("currentUser");
        return User.getUser(username);
      }
    }
  
    // Function to toggle password visibility
    function togglePasswordVisibility(inputId, toggleId) {
      const passwordInput = document.getElementById(inputId);
      const toggleIcon = document.getElementById(toggleId);
  
      toggleIcon.addEventListener("click", function () {
        const isPassword = passwordInput.type === "password";
        toggleIcon.src = isPassword ? "./Images/eye-close.png" : "./Images/eye-open.png";
        passwordInput.type = isPassword ? "text" : "password";
      });
    }
  
    // Check if we are on the signup page
    if (document.getElementById("signup-form")) {
      // Attach toggle functionality for signup password field
      if (document.getElementById("signup-password") && document.getElementById("toggle-signup-password")) {
        togglePasswordVisibility("signup-password", "toggle-signup-password");
      }
  
      // Signup form submission handler
      document.getElementById("signup-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const errorElement = document.getElementById("signup-error");
  
        if (password !== confirmPassword) {
          errorElement.textContent = "Passwords do not match.";
          return;
        }
  
        const newUser = new User(username, password);
        if (User.saveUser(newUser)) {
          errorElement.style.color = "green";
          errorElement.textContent = "Sign-up successful! Redirecting to login...";
          document.getElementById("signup-form").reset();
          setTimeout(() => {
            window.location.href = "login.html";
          }, 2000);
        } else {
          errorElement.textContent = "User already exists. Please choose a different username.";
        }
      });
    }
  
    // Check if we are on the login page
    if (document.getElementById("login-form")) {
      // Attach toggle functionality for login password field
      if (document.getElementById("login-password") && document.getElementById("toggle-login-password")) {
        togglePasswordVisibility("login-password", "toggle-login-password");
      }
  
      // Login form submission handler
      document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;
  
        if (User.validateLogin(username, password)) {
          User.setCurrentUser(username);
          window.location.href = "index.html";
        } else {
          document.getElementById("login-error").textContent = "Invalid username or password.";
        }
      });
    }
  });
  