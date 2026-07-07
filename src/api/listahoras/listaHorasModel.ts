import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { ListaHorasDto } from "./listaHorasDto";

export async function createHoraMongo(hora: ListaHorasDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaHorasDto>("Hours");
    return await dbRef.insertOne(hora);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createHoraMongo");
  }
}

export async function getAllHorasMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaHorasDto>("Hours");
    return await dbRef.find({ isDeleted: { $ne: true } }).toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllHorasMongo");
  }
}

export async function updateHoraMongo(id: string, hora: Partial<ListaHorasDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaHorasDto>("Hours");
    const { _id, ...updateData } = hora;
    const objectId = getMongoId(id);
    const query = objectId ? { _id: { $in: [objectId, id] } } : { _id: id };
    return await dbRef.updateOne(
      query as any,
      { $set: updateData }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateHoraMongo");
  }
}

export async function deleteHoraMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaHorasDto>("Hours");
    const objectId = getMongoId(id);
    const query = objectId ? { _id: { $in: [objectId, id] } } : { _id: id };
    return await dbRef.updateOne(query as any, { $set: { isDeleted: true } });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteHoraMongo");
  }
}
