//Required packages
require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

//import other files
const route = require("./routes/route");
const authenticateToken = require("./middleware");

// Middleware
app.use(bodyParser());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/", route);

//Custom MiddleWare
app.use("/", authenticateToken);

//Route
app.get("/route", (req, res) => {
  const { user } = req;
  console.log(user);
  res.json({  user });
});

const port = process.env.PORT || 5000;

//Connection To MongoDb
// mongoose
//   .connect(process.env.MONGODBURL)
//   .then(() => {})
//   .catch((e) => console.log("An Error Occured !!!", e));

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);