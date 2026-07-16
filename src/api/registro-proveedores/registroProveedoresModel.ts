import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { RegistroProveedoresDto } from "./registroProveedoresDto";

const COLLECTION = "RegistroProveedores";

export async function createRegistroProveedorMongo(record: RegistroProveedoresDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<RegistroProveedoresDto>(COLLECTION);
    return await dbRef.insertOne(record);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createRegistroProveedorMongo");
  }
}

export async function getAllRegistroProveedoresMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<RegistroProveedoresDto>(COLLECTION);
    return await dbRef
      .find({ isDeleted: { $ne: true } })
      .sort({ fechaEntrada: -1, horaEntrada: -1, createdAt: -1 })
      .toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllRegistroProveedoresMongo");
  }
}

export async function registrarSalidaProveedorMongo(id: string, horaSalida: string, fechaSalida: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<RegistroProveedoresDto>(COLLECTION);
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: { horaSalida, fechaSalida, updatedAt: new Date() } }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "registrarSalidaProveedorMongo");
  }
}

export async function deleteRegistroProveedorMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<RegistroProveedoresDto>(COLLECTION);
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: { isDeleted: true, updatedAt: new Date() } }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteRegistroProveedorMongo");
  }
}
