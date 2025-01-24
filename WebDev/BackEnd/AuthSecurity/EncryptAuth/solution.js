// import the express, postgres and bcrypt packages from the npm
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
// express app
const app = express();
const port = 3000;
// define the no of salt rounds as well..
const saltRounds = 10;
// express body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// postgres credentials
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "postgresql2004@",
  port: 5432,
});
db.connect();
// it renders the home page
app.get("/", (req, res) => {
  res.render("home.ejs");
});
// the /login route renders the login page.. using the GET request
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
// the /register route renders the register page...
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
// in this post request, we would get access to the email and pwd using body parser...
app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
// use try-catch block for error-handling...
  try {
    // we check if the user's email already exists in the database or not..
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      // we use the bcrypt module here for hashing..
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          // if there's no error, the pwd will be hashed..
          console.log("Hashed Password:", hash);
          await db.query(
            // after the hashing, the pwd will be stored in our database..
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, hash]
          );
          // after registering, secrets page will be redirected to you..
          res.render("secrets.ejs");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});
// in the /login route, the email and pwd will be collected and it will be check if the email exists or not..
app.post("/login", async (req, res) => {
  const email = req.body.username;
  const loginPassword = req.body.password;
// it will if email exists or not..
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      //verifying the password
      bcrypt.compare(loginPassword, storedHashedPassword, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else {
          if (result) {
            res.render("secrets.ejs");
          } else {
            res.send("Incorrect Password");
          }
        }
      });
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
