const express = require("express");
const ingredienteController = require("../Controllers/ingredienteController");

const ingredienteRouter = express.Router();

ingredienteRouter.get("/", ingredienteController.readIngredientes);
ingredienteRouter.get("/:id", ingredienteController.readIngredienteById);
ingredienteRouter.post("/", ingredienteController.createIngrediente);
ingredienteRouter.patch("/:id", ingredienteController.updateIngrediente);
ingredienteRouter.delete("/:id", ingredienteController.deleteIngrediente);

module.exports = ingredienteRouter;
