import express from "express";
import * as controller from "./registroProveedoresController";

const router = express.Router();

router.get("/", controller.getRegistroProveedoresController);
router.post("/", controller.createRegistroProveedorController);
router.put("/:id", controller.updateRegistroProveedorController);
router.put("/:id/salida", controller.registrarSalidaProveedorController);
router.delete("/:id", controller.deleteRegistroProveedorController);

export default router;
