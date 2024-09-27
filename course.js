const courses = [
    {
        id: 1,
        image: 'pos1.png',
        title: 'Complete Web Development + Devops + Blockchain Cohort',
        description: 'Complete syllabus - https://blog.100xdevs.com/ Starts 2nd Au..',
        price: 5999,
        originalPrice: 8499,
        discount: 29.42
    },
    {
        id: 2,
        image: 'pos2.png',
        title: 'Complete Web development + Devops Cohort',
        description: 'Starts 2nd August 2024 Complete syllabus - https://blog.100x...',
        price: 4999,
        originalPrice: 5999,
        discount: 16.67
    },
    {
        id: 3,
        image: 'pos3.png',
        title: 'Complete Web3/Blockchain Cohort',
        description: 'Complete syllabus - https://blog.100xdevs.com/ Starts 2nd Au..',
        price: 4999,
        originalPrice: 5999,
        discount: 16.67
    },
    {
        id: 4,
        image: 'pos2.png',
        title: 'Complete Web Development Cohort',
        description: 'Complete syllabus - https://blog.100xdevs.com/ Starts 2nd Au..',
        price: 2999,
        originalPrice: 3999,
        discount: 25.01
    },
    {
        id: 5,
        image: 'pos3.png',
        title: 'Complete Devops Cohort',
        description: 'Complete syllabus - https://blog.100xdevs.com/ In the Devops..',
        price: 2999,
        originalPrice: 3999,
        discount: 25.01
    },
    {
        id: 6,
        image: 'pos4.jpeg',
        title: 'Live 0-100 Complete',
        description: 'Go from 0 to 100 with Harkirat Singh Live. Learn basics to a..',
        price: 5599,
        originalPrice: 7999,
        discount: 30.00
    },
    {
        id: 7,
        image: 'pos5.jpeg',
        title: 'Live 0-1',
        description: 'Complete 0-1 journey of coding Live with Harkirat Singh. Lea..',
        price: 3499,
        originalPrice: 5999,
        discount: 41.67
    },
    {
        id: 8,
        image: 'pos6.jpeg',
        title: 'Live 1-100',
        description: 'In the 1-100 journey, learn advanced Backend communication, ..',
        price: 3999,
        originalPrice: 5999,
        discount: 33.34
    },
    {
        id: 9,
        image: 'pos7.jpeg',
        title: 'Live Full Stack Open Source Cohort 1 (Finished)',
        description: 'Learn by doing open source contributions. The course is led by..',
        price: 3999,
        originalPrice: 3999,
        discount: 0
    }
]; 
const coursesContainer = document.getElementById('courses-container');

// Function to create course container div
function createCourseContainer() {
    const container = document.createElement('div');
    container.classList.add('center-3'); // Assuming this is the class for the course container
    return container;
}

// Initialize variables
let courseContainer = createCourseContainer();
coursesContainer.appendChild(courseContainer);

courses.forEach((course, index) => {
    // Create the course card
    const courseCard = `
        <div class="part-3">
            <div class="upper">
                <img src="${course.image}" alt="${course.title}">
            </div>
            <div class="lower">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="price">
                    <span class="bl">₹${course.price} <s class="bl-2">₹${course.originalPrice}</s></span>
                    <span class="green">${course.discount}% off</span>
                </div>
                <button class="btn2" onclick="addToCart(${index})">Add to Cart</button>
            </div>
        </div>
    `;
    
    // Append course card to the current course container
    courseContainer.innerHTML += courseCard;

    // Check if 3 courses have been added to the current container
    if ((index + 1) % 3 === 0 && index + 1 < courses.length) {
        // Create a new course container only if there are more courses to render
        courseContainer = createCourseContainer();
        coursesContainer.appendChild(courseContainer);
    }
});

// Function to handle adding course to cart
function addToCart(courseIndex) {
    const currentUsername = localStorage.getItem("currentUser");

    if (currentUsername) {
        // Retrieve the user from local storage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.username === currentUsername);

        if (user) {
            const selectedCourse = courses[courseIndex];
            
            let isAdded = user.cart.find(ele => ele.id == selectedCourse.id);
            if(isAdded) {
                alert(`${selectedCourse.title} is already present.`);
                return;
            }
            const product = {
                id: selectedCourse.id,
                name: selectedCourse.title,
                price: selectedCourse.price,
                quantity: 1
            };

            // Add the product to the user's cart
            user.cart.push(product);
            localStorage.setItem("users", JSON.stringify(users)); // Save updated users back to local storage

            // Show success alert
            alert(`${selectedCourse.title} has been added to your cart.`);
        }
    } else {
        window.location.href = './login.html'; // Redirect to login if user is not logged in
    }
}
