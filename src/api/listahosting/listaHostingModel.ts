import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { ListaHostingDto } from "./listaHostingDto";

export async function createHostingMongo(hosting: ListaHostingDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaHostingDto>("Hostings");
    return await dbRef.insertOne(hosting);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createHostingMongo");
  }
}

export async function getAllHostingsMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaHostingDto>("Hostings");
    return await dbRef.find({ isDeleted: { $ne: true } }).toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllHostingsMongo");
  }
}

export async function updateHostingMongo(id: string, hosting: Partial<ListaHostingDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaHostingDto>("Hostings");
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: hosting }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateHostingMongo");
  }
}

export async function deleteHostingMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaHostingDto>("Hostings");
    return await dbRef.updateOne({ _id: getMongoId(id) }, { $set: { isDeleted: true } });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteHostingMongo");
  }
}
