import express, { NextFunction } from "express";
import * as service from "./listaHostingService";
import { HttpStatusCode } from "../../shared/models/http.model";

export async function getHostingController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.getHostings();
    res.status(HttpStatusCode.OK).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}

export async function createHostingController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.createHosting(req.body);
    res.status(HttpStatusCode.CREATED).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}

export async function updateHostingController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const serviceResponse = await service.updateHosting(id, req.body);
    res.status(HttpStatusCode.OK).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}

export async function deleteHostingController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    await service.deleteHosting(id);
    res.status(HttpStatusCode.OK).send({ message: "Hosting eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}
