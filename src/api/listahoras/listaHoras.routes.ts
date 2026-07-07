import express from "express";
import * as listaHorasController from "./listaHorasController";

const router = express.Router();

router.get("/", listaHorasController.getHorasController);
router.post("/", listaHorasController.createHoraController);
router.put("/:id", listaHorasController.updateHoraController);
router.delete("/:id", listaHorasController.deleteHoraController);

export default router;
