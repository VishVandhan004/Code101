import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgresql2004@",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

// GET home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

//INSERT new country
// in the index.ejs, we got a POST request to the /add route 
app.post("/add", async (req, res) => {
  // the input typed by the user which is the name of a country
  const input = req.body["country"];
  // the country typed by the user will be sent here and the country code will be looked using the query. exp, if country is France, FR will be searched and kept in the result variable.
  const result = await db.query(
    "SELECT country_code FROM countries WHERE country_name = $1",
    [input] // country name will be kept here..
  );
// if there is data available, we continue and grab the country code
  if (result.rows.length !== 0) {
    const data = result.rows[0];
    const countryCode = data.country_code;
// after grabbong the country code , we also insert that value into the visited_countries table as well..
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
      countryCode,
    ]);
    res.redirect("/");// redirect to home page..
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
