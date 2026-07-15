import express, { NextFunction } from "express";
import * as service from "./lostAndFoundService";
import { HttpStatusCode } from "../../shared/models/http.model";

export async function getLostAndFoundController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const list = await service.getLostAndFound();
    res.status(HttpStatusCode.OK).send(list);
  } catch (error) {
    next(error);
  }
}

export async function createLostAndFoundController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const response = await service.createLostAndFound(req.body);
    res.status(HttpStatusCode.CREATED).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export async function updateLostAndFoundController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const response = await service.updateLostAndFound(id, req.body);
    res.status(HttpStatusCode.OK).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteLostAndFoundController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const id = req.params.id;
    await service.deleteLostAndFound(id);
    res.status(HttpStatusCode.OK).send({ message: "Registro de lost and found eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}
