import express from "express";
import * as clientesController from "./clientesController";

const router = express.Router();

router.get("/", clientesController.getClientesController);
router.post("/", clientesController.createClienteController);
router.put("/:id", clientesController.updateClienteController);
router.delete("/:id", clientesController.deleteClienteController);

export default router;
