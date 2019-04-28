import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes';
import config from './config/config';
const swaggerUi = require('swagger-ui-express');
import dotenv from 'dotenv';
const swaggerJSDoc = require('swagger-jsdoc');

dotenv.config();

// Instatiate express
let app = express();

// swagger definition
let swaggerDefinition = {
    info: {
        title: 'Banka Documentation API',
        version: '1.0.0',
        description: 'Banka Documentation with Swagger',
    },
    host: 'localhost:4000',
    basePath: '/api/v2',
};

let options = {
    //import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./**/routes/*.js','routes.js'],
};

// initialize swagger-jsdoc
let swaggerSpec = swaggerJSDoc(options);

// serve swagger 
app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configure app to user bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Register my routes from routes folder
app.use(router);

app.get("*", (req, res) => {
    res.status(404).json({
        status: 404,
        error: "This endpoint is not available, you just have to check banka endpoint for documentation"
    });
});

app.post("*", (req, res) => {
    res.status(404).json({
        status: 404,
        error: "This endpoint is not available, you just have to check banka endpoint for documentation"
    });
});

app.put("*", (req, res) => {
    res.status(404).json({
        status: 404,
        error: "This endpoint is no available, you just have to check banka endpoint for documentation"
    });
});

app.patch("*", (req, res) => {
    res.status(404).json({
        status: 404,
        error: "This endpoint is not available, you just have to check banka endpoint for documentation"
    });
});

app.delete("*", (req, res) => {
    res.status(404).json({
        status: 404,
        error: "This endpoint is not available, you just have to check banka endpoint for documentation"
    });
});


// Start the server on specified port
app.listen(config.port, () => {
    console.log("App started on port ", config.port);
});

export default app;