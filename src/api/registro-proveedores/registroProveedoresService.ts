import { BaseError } from "../../shared/classes/base-error";
import { RegistroProveedoresDto } from "./registroProveedoresDto";
import * as model from "./registroProveedoresModel";

export async function createRegistroProveedor(record: RegistroProveedoresDto) {
  try {
    const data: RegistroProveedoresDto = {
      ...record,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const response = await model.createRegistroProveedorMongo(data);
    return { ...data, _id: response.insertedId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createRegistroProveedor");
  }
}

export async function getRegistroProveedores() {
  try {
    return await model.getAllRegistroProveedoresMongo();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getRegistroProveedores");
  }
}

export async function registrarSalidaProveedor(id: string) {
  try {
    const now = new Date();
    // Use local time components to match the timezone of entry
    const horaSalida = now.toTimeString().substring(0, 5);
    const fechaSalida = now.toISOString().split("T")[0];
    await model.registrarSalidaProveedorMongo(id, horaSalida, fechaSalida);
    return { horaSalida, fechaSalida };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "registrarSalidaProveedor");
  }
}

export async function deleteRegistroProveedor(id: string) {
  try {
    await model.deleteRegistroProveedorMongo(id);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteRegistroProveedor");
  }
}
