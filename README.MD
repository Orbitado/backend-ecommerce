# Express API with MongoDB and Socket.IO Ecommerce Project

## Overview

This project is a robust backend application built using Express.js, designed to handle authentication, session management, and resource management. It integrates with MongoDB for data storage and uses Passport.js for secure authentication. The application is modular, scalable, and designed with RESTful APIs to facilitate seamless communication between the client and server.

---

## Key Features

- User authentication and session management using Passport.js.
- Secure password encryption with bcrypt.
- CRUD operations for products, users, and carts.
- JWT-based token authentication.
- Pagination and filtering for user-friendly data retrieval.
- Real-time communication with Socket.IO.
- Modular architecture for easy scalability.

---

## Installation

### Clone the repository

```bash
git clone https://github.com/Orbitado/backend-ecommerce.git
cd backend-ecommerce
```

### Install dependencies

```bash
npm install
```

### Set up environment variables

Create a `.env` file in the root directory and define the following variables:

```env
MONGO_LINK=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
SESSION_SECRET_KEY=<your-session-passport-key>
PERSISTENCE = <"mongodb" || "filesystem">
PORT = <your-port>
```

### Start the development server

```bash
npm run dev
```

The server will run on [http://localhost:8080](http://localhost:8080).

---

## Usage

Once the server is running, use tools like Postman, Insomnia, or a frontend client to interact with the API endpoints. Authentication-related routes require a valid JWT token for access.

---

## API Endpoints

### **Products**

- `GET /products` - Retrieve all products.
- `GET /products/:pid` - Retrieve a specific product by ID.
- `POST /products` - Add a new product.
- `PUT /products/:pid` - Update a product by ID.
- `DELETE /products/:pid` - Delete a product by ID.

### **Carts**

- `POST /carts` - Create a new cart.
- `GET /carts/:cid` - Retrieve cart details by ID.
- `POST /carts/:cid/product/:pid` - Add a product to a cart.

### **Users**

- `GET /users` - Retrieve all users.
- `GET /users/:uid` - Retrieve a specific user by ID.
- `POST /users` - Add a new user.
- `PUT /users/:uid` - Update a user by ID.
- `DELETE /users/:uid` - Delete a user by ID.

### **Sessions**

- `POST /sessions/register` - Register a new user.
- `POST /sessions/login` - Log in a user.
- `POST /sessions/signout` - Log out the user.
- `POST /sessions/current` - Retrieve the current user's session details.

---

## Example Requests and Responses

**Register User**  
**Endpoint:** `POST /api/sessions/register`  
**Request Body:**

```json
{
        "first_name": "Juan",
        "last_name": "Pérez",
        "age": 30,
        "email": "juanv@example.com",
        "password": "securePassword123"
}
```

**Response:**

```json
{
    "message": "Usuario registrado exitosamente.",
    "user": {
        "first_name": "Juan",
        "last_name": "Pérez",
        "email": "juanv@example.com",
        "age": 30,
        "password": "$2b$10$3wQKDdrAIRcVxDtyaWbnJ.sIGA4Pjp7bjnXNtn3bDKycekukJWVc6",
        "cart": null,
        "role": "USER",
        "active": false,
        "token": null,
        "_id": "6765ca0d53827b25888897d0",
        "__v": 0
    }
}
```

---

## Dependencies

- **bcrypt:** Password hashing for security.
- **crypto:** Generate random IDs for FileSystem _id.
- **connect-mongo:** MongoDB session store for Express.
- **cookie-parser:** Parse HTTP cookies.
- **dotenv:** Environment variable management.
- **express:** Web framework for Node.js.
- **express-handlebars:** Template engine for rendering views.
- **express-session:** Session management middleware.
- **jsonwebtoken:** JWT creation and verification.
- **mongoose:** MongoDB object modeling tool.
- **mongoose-paginate-v2:** Pagination plugin for Mongoose.
- **multer:** File upload middleware.
- **passport, passport-jwt, passport-local:** Authentication strategies.
- **socket.io:** Real-time bidirectional event-based communication.

---

## License Information

To be added as per the project owner's preferences.
