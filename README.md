## <h1 align="center">brain gain 📝</h1>

<div align="center"><img src="https://res.cloudinary.com/dl2vomrrr/image/upload/v1682009661/brain-gain-preview_pprkco.gif"/></div>

## About

Brain Gain is a study tool that I developed to learn and apply my knowledge of the MERN stack. I used [Quizlet](https://quizlet.com/) as a reference to build the app and implement similar functionalities. Brain Gain allows users to create and share flashcards and tests. It also provides a simple user interface for a seamless study experience.

## Technologies Used

-   React
-   TailwindCSS
-   Node.js
-   Express.js
-   MongoDB

## Setup and Installation

1. Clone the project to your local machine using `git clone`.
2. Install dependencies for both the client and server by running the following command in the `client` and `server` directories:
    ```bash
    npm install
    ```
3. Setup the [environment variables](#environment-variables) for both the client and server.
4. Start the backend by navigating to the `server` directory and running the following command:
    ```bash
    npm run dev
    ```
5. Start the client by navigating to the `client` directory and running the following command:
    ```bash
    npm run start
    ```
6. Access the app by navigating to `http://localhost:3000` in your web browser.

## Environment Variables

<div id="environment-variables">

### Client

```
REACT_APP_BACKEND_API="http://localhost:8080/api/"
# The base URL for the backend API
```

### Server

```
PORT=8080
# The port on which the server will run

JWT_SECRET=your-jwt-secret
# A secret key used to sign and verify JSON Web Tokens (JWTs)

DB_URI=mongodb://127.0.0.1:27017/brain-gain
# The URI for your MongoDB database
```

</div>

## License

**Brain Gain** is licensed under the [MIT](https://github.com/ajmsjy/brain-gain/blob/main/LICENSE) license.
