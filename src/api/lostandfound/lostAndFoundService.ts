import { BaseError } from "../../shared/classes/base-error";
import { LostAndFoundDto } from "./lostAndFoundDto";
import * as model from "./lostAndFoundModel";

export async function createLostAndFound(record: LostAndFoundDto) {
  try {
    const data = {
      ...record,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const response = await model.createLostAndFoundMongo(data);
    return { ...data, _id: response.insertedId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createLostAndFound");
  }
}

export async function getLostAndFound() {
  try {
    return await model.getAllLostAndFoundMongo();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getLostAndFound");
  }
}

export async function updateLostAndFound(id: string, record: Partial<LostAndFoundDto>) {
  try {
    const data = {
      ...record,
      updatedAt: new Date()
    };
    await model.updateLostAndFoundMongo(id, data);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateLostAndFound");
  }
}

export async function deleteLostAndFound(id: string) {
  try {
    await model.deleteLostAndFoundMongo(id);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteLostAndFound");
  }
}
