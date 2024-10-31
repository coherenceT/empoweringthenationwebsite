// courseNavigation.js

// Array of course URLs in the desired order
const courses = [
    'first_aid.html',
    'landscaping.html',
    'life_skills.html',
    'sewing.html'
];

// Variable to keep track of the current course index
let currentCourseIndex = 0;

// Function to handle course navigation
document.addEventListener('DOMContentLoaded', function () {
    const nextCourseBtn = document.getElementById('nextCourseBtn');
    
    if (nextCourseBtn) {
        nextCourseBtn.addEventListener('click', function () {
            // Increment the current course index
            currentCourseIndex++;
            
            // Loop back to the first course if we exceed the array length
            if (currentCourseIndex >= courses.length) {
                currentCourseIndex = 0;
            }

            // Navigate to the next course
            window.location.href = courses[currentCourseIndex];
        });
    }

    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function () {
            // Logic to add course to cart
            alert('Course added to cart!'); // Placeholder for actual cart functionality
        });
    }
});
