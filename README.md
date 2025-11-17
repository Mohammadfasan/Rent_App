#  Rent_App - Car Rental Application

A full-stack MERN application that simulates a real-world car rental service. Users can browse available cars and make bookings, while owners can list their cars and manage rentals. Built with a modern tech stack and a focus on user experience.

![Rent_App Preview](https://via.placeholder.com/800x400?text=Rent_App+Screenshot+//+Add+a+screenshot+here!) 
*// Replace this with an actual screenshot of your app*

##  Project Goal

> "Learn by doing." This project was built to solidify my understanding of the full MERN stack by creating a small, feature-complete, and realistic application.

##  Live Demo

🚀 **[Check out the Live App here!](https://your-rent-app-link.herokuapp.com)** *// Replace with your live link*

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **🖥️ Frontend** | React, Tailwind CSS, Framer Motion |
| **⚡ Backend** | Node.js, Express.js |
| **🗄️ Database** | MongoDB, Mongoose ODM |
| **🔐 Authentication** | (e.g., JWT, Firebase Auth - *Add if used*) |

## 🚀 Features

### For Everyone
- **Responsive Design:** A mobile-first, card-based layout that works seamlessly on all devices.
- **Smooth Animations:** Enhanced user experience with subtle transitions and micro-interactions powered by Framer Motion.

### For Users/Renters
- **Browse Available Cars:** View a catalog of cars that are available for rent.
- **Book a Car:** Simple "Book Now" flow with integrated availability checks.
- **Manage Bookings:** View the status of their current and past bookings.

### For Car Owners
- **Add New Cars:** Easily list a new car for rent through an intuitive form.
- **Manage Inventory:** Edit car details, delete listings, or toggle availability on/off.
- **Handle Bookings:** View and manage incoming booking requests from users.

## 🖼️ Screenshots & Demo

*// It's highly recommended to add a few screenshots or a GIF here.*

| User Dashboard | Owner Car Management |
| :---: | :---: |
| <img src="https://via.placeholder.com/400x250?text=User+Dashboard" width="400"> | <img src="https://via.placeholder.com/400x250?text=Owner+View" width="400"> |

| Booking Flow | Mobile View |
| :---: | :---: |
| <img src="https://via.placeholder.com/400x250?text=Booking+Flow" width="400"> | <img src="https://via.placeholder.com/400x250?text=Mobile+View" width="400"> |

## 🏗️ Project Structure

```bash
rent_app/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main pages (Home, Dashboard, etc.)
│   │   ├── context/        # State management (e.g., AuthContext)
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Helper functions, API calls
│   ├── tailwind.config.js
│   └── package.json
├── server/                 # Express Backend
│   ├── controllers/        # Route logic
│   ├── models/             # MongoDB Mongoose models
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth, error handling, etc.
│   └── package.json
└── README.md


 Backend Setup
 # Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file and add your environment variables
cp .env.example .env
# Then edit .env with your details:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
# PORT=5000

# Start the backend server
npm run dev



FrontEnd Setup
# Open a new terminal and navigate to the client directory
cd ../client

# Install dependencies
npm install

# Start the React development server
npm start
