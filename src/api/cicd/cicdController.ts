import express, { NextFunction } from "express";
import * as service from "./cicdService";
import { HttpStatusCode } from "../../shared/models/http.model";

export async function getCicdController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.getCicds();
    res.status(HttpStatusCode.OK).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}

export async function createCicdController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.createCicd(req.body);
    res.status(HttpStatusCode.CREATED).json({
      success: true,
      data: serviceResponse
    });
  } catch (error) {
    next(error);
  }
}

export async function updateCicdController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const serviceResponse = await service.updateCicd(id, req.body);
    res.json({
      success: true,
      data: serviceResponse
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteCicdController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    await service.deleteCicd(id);
    res.status(HttpStatusCode.OK).send({ message: "CiCd eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}
