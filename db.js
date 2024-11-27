require("dotenv").config();
const { Client } = require("pg");
const conn = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT || 5432,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

conn
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) =>
    console.error("An error while connecting with the database", err.stack)
  );

module.exports = conn;
