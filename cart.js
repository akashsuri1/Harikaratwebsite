document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total-price");
    const clearCartButton = document.getElementById("clear-cart");
    const buyNowButton = document.getElementById("buy-now");

    const username = localStorage.getItem("currentUser");
    if (!username) {
        window.location.href = "login.html";
        return;
    }

    const user = getUser(username);
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Render the cart when the page loads
    renderCart();

    // Function to render cart items
    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;

        user.cart.forEach((item, index) => {
            const itemElement = document.createElement("tr");
            itemElement.innerHTML = `
                <td>
                    <span>${item.name}</span>
                </td>
                <td>1</td> <!-- Quantity is always 1 since we prevent duplicates -->
                <td>₹${item.price}</td>
            `;

            // Create a delete button and add it after the course name
            const nameCell = itemElement.querySelector("td span");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("btn"); // Add the 'btn' class for styling
            deleteButton.style.marginLeft = "10px"; // Add some spacing
            deleteButton.addEventListener("click", function () {
                removeFromCart(index);
            });

            nameCell.parentNode.appendChild(deleteButton); // Append the delete button in the same cell as the course name

            cartItemsContainer.appendChild(itemElement);

            subtotal += item.price;
        });

        // Update totals
        const tax = subtotal * 0.18; // Assuming 18% tax
        const total = subtotal + tax;

        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        taxElement.textContent = `₹${tax.toFixed(2)}`;
        totalElement.textContent = `₹${total.toFixed(2)}`;
    }

    // Function to remove an item from the cart
    function removeFromCart(index) {
        user.cart.splice(index, 1); // Remove the item at the specified index
        saveUser(user); // Save the updated user data in localStorage
        renderCart(); // Re-render the cart
        alert("Item has been removed from your cart.");
    }

    // Function to add a course to the cart
    function addToCart(course) {
        const existingCourse = user.cart.find(c => c.id === course.id);
        if (!existingCourse) {
            user.cart.push(course); // Add course if it doesn't exist
            saveUser(user);
            renderCart();
            alert(`${course.name} has been added to your cart.`);
        } else {
            alert("This course is already in your cart.");
        }
    }

    clearCartButton.addEventListener("click", clearCart);
    buyNowButton.addEventListener("click", function () {
        alert("Proceeding to payment...");
        // Implement payment logic here
    });

    // Function to clear the cart
    function clearCart() {
        user.cart = [];
        saveUser(user);
        renderCart();
    }

    // Save the updated user object back to localStorage
    function saveUser(updatedUser) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.map(u => (u.username === updatedUser.username ? updatedUser : u));
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Get user from localStorage
    function getUser(username) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        return users.find(u => u.username === username);
    }

});
