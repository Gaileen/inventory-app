const { Router } = require("express");
const invenController = require("../controllers/invenController");
const formController = require("../controllers/formController");
const deleteController = require("../controllers/deleteController");

const invenRouter = Router();
module.exports = invenRouter;

invenRouter.get("/", invenController.getInventory);

invenRouter.get("/add", formController.getAddForm);
invenRouter.post("/add", [formController.validateUser, formController.addInventory]);

invenRouter.get("/:id/update", formController.getUpdateForm);
invenRouter.post("/:id/update", [formController.validateUser, formController.updateInventory]);
invenRouter.post("/:id/delete", deleteController.deleteBook);