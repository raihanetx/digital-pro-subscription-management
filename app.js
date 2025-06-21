import { db, collection, addDoc } from './firebase-config.js';

// Initialize Firebase modules
let messageTimeout;

document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    const messageContainer = document.getElementById('messageContainer');

    if (orderForm) {
        orderForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value.trim(),
                email: document.getElementById('email').value.trim(),
                paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')?.value,
                transactionId: document.getElementById('transactionId').value.trim(),
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            // Validate form data
            if (!formData.fullName || !formData.email || !formData.paymentMethod || !formData.transactionId) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }

            try {
                // Disable submit button
                const submitButton = orderForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Processing...';

                // Save order to Firebase
                const docRef = await addDoc(collection(db, 'orders'), formData);

                // Show success message
                showMessage('Your subscription order has been submitted successfully! We will verify your payment shortly.', 'success');
                
                // Reset form
                orderForm.reset();

            } catch (error) {
                console.error('Error submitting order:', error);
                showMessage('An error occurred while submitting your order. Please try again.', 'error');
            } finally {
                // Re-enable submit button
                const submitButton = orderForm.querySelector('button[type="submit"]');
                submitButton.disabled = false;
                submitButton.textContent = 'Complete Subscription';
            }
        });
    }

    // Helper function to show messages
    function showMessage(message, type) {
        const messageContainer = document.getElementById('messageContainer');
        const messageElement = messageContainer.querySelector('p');
        
        messageContainer.classList.remove('hidden');
        messageElement.textContent = message;
        
        // Style based on message type
        if (type === 'error') {
            messageContainer.querySelector('div').className = 'p-4 rounded-md bg-red-50';
            messageElement.className = 'text-center text-red-700';
        } else {
            messageContainer.querySelector('div').className = 'p-4 rounded-md bg-green-50';
            messageElement.className = 'text-center text-green-700';
        }

        // Scroll to message
        messageContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});
