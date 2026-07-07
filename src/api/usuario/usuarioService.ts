import * as firebase from "../../shared/database/firebase";
import { BaseError } from "../../shared/classes/base-error";
import { CreateUsuariosDto, UsuariosDto } from "./usuarioDto";
import { createUsuariosMongo, deleteUsuariosMongo, getAllUsuariosMongo, updateUsuariosMongo, getUsuariosByIdMongo, getUsuarioByFirebaseUidMongo } from "./usuarioModel";
import { HttpStatusCode } from "../../shared/models/http.model";

const auth = firebase.auth();
const db = firebase.firestore();

export async function createUsuarios(usuario: any) {
  try {
    const email = usuario.email;

    if (!email) {
      throw new Error("Email is required");
    }

    const userRecord = await auth.createUser({
      email: email,
      password: usuario.password,
      displayName: usuario.name,
    });

    const usuarioData: UsuariosDto = {
      name: usuario.name || "",
      email: email,
      jobPosition: usuario.jobPosition || "",
      jobArea: usuario.jobArea || "",
      role: usuario.role || "",
      phone: usuario.phone || 0,
      firebaseUid: userRecord.uid,
      isDeleted: false,
    };

    const mongoResponse = await createUsuariosMongo(usuarioData);


    return mongoResponse.insertedId;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createUsuarios");
  }
}

export async function getUsuarios() {
  try {
    const list = await getAllUsuariosMongo();
    return list.map((item: any) => ({
      ...item,
      _idusuario: item._id
    }));
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getUsuarios");
  }
}

export async function getUsuarioByFirebaseUid(uid: string) {
  try {
    const user = await getUsuarioByFirebaseUidMongo(uid);
    return user;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getUsuarioByFirebaseUid");
  }
}

export async function updateUsuarios(id: string, usuario: Partial<UsuariosDto>) {
  try {
    const mongoResponse = await updateUsuariosMongo(id, usuario);

    const fullUsuario = await getUsuariosByIdMongo(id);

    return mongoResponse.result.ok === 1;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateUsuarios");
  }
}


export async function deleteUsuarios(id: string) {
  try {
    console.log('🗑️ Attempting to delete user with ID:', id);

    const usuario = await getUsuariosByIdMongo(id);
    console.log('👤 User found in Mongo:', usuario ? usuario.name : 'NOT FOUND');

    if (usuario && usuario.firebaseUid) {
      console.log('🔥 Found Firebase UID:', usuario.firebaseUid);
      try {
        await auth.deleteUser(usuario.firebaseUid);
        console.log(' Deleted from Firebase Auth');
      } catch (authError) {
        console.error(" Error deleting from Firebase Auth:", authError);
      }

    } else {
      console.warn('⚠️ No Firebase UID found for this user, skipping Firebase Auth deletion');
    }

    await deleteUsuariosMongo(id);

    console.log('✅ Deleted from MongoDB');

    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteCustomer");
  }
}
