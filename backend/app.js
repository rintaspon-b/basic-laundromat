const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const config = require("./config");

app.use(express.json());
app.use(cors());

const authorize = require("./authorizationMiddleware");

const pool = mysql.createPool(config.database);
const port = config.basic.port;

pool.on("error", (err) => {
  console.error("Database pool error:", err);
});

app.get("/api/test", authorize, (req, res) => {
  const id = req.query.id;
  const responseData = {};
  responseData.id = id;
  res.json(responseData);
});

app.get("/api/token", (req, res) => {
  const userId = req.query.userId;
  // find user by userid..
  const user = { id: 1, username: "test" };
  // console.log(config.authorizer.secret);
  const token = jwt.sign({ user }, config.authorizer.secret, {
    expiresIn: "1h",
  });
  // console.log(token);
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
