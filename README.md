## <h1 align="center">Brain Gain</h1>

<div align="center">

⭐ [braingain.vercel.app](https://braingain.vercel.app/) ⭐

</div>

https://github.com/alliyah95/brain-gain/assets/74038500/f1f3dace-3089-4980-a33f-d3fbf8666c31

## About

[Brain Gain](https://braingain.vercel.app/) is a study tool that I developed to learn and apply my knowledge of the MERN stack. I used [Quizlet](https://quizlet.com/) as a reference to build the app and implement similar functionalities. Brain Gain allows users to create and share flashcards and tests. It also provides a simple user interface for a seamless study experience.

## Technologies Used

-   React
-   TailwindCSS
-   Node.js
-   Express.js
-   MongoDB

## Setup and Installation

1. Clone the project to your local machine.

    ```bash
    git clone https://github.com/alliyah95/brain-gain.git
    ```

2. Install dependencies for both the client and server by running the following command in the `client` and `server` directories:

    ```bash
    npm install
    ```

3. Setup the [environment variables](#environment-variables) for both the client and server.

4. Start the server by navigating to the `server` directory and running the following command:

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

**Brain Gain** is licensed under the [GPL-3.0](https://github.com/ajmsjy/brain-gain/blob/main/LICENSE) license.
