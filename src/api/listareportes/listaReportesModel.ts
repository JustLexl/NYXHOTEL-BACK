import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { ListaReportesDto } from "./listaReportesDto";

export async function createReporteMongo(reporte: ListaReportesDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaReportesDto>("Reports");
    return await dbRef.insertOne(reporte);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createReporteMongo");
  }
}

export async function getAllReportesMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaReportesDto>("Reports");
    return await dbRef.find({ isDeleted: { $ne: true } }).toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllReportesMongo");
  }
}

export async function updateReporteMongo(id: string, reporte: Partial<ListaReportesDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaReportesDto>("Reports");
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: reporte }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateReporteMongo");
  }
}

export async function deleteReporteMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaReportesDto>("Reports");
    return await dbRef.updateOne({ _id: getMongoId(id) }, { $set: { isDeleted: true } });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteReporteMongo");
  }
}

export async function getReporteByIdMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaReportesDto>("Reports");
    return await dbRef.findOne({ _id: getMongoId(id) });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getReporteByIdMongo");
  }
}

