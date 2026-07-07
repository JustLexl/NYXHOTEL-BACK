import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { ClienteDto } from "./clientesDto";

export async function createClienteMongo(cliente: ClienteDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<ClienteDto>("Client");
    return await dbRef.insertOne(cliente);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createClienteMongo");
  }
}

export async function getAllClientesMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<ClienteDto>("Client");
    return await dbRef.find({ isDeleted: { $ne: true } }).toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllClientesMongo");
  }
}

export async function updateClienteMongo(id: string, cliente: Partial<ClienteDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<ClienteDto>("Client");
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: cliente }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateClienteMongo");
  }
}

export async function deleteClienteMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<ClienteDto>("Client");
    return await dbRef.updateOne({ _id: getMongoId(id) }, { $set: { isDeleted: true } });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteClienteMongo");
  }
}
