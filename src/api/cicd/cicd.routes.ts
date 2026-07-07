import express from "express";
import * as cicdController from "./cicdController";

const router = express.Router();

router.get("/", cicdController.getCicdController);
router.post("/", cicdController.createCicdController);
router.put("/:id", cicdController.updateCicdController);
router.delete("/:id", cicdController.deleteCicdController);

export default router;
