const { sql, pool, poolConnect } = require("../config/db");

exports.getAllBranches = async (req, res) => {
  try {
    await poolConnect;
    const result = await pool.request().query(`
      SELECT * FROM Branch
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("Error in GET /branches:", err);
    res.status(500).json({ error: "Database error" });
  }
};
