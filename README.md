# Bookstore API

The **Bookstore API** is a simple RESTful API built with Node.js and PostgreSQL to manage books in a bookstore. It provides endpoints for CRUD operations on books and includes features like book recommendations.

---

## Features

- **CRUD Operations**: Create, read, update, and delete books in the database.
- **Book Recommendations**: Retrieve specific book recommendations by ID.
- **Validation**: Ensures proper data format and required fields in requests.
- **Error Handling**: Comprehensive error responses for invalid operations or inputs.

---

## Tech Stack

- **Backend**: Node.js
- **Database**: PostgreSQL
- **Libraries**: `pg` for database interaction

---

## Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- PostgreSQL
- A tool for making API requests (e.g., Postman, curl)

## Getting Started

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/BettyyN/BookStore-API.git
   cd BookStore-API
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up the Database**:
   - Create a PostgreSQL database named `BookStore`.
   - Create a table `Books` with the following schema:
     ```sql
     CREATE TABLE "Books" (
       "Id" SERIAL PRIMARY KEY,
       "Title" TEXT NOT NULL,
       "Author" TEXT NOT NULL,
       "ISBN" CHAR(13) NOT NULL,
       "PublishedYear" INTEGER NOT NULL
     );
     ```

4. **Run the Server**:
   ```bash
   node index.js
   ```
   The server will run on `http://localhost:8080`.

---

## API Endpoints

### Get All Books

- **URL**: `/books`
- **Method**: `GET`
- **Description**: Fetch all books from the database.

### Get Book Recommendations

- **URL**: `/books/recommendations`
- **Method**: `GET`
- **Description**: Fetch a recommended book by a predefined logic (ID = 1).

### Add a New Book

- **URL**: `/books`
- **Method**: `POST`
- **Description**: Add a new book to the database.
- **Body**:
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "isbn": "1234567890123",
    "publishedYear": 2023
  }
  ```

### Update a Book

- **URL**: `/books/:id`
- **Method**: `PUT`
- **Description**: Update an existing book by ID.
- **Body**: Same as the `POST` endpoint.

### Delete a Book

- **URL**: `/books/:id`
- **Method**: `DELETE`
- **Description**: Delete a book by ID.
