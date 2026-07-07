import { Router } from "express";
import * as controller from "./registroFaltanteController";

const router = Router();

router.get("/", controller.getAllRegistrosFaltantes);
router.post("/", controller.createRegistroFaltante);
router.delete("/:id", controller.deleteRegistroFaltante);

export default router;
