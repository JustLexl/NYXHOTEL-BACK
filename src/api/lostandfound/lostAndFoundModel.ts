import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { LostAndFoundDto } from "./lostAndFoundDto";

export async function createLostAndFoundMongo(record: LostAndFoundDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<LostAndFoundDto>("LostAndFound");
    return await dbRef.insertOne(record);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createLostAndFoundMongo");
  }
}

export async function getAllLostAndFoundMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<LostAndFoundDto>("LostAndFound");
    return await dbRef.find({ isDeleted: { $ne: true } })
      .sort({ fechaEncontrado: -1, horaEncontrado: -1, createdAt: -1 })
      .toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllLostAndFoundMongo");
  }
}

export async function updateLostAndFoundMongo(id: string, record: Partial<LostAndFoundDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<LostAndFoundDto>("LostAndFound");
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: record }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateLostAndFoundMongo");
  }
}

export async function deleteLostAndFoundMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<LostAndFoundDto>("LostAndFound");
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: { isDeleted: true } }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteLostAndFoundMongo");
  }
}
