import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { UsuariosDto } from "./usuarioDto";

export async function createUsuariosMongo(usuario: UsuariosDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<UsuariosDto>("User");
    const response = await dbRef.insertOne(usuario);
    return response;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createUsuariosMongo");
  }
}

export async function getAllUsuariosMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<UsuariosDto>("User");
    return await dbRef.find({ isDeleted: { $ne: true } }).toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllUsuariosMongo");
  }
}

export async function getUsuariosByIdMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<UsuariosDto>("User");
    return await dbRef.findOne({ _id: getMongoId(id) });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getUsuariosByIdMongo");
  }
}

export async function updateUsuariosMongo(id: string, usuario: Partial<UsuariosDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<UsuariosDto>("User");
    const response = await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: usuario }
    );
    return response;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateUsuariosMongo");
  }
}

export async function getUsuarioByFirebaseUidMongo(uid: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<UsuariosDto>("User");
    return await dbRef.findOne({ firebaseUid: uid, isDeleted: { $ne: true } });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getUsuarioByFirebaseUidMongo");
  }
}

export async function deleteUsuariosMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<UsuariosDto>("User");
    const response = await dbRef.updateOne({ _id: getMongoId(id) }, { $set: { isDeleted: true } });
    return response;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteUsuariosMongo");
  }
}
