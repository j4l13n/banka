import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes';

// Instatiate express
let app = express();

// setting port number
const port = process.env.PORT || 8000;

// Configure app to user bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Register my routes from routes folder
app.use(router);


// Start the server on specified port
app.listen(port, () => {
    console.log("App started on port " + port)
});

export default app;