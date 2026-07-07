import express from "express";
import * as usuariosController from "./usuarioController";

const router = express.Router();

router.get("/", usuariosController.getUsuariosController);
router.get("/firebase/:uid", usuariosController.getUsuarioByFirebaseUidController);
router.post("/", usuariosController.createUsuariosController);
router.put("/:id", usuariosController.updateUsuariosController);
router.delete("/:id", usuariosController.deleteUsuariosController);

export default router;
