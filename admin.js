import { db, collection, getDocs, doc, updateDoc } from './firebase-config.js';

// Simple admin password - In production, use proper authentication
const ADMIN_PASSWORD = 'admin123';

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (!isLoggedIn && !window.location.href.includes('admin-login.html')) {
        window.location.href = 'admin-login.html';
    } else if (isLoggedIn && window.location.href.includes('admin-login.html')) {
        window.location.href = 'admin.html';
    }
}

// Handle admin login
function handleLogin() {
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            
            if (password === ADMIN_PASSWORD) {
                sessionStorage.setItem('adminLoggedIn', 'true');
                window.location.href = 'admin.html';
            } else {
                showMessage('Incorrect password', 'error');
            }
        });
    }
}

// Handle logout
function handleLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('adminLoggedIn');
            window.location.href = 'admin-login.html';
        });
    }
}

// Fetch and display orders
async function loadOrders() {
    const ordersTableBody = document.getElementById('ordersTableBody');
    const noOrdersMessage = document.getElementById('noOrdersMessage');
    
    if (!ordersTableBody) return;

    try {
        const querySnapshot = await getDocs(collection(db, 'orders'));
        const orders = [];
        
        querySnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() });
        });

        // Update stats
        updateStats(orders);

        // Sort orders by date (newest first)
        orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Apply filter if selected
        const statusFilter = document.getElementById('statusFilter').value;
        const filteredOrders = statusFilter === 'all' 
            ? orders 
            : orders.filter(order => order.status === statusFilter);

        // Display orders
        if (filteredOrders.length === 0) {
            ordersTableBody.innerHTML = '';
            noOrdersMessage.classList.remove('hidden');
        } else {
            noOrdersMessage.classList.add('hidden');
            ordersTableBody.innerHTML = filteredOrders.map(order => `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">${order.fullName}</div>
                        <div class="text-sm text-gray-500">${order.email}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${order.paymentMethod}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${order.transactionId}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${getStatusStyle(order.status)}">
                            ${order.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        ${order.status === 'pending' ? `
                            <button onclick="window.confirmOrder('${order.id}')" 
                                class="text-green-600 hover:text-green-900 mr-2">
                                Confirm
                            </button>
                            <button onclick="window.cancelOrder('${order.id}')"
                                class="text-red-600 hover:text-red-900">
                                Cancel
                            </button>
                        ` : ''}
                    </td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading orders:', error);
        showMessage('Error loading orders', 'error');
    }
}

// Update dashboard stats
function updateStats(orders) {
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('pendingOrders').textContent = 
        orders.filter(order => order.status === 'pending').length;
    document.getElementById('confirmedOrders').textContent = 
        orders.filter(order => order.status === 'confirmed').length;
}

// Get status style classes
function getStatusStyle(status) {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'confirmed':
            return 'bg-green-100 text-green-800';
        case 'cancelled':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

// Update order status
async function updateOrderStatus(orderId, newStatus) {
    try {
        const orderRef = doc(db, 'orders', orderId);
        await updateDoc(orderRef, { status: newStatus });
        showMessage(`Order ${newStatus} successfully`, 'success');
        loadOrders(); // Reload orders to update the list
    } catch (error) {
        console.error('Error updating order:', error);
        showMessage(`Error updating order: ${error.message}`, 'error');
    }
}

// Show message helper
function showMessage(message, type) {
    const messageContainer = document.getElementById('messageContainer');
    const messageElement = messageContainer.querySelector('p');
    
    messageContainer.classList.remove('hidden');
    messageElement.textContent = message;
    
    if (type === 'error') {
        messageContainer.querySelector('div').className = 
            'p-4 rounded-md bg-red-50 shadow-lg';
        messageElement.className = 'text-center text-red-700';
    } else {
        messageContainer.querySelector('div').className = 
            'p-4 rounded-md bg-green-50 shadow-lg';
        messageElement.className = 'text-center text-green-700';
    }

    // Hide message after 3 seconds
    setTimeout(() => {
        messageContainer.classList.add('hidden');
    }, 3000);
}

// Initialize admin panel
function initAdminPanel() {
    // Add event listeners for status filter
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', loadOrders);
    }

    // Expose functions to window for button onclick handlers
    window.confirmOrder = (orderId) => updateOrderStatus(orderId, 'confirmed');
    window.cancelOrder = (orderId) => updateOrderStatus(orderId, 'cancelled');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    handleLogin();
    handleLogout();
    if (!window.location.href.includes('admin-login.html')) {
        initAdminPanel();
        loadOrders();
    }
});
