const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const io = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const socketioJwt = require("socketio-jwt");
const getSecret = require("./userSecrets");

const DBurl = "mongodb://127.0.0.1:27017/userTasksProjectDB";

const app = express();
const httpServer = http.createServer(app); //necessary for the socket io

const ioServer = io(httpServer, {
  cors: {
    origin: ["http://localhost:4200"],
  },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const userRoute = require("./routes/userAPI");
const tasksRoute = require("./routes/taskAPI");
app.use("/users", userRoute);
app.use("/tasks", tasksRoute);

const secret = getSecret();

ioServer.use(
  socketioJwt.authorize({
    secret: secret,
    handshake: true, // Set handshake to true to attach the decoded token to the socket object
  })
);

ioServer.on("connection", (socket) => {
  if (socket.decoded_token) {
    const userId = socket.decoded_token._id; // Adjust the key based on your token payload
    const userName = socket.decoded_token.userName; // Adjust the key based on your token payload

    // Attach user data to the socket connection object
    socket.userId = userId;
    socket.userName = userName;

    console.log(`User ${socket.userName} connected with ID ${socket.userId}`);
  } else {
    console.log("Anonymous user connected");
  }

  socket.on("getUserName", () => {
    const userName = socket.userName;
    socket.emit("setUserName", userName); // For this User
  });

  socket.on("Delete", (id) => {
    const taskId = id;
    const userName = socket.userName;
    console.log(`User ${userName} deleted ${taskId}`);
    socket.emit("onDelete", id); // For this User
    socket.broadcast.emit("onDelete", id); // For All Users
  });

  socket.on("newTask", (model) => {
    const userName = socket.userName;
    console.log(`User ${userName} created new Task`);
    model.userName = userName;
    socket.emit("onNewTask");
    socket.broadcast.emit("onNewTask");
  });

  socket.on("taskChecked", () => {
    socket.emit("onTaskChecked");
    socket.broadcast.emit("onTaskChecked");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//Conecting to DB:
mongoose
  .connect(DBurl)
  .then(() => {
    const server = httpServer.listen(8080, function () {
      const port = server.address().port;
      console.log("App listening on port " + port);
    });
  })
  .catch((err) => console.log(err));
