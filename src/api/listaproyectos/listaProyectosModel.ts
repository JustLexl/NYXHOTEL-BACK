import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { ListaProyectosDto } from "./listaProyectosDto";

export async function createProyectoMongo(proyecto: ListaProyectosDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaProyectosDto>("Projects");
    return await dbRef.insertOne(proyecto);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createProyectoMongo");
  }
}

export async function getAllProyectosMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaProyectosDto>("Projects");
    return await dbRef.find({ isDeleted: { $ne: true } }).toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllProyectosMongo");
  }
}

export async function updateProyectoMongo(id: string, proyecto: Partial<ListaProyectosDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaProyectosDto>("Projects");
    const { _id, ...updateData } = proyecto;
    const objectId = getMongoId(id);
    const query = objectId ? { _id: { $in: [objectId, id] } } : { _id: id };
    return await dbRef.updateOne(
      query as any,
      { $set: updateData }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateProyectoMongo");
  }
}

export async function deleteProyectoMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<ListaProyectosDto>("Projects");
    const objectId = getMongoId(id);
    const query = objectId ? { _id: { $in: [objectId, id] } } : { _id: id };
    return await dbRef.updateOne(query as any, { $set: { isDeleted: true } });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteProyectoMongo");
  }
}
