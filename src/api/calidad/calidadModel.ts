import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { CalidadReporteDto } from "./calidadDto";

const COLLECTION = "CalidadReportes";

export async function createCalidadReporteMongo(reporte: CalidadReporteDto): Promise<any> {
  try {
    const db = await connect();
    const dbRef = db.collection<CalidadReporteDto>(COLLECTION);
    return await dbRef.insertOne(reporte);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createCalidadReporteMongo");
  }
}

export async function getAllCalidadReportesMongo(): Promise<CalidadReporteDto[]> {
  try {
    const db = await connect();
    const dbRef = db.collection<CalidadReporteDto>(COLLECTION);
    return await dbRef
      .find({ isDeleted: { $ne: true } })
      .sort({ fecha: -1, createdAt: -1 })
      .toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllCalidadReportesMongo");
  }
}

export async function getCalidadReporteByIdMongo(id: string): Promise<CalidadReporteDto | null> {
  try {
    const db = await connect();
    const dbRef = db.collection<CalidadReporteDto>(COLLECTION);
    return await dbRef.findOne({ _id: getMongoId(id) });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getCalidadReporteByIdMongo");
  }
}

export async function updateCalidadReporteMongo(id: string, reporte: Partial<CalidadReporteDto>): Promise<any> {
  try {
    const db = await connect();
    const dbRef = db.collection<CalidadReporteDto>(COLLECTION);
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: reporte }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateCalidadReporteMongo");
  }
}

export async function deleteCalidadReporteMongo(id: string): Promise<any> {
  try {
    const db = await connect();
    const dbRef = db.collection<CalidadReporteDto>(COLLECTION);
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: { isDeleted: true, updatedAt: new Date() } }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteCalidadReporteMongo");
  }
}
