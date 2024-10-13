// Enhanced calculator.js
document.getElementById('feesForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form submission
    
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const totalFeesElement = document.getElementById('totalFees');

    if (!validateInputs(name, phone, email)) {
        alert('Please fill in all fields with valid information.');
        return;
    }
    
    calculateFees();
});

function validateInputs(name, phone, email) {
    const phonePattern = /^\d{10}$/;  // Simple 10-digit number validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Basic email format
    
    return name && phonePattern.test(phone) && emailPattern.test(email);
}

function calculateFees() {
    const checkboxes = document.querySelectorAll('input[name="courses"]:checked');
    let total = 0;

    checkboxes.forEach((checkbox) => {
        total += parseInt(checkbox.value);
    });

    // Calculate Discount
    let discount = 0;
    if (checkboxes.length === 2) {
        discount = 0.05;
    } else if (checkboxes.length === 3) {
        discount = 0.10;
    } else if (checkboxes.length > 3) {
        discount = 0.15;
    }

    const discountedTotal = total - (total * discount);
    const vat = discountedTotal * 0.15;
    const finalTotal = discountedTotal + vat;

    document.getElementById('totalFees').innerText = `R${finalTotal.toFixed(2)}`;

    // Add some nice feedback after calculation
    const totalFeesElement = document.getElementById('totalFees');
    totalFeesElement.classList.add('calculated');
    setTimeout(() => totalFeesElement.classList.remove('calculated'), 2000);
}
