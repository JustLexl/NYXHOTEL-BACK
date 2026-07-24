import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { InventarioDto } from "./inventarioDto";

export async function createInventarioMongo(item: InventarioDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<InventarioDto>("Inventario");
    return await dbRef.insertOne(item);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createInventarioMongo");
  }
}

export async function getAllInventarioMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<InventarioDto>("Inventario");
    return await dbRef.find({ isDeleted: { $ne: true } }).toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllInventarioMongo");
  }
}

export async function updateInventarioMongo(id: string, item: Partial<InventarioDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<InventarioDto>("Inventario");
    const { _id, ...updateData } = item;
    const objectId = getMongoId(id);
    const query = objectId ? { _id: { $in: [objectId, id] } } : { _id: id };
    return await dbRef.updateOne(
      query as any,
      { $set: updateData }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateInventarioMongo");
  }
}

export async function deleteInventarioMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<InventarioDto>("Inventario");
    const objectId = getMongoId(id);
    const query = objectId ? { _id: { $in: [objectId, id] } } : { _id: id };
    return await dbRef.updateOne(query as any, { $set: { isDeleted: true } });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteInventarioMongo");
  }
}
