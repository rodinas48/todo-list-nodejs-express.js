// function return promise
const connectDB = require("./db/connect");

const express = require("express");
const app = express();
//router task
const tasks = require("./routes/tasks");
const port = process.env.PORT||3000;
// setup envirnoment
require("dotenv").config();
//middleware
app.use(express.static("src/public"));
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error details
  res.status(500).send("Something went wrong"); // Send an appropriate response
});
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin (for development or testing)
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "POST,GET,PATCH,DELETE, OPTIONS"
//   ); // Allow POST and preflight OPTIONS requests
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow certain headers
//   next();
// });
//routes
app.use("/api/v1/tasks", tasks);

const start = async () => {
  try {
    // rend mongoURI as a parameter to connectdb
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
