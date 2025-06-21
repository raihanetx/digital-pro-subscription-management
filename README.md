
Built by https://www.blackbox.ai

---

# Digital Pro Subscription

## Project Overview
Digital Pro is a web-based subscription management application designed for users to upgrade their digital experience through premium features. It utilizes Firebase for data management and is built using modern web technologies like HTML, CSS, and JavaScript.

## Installation
To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/digital-pro.git
   ```
   
2. **Navigate to the project directory:**
   ```bash
   cd digital-pro
   ```

3. **Open the `index.html` file in your web browser.**

   > Note: The app uses Firebase services; ensure you have a valid Firebase configuration.

## Usage
1. Navigate to the **Home** page to explore premium features and subscription options.
2. Use the **Get Started** button to fill out the subscription order form.
3. After selecting your payment method and completing the payment, your order will be submitted for review.
4. If you’re an admin, you can log in to manage orders through the Admin Dashboard.

## Features
- **User Subscription Management:** Users can view and purchase subscriptions.
- **Admin Dashboard:** Admins can manage and monitor subscription orders.
- **Responsive Design:** The application is designed to function seamlessly on both desktops and mobile devices.
- **Firebase Integration:** Utilizes Firestore for real-time database management.

## Dependencies
This project relies on the following libraries:
- **Firebase SDK** (for Firestore and app initialization)
- **Tailwind CSS** (for styling)

You can install these dependencies by including their CDNs directly in your `HTML` files or downloading them to your project.

## Project Structure
```plaintext
.
├── index.html           # Main application entry point
├── order.html           # Subscription order form
├── admin-login.html     # Admin login page
├── admin.html           # Admin dashboard to manage orders
├── firebase-config.js    # Firebase configuration and initialization
├── app.js               # Main application logic (order submission)
├── admin.js             # Admin functionalities
├── style.css            # Styling for the application
```

### Description of Key Files:
- **`index.html`:** Contains the landing page with information on subscription services.
- **`order.html`:** Contains the order form where users enter their subscription details.
- **`admin.html`:** The admin panel where orders can be managed, filtered, and updated.
- **`firebase-config.js`:** Initializes Firebase and exports key functions for database access.
- **`app.js`:** Handles user order submission and validation.
- **`admin.js`:** Controls admin functionalities including order management and status updates.
- **`style.css`:** Styles the application elements and layouts using custom CSS and Tailwind CSS.

## Contribution
If you would like to contribute to this project, please fork the repository, make your changes, and submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Firebase for backend services.
- Tailwind CSS for styling the application.
- Open-source community for providing a wealth of resources and support.