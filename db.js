// db.js
require("dotenv").config();
const sql = require("mssql");

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // 127.0.0.1
  database: process.env.DB_NAME, // "Hotel Management"
  port: parseInt(process.env.DB_PORT, 10), // 1433
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

console.log("USING CONFIG:", dbConfig);

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

poolConnect
  .then(() => console.log("✅ Connected to SQL Server"))
  .catch((err) => console.error("❌ SQL Connection Error:", err));

module.exports = { sql, pool, poolConnect };
