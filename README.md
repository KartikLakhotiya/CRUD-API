# CRUD API with MongoDB

Welcome to the CRUD API repository! This project demonstrates a basic CRUD (Create, Read, Update, Delete) API using Node.js, Express, and MongoDB. This API allows users to create, read, update, and delete resources stored in a MongoDB database.

## Features

- **Create**: Add new resources to the database.
- **Read**: Retrieve existing resources from the database.
- **Update**: Modify existing resources in the database.
- **Delete**: Remove resources from the database.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

## Getting Started

### Prerequisites

Ensure you have the following :

- [Node.js](https://nodejs.org/) - Install on your machine.
- [MongoDB Atlas](https://www.mongodb.com/atlas) - Cloud service no need to install any software. Just visit the MongoDB website and follow the instructions.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/KartikLakhotiya/CRUD-API.git
    cd CRUD-API
    ```

2. Install dependencies in both frontend and backend folder:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
    ```
    PORT=8080
    MONGO_URI="your_mongo_atlas_connection_string"
    ```

### Running the Application

1. Go into the backend directory:
    ```bash
    cd backend
    npm run dev
    ```

2. Go into the frontend directory:
    ```bash
    npm run dev
    ```

The API (Backend) will be running at `http://localhost:8080`.
The Frontent will be running at `http://localhost:5173`.

## Error Handling

The API includes basic error handling for common issues such as:

- User not found
- Invalid credentials
- Server errors

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any changes you'd like to make.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please open an issue in this repository.

---

Thank you for using the CRUD API! Happy coding!

---
