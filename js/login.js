document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Retrieve user data from localStorage
    const storedPassword = localStorage.getItem(email);

    // Check if the email exists and the password matches
    if (storedPassword && storedPassword === password) {
        alert('Login successful!');
        window.location.href = 'index.html'; // Redirect to a welcome page
    } else {
        errorMessage.textContent = 'Invalid email or password. Please try again.';
    }
});
