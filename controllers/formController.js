const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const lengthErr = "must contain at least 1 character";
const alphaErr = "must only contain letters.";
const caseErr = "must have all lowercase letters.";
const qtyErr = "must be 0 or greater.";

// is passed to every post form route handler.
const validateUser = [
    body("title").trim()
        .isLength({ min: 1 }).withMessage(`Title ${lengthErr}`),
    body("author").trim()
        .isLength({ min: 1 }).withMessage(`Author ${lengthErr}`),
    body("genre").trim()
        .isAlpha().withMessage(`Genre ${alphaErr}`)
        .isLowercase().withMessage(`Genre ${caseErr}`)
        .isLength({ min: 1 }).withMessage(`Genre ${lengthErr}`),
    body("quantity").trim()
        .isInt({ min: 0 }).withMessage(`Quantity ${qtyErr}`)
];

async function getAddForm(req, res) {
    res.render("add");
}

async function addInventory(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("add", {
        errors: errors.array(),
      });
    }
    const { title, author, genre, quantity } = req.body;
    const int_quantity = parseInt(quantity);
    await db.insertInventory(title, author, genre, int_quantity);
    res.redirect("/");
}

async function getUpdateForm(req, res) {
    const book = await db.getItem(req.params.id);
    res.render("update", { book: book });
}

async function updateInventory(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const book = await db.getItem(req.params.id);
        return res.status(400).render("update", {
            book: book,
            errors: errors.array(),
        });
    }
    const { id } = req.params;
    const { title, author, genre, quantity } = req.body;
    const int_quantity = parseInt(quantity);
    await db.updateInventory(id, title, author, genre, int_quantity);
    res.redirect("/");
}

module.exports = {
    validateUser,
    getAddForm,
    addInventory,
    getUpdateForm,
    updateInventory
};