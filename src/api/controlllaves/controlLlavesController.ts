import express, { NextFunction } from "express";
import * as service from "./controlLlavesService";
import { HttpStatusCode } from "../../shared/models/http.model";

export async function getControlLlavesController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const list = await service.getControlLlaves();
    res.status(HttpStatusCode.OK).send(list);
  } catch (error) {
    next(error);
  }
}

export async function createControlLlavesController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const response = await service.createControlLlaves(req.body);
    res.status(HttpStatusCode.CREATED).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export async function updateControlLlavesController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const response = await service.updateControlLlaves(id, req.body);
    res.status(HttpStatusCode.OK).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteControlLlavesController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const id = req.params.id;
    await service.deleteControlLlaves(id);
    res.status(HttpStatusCode.OK).send({ message: "Registro de control de llaves eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}
