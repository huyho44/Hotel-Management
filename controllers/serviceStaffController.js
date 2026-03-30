const { sql, pool, poolConnect } = require("../config/db");

exports.getAllServiceStaffs = async (req, res) => {
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
};

exports.createServiceStaff = async (req, res) => {
  const { Citizen_ID, FirstName, LastName, DateOfBirth, Email, Gender, Salary, Supervisor_ID, Branch_ID } = req.body;
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
    const message = err.originalError?.info?.message || err.originalError?.message || err.message || "Database error";
    res.status(500).json({ error: message });
  }
};

exports.updateServiceStaff = async (req, res) => {
  const { id } = req.params;
  const { FirstName, LastName, DateOfBirth, Email, Gender, Salary, Supervisor_ID, Branch_ID } = req.body;
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
    const message = err.originalError?.info?.message || err.originalError?.message || err.message || "Database error";
    res.status(500).json({ error: message });
  }
};

exports.deleteServiceStaff = async (req, res) => {
  const { id } = req.params;
  try {
    await poolConnect;
    const request = pool.request();
    request.input("Citizen_ID", sql.Int, parseInt(id));

    const result = await request.execute("DeleteServiceStaff");
    res.json({
      message: "Service Staff deleted successfully",
      data: result.recordset ?? null,
    });
  } catch (err) {
    console.error("Error in DELETE /service-staffs/:id:", err);
    const sqlMessage = err.originalError?.info?.message || err.originalError?.message || err.message || "Database error";
    return res.status(400).json({ error: sqlMessage });
  }
};
