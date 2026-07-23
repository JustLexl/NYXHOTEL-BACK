import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { CuentaDto } from "./cuentasDto";

export async function createCuentaMongo(cuenta: CuentaDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<CuentaDto>("Cuentas");
    return await dbRef.insertOne(cuenta);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createCuentaMongo");
  }
}

export async function getAllCuentasMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<CuentaDto>("Cuentas");
    return await dbRef.find({ isDeleted: { $ne: true } }).toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllCuentasMongo");
  }
}

export async function updateCuentaMongo(id: string, cuenta: Partial<CuentaDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<CuentaDto>("Cuentas");
    const { _id, ...updateData } = cuenta;
    const objectId = getMongoId(id);
    const query = objectId ? { _id: { $in: [objectId, id] } } : { _id: id };
    return await dbRef.updateOne(
      query as any,
      { $set: updateData }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateCuentaMongo");
  }
}

export async function deleteCuentaMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<CuentaDto>("Cuentas");
    const objectId = getMongoId(id);
    const query = objectId ? { _id: { $in: [objectId, id] } } : { _id: id };
    return await dbRef.updateOne(query as any, { $set: { isDeleted: true } });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteCuentaMongo");
  }
}
