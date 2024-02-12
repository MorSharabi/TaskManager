const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const getSecret = require("../userSecrets");

const router = express.Router();

router.get("/", async (req, res) => {
  let users = await User.find();
  res.send(users);
  res.end();
});

//Register:
router.post("/", async (req, res) => {
  
  try {
    const hashedPwd = await bcrypt.hash(req.body.pwd, 10);

    const user = new User({
      userName: req.body.userName,
      pwd: hashedPwd,
      email: req.body.email,
      fullName: req.body.fullName,
    });

    await user.save();

    res.send(user);
  } catch (err) {
    res.status(404);
    res.send(err);
  }
});

//LOGIN:

const secret = getSecret();

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({
      userName: req.body.userName,
    });
    if (user) {
      bcrypt.compare(req.body.pwd, user.pwd).then((result) => {
        if (result) {
          const token = jwt.sign(
            {
              _id: user._id,
              userName: user.userName,
            },
            secret
          );

          res.send({
            token: token,
            userId: user._id,
            userName: user.userName,
          });
        } else {
          res.status(401).send("Authentication failed. Incorrect password.");
        }
      });
    } else {
      res.status(404).send("User not found.");
    }
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    if (user) {
      user.userName = req.body.userName;
      user.pwd = req.body.pwd;
      user.email = req.body.email;
      user.phone = req.body.phone;
    } else {
      res.status(404);
      res.send("User not found");
    }

    await user.save();
    res.status(200);
    res.send(await User.find());
  } catch (err) {
    res.status(501);
    res.send(err);
  }
});

module.exports = router;
