# 📚 Library Management System API

A full-featured Library Management System built using **Express.js**, **TypeScript**, and **MongoDB** (via Mongoose). This project allows users to manage books and borrowing records with proper schema validation, business logic, and filtering capabilities.

---

## 🚀 Features

✅ Add, update, get, and delete books

✅ Borrow books with business logic validation

✅ Aggregated borrowed summary using MongoDB aggregation

✅ Filtering and sorting on book retrieval

✅ Mongoose schema validation

✅ Mongoose middleware (pre, post)

✅ Static and instance methods

✅ Clean and consistent API response format

---

## 🧱 Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose
- **Validation**: Mongoose schema validation
- **Tools**: ESLint, Prettier, Nodemon, ts-node-dev

---

## 📂 Project Structure

📦 ASSIGNMENT-3
├── .vercel/  
├── dist/  
├── node_modules/  
├── src/  
│ └── App/  
│ ├── controllers/  
│ │ ├── book.controllers.ts
│ │ └── borrow.controller.ts
│ ├── interface/  
│ │ ├── book.interface.ts
│ │ └── borrow.interface.ts
│ ├── model/  
│ │ ├── book.model.ts
│ │ └── borrow.model.ts
│ ├── App.ts  
│ └── Server.ts  
├── .gitignore  
├── eslint.config.mjs  
├── package.json  
├── package-lock.json  
├── tsconfig.json  
└── vercel.json

---

## 🌐 API Endpoints

### 📘 Books

- `POST /api/books` - Create a new book
- `GET /api/books` - Retrieve all books with optional filtering/sorting
  - Query params: `filter`, `sortBy`, `sort`, `limit`
- `GET /api/books/:bookId` - Get book details by ID
- `PUT /api/books/:bookId` - Update book details
- `DELETE /api/books/:bookId` - Delete a book

### 📙 Borrow

- `POST /api/borrow` - Borrow a book with quantity and due date
- `GET /api/borrow` - Borrowed book summary (with total quantity per book using aggregation)

---

## 📌 Business Logic Highlights

- **Available Copies Check**: Prevents borrowing more copies than are available.
- **Auto Update Availability**: Automatically sets `available: false` when all copies are borrowed (handled via instance method).
- **Borrow Summary**: Uses an aggregation pipeline to show the total borrowed quantity per book.

---

## ✅ Sample Success Response

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "...",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "copies": 5,
    "available": true
  }
}
```

## ❌ Generic Error Response Format

```json
json
CopyEdit
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}

```

## 🛠️ Setup Instructions

1. **Clone the Repository**

```bash
bash
CopyEdit
git clone https://github.com/HmSani6699/L2-B5-Assignment-3
cd L2-B5-Assignment-3

```

1. **Install Dependencies**

```bash
bash
CopyEdit
npm install

```

1. **Run the Project**

```bash
bash
CopyEdit
npm run dev

```

---

## 🧪 Testing API

Use Postman or Thunder Client to test the endpoints, or refer to the example request/response payloads in the assignment.

---

## 📹 Video Explanation

🎥 https://drive.google.com/file/d/1H_jo1VVelCncUFa3vlGtAFDtur6zSR6E/view?usp=sharing

---

## 🔗 Live API Deployment

🌍 https://assignment-3-zeta-ten.vercel.app/

---

## 🙌 Acknowledgements

This project was developed as part of **Assignment 3** of our backend development course.
