// index.js
const express = require("express");
const { pool, poolConnect } = require("./db");

const app = express();
app.use(express.json());

// Route test server
app.get("/", (req, res) => {
  res.send("Hotel API is running ✅");
});

// Route test DB: lấy 5 dòng đầu của bảng Room
app.get("/test-db", async (req, res) => {
  try {
    await poolConnect; // chờ kết nối thành công

    // ⚠️ Sửa tên bảng nếu không phải 'Room'
    const result = await pool.request().query("SELECT TOP 5 * FROM Room");

    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Query error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
