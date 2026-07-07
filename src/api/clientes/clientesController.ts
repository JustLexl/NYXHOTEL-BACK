import express, { NextFunction } from "express";
import * as service from "./clientesService";
import { HttpStatusCode } from "../../shared/models/http.model";

export async function getClientesController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.getClientes();
    res.status(HttpStatusCode.OK).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}

export async function createClienteController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.createCliente(req.body);
    res.status(HttpStatusCode.CREATED).json({
      success: true,
      data: serviceResponse
    });
  } catch (error) {
    next(error);
  }
}

export async function updateClienteController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const serviceResponse = await service.updateCliente(id, req.body);
    res.json({
      success: true,
      data: serviceResponse
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteClienteController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    await service.deleteCliente(id);
    res.status(HttpStatusCode.OK).send({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}
