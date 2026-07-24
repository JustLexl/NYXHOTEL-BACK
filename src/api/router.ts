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
import lostAndFoundRoutes from "./lostandfound/lostAndFound.routes";
import registroProveedoresRoutes from "./registro-proveedores/registroProveedores.routes";
import calidadRoutes from "./calidad/calidad.routes";
import cuentasRoutes from "./cuentas/cuentas.routes";
import distintivoHRoutes from "./distintivoh/distintivoH.routes";
import inventarioRoutes from "./inventario/inventario.routes";


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

router.use("/lost-and-found", lostAndFoundRoutes);
router.use("/LostAndFound", lostAndFoundRoutes);

router.use("/registro-proveedores", registroProveedoresRoutes);
router.use("/RegistroProveedores", registroProveedoresRoutes);

router.use("/calidad", calidadRoutes);
router.use("/Calidad", calidadRoutes);

router.use("/cuentas", cuentasRoutes);
router.use("/Cuentas", cuentasRoutes);
router.use("/gestion-cuentas", cuentasRoutes);
router.use("/GestionCuentas", cuentasRoutes);

router.use("/distintivo-h", distintivoHRoutes);
router.use("/DistintivoH", distintivoHRoutes);

router.use("/inventario", inventarioRoutes);
router.use("/Inventario", inventarioRoutes);
router.use("/InventarioNyx", inventarioRoutes);


router.get("/ping", (req, res) => {
  res.status(200).send("ok");
});

export { router };