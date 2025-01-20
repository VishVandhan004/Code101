// import the express app and postgres packages
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// postgres syntax
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgresql2004@",
  port: 5432, // this is default, don't change it..
});

// express app
const app = express();
const port = 3000;
// used for database connection...
db.connect();
// all the flags are stored in an array..
let quiz = [];
db.query("SELECT * FROM flags", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows; // the data will be selected in rows
  }
  db.end();
});

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
// after the user submits an answer, we get a POST request and we trim the spaces using trim().
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
    // if the answer is equal to the current question capital, then the score increases by 1.Therefore it increaes by 1 and so on , until the answer is not equal to the capital
  if (currentQuestion.name.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }
// after the prevoius question, the next question will be given by the code below..
  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  // we get a random country and random capital after randomization , we give it to the current question.
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
