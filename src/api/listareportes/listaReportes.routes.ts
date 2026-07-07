import express from "express";
import * as listaReportesController from "./listaReportesController";

const router = express.Router();

router.get("/", listaReportesController.getReportesController);
router.post("/", listaReportesController.createReporteController);
router.get("/stats/:id", listaReportesController.getReporteStatsController);
router.put("/:id", listaReportesController.updateReporteController);
router.delete("/:id", listaReportesController.deleteReporteController);


export default router;
