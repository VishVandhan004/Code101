import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var bandName = "";

// middleware
// we need to use the body-parser middleware to send the url-encoded data 
app.use(bodyParser.urlencoded({ extended: true }));

// user defined middleware
function bandNameGenerator(req, res, next) {
  console.log(req.body);
  bandName = req.body["street"] + req.body["pet"];
  next(); // goes to the next part of server.
}
app.use(bandNameGenerator);

// route handlers
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
}); // this is used to send the whole html file to the server, so import dirname and fileurltopath.

// POST request for submit.
app.post("/submit", (req, res) => {
  res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
