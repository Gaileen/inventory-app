const pool = require("./pool");

async function getAllInventory() {
    const { rows } = await pool.query("SELECT * FROM books");
    return rows;
}

module.exports = {
    getAllInventory
};