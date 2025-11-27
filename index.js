// index.js
const express = require("express");
const { sql, pool, poolConnect } = require("./db");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// ========== HUMAN ==========

app.get("/humans", async (req, res) => {
  try {
    await poolConnect;

    const result = await pool.request().query(`
      SELECT *
      FROM Human
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error("Error in GET /humans:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get Human based on ID
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
    const message =
      err.originalError?.info?.message ||
      err.originalError?.message ||
      err.message ||
      "Database error";
    res.status(500).json({ error: message });
  }
});

// UpdateHuman

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
    const message =
      err.originalError?.info?.message ||
      err.originalError?.message ||
      err.message ||
      "Database error";
    res.status(500).json({ error: message });
  }
});

// ========== EMPLOYEE ==========
app.get("/employees", async (req, res) => {
  try {
    await poolConnect;

    const result = await pool.request().query(`
  SELECT 
    H.Citizen_ID,       
    H.First_Name,
    H.Last_Name,
    H.Birth_Date,
    H.Email,
    H.Gender,
    E.Branch_ID,
    E.Salary,
    E.Supervisor_ID
  FROM Human H
  JOIN Employee E ON E.Citizen_ID = H.Citizen_ID
`);

    res.json(result.recordset);
  } catch (err) {
    console.error("Error in GET /employees:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//Get Employee based on ID
app.get("/employees/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await poolConnect;

    const result = await pool.request().input("Citizen_ID", sql.Int, id).query(`
        SELECT 
          Citizen_ID,
          Salary,
          Supervisor_ID,
          Branch_ID
        FROM Employee
        WHERE Citizen_ID = @Citizen_ID
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Error in GET /employees/:id:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST
app.post("/employees", async (req, res) => {
  const {
    Citizen_ID,
    FirstName,
    LastName,
    DateOfBirth,
    Email,
    Gender,
    Salary,
    Supervisor_ID,
    Branch_ID,
  } = req.body;
  try {
    await poolConnect;
    const request = pool.request();
    request.input("Citizen_ID", sql.Int, Citizen_ID);
    request.input("Last_Name", sql.VarChar(100), LastName);
    request.input("First_Name", sql.VarChar(100), FirstName);
    request.input("Birth_Date", sql.Date, DateOfBirth);
    request.input("Email", sql.VarChar(100), Email);
    request.input("Gender", sql.Char(1), Gender);
    request.input("Salary", sql.Decimal(10, 2), Salary);
    request.input("Supervisor_ID", sql.Int, Supervisor_ID || null);
    request.input("Branch_ID", sql.Int, Branch_ID);

    const result = await request.execute("InsertFullEmployee"); // create this procedure
    res.status(201).json({
      message: "Employee inserted successfully",
      data: result.recordset ?? null,
    });
  } catch (err) {
    console.error("Error in POST /employees:", err);
    const message =
      err.originalError?.info?.message ||
      err.originalError?.message ||
      err.message ||
      "Database error";
    res.status(500).json({ error: message });
  }
});

// PUT
app.put("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const {
    FirstName,
    LastName,
    DateOfBirth,
    Email,
    Gender,
    Salary,
    Supervisor_ID,
    Branch_ID,
  } = req.body;
  try {
    await poolConnect;
    const request = pool.request();
    request.input("Citizen_ID", sql.Int, parseInt(id));
    request.input("Last_Name", sql.VarChar(100), LastName ?? null);
    request.input("First_Name", sql.VarChar(100), FirstName ?? null);
    request.input("Birth_Date", sql.Date, DateOfBirth ?? null);
    request.input("Email", sql.VarChar(100), Email ?? null);
    request.input("Gender", sql.Char(1), Gender ?? null);
    request.input("Salary", sql.Decimal(10, 2), Salary ?? null);
    request.input("Supervisor_ID", sql.Int, Supervisor_ID ?? null);
    request.input("Branch_ID", sql.Int, Branch_ID ?? null);

    const result = await request.execute("UpdateFullEmployee"); // create this procedure
    res.json({
      message: "Employee updated successfully",
      data: result.recordset ?? null,
    });
  } catch (err) {
    console.error("Error in PUT /employees/:id:", err);
    const message =
      err.originalError?.info?.message ||
      err.originalError?.message ||
      err.message ||
      "Database error";
    res.status(500).json({ error: message });
  }
});

// ========== MANAGERS ==========

app.get("/managers", async (req, res) => {
  try {
    await poolConnect;

    const result = await pool.request().query(`
      SELECT 
        H.Citizen_ID,
        H.First_Name,
        H.Last_Name,
        H.Birth_Date,
        H.Email,
        H.Gender,
        E.Branch_ID,
        E.Salary,
        E.Supervisor_ID
      FROM Manager M
      JOIN Employee E ON M.Citizen_ID = E.Citizen_ID
      JOIN Human H ON H.Citizen_ID = M.Citizen_ID
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error("Error in GET /managers:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Insert Manager
app.post("/managers", async (req, res) => {
  const {
    Citizen_ID,
    FirstName,
    LastName,
    DateOfBirth,
    Email,
    Gender,
    Salary,
    Supervisor_ID,
    Branch_ID,
  } = req.body;

  try {
    await poolConnect;

    const request = pool.request();
    request.input("Citizen_ID", sql.Int, Citizen_ID);
    request.input("Last_Name", sql.VarChar(100), LastName);
    request.input("First_Name", sql.VarChar(100), FirstName);
    request.input("Birth_Date", sql.Date, DateOfBirth);
    request.input("Email", sql.VarChar(100), Email);
    request.input("Gender", sql.Char(1), Gender);
    request.input("Salary", sql.Decimal(10, 2), Salary);
    request.input("Supervisor_ID", sql.Int, Supervisor_ID || null);
    request.input("Branch_ID", sql.Int, Branch_ID);

    const result = await request.execute("InsertManager");

    res.status(201).json({
      message: "Manager inserted successfully",
      data: result.recordset ?? null,
    });
  } catch (err) {
    console.error("Error in POST /managers:", err);
    const message =
      err.originalError?.info?.message ||
      err.originalError?.message ||
      err.message ||
      "Database error";
    res.status(500).json({ error: message });
  }
});

// Update Manager
app.put("/managers/:id", async (req, res) => {
  const { id } = req.params;
  const {
    FirstName,
    LastName,
    DateOfBirth,
    Email,
    Gender,
    Salary,
    Supervisor_ID,
    Branch_ID,
  } = req.body;

  try {
    await poolConnect;

    const request = pool.request();
    request.input("Citizen_ID", sql.Int, parseInt(id));
    request.input("Last_Name", sql.VarChar(100), LastName ?? null);
    request.input("First_Name", sql.VarChar(100), FirstName ?? null);
    request.input("Birth_Date", sql.Date, DateOfBirth ?? null);
    request.input("Email", sql.VarChar(100), Email ?? null);
    request.input("Gender", sql.Char(1), Gender ?? null);
    request.input("Salary", sql.Decimal(10, 2), Salary ?? null);
    request.input("Supervisor_ID", sql.Int, Supervisor_ID ?? null);
    request.input("Branch_ID", sql.Int, Branch_ID ?? null);

    const result = await request.execute("UpdateManager");

    res.json({
      message: "Manager updated successfully",
      data: result.recordset ?? null,
    });
  } catch (err) {
    console.error("Error in PUT /managers/:id:", err);
    const message =
      err.originalError?.info?.message ||
      err.originalError?.message ||
      err.message ||
      "Database error";
    res.status(500).json({ error: message });
  }
});

// ========== RECEPTIONISTS ==========
app.get("/receptionists", async (req, res) => {
  try {
    await poolConnect;

    const result = await pool.request().query(`
      SELECT 
        H.Citizen_ID,
        H.First_Name,
        H.Last_Name,
        H.Birth_Date,
        H.Email,
        H.Gender,
        E.Branch_ID,
        E.Salary,
        E.Supervisor_ID
      FROM Receptionist R
      JOIN Employee E ON R.Citizen_ID = E.Citizen_ID
      JOIN Human H ON H.Citizen_ID = R.Citizen_ID
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error("Error in GET /api/receptionists:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST
app.post("/receptionists", async (req, res) => {
  const {
    Citizen_ID,
    FirstName,
    LastName,
    DateOfBirth,
    Email,
    Gender,
    Salary,
    Supervisor_ID,
    Branch_ID,
  } = req.body;
  try {
    await poolConnect;
    const request = pool.request();
    request.input("Citizen_ID", sql.Int, Citizen_ID);
    request.input("Last_Name", sql.VarChar(100), LastName);
    request.input("First_Name", sql.VarChar(100), FirstName);
    request.input("Birth_Date", sql.Date, DateOfBirth);
    request.input("Email", sql.VarChar(100), Email);
    request.input("Gender", sql.Char(1), Gender);
    request.input("Salary", sql.Decimal(10, 2), Salary);
    request.input("Supervisor_ID", sql.Int, Supervisor_ID || null);
    request.input("Branch_ID", sql.Int, Branch_ID);

    const result = await request.execute("InsertReceptionist"); // create this procedure
    res.status(201).json({
      message: "Receptionist inserted successfully",
      data: result.recordset ?? null,
    });
  } catch (err) {
    console.error("Error in POST /receptionists:", err);
    const message =
      err.originalError?.info?.message ||
      err.originalError?.message ||
      err.message ||
      "Database error";
    res.status(500).json({ error: message });
  }
});

// PUT
app.put("/receptionists/:id", async (req, res) => {
  const { id } = req.params;
  const {
    FirstName,
    LastName,
    DateOfBirth,
    Email,
    Gender,
    Salary,
    Supervisor_ID,
    Branch_ID,
  } = req.body;
  try {
    await poolConnect;
    const request = pool.request();
    request.input("Citizen_ID", sql.Int, parseInt(id));
    request.input("Last_Name", sql.VarChar(100), LastName ?? null);
    request.input("First_Name", sql.VarChar(100), FirstName ?? null);
    request.input("Birth_Date", sql.Date, DateOfBirth ?? null);
    request.input("Email", sql.VarChar(100), Email ?? null);
    request.input("Gender", sql.Char(1), Gender ?? null);
    request.input("Salary", sql.Decimal(10, 2), Salary ?? null);
    request.input("Supervisor_ID", sql.Int, Supervisor_ID ?? null);
    request.input("Branch_ID", sql.Int, Branch_ID ?? null);

    const result = await request.execute("UpdateReceptionist"); // create this procedure
    res.json({
      message: "Receptionist updated successfully",
      data: result.recordset ?? null,
    });
  } catch (err) {
    console.error("Error in PUT /receptionists/:id:", err);
    const message =
      err.originalError?.info?.message ||
      err.originalError?.message ||
      err.message ||
      "Database error";
    res.status(500).json({ error: message });
  }
});

// ========== SERVICE STAFF ==========
app.get("/service-staffs", async (req, res) => {
  try {
    await poolConnect;

    const result = await pool.request().query(`
      SELECT 
        H.Citizen_ID,
        H.First_Name,
        H.Last_Name,
        H.Birth_Date,
        H.Email,
        H.Gender,
        E.Branch_ID,
        E.Salary,
        E.Supervisor_ID
      FROM Service_Staff S
      JOIN Employee E ON S.Citizen_ID = E.Citizen_ID
      JOIN Human H ON H.Citizen_ID = S.Citizen_ID
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error("Error in GET /api/service-staff:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Insert Service Staff
app.post("/service-staffs", async (req, res) => {
  const {
    Citizen_ID,
    FirstName,
    LastName,
    DateOfBirth,
    Email,
    Gender,
    Salary,
    Supervisor_ID,
    Branch_ID,
  } = req.body;

  try {
    await poolConnect;

    const request = pool.request();
    request.input("Citizen_ID", sql.Int, Citizen_ID);
    request.input("Last_Name", sql.VarChar(100), LastName);
    request.input("First_Name", sql.VarChar(100), FirstName);
    request.input("Birth_Date", sql.Date, DateOfBirth);
    request.input("Email", sql.VarChar(100), Email);
    request.input("Gender", sql.Char(1), Gender);
    request.input("Salary", sql.Decimal(10, 2), Salary);
    request.input("Supervisor_ID", sql.Int, Supervisor_ID || null);
    request.input("Branch_ID", sql.Int, Branch_ID);

    const result = await request.execute("InsertServiceStaff");

    res.status(201).json({
      message: "Service Staff inserted successfully",
      data: result.recordset ?? null,
    });
  } catch (err) {
    console.error("Error in POST /service-staffs:", err);
    const message =
      err.originalError?.info?.message ||
      err.originalError?.message ||
      err.message ||
      "Database error";
    res.status(500).json({ error: message });
  }
});

// Update Service Staff
app.put("/service-staffs/:id", async (req, res) => {
  const { id } = req.params;
  const {
    FirstName,
    LastName,
    DateOfBirth,
    Email,
    Gender,
    Salary,
    Supervisor_ID,
    Branch_ID,
  } = req.body;

  try {
    await poolConnect;

    const request = pool.request();
    request.input("Citizen_ID", sql.Int, parseInt(id));
    request.input("Last_Name", sql.VarChar(100), LastName ?? null);
    request.input("First_Name", sql.VarChar(100), FirstName ?? null);
    request.input("Birth_Date", sql.Date, DateOfBirth ?? null);
    request.input("Email", sql.VarChar(100), Email ?? null);
    request.input("Gender", sql.Char(1), Gender ?? null);
    request.input("Salary", sql.Decimal(10, 2), Salary ?? null);
    request.input("Supervisor_ID", sql.Int, Supervisor_ID ?? null);
    request.input("Branch_ID", sql.Int, Branch_ID ?? null);

    const result = await request.execute("UpdateServiceStaff");

    res.json({
      message: "Service Staff updated successfully",
      data: result.recordset ?? null,
    });
  } catch (err) {
    console.error("Error in PUT /service-staffs/:id:", err);
    const message =
      err.originalError?.info?.message ||
      err.originalError?.message ||
      err.message ||
      "Database error";
    res.status(500).json({ error: message });
  }
});

///////////////////////////////////
////////////PROCEDURE/////////////

app.get("/api/service-staff-performance", async (req, res) => {
  const { branchId, fromDate, endDate, minKpi } = req.query;

  // Validate cơ bản
  if (!branchId || !fromDate || !endDate) {
    return res.status(400).json({
      error: "Vui lòng nhập đầy đủ Branch ID, FromDate và EndDate",
    });
  }

  try {
    await poolConnect;

    const request = pool
      .request()
      .input("BranchID", sql.Int, Number(branchId))
      .input("FromDate", sql.Date, fromDate)
      .input("EndDate", sql.Date, endDate)
      .input("MinKPI", sql.Decimal(10, 2), minKpi ? Number(minKpi) : 0);

    const result = await request.execute("Service_Staff_Performance");

    res.json(result.recordset);
  } catch (err) {
    console.error("Error in GET /api/service-staff-performance:", err);
    res
      .status(500)
      .json({ error: "Lỗi hệ thống khi lấy dữ liệu performance." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
