import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { CicdDto } from "./cicdDto";

export async function createCicdMongo(cicd: CicdDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<CicdDto>("CICD");
    return await dbRef.insertOne(cicd);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createCicdMongo");
  }
}

export async function getAllCicdMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<CicdDto>("CICD");
    return await dbRef.find({ isDeleted: { $ne: true } }).toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllCicdMongo");
  }
}

export async function updateCicdMongo(id: string, cicd: Partial<CicdDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<CicdDto>("CICD");
    const { _id, ...updateData } = cicd;
    const objectId = getMongoId(id);
    const query = objectId ? { _id: { $in: [objectId, id] } } : { _id: id };
    return await dbRef.updateOne(
      query as any,
      { $set: updateData }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateCicdMongo");
  }
}

export async function deleteCicdMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<CicdDto>("CICD");
    const objectId = getMongoId(id);
    const query = objectId ? { _id: { $in: [objectId, id] } } : { _id: id };
    return await dbRef.updateOne(query as any, { $set: { isDeleted: true } });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteCicdMongo");
  }
}
