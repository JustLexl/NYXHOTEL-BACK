import express, { NextFunction } from "express";
import * as service from "./usuarioService";
import { HttpStatusCode } from "../../shared/models/http.model";

export async function getUsuariosController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.getUsuarios();
    res.status(HttpStatusCode.OK).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}

export async function getUsuarioByFirebaseUidController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const uid = req.params.uid;
    const serviceResponse = await service.getUsuarioByFirebaseUid(uid);
    res.status(HttpStatusCode.OK).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}

export async function createUsuariosController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.createUsuarios(req.body);
    res.status(HttpStatusCode.CREATED).send({
      status: HttpStatusCode.CREATED,
      message: "Usuario Created!",
      data: serviceResponse,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUsuariosController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const serviceResponse = await service.updateUsuarios(id, req.body);
    res.status(HttpStatusCode.OK).send({
      status: HttpStatusCode.OK,
      message: "Usuario Updated!",
      data: serviceResponse,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteUsuariosController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    await service.deleteUsuarios(id);
    res.status(HttpStatusCode.OK).send({
      status: HttpStatusCode.OK,
      message: "Usuario Deleted!",
    });
  } catch (error) {
    next(error);
  }
}
