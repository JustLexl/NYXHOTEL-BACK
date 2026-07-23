import express from "express";
import * as cuentasController from "./cuentasController";

const router = express.Router();

router.get("/", cuentasController.getCuentasController);
router.post("/", cuentasController.createCuentaController);
router.put("/:id", cuentasController.updateCuentaController);
router.delete("/:id", cuentasController.deleteCuentaController);

export default router;
