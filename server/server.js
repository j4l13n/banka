import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes';
import config from './config/config';
import userController from './controllers/users';
import dotenv from 'dotenv';

dotenv.config();

// Instatiate express
let app = express();

// Configure app to user bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Register my routes from routes folder
app.use(router);

app.get("/", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "Welcome to banka endpoint api, you just have to use banka endpoint documentation to use it."
    });
});

app.get("*", (req, res) => {
    res.status(404).json({
        status: 404,
        error: "This endpoint is no available, you just have to check banka endpoint to documentation"
    });
});

app.post("*", (req, res) => {
    res.status(404).json({
        status: 404,
        error: "This endpoint is no available, you just have to check banka endpoint to documentation"
    });
});

app.put("*", (req, res) => {
    res.status(404).json({
        status: 404,
        error: "This endpoint is no available, you just have to check banka endpoint to documentation"
    });
});

app.patch("*", (req, res) => {
    res.status(404).json({
        status: 404,
        error: "This endpoint is no available, you just have to check banka endpoint to documentation"
    });
});

app.delete("*", (req, res) => {
    res.status(404).json({
        status: 404,
        error: "This endpoint is no available, you just have to check banka endpoint to documentation"
    });
});


// Start the server on specified port
app.listen(config.port, () => {
    console.log("App started on port ", config.port);
});

export default app;