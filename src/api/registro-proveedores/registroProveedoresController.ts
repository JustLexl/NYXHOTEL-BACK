import express, { NextFunction } from "express";
import * as service from "./registroProveedoresService";
import { HttpStatusCode } from "../../shared/models/http.model";

export async function getRegistroProveedoresController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const list = await service.getRegistroProveedores();
    res.status(HttpStatusCode.OK).send(list);
  } catch (error) {
    next(error);
  }
}

export async function createRegistroProveedorController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const response = await service.createRegistroProveedor(req.body);
    res.status(HttpStatusCode.CREATED).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
}

export async function updateRegistroProveedorController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const response = await service.updateRegistroProveedor(id, req.body);
    res.status(HttpStatusCode.OK).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
}

export async function registrarSalidaProveedorController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const result = await service.registrarSalidaProveedor(id);
    res.status(HttpStatusCode.OK).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function deleteRegistroProveedorController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    await service.deleteRegistroProveedor(id);
    res
      .status(HttpStatusCode.OK)
      .send({ message: "Registro de proveedor eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}
