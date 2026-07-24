import express from "express";
import * as inventarioController from "./inventarioController";

const router = express.Router();

router.get("/", inventarioController.getInventarioController);
router.post("/", inventarioController.createInventarioController);
router.put("/:id", inventarioController.updateInventarioController);
router.delete("/:id", inventarioController.deleteInventarioController);

export default router;
