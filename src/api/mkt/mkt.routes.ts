import express from "express";
import * as mktController from "./mktController";

const router = express.Router();

router.get("/", mktController.getMktController);
router.post("/", mktController.createMktController);
router.put("/:id", mktController.updateMktController);
router.delete("/:id", mktController.deleteMktController);

export default router;
