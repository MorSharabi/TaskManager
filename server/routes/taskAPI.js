const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");
const getSecret = require("../userSecrets");

const router = express.Router();

const secret = getSecret();
const verifyToken = async (req, res, next) => {
  if (req.headers.authorization) {
    // Change 'Authorization' to 'authorization'
    let token = req.headers.authorization; // Change 'Authorization' to 'authorization'
    if (token) {
      const payload = await jwt.verify(token, secret);
      next();
    } else {
      return res.status(401).send("authorization error(token = false)");
    }
  } else {
    return res
      .status(401)
      .send("authorization error(no header Authorization )");
  }
};

router.get("/", verifyToken, async (req, res) => {
  try {
    let tasks = await Task.find();

    res.send(tasks);
    res.end();
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      userName: req.body.userName,
      description: req.body.description,
      priority: req.body.priority,
      isDone: req.body.isDone,
    });

    await task.save();

    res.send(task);
  } catch (err) {
    res.status(404);
    res.send(err);
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    await Task.deleteOne({
      _id: id,
    });
    res.status(200);
    res.end();
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
    });
    if (task) {
      (task.title = req.body.title),
        (task.description = req.body.description),
        (task.priority = req.body.priority),
        (task.isDone = req.body.isDone);
    } else {
      res.status(404);
      res.send("User not found");
    }

    await task.save();
    res.status(200);
    res.send(task);
  } catch (err) {
    res.status(501);
    res.send(err);
  }
});

module.exports = router;
