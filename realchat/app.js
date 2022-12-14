// var app = require("express")();
// var http = require("http").createServer(app);
// var io = require("socket.io")(http);
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/views/index.html");
// });

// io.on("connection", function (socket) {
//   socket.on("chat message", function (msg) {
//     io.emit("chat message", msg);
//   });
// });

// http.listen(3000, function () {
//   console.log("listening on *:3000");
// });

var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", function (socket) {
  socket.on("chat message", function (msg) {
    io.emit("send message", msg);
  });
});

http.listen(5000, function () {
  console.log("listening on *:5000");
});
