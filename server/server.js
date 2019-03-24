let express = require("express");

let app = express();

app.get("/random/:min/:max", (req, res) => {
   let min = parseInt(req.params.min);
   let max = parseInt(req.params.max);

   if(isNaN(min) || isNaN(max)) {
	res.status(400);
	res.json({ error: "Bad request." });
	return;
   }

   let result = Math.round(Math.random() * (max - min) + min);
   res.json({ result: result });
});

app.get("/", (req, res) => {
    res.send("Get request");
});

app.post("/", (req, res) => {
    res.send("Post request");
});

app.put("/", (req, res) => {
    res.send("Put request");
});

app.delete("/", (req, res) => {
    res.send("Delete request");
});

app.listen(3000, () => {
    console.log("App started on port 3000");
});