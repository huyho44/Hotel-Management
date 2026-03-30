const { sql, pool, poolConnect } = require("../config/db");

exports.getServiceStaffPerformance = async (req, res) => {
  const { branchId, fromDate, endDate, minKpi } = req.query;

  if (!branchId || !fromDate || !endDate) {
    return res.status(400).json({
      error: "Please Fill in BranchID, FromDate, and EndDate",
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
      .json({ error: "Error: System cannot get data from performance." });
  }
};

exports.getCustomerSpending = async (req, res) => {
  const customerId = parseInt(req.query.customerId, 10);
  const fromDate = req.query.fromDate || null;
  const toDate = req.query.toDate || null;

  if (Number.isNaN(customerId)) {
    return res
      .status(400)
      .json({ error: "customerId must be a valid integer" });
  }

  if (
    (fromDate && Number.isNaN(Date.parse(fromDate))) ||
    (toDate && Number.isNaN(Date.parse(toDate)))
  ) {
    return res.status(400).json({ error: "Invalid date format" });
  }

  try {
    await poolConnect;
    const result = await pool
      .request()
      .input("CustomerID", sql.Int, customerId)
      .input("FromDate", sql.Date, fromDate ? new Date(fromDate) : null)
      .input("ToDate", sql.Date, toDate ? new Date(toDate) : null).query(`
        SELECT *
        FROM dbo.fnCustomerTotalSpending(@CustomerID, @FromDate, @ToDate)
      `);

    if (!result.recordset.length) {
      return res.json({
        Customer_ID: customerId,
        FromDate: fromDate,
        ToDate: toDate,
        TotalRoomCharge: 0,
        TotalServiceCharge: 0,
        TotalSpending: 0,
      });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Error in GET /reports/customer-spending:", err);
    const message = err.originalError?.info?.message || err.originalError?.message || err.message || "Database error";
    res.status(500).json({ error: message });
  }
};

exports.getBranchRevenue = async (req, res) => {
  const branchId = parseInt(req.query.branchId, 10);
  const startDate = req.query.startDate || null;
  const endDate = req.query.endDate || null;

  if (Number.isNaN(branchId)) {
    return res.status(400).json({ error: "branchId must be a valid integer" });
  }

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "startDate and endDate are required" });
  }

  if (
    Number.isNaN(Date.parse(startDate)) ||
    Number.isNaN(Date.parse(endDate))
  ) {
    return res.status(400).json({ error: "Invalid date format" });
  }

  try {
    await poolConnect;

    const result = await pool
      .request()
      .input("BranchID", sql.Int, branchId)
      .input("StartDate", sql.Date, new Date(startDate))
      .input("EndDate", sql.Date, new Date(endDate)).query(`
        SELECT *
        FROM dbo.fnBranchRevenue(@BranchID, @StartDate, @EndDate)
      `);

    if (!result.recordset.length) {
      return res.json({
        Branch_ID: branchId,
        StartDate: startDate,
        EndDate: endDate,
        TotalRoomRevenue: 0,
        TotalServiceRevenue: 0,
        TotalRevenue: 0,
      });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Error in GET /reports/branch-revenue:", err);
    const message = err.originalError?.info?.message || err.originalError?.message || err.message || "Database error";
    res.status(500).json({ error: message });
  }
};
