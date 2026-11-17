// import express library to make the web server
import express from "express";

// app represents my server
const app = express();

// send files from public folder to visitors
app.use(express.static("public"));

// return current server time
app.get("/time", (req, res) => {
  // get current date + time from new Date, make it into string, and send it to the browser using res.send
  res.send(new Date().toString());
});

// use renders assigned port, or port 3000 when running locally
const port = process.env.PORT || 3000;

//start server and listen for requests
app.listen(port, () => {
  // print msg to confirm server is working correctly
  console.log(`Server running on port ${port}`);
});