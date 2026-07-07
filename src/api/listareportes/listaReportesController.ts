import express, { NextFunction } from "express";
import * as service from "./listaReportesService";
import { HttpStatusCode } from "../../shared/models/http.model";

export async function getReportesController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.getReportes();
    res.status(HttpStatusCode.OK).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}

export async function createReporteController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {

  try {
    const serviceResponse = await service.createReporte(req.body);
    res.status(HttpStatusCode.CREATED).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}

export async function updateReporteController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const serviceResponse = await service.updateReporte(id, req.body);
    res.status(HttpStatusCode.OK).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}

export async function deleteReporteController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    await service.deleteReporte(id);
    res.status(HttpStatusCode.OK).send({ message: "Reporte eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}

export async function getReporteStatsController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const serviceResponse = await service.getReporteStats(id);
    res.status(HttpStatusCode.OK).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}
