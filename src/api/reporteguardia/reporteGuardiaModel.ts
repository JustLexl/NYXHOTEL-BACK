import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { ReporteGuardiaDto } from "./reporteGuardiaDto";

export async function createReporteMongo(reporte: ReporteGuardiaDto): Promise<any> {
  try {
    const db = await connect();
    const dbRef = db.collection<ReporteGuardiaDto>("GuardReports");
    return await dbRef.insertOne(reporte);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createReporteMongo");
  }
}

export async function getAllReportesMongo(): Promise<ReporteGuardiaDto[]> {
  try {
    const db = await connect();
    const dbRef = db.collection<ReporteGuardiaDto>("GuardReports");
    return await dbRef.find({ isDeleted: { $ne: true } }).sort({ fecha: -1, createdAt: -1 }).toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllReportesMongo");
  }
}

export async function getReporteByIdMongo(id: string): Promise<ReporteGuardiaDto | null> {
  try {
    const db = await connect();
    const dbRef = db.collection<ReporteGuardiaDto>("GuardReports");
    return await dbRef.findOne({ _id: getMongoId(id) });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getReporteByIdMongo");
  }
}

export async function updateReporteMongo(id: string, reporte: Partial<ReporteGuardiaDto>): Promise<any> {
  try {
    const db = await connect();
    const dbRef = db.collection<ReporteGuardiaDto>("GuardReports");
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: reporte }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateReporteMongo");
  }
}

export async function deleteReporteMongo(id: string): Promise<any> {
  try {
    const db = await connect();
    const dbRef = db.collection<ReporteGuardiaDto>("GuardReports");
    return await dbRef.updateOne({ _id: getMongoId(id) }, { $set: { isDeleted: true } });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteReporteMongo");
  }
}
