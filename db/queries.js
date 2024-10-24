const pool = require("./pool");

async function getAllInventory() {
    // destructuring must use "rows" exactly.
    const { rows } = await pool.query("SELECT * FROM books ORDER BY id");
    return rows;
}

async function getItem(bookid) {
    const { rows } = await pool.query("SELECT * FROM books WHERE id = $1",
        [bookid]);
    return rows[0]; // should only be 1 result given id.
}

async function searchInventory(s) {
    const qsearch = "%" + s + "%";
    const { rows } = await pool.
        query("SELECT title, author, genre FROM books WHERE title LIKE $1 OR author LIKE $1 OR genre LIKE $1", 
            [qsearch]);
    return rows;
}

async function insertInventory(title, author, genre, quantity) {
    await pool.query("INSERT INTO books (title, author, genre, quantity) VALUES ($1, $2, $3, $4)",
        [title, author, genre, quantity]);
}

async function updateInventory(bookid, title, author, genre, quantity) {
    await pool.query("UPDATE books SET title = $2, author = $3, genre = $4, quantity = $5 WHERE id = $1",
        [bookid, title, author, genre, quantity]);
}

async function filterInventory(filters) {
    return;
}

async function deleteItem(bookid) {
    await pool.query("DELETE FROM books WHERE id = $1", [bookid]);
}

module.exports = {
    getAllInventory,
    getItem,
    searchInventory,
    insertInventory,
    updateInventory,
    filterInventory,
    deleteItem
};