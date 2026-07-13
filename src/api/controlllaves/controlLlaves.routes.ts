import express from "express";
import * as controller from "./controlLlavesController";

const router = express.Router();

router.get("/", controller.getControlLlavesController);
router.post("/", controller.createControlLlavesController);
router.put("/:id", controller.updateControlLlavesController);
router.delete("/:id", controller.deleteControlLlavesController);

export default router;
