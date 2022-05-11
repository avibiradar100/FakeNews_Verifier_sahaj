const express = require("express");
const cookieParser = require("cookie-parser");


const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//Using Middlewares
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended: true })); //else use body parser
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}


// const post = require("./routes/post");
const user = require("./routes/user");

//Using routes
// app.use("/api/v1", post);
app.use("/api/v1", user);

module.exports = app;