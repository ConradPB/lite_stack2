# lite-stack2
A backend for a Q&A app with JWT auth

Q&A App
This is a Q&A app built using Node.js, Express, and Mongoose. The app allows users to ask and answer questions.

Features
User authentication: Users can register and log in to the app.
Questions: Users can create, view, update, and delete questions.
Answers: Users can create, view, update, and delete answers to questions.
Getting Started
To get started with the app, follow these steps:

Clone the repository and navigate to the project directory.
Install dependencies by running npm install.
Start the server by running npm start.
The app should now be running on http://localhost:3000.

API Endpoints
The app has several API endpoints for interacting with the data:

GET /users: Fetch all users.
GET /users/:userId: Fetch a specific user by ID.
POST /users: Register a new user.
POST /users/login: Log in a user.
GET /questions: Fetch all questions.
GET /questions/:questionId: Fetch a specific question by ID.
POST /questions: Create a new question.
PUT /questions/:questionId: Update a question by ID.
DELETE /questions/:questionId: Delete a question by ID.
GET /answers: Fetch all answers.
GET /answers/:answerId: Fetch a specific answer by ID.
POST /answers: Create a new answer.
PUT /answers/:answerId: Update an answer by ID.
DELETE /answers/:answerId: Delete an answer by ID.

Dependencies
The app uses several dependencies to provide its functionality:

bcryptjs: Used for hashing user passwords before storing them in the database.
cors: Used to enable Cross-Origin Resource Sharing (CORS).
dotenv: Used to load environment variables from a .env file.
express: Used as the web framework for the app.
jsonwebtoken: Used to create and verify JSON Web Tokens (JWTs) for user authentication.
mongoose: Used as an Object Data Modeling (ODM) library for MongoDB.

Development Dependencies
The app also uses several development dependencies:

@babel/cli, @babel/core, @babel/node, and @babel/preset-env: Used to transpile modern JavaScript code into a version that can be run by older Node.js versions.
eslint-config-prettier and eslint-plugin-prettier: Used to integrate Prettier with ESLint for code formatting.
nodemon: Used to automatically restart the server when changes are made during development.