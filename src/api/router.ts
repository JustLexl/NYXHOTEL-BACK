import express from "express";
import customersRoutes from "./usuario/usuario.routes";
import clientesRoutes from "./clientes/clientes.routes";
import mktRoutes from "./mkt/mkt.routes";
import cicdRoutes from "./cicd/cicd.routes";
import listaProyectosRoutes from "./listaproyectos/listaProyectos.routes";
import listaHorasRoutes from "./listahoras/listaHoras.routes";
import listaReportesRoutes from "./listareportes/listaReportes.routes";
import listaHostingRoutes from "./listahosting/listaHosting.routes";
import registrosFaltantesRoutes from "./registrosfaltantes/registroFaltante.routes";
import reporteGuardiaRoutes from "./reporteguardia/reporteGuardia.routes";
import seguridadRoutes from "./seguridad/seguridad.routes";
import controlLlavesRoutes from "./controlllaves/controlLlaves.routes";

const router = express.Router();

router.use("/customers", customersRoutes);
router.use("/usuarios", customersRoutes);
router.use("/usuario", customersRoutes);
router.use("/users", customersRoutes);
router.use("/user", customersRoutes);

router.use("/clientes", clientesRoutes);
router.use("/cliente", clientesRoutes);

router.use("/mkt", mktRoutes);
router.use("/MKT", mktRoutes);
router.use("/mkts", mktRoutes);
router.use("/MKTS", mktRoutes);

router.use("/cicd", cicdRoutes);
router.use("/cicds", cicdRoutes);
router.use("/CI-CD", cicdRoutes);
router.use("/CICD", cicdRoutes);

router.use("/listaproyectos", listaProyectosRoutes);
router.use("/listaproyecto", listaProyectosRoutes);
router.use("/ListaProyectos", listaProyectosRoutes);
router.use("/ListaProyecto", listaProyectosRoutes);

router.use("/listahoras", listaHorasRoutes);
router.use("/listahora", listaHorasRoutes);
router.use("/ListaHoras", listaHorasRoutes);
router.use("/ListaHora", listaHorasRoutes);

router.use("/listareportes", listaReportesRoutes);
router.use("/listareporte", listaReportesRoutes);
router.use("/ListaReportes", listaReportesRoutes);
router.use("/ListaReporte", listaReportesRoutes);

router.use("/reporte-guardia", reporteGuardiaRoutes);
router.use("/reportes-guardia", reporteGuardiaRoutes);
router.use("/ReporteGuardia", reporteGuardiaRoutes);

router.use("/listahosting", listaHostingRoutes);
router.use("/listahostings", listaHostingRoutes);
router.use("/ListaHosting", listaHostingRoutes);
router.use("/ListaHostings", listaHostingRoutes);
router.use("/hosting", listaHostingRoutes);
router.use("/hostings", listaHostingRoutes);
router.use("/Hosting", listaHostingRoutes);
router.use("/Hostings", listaHostingRoutes);

router.use("/registrosfaltantes", registrosFaltantesRoutes);
router.use("/registros-faltantes", registrosFaltantesRoutes);
router.use("/RegistrosFaltantes", registrosFaltantesRoutes);

router.use("/seguridad", seguridadRoutes);
router.use("/Seguridad", seguridadRoutes);

router.use("/control-llaves", controlLlavesRoutes);
router.use("/ControlLlaves", controlLlavesRoutes);

router.get("/ping", (req, res) => {
  res.status(200).send("ok");
});

export { router };