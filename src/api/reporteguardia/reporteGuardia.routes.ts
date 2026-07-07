import express from "express";
import * as controller from "./reporteGuardiaController";

const router = express.Router();

router.get("/", controller.getReportesController);
router.get("/:id", controller.getReporteByIdController);
router.post("/", controller.createReporteController);
router.put("/:id", controller.updateReporteController);
router.delete("/:id", controller.deleteReporteController);

export default router;
