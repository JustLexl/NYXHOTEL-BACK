import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { DistintivoHDto } from "./distintivoHDto";

export async function createDistintivoHMongo(record: DistintivoHDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<DistintivoHDto>("DistintivoH");
    return await dbRef.insertOne(record);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createDistintivoHMongo");
  }
}

export async function getAllDistintivoHMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<DistintivoHDto>("DistintivoH");
    return await dbRef
      .find({ isDeleted: { $ne: true } })
      .sort({ fecha: -1, createdAt: -1 })
      .toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllDistintivoHMongo");
  }
}

export async function updateDistintivoHMongo(id: string, record: Partial<DistintivoHDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<DistintivoHDto>("DistintivoH");
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: record }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateDistintivoHMongo");
  }
}

export async function deleteDistintivoHMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<DistintivoHDto>("DistintivoH");
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: { isDeleted: true } }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteDistintivoHMongo");
  }
}
