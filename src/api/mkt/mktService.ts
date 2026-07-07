import * as firebase from "../../shared/database/firebase";
import { BaseError } from "../../shared/classes/base-error";
import { MktDto } from "./mktDto";
import { createMktMongo, deleteMktMongo, getAllMktMongo, updateMktMongo } from "./mktModel";

const db = firebase.firestore();

export async function createMkt(mkt: MktDto) {
  try {
    const mktData = { ...mkt, isDeleted: false };
    const mongoResponse = await createMktMongo(mktData);
    const mktId = mongoResponse.insertedId.toString();

    return { ...mktData, _id: mongoResponse.insertedId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createMkt");
  }
}

export async function getMkt() {
  try {
    const list = await getAllMktMongo();
    return list.map((item: any) => ({
      ...item,
      _idmkt: item._id,
      area: item.area || ''
    }));
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getMkt");
  }
}

export async function updateMkt(id: string, mkt: Partial<MktDto>) {
  try {
    const mongoResponse = await updateMktMongo(id, mkt);

    return { ...mkt, _idmkt: id };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateMkt");
  }
}

export async function deleteMkt(id: string) {
  try {
    await deleteMktMongo(id);

    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteMkt");
  }
}
