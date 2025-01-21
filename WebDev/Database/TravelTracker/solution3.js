// importing the required express and pg packages
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
// express app
const app = express();
const port = 3000;
// postgres credentials..
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgresql2004@",
  port: 5432,
});
db.connect();
// express middleware body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// create a function to track the countries visited..
async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
// it has the same bullshit which the earlier 2 solution have...
// GET home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

//INSERT new country
app.post("/add", async (req, res) => {
  const input = req.body["country"];
// try-catch block is used to handle errors.. such as no country exists, repeated countries
  try {
    // this is used to handle if the country name is right or wrong..if it is right it goes to next try-catch block..
    const result = await db.query(
      "SELECT country_code FROM countries WHERE country_name = $1",
      [input]
    );
    const data = result.rows[0];
    // it grabs the country ISO code..
    const countryCode = data.country_code;
    try {
      // if the ISO code doesn't exist, it inserts the code..
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    }
    // if the ISO code already exists, then it will print an error.. 
    catch (err) {
      console.log(err);
      const countries = await checkVisisted();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }
  }
  // the catch block below is used to handle the cases where the country name is wrong or incorrect spelling.. 
   catch (err) {
    console.log(err);
    const countries = await checkVisisted();
    // the above variable checks if the country is matching with all the set of countries and if it doesn't match, it prints name doesn't exist...
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
