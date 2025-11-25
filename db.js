// db.js
require("dotenv").config();
const sql = require("mssql");

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // local dev thì để false
    trustServerCertificate: true, // tránh lỗi SSL
  },
};

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

poolConnect
  .then(() => console.log("✅ Connected to SQL Server"))
  .catch((err) => console.error("❌ SQL Connection Error:", err));

module.exports = { sql, pool, poolConnect };
