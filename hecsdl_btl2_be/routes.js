const express = require("express");
const router = express.Router();
const db = require("./db_connection");

// Example route
router.get("/", (req, res) => {
  res.send(`Welcome to the API!`);
});

// Another route
router.post("/example", (req, res) => {
  const { data } = req.body;
  res.send({ message: "Data received", data });
});


router.post("/signup", async (req, res) => {
  const {
    UserID,
    UserName,
    Password,
    Email,
    PhoneNumber,
    LastName,
    FirstName,
  } = req.body;
  try {
    const [result] = await db.execute("CALL insert_user(?, ?, ?, ?, ?, ?, ?)", [
      UserID,
      UserName,
      Password,
      Email,
      PhoneNumber,
      LastName,
      FirstName,
    ]);
    if (result) {
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    if (error.code === "ER_SIGNAL_EXCEPTION") {
      return res.status(400).json({ error: error.sqlMessage });
    }
    return res.status(500).json({ error: "Database error", details: error });
  }
});


router.post
module.exports = router;
