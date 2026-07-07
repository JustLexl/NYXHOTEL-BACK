import { Request, Response } from "express";
import * as service from "./registroFaltanteService";
import { BaseError } from "../../shared/classes/base-error";

export async function createRegistroFaltante(req: Request, res: Response) {
  try {
    const result = await service.createRegistroFaltante(req.body);
    res.status(200).send(result);
  } catch (error) {
    const e = error as BaseError;
    res.status(500).send(e.message);
  }
}

export async function getAllRegistrosFaltantes(req: Request, res: Response) {
  try {
    const result = await service.getAllRegistrosFaltantes();
    res.status(200).send(result);
  } catch (error) {
    const e = error as BaseError;
    res.status(500).send(e.message);
  }
}

export async function deleteRegistroFaltante(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await service.deleteRegistroFaltante(id);
    res.status(200).send(result);
  } catch (error) {
    const e = error as BaseError;
    res.status(500).send(e.message);
  }
}
