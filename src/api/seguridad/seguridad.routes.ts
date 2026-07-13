import express from "express";
import * as controller from "./seguridadController";

const router = express.Router();

// --- Alcoholimetro ---
router.get("/alcoholimetro", controller.getAlcoholimetrosController);
router.post("/alcoholimetro", controller.createAlcoholimetroController);
router.put("/alcoholimetro/:id", controller.updateAlcoholimetroController);
router.delete("/alcoholimetro/:id", controller.deleteAlcoholimetroController);

// --- Accidente ---
router.get("/accidente", controller.getAccidentesController);
router.post("/accidente", controller.createAccidenteController);
router.put("/accidente/:id", controller.updateAccidenteController);
router.delete("/accidente/:id", controller.deleteAccidenteController);

// --- Accidente Colaborador ---
router.get("/accidente-colaborador", controller.getAccidenteColaboradoresController);
router.post("/accidente-colaborador", controller.createAccidenteColaboradorController);
router.put("/accidente-colaborador/:id", controller.updateAccidenteColaboradorController);
router.delete("/accidente-colaborador/:id", controller.deleteAccidenteColaboradorController);

// --- Extravio ---
router.get("/extravio", controller.getExtraviosController);
router.post("/extravio", controller.createExtravioController);
router.put("/extravio/:id", controller.updateExtravioController);
router.delete("/extravio/:id", controller.deleteExtravioController);

export default router;
