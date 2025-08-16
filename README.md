🛒 E-Commerce Charity API

This is a Node.js + Express + MongoDB backend API for an E-Commerce Charity Platform, where users can browse charity products, place orders, and donate to charities through product purchases.

🚀 Features

User authentication with JWT
Role-based access (Admin, Super Admin, User)
Charity management (create, update, activate/deactivate charities)
Product management (CRUD, linked to charities & categories)
Order management with stock validation & donation calculation
Middleware for authentication & validation
Sending Email & SMS notifications after order placement
Secure API structure with modular controllers, routes & models

📂 Project Structure
├── controllers/     # Business logic for APIs

├── models/          # Mongoose models (User, Product, Charity, Order, etc.)

├── routes/          # API routes

├── middlewares/     # Authentication, validation, error handlers

├── config/          # Database & third-party configs

├── utils/           # Utility functions (mailer, SMS, helpers)

├── server.js        # Entry point


⚙️ Tech Stack

Backend Framework: Express.js

Database: MongoDB + Mongoose

Authentication: JWT

Validation: express validatior

Mail & Notifications: Nodemailer, Twilio 



🛠️ Installation & Setup

Clone the repository
git clone https://github.com/jaishankarreddy/E-Commerce_charity_APIs
cd E-Commerce_charity_APIs

Install dependencies

npm install
Create a .env file in the root with the following variables:

PORT=3000
MONGODB_URL="mongodb://127.0.0.1:27017/E-Commerse_Charity"
JWT_SECRET=E-Commerce-APIs
CLOUD_NAME=dojhytjnp
API_SECRET=4gzKW61lFZotJk2VvWe_ejLu3Ck
API_KEY=371711563229433

Run the server

npm run dev   # for development with nodemon
npm start     # for production

🧪 Testing

You can test the APIs using Postman or Thunder Client.
Import the API collection provided in /docs (if included).
