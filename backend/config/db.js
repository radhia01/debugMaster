const { Pool } = require("pg");
const pool = new Pool({
  host: process.env.HOST || "berry.db.elephantsql.com",
  user: process.env.USER || "lrjnfwrf",
  database: process.env.DB_NAME || "lrjnfwrf",
  password: process.env.DB_PASSWORD || "SGPAROm398aZ2J8yRFaVEUJcHbO5r9qE",
  port: process.env.DB_PORT || "5432",
});
module.exports = pool;
