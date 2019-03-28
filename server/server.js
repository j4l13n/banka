let express = require("express");
let mockdb = require('./mockdb/user');
let bodyParser = require('body-parser');
let router = require('./routes/routes');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(3002, () => {
    console.log("App started on port 3002");
});