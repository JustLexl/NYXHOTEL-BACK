import express from "express";
import * as controller from "./lostAndFoundController";

const router = express.Router();

router.get("/", controller.getLostAndFoundController);
router.post("/", controller.createLostAndFoundController);
router.put("/:id", controller.updateLostAndFoundController);
router.delete("/:id", controller.deleteLostAndFoundController);

export default router;
