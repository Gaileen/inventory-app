const db = require("../db/queries");

async function getInventory(req, res) {
    if (req.query.search) {
        const results = await db.searchInventory(req.query.search);
        res.render("index", { books: results });
    } else {
        const books = await db.getAllInventory();
        res.render("index", { books: books });
    }
}

module.exports = {
    getInventory
};