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
  const token = jwt.sign({ user }, config.authorizer.secret, {
    expiresIn: "1h",
  });
  res.json({ token });
});

app.get("/api/machines", authorize, (req, res) => {
  let machines = [];
  const sql = `SELECT * FROM machine;`;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    machines = results;
    // console.log(machines);
    res.json(machines);
  });
});

app.post("/api/start", authorize, (req, res) => {
  const id = req.body?.id;
  console.log(`machine ${id} starts`);
  res.json({ message: `machine [${id}] starts` });
});

app.post("/api/stop", authorize, (req, res) => {
  const id = req.body?.id;
  console.log(`machine ${id} stops`);
  res.json({ message: `machine [${id}] stops` });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
