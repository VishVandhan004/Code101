import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// import the express app and the API URL...
const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//Add your own bearer token from the previous lesson.
const yourBearerToken = "08f3026d-9c6c-4d88-a3b2-c579dc106247";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

// express middleware
app.use(bodyParser.urlencoded({ extended: true }));

// it renders the index.ejs file and gets the data from the 'content' ejs tag in the form of key..
app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

// it handles a POST request of the route - /get-secret using axios. put a try-catch block, and get the data as result.. convert the result from JS object to JSON using stringify.. pass the result to EJS 'content' tag in a key-value pair as key
app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config); // RESTFUL APIs-> GET is used here
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// /secrets is the route we are sending the data to.. we are POSTing the data to this APIURL.. config is the bearer token we used..  req.body will give us the score and secret as a JS object. we need to get it via req.body
app.post("/post-secret", async (req, res) => {
  try {
    const result = await axios.post(API_URL + "/secrets", req.body, config);
    // await means that the above line should be completed first to execute the below line.., we will get the result and it will be sent to the content as key.. to the index.ejs..
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  // the req.body.id is important to get the data of the user when it has been submitted. we can easily identify/update when we know the id. so we used the req.body.id...
  const searchId = req.body.id;
  try {
    const result = await axios.put(
      API_URL + "/secrets/" + searchId,
      req.body,  // req.body means the data in the secrets and score placeholders..
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.patch(
      API_URL + "/secrets/" + searchId,
      req.body, // req.body means the data in the secrets and score placeholders...
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.delete(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
