import express from "express";
import * as listaHostingController from "./listaHostingController";

const router = express.Router();

router.get("/", listaHostingController.getHostingController);
router.post("/", listaHostingController.createHostingController);
router.put("/:id", listaHostingController.updateHostingController);
router.delete("/:id", listaHostingController.deleteHostingController);

export default router;
