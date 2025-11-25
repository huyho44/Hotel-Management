// index.js
const express = require("express");
const { sql, pool, poolConnect } = require("./db");

const app = express();
app.use(express.json());

// Route test server
app.get("/", (req, res) => {
  res.send("Hotel API is running ✅");
});

// ========== HUMAN ==========

// Lấy toàn bộ Human
app.get("/humans", async (req, res) => {
  try {
    await poolConnect;

    const result = await pool.request().query(`
      SELECT *
      FROM Human
    `); // ⚠ nếu bảng không tên Human thì sửa lại

    res.json(result.recordset);
  } catch (err) {
    console.error("Error in GET /humans:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Lấy 1 Human theo HumanID
app.get("/humans/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await poolConnect;

    const result = await pool.request().input("Citizen_ID", sql.Int, id).query(`
        SELECT *
        FROM Human
        WHERE Citizen_ID = @Citizen_ID
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Human not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Error in GET /humans/:id:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// InsertHuman
app.use(express.static("public"));
app.post("/humans", async (req, res) => {
  const { Citizen_ID, LastName, FirstName, DateOfBirth, Email, Gender } =
    req.body;

  try {
    await poolConnect;

    const request = pool.request();
    request.input("Citizen_ID", sql.Int, Citizen_ID);
    request.input("Last_Name", sql.VarChar(100), LastName);
    request.input("First_Name", sql.VarChar(100), FirstName);
    request.input("Birth_Date", sql.Date, DateOfBirth);
    request.input("Email", sql.VarChar(100), Email);
    request.input("Gender", sql.Char(1), Gender);

    const result = await request.execute("InsertHuman");

    res.status(201).json({
      message: "Human inserted successfully",
      data: result.recordset ?? null,
    });
  } catch (err) {
    console.error("Error in POST /humans:", err);
    res.status(500).json({ error: err.message });
  }
});

// UpdateHuman
app.use(express.static("public"));
app.put("/humans/:id", async (req, res) => {
  const { id } = req.params;
  const { FirstName, LastName, DateOfBirth, Gender, Email } = req.body;

  try {
    await poolConnect;

    const request = pool.request();
    request.input("Citizen_ID", sql.Int, parseInt(id));
    request.input("Last_Name", sql.VarChar(100), LastName ?? null);
    request.input("First_Name", sql.VarChar(100), FirstName ?? null);
    request.input("Birth_Date", sql.Date, DateOfBirth ?? null);
    request.input("Email", sql.VarChar(100), Email ?? null);
    request.input("Gender", sql.Char(1), Gender ?? null);

    const result = await request.execute("UpdateHuman");

    res.json({
      message: "Human updated via procedure",
      data: result.recordset ?? null,
    });
  } catch (err) {
    console.error("Error in PUT /humans/:id:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
