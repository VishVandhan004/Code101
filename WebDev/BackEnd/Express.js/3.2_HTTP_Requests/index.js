import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => { 
  // goes to end of the home page
  res.send("<h1>Hello</h1>");
});

app.get("/about", (req, res) => {
  // when you type localhost:3000/about, you get About me
  res.send("<h1>About Me</h1><p>My name is Angela</p>");
});

app.get("/contact", (req, res) => {
  // when you type localhost:3000/contact, you get Contact me
  res.send("<h1>Contact Me</h1><p>Phone: +44123456789</p>");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
