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
    // firstly, we will check if the user already exists or not.. we would go through the whole table and check the emails with our present email. if it exists, put out a message, if it doesn't go for the registration..
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email, // our email will be checked with the table's data..
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
// in this /post request, we check the login credentials of the user in the /login route...
app.post("/login", async (req, res) => {
  // we collect the email and pwd using body parser
  const email = req.body.username;
  const password = req.body.password;
// use try-catch block for error handling..
  try {
    // same as the above, we check the email with the other data in table  
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    // the below if statement checks the email with the data, if it exists, go to the pwd and check if the pwd is correct or not.. if its correct , render to the secrets page.. otherwise incorrect pwd
    if (result.rows.length > 0) {
      const user = result.rows[0];// contains all the details of the user..
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
