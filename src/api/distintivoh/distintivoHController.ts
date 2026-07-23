import { Request, Response } from "express";
import * as service from "./distintivoHService";

export async function createDistintivoHController(req: Request, res: Response) {
  try {
    const result = await service.createDistintivoH(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error creating Distintivo H record" });
  }
}

export async function getAllDistintivoHController(req: Request, res: Response) {
  try {
    const records = await service.getAllDistintivoH();
    res.status(200).json(records);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error fetching Distintivo H records" });
  }
}

export async function updateDistintivoHController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await service.updateDistintivoH(id, req.body);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error updating Distintivo H record" });
  }
}

export async function deleteDistintivoHController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await service.deleteDistintivoH(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error deleting Distintivo H record" });
  }
}
