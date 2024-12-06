# Todo List Application

## Overview

This is a robust Todo List application built with Node.js, Express, and MongoDB, featuring user authentication and CRUD operations for managing tasks.

https://roadmap.sh/projects/todo-list-api
## Features

- User Registration and Authentication
- Create, Read, Update, and Delete (CRUD) Todo Items
- Secure password storage using bcrypt
- Input validation
- JWT-based authentication
- Error handling
- Testing support

## Prerequisites

- Node.js (v14 or later)
- MongoDB

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sattarrasouli/TodoList-Nodejs.git
cd crud-todolist
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root and add the following environment variables:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: User login

### Todo Routes (Authenticated)
- `POST /api/todos`: Create a new todo
- `GET /api/todos`: Get all todos
- `GET /api/todos/:id`: Get a specific todo
- `PUT /api/todos/:id`: Update a todo
- `DELETE /api/todos/:id`: Delete a todo

## Testing

Run tests using:
```bash
npm test
```

## Project Structure
```
crud-todolist/
├── app.js
├── config/
├── controllers/
├── models/
├── routes/
├── middleware/
└── tests/
```

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **Validation**: express-validator
- **Testing**: Jest, Supertest

## Security Features

- Password encryption
- JWT authentication
- Input validation
- Protected routes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Sattar Rasouli

## Acknowledgments

- Express.js
- Mongoose
- JSON Web Tokens
- bcrypt

## Contact

For any inquiries, please contact the repository owner.