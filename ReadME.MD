# PennyPath - Expense Tracker Backend

PennyPath is a robust and scalable backend solution for an expense tracking application. It provides a comprehensive set of APIs to manage users, categories, and expenses, enabling developers to build a full-featured expense tracker with ease.

## Features

- **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
- **Expense Management:** CRUD operations for expenses, allowing users to create, read, update, and delete their expense records.
- **Category Management:** Users can create and manage their own expense categories.
- **Scalable Architecture:** Built with Node.js, Express, and MongoDB, ensuring high performance and scalability.

## Technologies Used

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express:** A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **MongoDB:** A NoSQL database that provides high performance, high availability, and easy scalability.
- **Mongoose:** An elegant MongoDB object modeling tool for Node.js.
- **JWT (JSON Web Tokens):** A compact, URL-safe means of representing claims to be transferred between two parties.
- **bcryptjs:** A library to help you hash passwords.
- **dotenv:** A zero-dependency module that loads environment variables from a `.env` file into `process.env`.

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/PennyPath_Backend.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file in the root directory and add the following environment variables:**
    ```
    MONGODB_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    PORT=3000
    ```
4.  **Start the server:**
    ```bash
    npm start
    ```

## Deployment on Vercel

This project is ready to be deployed on Vercel. You just need to create a `vercel.json` file with the following content:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "./server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

And make sure to set the environment variables in the Vercel project settings.

## API Endpoints

### Authentication

  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "User created successfully!",
      "userId": "5f9f1b9b9b9b9b9b9b9b9b9b"
    }
    ```

- **`POST /api/auth/login`**
  - **Description:** Logs in an existing user.
  - **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Login successful!",
      "token": "your_jwt_token",
      "userId": "5f9f1b9b9b9b9b9b9b9b9b9b",
      "name": "John Doe"
    }
    ```

### Categories

- **`POST /api/categories/create`**
  - **Description:** Creates a new category for the authenticated user.
  - **Headers:** `Authorization: Bearer <your_jwt_token>`
  - **Request Body:**
    ```json
    {
      "name": "Groceries",
      "icon": "shopping-cart",
      "color": "#FF0000"
    }
    ```
  - **Response:**
    ```json
    {
      "_id": "5f9f1b9b9b9b9b9b9b9b9b9c",
      "name": "Groceries",
      "icon": "shopping-cart",
      "color": "#FF0000",
      "userId": "5f9f1b9b9b9b9b9b9b9b9b9b"
    }
    ```

- **`GET /api/categories/list`**
  - **Description:** Retrieves all categories for the authenticated user.
  - **Headers:** `Authorization: Bearer <your_jwt_token>`
  - **Response:**
    ```json
    [
      {
        "_id": "5f9f1b9b9b9b9b9b9b9b9b9c",
        "name": "Groceries",
        "icon": "shopping-cart",
        "color": "#FF0000",
        "userId": "5f9f1b9b9b9b9b9b9b9b9b9b"
      }
    ]
    ```

### Expenses

- **`POST /api/expenses`**
  - **Description:** Creates a new expense for the authenticated user.
  - **Headers:** `Authorization: Bearer <your_jwt_token>`
  - **Request Body:**
    ```json
    {
      "amount": 50.00,
      "date": "2024-07-29",
      "categoryId": "5f9f1b9b9b9b9b9b9b9b9b9c"
    }
    ```
  - **Response:**
    ```json
    {
        "_id": "5f9f1b9b9b9b9b9b9b9b9b9d",
        "amount": 50,
        "date": "2024-07-29T00:00:00.000Z",
        "category": {
            "categoryId": "5f9f1b9b9b9b9b9b9b9b9b9c",
            "name": "Groceries",
            "icon": "shopping-cart",
            "color": "#FF0000"
        },
        "userId": "5f9f1b9b9b9b9b9b9b9b9b9b"
    }
    ```

- **`GET /api/expenses`**
  - **Description:** Retrieves all expenses for the authenticated user.
  - **Headers:** `Authorization: Bearer <your_jwt_token>`
  - **Response:**
    ```json
    [
      {
        "_id": "5f9f1b9b9b9b9b9b9b9b9b9d",
        "amount": 50,
        "date": "2024-07-29T00:00:00.000Z",
        "category": {
            "categoryId": "5f9f1b9b9b9b9b9b9b9b9b9c",
            "name": "Groceries",
            "icon": "shopping-cart",
            "color": "#FF0000"
        },
        "userId": "5f9f1b9b9b9b9b9b9b9b9b9b"
      }
    ]
    ```

- **`PUT /api/expenses/:expenseId`**
  - **Description:** Updates an existing expense for the authenticated user.
  - **Headers:** `Authorization: Bearer <your_jwt_token>`
  - **Request Body:**
    ```json
    {
      "amount": 60.00,
      "date": "2024-07-29",
      "categoryId": "5f9f1b9b9b9b9b9b9b9b9b9c"
    }
    ```
  - **Response:**
    ```json
    {
        "_id": "5f9f1b9b9b9b9b9b9b9b9b9d",
        "amount": 60,
        "date": "2024-07-29T00:00:00.000Z",
        "category": {
            "categoryId": "5f9f1b9b9b9b9b9b9b9b9b9c",
            "name": "Groceries",
            "icon": "shopping-cart",
            "color": "#FF0000"
        },
        "userId": "5f9f1b9b9b9b9b9b9b9b9b9b"
    }
    ```

- **`DELETE /api/expenses/:expenseId`**
    - **Description:** Deletes an existing expense for the authenticated user.
    - **Headers:** `Authorization: Bearer <your_jwt_token>`
    - **Response:**
        ```json
        {
            "message": "Expense deleted successfully"
        }
        ```