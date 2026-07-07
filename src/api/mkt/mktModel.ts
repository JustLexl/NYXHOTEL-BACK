import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { MktDto } from "./mktDto";

export async function createMktMongo(mkt: MktDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<MktDto>("Marketing");
    return await dbRef.insertOne(mkt);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createMktMongo");
  }
}

export async function getAllMktMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<MktDto>("Marketing");
    return await dbRef.find({ isDeleted: { $ne: true } }).toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllMktMongo");
  }
}

export async function updateMktMongo(id: string, mkt: Partial<MktDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<MktDto>("Marketing");
    const { _id, ...updateData } = mkt;
    const objectId = getMongoId(id);
    const query = objectId ? { _id: { $in: [objectId, id] } } : { _id: id };
    return await dbRef.updateOne(
      query as any,
      { $set: updateData }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateMktMongo");
  }
}

export async function deleteMktMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<MktDto>("Marketing");
    const objectId = getMongoId(id);
    const query = objectId ? { _id: { $in: [objectId, id] } } : { _id: id };
    return await dbRef.updateOne(query as any, { $set: { isDeleted: true } });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteMktMongo");
  }
}
