// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user:"postgres",
  host:"localhost",
  database:"restaurants",
  password:"0Avinash1@",
  port:5432
});

module.exports = pool;
