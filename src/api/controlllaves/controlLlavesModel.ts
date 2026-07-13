import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { ControlLlavesDto } from "./controlLlavesDto";

export async function createControlLlavesMongo(record: ControlLlavesDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<ControlLlavesDto>("ControlLlaves");
    return await dbRef.insertOne(record);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createControlLlavesMongo");
  }
}

export async function getAllControlLlavesMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<ControlLlavesDto>("ControlLlaves");
    return await dbRef.find({ isDeleted: { $ne: true } }).sort({ fecha: -1, hora: -1, createdAt: -1 }).toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllControlLlavesMongo");
  }
}

export async function updateControlLlavesMongo(id: string, record: Partial<ControlLlavesDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<ControlLlavesDto>("ControlLlaves");
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: record }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateControlLlavesMongo");
  }
}

export async function deleteControlLlavesMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<ControlLlavesDto>("ControlLlaves");
    return await dbRef.updateOne({ _id: getMongoId(id) }, { $set: { isDeleted: true } });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteControlLlavesMongo");
  }
}
