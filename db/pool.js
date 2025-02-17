const { Pool } = require("pg");


module.exports = new Pool({
  host: process.env.HOST, 
  user: process.env.USERNAME,
  database: process.env.DATABASE,
  password: process.env.PP,
  port: process.env.DBPORT 
});

