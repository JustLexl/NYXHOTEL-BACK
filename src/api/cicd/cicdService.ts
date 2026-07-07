import * as firebase from "../../shared/database/firebase";
import { BaseError } from "../../shared/classes/base-error";
import { CicdDto } from "./cicdDto";
import { createCicdMongo, deleteCicdMongo, getAllCicdMongo, updateCicdMongo } from "./cicdModel";

const db = firebase.firestore();

export async function createCicd(cicd: CicdDto) {
  try {
    const cicdData = { ...cicd, isDeleted: false };
    const mongoResponse = await createCicdMongo(cicdData);
    const cicdId = mongoResponse.insertedId.toString();

    // // Sync with Firestore
    // await db.collection("CICD").doc(cicdId).set({
    //   name: cicd.name,
    //   client: cicd.client || ""
    // });

    return { ...cicdData, _id: mongoResponse.insertedId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createCicd");
  }
}

export async function getCicds() {
  try {
    const list = await getAllCicdMongo();
    return list.map((item: any) => ({
      ...item,
      _idcicd: item._id,
      area: item.area || ''
    }));
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getCicds");
  }
}

export async function updateCicd(id: string, cicd: Partial<CicdDto>) {
  try {
    const mongoResponse = await updateCicdMongo(id, cicd);

    // // Sync with Firestore
    // await db.collection("CiCd").doc(id).set({
    //   ...(cicd.nombre && { nombre: cicd.nombre }),
    //   ...(cicd.cliente && { cliente: cicd.cliente })
    // }, { merge: true });

    return { id: mongoResponse.upsertedId || id };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateCicd");
  }
}

export async function deleteCicd(id: string) {
  try {
    await deleteCicdMongo(id);

    // // Sync with Firestore
    // await db.collection("CiCd").doc(id).delete();

    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteCicd");
  }
}