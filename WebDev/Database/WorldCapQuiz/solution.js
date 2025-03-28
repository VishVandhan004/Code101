// import the necessary pacakges to run the express app.
import express from "express";
import bodyParser from "body-parser";
import pg from "pg"; // postgres npm
// postgres syntax for node
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgresql2004@",
  port: 5432,
});
// express app
const app = express();
const port = 3000;
// for database connection..
db.connect();
// array of capitals.. using SQL queries to store in the array..
let quiz = [];
db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows; // gives rows in capitals tables..
  }
  db.end();
});

let totalCorrect = 0;

// Middleware
// body parser is used to get the data from the form..
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {}; // it is equal to a random object

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
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) { // turn into lowercases..
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
  currentQuestion = randomCountry;
  // we get a random country and random capital after randomization , we give it to the current question.
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
