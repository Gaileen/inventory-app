const { Router } = require("express");
const invenController = require("../controllers/invenController");

const invenRouter = Router();
module.exports = invenRouter;

invenRouter.get("/", invenController.getInventory);