const router = require("express").Router();
const USER_MODEL = require("../../models/UserModel/userModel");
var passport = require("passport");
const genPassword = require("../../lib/passportUtils").genPassword;

router.post("/login", passport.authenticate("local"), async (req, res) => {
//console.log("this is req object ",req.user)
return res.status(200).json({
  message: "User has been registered",
  success: true,
  user: req.user
});

});

router.post("/signup", async (req, res) => {
  try {
    let { userName, email, password } = req.body;

    const isExits = await USER_MODEL.findOne({ email });

    if (isExits) {
      return res.status(200).json({
        message: "User already exists",
        success: false,
      });
    }
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new USER_MODEL({
      firstName:req.body.firstname,
      lastName:req.body.lastname,
      email: req.body.email,
      hash: hash,
      salt: salt,
      admin: true,
    });

    newUser.save().then((user) => {
      console.log(user);
    });

    return res.status(200).json({
      message: "User has been registered",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
      success: false,
    });
  }
});

module.exports = router;
