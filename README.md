#  Car Rental System (MERN Stack)

A full-stack, responsive Car Rental System designed to streamline vehicle management and booking processes for admins, car owners, and customers. Built with the modern MERN stack and featuring a clean, user-friendly interface.

![MERN Stack](https://img.shields.io/badge/MERN-Full--Stack-green)
![Status](https://img.shields.io/badge/Status-Locally%20Deployed-success)

## 🌐 Live Demo & Source

*   **Frontend Preview:** [Figma Design Prototype](https://www.figma.com/) *(Link your Figma file here)*
*   **Backend API:** [API Documentation]() *(Link your API docs if any)*
*   **GitHub Repository:** https://github.com/your-username/car-rental-system
*   **Live Website:** *Coming soon on AWS...*


##  Features

### 🏠 Home Screen
Smooth and intuitive navigation across all system modules with featured cars and promotions.

### 📊 Dashboard
A comprehensive overview for all users, featuring:
- Recent bookings and status
- Car availability statistics
- Revenue overview (for owners)
- Quick action buttons

### 🚗 Car Management
- **Add New Cars:** Owners can list vehicles with detailed specifications
- **Edit/Delete Cars:** Manage existing vehicle listings
- **Availability Toggle:** Quickly mark cars as available/unavailable
- **Image Upload:** Multiple photos for each vehicle

### 📅 Booking System
- **Real-time Availability:** Check car availability for specific dates
- **Booking Calendar:** Visual date picker for reservations
- **Booking Management:** View, confirm, and cancel bookings
- **Pricing Calculation:** Automatic cost calculation based on rental period

### 💰 Pricing & Payments
- **Dynamic Pricing:** Different rates for daily/weekly/monthly rentals
- **Payment Integration:** Secure payment processing
- **Booking History:** Complete record of all transactions

### 📢 Announcements
Special offers, maintenance notices, and system updates for all users.

### ⭐ Reviews & Ratings
Customer feedback system for cars and overall service.

## 👥 User Roles

### 🔧 Admin
- Full system access and oversight
- Manage all users (customers and owners)
- Monitor all bookings and transactions
- System-wide announcements
- Analytics and reporting

### 🚘 Car Owner
- Add and manage vehicle listings
- Set pricing and availability
- View and manage booking requests
- Earnings dashboard and reports
- Respond to customer inquiries

### 👤 Customer/Renter
- Browse available cars with filters
- View car details and specifications
- Make and manage bookings
- Payment processing
- Review and rating system
- Booking history

## 🛠️ Tech Stack

*   **Frontend:** React.js, Context API, Tailwind CSS, Framer Motion
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB with Mongoose ODM
*   **Authentication:** JWT (JSON Web Tokens)
*   **File Upload:** Cloudinary/Multer
*   **Payment:** Stripe/Razorpay Integration
*   **Deployment:** AWS (In Progress)


## 🚀 Installation

Follow these steps to set up the project locally on your machine.

### Prerequisites
- Node.js (v16 or above)
- MongoDB (Local instance or MongoDB Atlas)
- Git

### Steps

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/car-rental-system.git
    cd car-rental-system
    ```

2.  **Install Backend Dependencies**
    ```bash
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```bash
    cd ../client
    npm install
    ```

## 🔑 Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Email Service (for notifications)
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
