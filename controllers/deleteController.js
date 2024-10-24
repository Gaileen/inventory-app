const db = require("../db/queries");

async function deleteBook(req, res) {
    await db.deleteItem(req.params.id);
    res.redirect("/");
}

module.exports = {
    deleteBook
};