import express, { NextFunction } from "express";
import * as service from "./calidadService";
import { HttpStatusCode } from "../../shared/models/http.model";

export async function getCalidadReportesController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const list = await service.getCalidadReportes();
    res.status(HttpStatusCode.OK).send(list);
  } catch (error) {
    next(error);
  }
}

export async function getCalidadReporteByIdController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const report = await service.getCalidadReporteById(id);
    if (!report) {
      res.status(HttpStatusCode.NOT_FOUND).json({ success: false, message: "Reporte no encontrado" });
      return;
    }
    res.status(HttpStatusCode.OK).send(report);
  } catch (error) {
    next(error);
  }
}

export async function createCalidadReporteController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const response = await service.createCalidadReporte(req.body);
    res.status(HttpStatusCode.CREATED).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
}

export async function updateCalidadReporteController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const response = await service.updateCalidadReporte(id, req.body);
    res.status(HttpStatusCode.OK).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
}

export async function deleteCalidadReporteController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    await service.deleteCalidadReporte(id);
    res.status(HttpStatusCode.OK).send({ message: "Reporte de calidad eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}
