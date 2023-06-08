const express = require("express");
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
require('./config/passport')
require("dotenv").config();
const { connectDB } = require("./config/database");
const userRoutes=require("./routes/users/auth.js");
const passport = require("passport");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/ecomerce' }),
  cookie:{
    maxAge:1000*60*60*24
  }
}));

app.use(passport.initialize())
app.use(passport.session())
app.use("/api/user/auth", userRoutes);
connectDB().then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
