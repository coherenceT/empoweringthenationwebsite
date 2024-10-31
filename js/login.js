document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Clear previous error messages
    errorMessage.textContent = '';

    // Retrieve user data from localStorage
    const storedPassword = localStorage.getItem(email);

    // Check if the email exists and the password matches
    if (storedPassword && storedPassword === password) {
        alert('Login successful!');

        // Check if the PDF has been generated and stored in localStorage
        const pdfGenerated = localStorage.getItem('invoiceGenerated');

        if (pdfGenerated) {
            const wantsDownload = confirm('You have an invoice ready to download. Would you like to download it now?');
            if (wantsDownload) {
                // Generate PDF Invoice
                generatePDF(email); // Pass the email or any other necessary info
            } else {
                window.location.href = 'index.html'; // Redirect to a welcome page
            }
        } else {
            // Ask if the user wants an invoice
            const wantsInvoice = confirm('Would you like to receive an invoice?');
            if (wantsInvoice) {
                // Generate PDF Invoice
                generatePDF(email);
                // Store a flag in localStorage to indicate an invoice has been generated
                localStorage.setItem('invoiceGenerated', 'true');
            } else {
                window.location.href = 'index.html'; // Redirect to a welcome page
            }
        }
    } else {
        errorMessage.textContent = 'Invalid email or password. Please try again.';
    }
});

// Function to generate the PDF
function generatePDF(email) {
    const { jsPDF } = window.jspdf; // Access jsPDF

    const doc = new jsPDF();
    
    // Add content to the PDF
    doc.text('Invoice', 20, 20);
    doc.text(`Email: ${email}`, 20, 30);
    doc.text('Thank you for your business!', 20, 40);
    doc.text('-----------------------------', 20, 50);
    doc.text('Services: ', 20, 60);

    // Retrieve total cost from localStorage
    const totalCost = localStorage.getItem('invoiceTotal') || 0;
    doc.text(`Total Cost: R${totalCost}`, 20, 70); // Include total cost in the invoice

    // Save the PDF
    doc.save('invoice.pdf');
    localStorage.removeItem('invoiceTotal'); // Clear the total after use
 // The PDF will be downloaded with this filename
}
