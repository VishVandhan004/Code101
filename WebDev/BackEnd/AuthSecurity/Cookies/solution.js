// we import express and postgres packages 
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
// bcrypt is used for pwd hashing...
import bcrypt from "bcrypt";
// passport.js is used for authentication..
import passport from "passport";
// 
import { Strategy } from "passport-local";
// it is used for session management
import session from "express-session";
import env from "dotenv";
// express app
const app = express();
const port = 3000;
const saltRounds = 10;
env.config();
// session initialization
app.use(
  session({
    secret: "TOPSECRETWORD",// its a key to keep the session secret.. to protect login credentials..
    resave: false, // if you want to save a session into db or not?
    saveUninitialized: true, // it is related to storing the session or not
  })
);
// express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// passport usage
app.use(passport.initialize());
app.use(passport.session());
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
// it renders the login page..
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
// it renders the register page..
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
// it renders the logout page..
app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
// if the user is authenticated then only we can show him the secrets page..
app.get("/secrets", (req, res) => {
  // console.log(req.user);
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");// otherwise render the login page..
  }
});
// we are using passport as middleware here...
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets", // if authentication is successful, redirect to secrets page
    failureRedirect: "/login", // if authentication is failed, redirect to login page
  })
);
// we take the username and pwd using body parser..
app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
// we go into the 1st row to get the user data..
    if (checkResult.rows.length > 0) {
      req.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          // we get the email and pwd of the user..
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});
// we use the passport strategy here before the app.port. we give a function called verify , it takes 3 params.. it checks whether the user email exists in the db or not.. we type the code which we used in the login route previously.
passport.use(
  new Strategy(async function verify(username, password, cb) {
    // the username and password shall match with the login.ejs placeholder name attribute..
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      // we get the email of the users 
      if (result.rows.length > 0) {
        const user = result.rows[0];// gets the data of the user..
        const storedHashedPassword = user.password;
        // if the passwords typed are same as in the db, it gets logged in or else fuck off..
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);// returning the callback
          } else {
            if (valid) {
              //Passed password check
              return cb(null, user);// returning the callback which consists of user data.
            } else {
              //Did not pass password check
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);
// this is used to save the data of those who are logged in..
passport.serializeUser((user, cb) => {
  cb(null, user); // callback
});
// it saves the id,email of the user and we can easily get that session of the user through the above and below code
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
