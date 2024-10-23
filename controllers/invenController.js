const db = require("../db/queries");

async function getInventory(req, res) {
    const inven = await db.getAllInventory();
    console.log(inven);
    res.send(inven);
}

module.exports = {
    getInventory
};