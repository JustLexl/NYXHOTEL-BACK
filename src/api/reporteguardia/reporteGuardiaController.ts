import express, { NextFunction } from "express";
import * as model from "./reporteGuardiaModel";
import { HttpStatusCode } from "../../shared/models/http.model";

export async function getReportesController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const response = await model.getAllReportesMongo();
    res.status(HttpStatusCode.OK).send(response);
  } catch (error) {
    next(error);
  }
}

export async function getReporteByIdController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const response = await model.getReporteByIdMongo(id);
    if (!response) {
      res.status(HttpStatusCode.NOT_FOUND).send({ message: "Reporte no encontrado" });
      return;
    }
    res.status(HttpStatusCode.OK).send(response);
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
    const body = req.body;
    body.createdAt = new Date();
    body.isDeleted = false;
    const result = await model.createReporteMongo(body) as any;
    const createdReport = { ...body, _id: result.insertedId.toString() };
    res.status(HttpStatusCode.CREATED).send(createdReport);
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
    const body = req.body;
    body.updatedAt = new Date();
    await model.updateReporteMongo(id, body);
    res.status(HttpStatusCode.OK).send({ message: "Reporte actualizado correctamente" });
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
    await model.deleteReporteMongo(id);
    res.status(HttpStatusCode.OK).send({ message: "Reporte eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}
