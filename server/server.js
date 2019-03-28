let express = require("express");
let apiVersion1 = require("./apiVersions/api1.js");
let app = express();

app.use("/v1", apiVersion1);

app.listen(3000, () => {
    console.log("App started on port 3000");
});