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
let users = [];
// this is a function which we used to join 2 tables(users, visited_countries) based on a criteria(pk == fk)
async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries where user_id = $1", [currentUserId]);
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
 // this comes up when the user enters the country name and selects the color..
 
app.post("/add", async (req, res) => {
  const enteredCountry = req.body.country.toLowerCase();
  try {
    let result = await db.query(
      "select country_code from countries where lower(country_name) = $1",
      [enteredCountry]
    );
    // console.log("first query inside add");
 
    if (result.rows.length == 0) {
          // console.log("second query inside add");
      result = await db.query(
        "select country_code from countries where lower(country_name) like '%' || $1 || '%'",
        [enteredCountry]
      );
    }
    if (result.rows.length !== 0) {
      // console.log(result.rows.length);
      const data = result.rows[0];
      const countryCode = data.country_code;
      try {
        await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]);
        res.redirect("/");
        // console.log("third query inside add");
      } catch (err) {
        // console.log(err.code);
        // console.log("catch after third query inside add");
        // console.error(err);
        const countries = await checkVisisted();
        const currentUser = await getCurrentUser();
        res.render("index.ejs", {
          countries: countries,
          total: countries.length,
          users: users,
          color: currentUser.color,
          error: "Country has already been added, try again.",
        });
      }
    } else {
      // console.log("else after catch inside add");
      const countries = await checkVisisted();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color: currentUser.color,
        error: "Country has already been added, try again.",
      });
    }
  } catch (err) {
    // console.log(err);
    // console.log("catch after else inside add");
    const countries = await checkVisisted();
    const currentUser = await getCurrentUser();
    // console.log(err.code);
    // console.log("else inside last catch inside add");
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: currentUser.color,
      error: "Re-type the country name",
    });
  }
});
 // if the user is a new user, we can tap into it by using req.body and we need to display the new.ejs file for registration.. and the req.body.user is equal to the currentUser to show the user and the countries visited. 

app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});
 // this is gets to the new.ejs file and gets the name and the color of the new user..
app.post("/new", async (req, res) => {
 const name = req.body.name;
 const color = req.body.color;
   // the below query is used to create and get the new user's color and name

 const result = await db.query(
   "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
   [name, color]
 );
 
 const id = result.rows[0].id;
   // the id of the user will be set to the currentUserid to create a new user to the users table..

 currentUserId = id;
 
 res.redirect("/");
});
 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
