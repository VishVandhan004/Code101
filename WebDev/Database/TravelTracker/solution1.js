// import the express app and postgres..
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
// express app
const app = express();
const port = 3000;
// postgres credentials
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgresql2004@",
  port: 5432,
});
db.connect();
// express middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET home page
// here, it gets us a list of countries we have already visited..
app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visited_countries");
  // the countries are in the form of array..and we need to get a single country from the whole group.. we are accessing the country code using for each and pushing it in the countries array..
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(result.rows);
  // here it gives the total countries visited.
  res.render("index.ejs", { countries: countries, total: countries.length });
  db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
