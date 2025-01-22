// import the packages for express and postgres
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
// express middleware...
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// currentuser is 1.
let currentUserId = 1;
// in the sql we created,users is a table which has id,name and color.. this is the users table structure..
let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];
// this is a function which we used to join 2 tables(users, visited_countries) based on a criteria(pk == fk)
async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1; "
    [currentUserId]
  );
  // we are narrowing down the query in such a way that only the country visited by a specific user will be displayed by using a $1..
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
  // we are using the for each to get the country code form the array of countries..
}
// this function is used to get the users available and get the user based on the id..
async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id == currentUserId);
}
// this is used to get the different user based on different color.
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const currentUser = await getCurrentUser();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users, // diff user
    color: currentUser.color, // diff color
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  const currentUser = await getCurrentUser();

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  const result = await db.query(
    "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
    [name, color]
  );

  const id = result.rows[0].id;
  currentUserId = id;

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
