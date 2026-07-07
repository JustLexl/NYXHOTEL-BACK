import express from "express";
import * as listaProyectosController from "./listaProyectosController";

const router = express.Router();

router.get("/", listaProyectosController.getProyectosController);
router.post("/", listaProyectosController.createProyectoController);
router.put("/:id", listaProyectosController.updateProyectoController);
router.delete("/:id", listaProyectosController.deleteProyectoController);

export default router;
