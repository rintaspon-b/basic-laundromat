const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const config = require("./config");

app.use(express.json());
app.use(cors());

const authorize = require("./authorizationMiddleware");
const notifyLineGroupMessage = require("./lineConnector");

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

app.get("/api/line/test", authorize, (req, res) => {
  const useTimer = req.query.useTimer;
  const message = {
    type: "text",
    text: "Test message from basic-laundromat app",
  };
  const processTime = 70 * 1000;  // To miliseconds
  let notifyTime = 0;
  if (useTimer == "true") {
    notifyTime = processTime - (config.basic.notifyBeforeTimeout * 1000); // To miliseconds
  }
  setTimeout(() => {
    notifyLineGroupMessage(message, res);
  }, notifyTime);
  res.json(message);
});

app.get("/api/token", (req, res) => {
  const userId = req.query.userId;
  // find user by userid..
  const user = { id: 1, username: "test" };
  const token = jwt.sign({ user }, config.authorizer.secret, {
    expiresIn: config.authorizer.expire,
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

// CREATE / UPDATE machine except its status
app.post("/api/machine", authorize, (req, res) => {
  const machine = req.body;
  const sql = `INSERT INTO machine (id, image, min_price, process_time_sec) VALUES (?, ?, ?, ?) 
  ON DUPLICATE KEY UPDATE image = VALUES(image), min_price = VALUES(min_price), process_time_sec = VALUES(process_time_sec);`;
  pool.query(
    sql,
    [machine.id, machine.image, machine.min_price, machine.process_time_sec],
    (error) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: `[CREATE][UPDATE] Create / update machine sucess` });
    }
  );
});

// UPDATE machine status (IDLE -> PROCESSING)
app.post("/api/machine/start", authorize, (req, res) => {
  const id = req.body.id;
  const sql = `UPDATE machine SET status = 'PROCESSING' WHERE id = ?;`;
  pool.query(sql, [id], (error) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({
      message: `[START] Update status of machine [${id}] to [PROCESSING]`,
    });
  });
});

// UPDATE machine status (PROCESSING -> IDLE)
app.post("/api/machine/stop", authorize, (req, res) => {
  const id = req.body.id;
  const sql = `UPDATE machine SET status = 'IDLE' WHERE id = ?;`;
  pool.query(sql, [id], (error) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({
      message: `[STOP] Update status of machine [${id}] to [IDLE]`,
    });
  });
});

// Delete machine
app.delete("/api/machine", authorize, (req, res) => {
  const id = req.body.id;
  const sql = `DELETE FROM machine WHERE id = ?;`;
  pool.query(sql, [id], (error) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({
      message: `[DELETE] Delete machine [${id}] success`,
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
