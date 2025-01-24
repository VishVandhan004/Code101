// import the express packages and postgres packages
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
  database: "secrets",
  password: "postgresql2004@",
  port: 5432,
});
db.connect();
// express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// it renders the home page
app.get("/", (req, res) => {
  res.render("home.ejs");
});
// /login route renders the login page 
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
// /register route renders the register page..
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
// in the /register, we take the /POST request to post the username and password
app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
// use the try-catch block for error handling
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      // we are inserting the credentials into the users table and giving them the $1 and $2 values by writing a SQL query..
      const result = await db.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, password]
      );
      // after registering, the creds will be viewed and secrets file will be rendered..
      console.log(result);
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      if (password === storedPassword) {
        res.render("secrets.ejs");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
