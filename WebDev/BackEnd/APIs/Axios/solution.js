import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// import the express app
const app = express();
const port = 3000;

// we use the body parser middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Axios code
// as soon as you open the website, we send GET request to the website and it generates a random info at starting. as 'random' is the endpoint to the API. then the user can select an option from the dropdown to get the required punchcards by using POST requests.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    // we are generating random activties. so we are collecting the data from the above line.
    const result = response.data;
    console.log(result);
    res.render("solution.ejs", { data: result });
    // after collecting the data, we need to send the data to the solution.ejs file in the form as key:value pair of data object
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("solution.ejs", {
      error: error.message,
    });
  }
});

// 
app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const type = req.body.type; // we grab the request of activity from the solution.ejs
    const participants = req.body.participants;
    // we grab the request of participants from the solution.ejs
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    ); // structure the API by using parameters.
    const result = response.data; // we get the response from the Bored API in the form of data object.
    console.log(result);
    // now based on the repsonses,activity,participants, we generate a random card .
    res.render("solution.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("solution.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
