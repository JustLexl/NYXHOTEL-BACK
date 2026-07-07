import express, { NextFunction } from "express";
import * as service from "./listaProyectosService";
import { HttpStatusCode } from "../../shared/models/http.model";

export async function getProyectosController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.getProyectos();
    res.status(HttpStatusCode.OK).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}

export async function createProyectoController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.createProyecto(req.body);
    res.status(HttpStatusCode.CREATED).json({
      success: true,
      data: serviceResponse
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProyectoController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const serviceResponse = await service.updateProyecto(id, req.body);
    res.json({
      success: true,
      data: serviceResponse
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteProyectoController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    await service.deleteProyecto(id);
    res.status(HttpStatusCode.OK).send({ message: "Proyecto eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}
