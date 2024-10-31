document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('error-message');

    // Check if the passwords match
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }

    // Check if the email already exists
    if (localStorage.getItem(email)) {
        errorMessage.textContent = 'Email already exists. Please use a different email.';
        return;
    }

    // Store user credentials in localStorage
    localStorage.setItem(email, password);

    // If the user is requesting an invoice, set the invoiceGenerated flag
    localStorage.setItem('invoiceGenerated', 'true');

    alert('Account created successfully! You can now log in.');
    window.location.href = 'login.html'; // Redirect to login page
});
