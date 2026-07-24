import express, { NextFunction } from "express";
import * as service from "./inventarioService";
import { HttpStatusCode } from "../../shared/models/http.model";

export async function getInventarioController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.getInventario();
    res.status(HttpStatusCode.OK).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}

export async function createInventarioController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.createInventario(req.body);
    res.status(HttpStatusCode.CREATED).json({
      success: true,
      data: serviceResponse
    });
  } catch (error) {
    next(error);
  }
}

export async function updateInventarioController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const serviceResponse = await service.updateInventario(id, req.body);
    res.json({
      success: true,
      data: serviceResponse
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteInventarioController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    await service.deleteInventario(id);
    res.status(HttpStatusCode.OK).send({ message: "Equipo eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}
