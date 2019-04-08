import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/routes'
import config from './config/config'

// Instatiate express
let app = express();

// Configure app to user bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Register my routes from routes folder
app.use(router);


// Start the server on specified port
app.listen(config.port, () => {
    console.log("App started on port ", config.port)
});

export default app;