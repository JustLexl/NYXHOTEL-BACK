import express, { NextFunction } from "express";
import * as service from "./mktService";
import { HttpStatusCode } from "../../shared/models/http.model";

export async function getMktController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.getMkt();
    res.status(HttpStatusCode.OK).send(serviceResponse);
  } catch (error) {
    next(error);
  }
}

export async function createMktController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const serviceResponse = await service.createMkt(req.body);
    res.status(HttpStatusCode.CREATED).json({
      success: true,
      data: serviceResponse
    });
  } catch (error) {
    next(error);
  }
}

export async function updateMktController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const serviceResponse = await service.updateMkt(id, req.body);
    res.json({
      success: true,
      data: serviceResponse
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteMktController(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    await service.deleteMkt(id);
    res.status(HttpStatusCode.OK).send({ message: "MKT eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}
