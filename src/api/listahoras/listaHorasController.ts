import express, { NextFunction } from "express";
import * as service from "./listaHorasService";
import { HttpStatusCode } from "../../shared/models/http.model";

export async function getHorasController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.getHoras();
    res.status(HttpStatusCode.OK).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}

export async function createHoraController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.createHora(req.body);
    res.status(HttpStatusCode.CREATED).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}

export async function updateHoraController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const serviceResponse = await service.updateHora(id, req.body);
    res.status(HttpStatusCode.OK).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}

export async function deleteHoraController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    await service.deleteHora(id);
    res.status(HttpStatusCode.OK).send({ message: "Registro de horas eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}
