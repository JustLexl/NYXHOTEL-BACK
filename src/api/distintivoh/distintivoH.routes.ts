import express from "express";
import * as controller from "./distintivoHController";

const router = express.Router();

router.get("/", controller.getAllDistintivoHController);
router.post("/", controller.createDistintivoHController);
router.put("/:id", controller.updateDistintivoHController);
router.delete("/:id", controller.deleteDistintivoHController);

export default router;
