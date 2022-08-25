var express = require("express");
var userRouters = require("./userRouter");

//add cookie parse
var cookieParser = require("cookie-parser");

//check eror
var app = express();
app.get("/", function (req, res) {
  throw new Error("Something went wrong!");
  res.send("hello world !!!");
});

app.get("/hello", function (req, res) {
  res.send("hello world !!!");
});

app.post("/hello", function (req, res) {
  res.send("Ban vua gui yeu cua bang phuong thuc POST toi dia chi /hello");
});

//truy cap bang router

app.use("/user", userRouters);

// dynamic url : parameters

app.get("/users/:userId/books/:bookId", function (req, res) {
  res.send(req.params);
});

app.get("/members/:memberID([0-9]{2})", function (req, res) {
  res.send(req.params);
});

app.get("/ab+cd", function (req, res) {
  res.send("ab+cd");
});

//regular expressions routes

app.get(/a/, function (req, res) {
  res.send("/a/");
});

//middleware function

var checkRequest = (req, res, next) => {
  console.log(
    "Middleware chạy ở route có url " + req.url + " và method là " + req.method
  );
  if (req.url === "/block") {
    res.send("Bạn không có quyền truy cập !");
  } else {
    next();
  }
};

//Khai báo sử dụng middleware
app.use(checkRequest);

//khoi tao mot router moi
app.get("/block", function (req, res) {
  res.send("Truy cập thành công !");
});

//middleware request time
const requestTime = function (req, res, next) {
  req.a = new Date();
  next();
};

app.use(requestTime);

app.get("/time", (req, res) => {
  let responseText = "Hello World!<br>";
  responseText += `<small>Requested at: ${req.a}</small>`;
  res.send(responseText);
});

//Middleware function validateCookies
//Khai báo sử dụng middleware cookieParse()
app.use(cookieParser());

app.get("/cookie", function (req, res) {
  res.cookie("name", "firstdemo", { expires: new Date(Date.now() + 900000) });
  res.send("success");
});

//get name cookie
app.get("/getCookie", function (req, res) {
  if (req.cookies.name)
    res.send(`Cookie name co gia tri la ${req.cookies.name}`);
  res.send("Khong the tim lay cookie co ten la name");
});

//xoa cookie
app.get("/deleteCookie", function (req, res) {
  res.clearCookie("name");
  res.send("Da xoa cookie");
});

//xu ly error khi request den route khong ton tai
//route xu ly loi phia duoc dat sau cung
app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    error: "Not found",
  });
});

// error handler middleware

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send("Something Broke!");
});






app.listen(5000, function () {
  console.log("running!!");
});
