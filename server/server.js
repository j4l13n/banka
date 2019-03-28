import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(3002, () => {
    console.log("App started on port 3002");
});