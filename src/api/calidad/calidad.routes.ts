import express from "express";
import * as controller from "./calidadController";

const router = express.Router();

router.get("/", controller.getCalidadReportesController);
router.get("/:id", controller.getCalidadReporteByIdController);
router.post("/", controller.createCalidadReporteController);
router.put("/:id", controller.updateCalidadReporteController);
router.delete("/:id", controller.deleteCalidadReporteController);

export default router;
