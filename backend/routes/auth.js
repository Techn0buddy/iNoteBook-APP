const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const JWT_SECRET = "@iNotebook#Secret";

//Route1 : Create User using : POST "/api/auth/createuser" . Doesn't require login
router.post(
  "/createuser",
  // Validation : to prevent any error due to wrong data.
  [
    body("name", "Enter a valid name").notEmpty(),
    body("email", "Enter a valid email").isEmail().notEmpty(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //To determine signUp successful or not.
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    // Check whether the user's email exist already.
    // try catch - so that any error can be handled.
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry a user with this email already exists" });
      }
      //Securing Password using hashing and salt. This is done using bcryptjs node package.
      //both are returning promises, so they have to wait until they return the result using await.
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // User model will create a new user using data provided by the user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      //Creating JsonWebToken to send it to the user instead of whole user's data for login purposes.
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      // sending results to the user in json format.
      // res.json(user);
      //sending authorisation token for login and other activities.
      success = true;
      res.json({success, authToken });
    } catch (err) {
      console.log(err.message);
      //status 500 internal server error.
      success = false;
      res.status(500).json({success, error: "Internal Server Error"});
    }
  }
);

//Route2 : Authenticate User using : POST "/api/auth/login" . Doesn't require login.
router.post(
  "/login",
  // Validation : to prevent any error due to wrong data.
  [
    body("email", "Enter a valid email").isEmail().notEmpty(),
    body("password", "Incorrect Password").exists(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to enter correct credentials",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({success, error: "Incorrect Password" });
      }
      
      const data = {
        user: {
          id: user.id,
        },
      };
      
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.send({ success, authToken });
    } catch (err) {
      console.log(err.message);
      //status 500 internal server error.
      success = false;
      return res.status(500).json({success, error:"Internal Server Error"});
    }
  }
);

//Route3 : Get User's details using : POST "/api/auth/getuser" . Require Login.
router.post(
  "/getuser", fetchUser ,
  async (req, res) => {
    try {
      const UserId = req.user.id;
      const user = await User.findById(UserId).select("-password");
      return res.send(user);
    } catch (err) {
      console.log(err.message);
      //status 500 internal server error.
      return res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
