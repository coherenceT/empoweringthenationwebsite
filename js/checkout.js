document.getElementById('proceedToCheckoutButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Calculate fees (dummy example)
    const totalFees = calculateFees(); // Replace with your actual fee calculation logic
    alert(`Your total fees are: $${totalFees.toFixed(2)}`);

    // Ask the user if they would like an invoice
    const wantsInvoice = confirm("Would you like an invoice for this purchase?");

    if (wantsInvoice) {
        // Store the invoice preference in session storage
        sessionStorage.setItem('wantsInvoice', true);
        // Redirect to create account page
        window.location.href = 'create_account.html';
    } else {
        alert("You can still proceed without an invoice.");
        // Optionally handle the case where they don't want an invoice
    }
});

// Dummy fee calculation function
function calculateFees() {
    // Replace with your logic
    return 100; // Example total fee
}
