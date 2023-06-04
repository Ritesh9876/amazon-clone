const express = require("express");
const app = express();
require("dotenv").config();

const { connectDB } = require("./config/database");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  var allowedDomains = [
    "https://today.green",
    "https://app.today.green",
    "https://api.today.green",
    "https://www.app.today.green",
  ];
  var origin = req.headers.origin;
  if (process.env.NODE_ENV === "development") {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  } else {
    if (allowedDomains.indexOf(origin) > -1) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

connectDB().then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
