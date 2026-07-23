import { DistintivoHDto } from "./distintivoHDto";
import * as model from "./distintivoHModel";

export async function createDistintivoH(record: DistintivoHDto) {
  record.createdAt = new Date();
  record.updatedAt = new Date();
  if (!record.hallazgos) {
    record.hallazgos = [];
  }
  return await model.createDistintivoHMongo(record);
}

export async function getAllDistintivoH() {
  return await model.getAllDistintivoHMongo();
}

export async function updateDistintivoH(id: string, record: Partial<DistintivoHDto>) {
  record.updatedAt = new Date();
  return await model.updateDistintivoHMongo(id, record);
}

export async function deleteDistintivoH(id: string) {
  return await model.deleteDistintivoHMongo(id);
}
