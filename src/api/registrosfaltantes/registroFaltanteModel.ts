import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { RegistroFaltanteDto } from "./registroFaltanteDto";

const COLLECTION_NAME = "MissingRecords";

export async function createRegistroFaltanteMongo(registro: RegistroFaltanteDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<RegistroFaltanteDto>(COLLECTION_NAME);
    return await dbRef.insertOne(registro as any);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createRegistroFaltanteMongo");
  }
}

export async function getAllRegistrosFaltantesMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<RegistroFaltanteDto>(COLLECTION_NAME);
    return await dbRef.find().toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllRegistrosFaltantesMongo");
  }
}

export async function deleteRegistroFaltanteMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<RegistroFaltanteDto>(COLLECTION_NAME);
    const objectId = getMongoId(id);
    const query = objectId ? { _id: { $in: [objectId, id] } } : { _id: id };
    return await dbRef.deleteOne(query as any);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteRegistroFaltanteMongo");
  }
}

export async function findByNombreAndFechaMongo(developer: string, date: string) {
    try {
      const db = await connect();
      const dbRef = db.collection<RegistroFaltanteDto>(COLLECTION_NAME);
      return await dbRef.findOne({ developer, date });
    } catch (error) {
      throw new BaseError("Inside catch: ", error, "findByNombreAndFechaMongo");
    }
}
