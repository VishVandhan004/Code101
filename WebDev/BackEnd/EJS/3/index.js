import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  // local variable -> numLetters
  // in the bodyparser, we will request fname,lname..
  const numLetters = req.body["fName"].length + req.body["lName"].length;
  // the local variable will be sent to index.ejs via res.render as a variable - numberOfLetters
  res.render("index.ejs", { numberOfLetters: numLetters });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
