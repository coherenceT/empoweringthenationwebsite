// Function to update course selection and manage the cart
function updateSelection(checkbox) {
    const courseBox = checkbox.closest('.course-box');
    courseBox.classList.toggle('selected', checkbox.checked);
    addToCart(checkbox);
    calculateFees(); // Update the fees calculation whenever selection changes
}

// Function to add or remove items from the cart in local storage
function addToCart(checkbox) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (checkbox.checked) {
        // Add course to cart if checked
        cart.push({
            name: checkbox.nextElementSibling.querySelector('h4').innerText,
            price: parseFloat(checkbox.value)
        });
    } else {
        // Remove course from cart if unchecked
        cart = cart.filter(item => item.name !== checkbox.nextElementSibling.querySelector('h4').innerText);
    }

    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to calculate the total fees based on selected courses
function calculateFees() {
    const checkboxes = document.querySelectorAll('input[name="courses"]:checked');

    if (checkboxes.length === 0) {
        document.getElementById('totalCost').innerText = 'R0.00';
        return;
    }

    let total = Array.from(checkboxes).reduce((acc, checkbox) => acc + parseFloat(checkbox.value), 0);
    let discount = 0;

    if (checkboxes.length === 2) discount = 0.05;
    else if (checkboxes.length === 3) discount = 0.10;
    else if (checkboxes.length > 3) discount = 0.15;

    const discountedTotal = total * (1 - discount);
    const vat = discountedTotal * 0.15;
    const finalTotal = discountedTotal + vat;

    // Update the displayed total cost
    document.getElementById('totalCost').innerText = `R${finalTotal.toFixed(2)}`;

    // Store the final total in local storage for the invoice
    localStorage.setItem('finalTotal', finalTotal.toFixed(2));
}

// Function to preselect courses from local storage when the page loads
function preselectCourses() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(item => {
        const checkbox = document.querySelector(`input[value="${item.price}"]`);
        if (checkbox) {
            checkbox.checked = true;
            updateSelection(checkbox);
        }
    });
}

// Export functions if you're using modules (optional)
// export { updateSelection, calculateFees, preselectCourses };
