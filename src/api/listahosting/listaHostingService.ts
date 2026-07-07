import * as firebase from "../../shared/database/firebase";
import { BaseError } from "../../shared/classes/base-error";
import { ListaHostingDto } from "./listaHostingDto";
import { createHostingMongo, deleteHostingMongo, getAllHostingsMongo, updateHostingMongo } from "./listaHostingModel";

const db = firebase.firestore();

export async function createHosting(hosting: ListaHostingDto) {
  try {
    const hostingData = { ...hosting, isDeleted: false };
    const mongoResponse = await createHostingMongo(hostingData);
    const hostingId = mongoResponse.insertedId.toString();

    return { ...hostingData, _id: mongoResponse.insertedId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createHosting");
  }
}

export async function getHostings() {
  try {
    const list = await getAllHostingsMongo();
    return list.map((item: any) => ({
      ...item,
      _idhosting: item._id
    }));
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getHostings");
  }
}

export async function updateHosting(id: string, hosting: Partial<ListaHostingDto>) {
  try {
    const mongoResponse = await updateHostingMongo(id, hosting);

    return mongoResponse.upsertedId || id;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateHosting");
  }
}

export async function deleteHosting(id: string) {
  try {
    await deleteHostingMongo(id);

    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteHosting");
  }
}
