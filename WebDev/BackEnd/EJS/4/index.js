import express from "express";
// getting the express app
const app = express();
const port = 3000;
// declaring the static files to the express
app.use(express.static("public"));
// GET request to render the home page(index.ejs)
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
