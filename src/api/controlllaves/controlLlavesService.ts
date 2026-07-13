import { BaseError } from "../../shared/classes/base-error";
import { ControlLlavesDto } from "./controlLlavesDto";
import * as model from "./controlLlavesModel";

export async function createControlLlaves(record: ControlLlavesDto) {
  try {
    const data = {
      ...record,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const response = await model.createControlLlavesMongo(data);
    return { ...data, _id: response.insertedId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createControlLlaves");
  }
}

export async function getControlLlaves() {
  try {
    return await model.getAllControlLlavesMongo();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getControlLlaves");
  }
}

export async function updateControlLlaves(id: string, record: Partial<ControlLlavesDto>) {
  try {
    const data = {
      ...record,
      updatedAt: new Date()
    };
    await model.updateControlLlavesMongo(id, data);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateControlLlaves");
  }
}

export async function deleteControlLlaves(id: string) {
  try {
    await model.deleteControlLlavesMongo(id);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteControlLlaves");
  }
}
