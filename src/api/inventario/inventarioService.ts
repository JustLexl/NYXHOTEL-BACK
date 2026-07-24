import { BaseError } from "../../shared/classes/base-error";
import { InventarioDto } from "./inventarioDto";
import {
  createInventarioMongo,
  deleteInventarioMongo,
  getAllInventarioMongo,
  updateInventarioMongo
} from "./inventarioModel";

export async function createInventario(item: InventarioDto) {
  try {
    const itemData: InventarioDto = {
      ...item,
      departamento: item.departamento || '',
      puesto: item.puesto || '',
      nombreEquipo: item.nombreEquipo || '',
      equipo: item.equipo || '',
      marcaModelo: item.marcaModelo || '',
      numeroSerie: item.numeroSerie || '',
      memoria: item.memoria || '',
      versionSO: item.versionSO || '',
      comentarios: item.comentarios || '',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const mongoResponse = await createInventarioMongo(itemData);
    return { ...itemData, _id: mongoResponse.insertedId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createInventario");
  }
}

export async function getInventario() {
  try {
    const list = await getAllInventarioMongo();
    return list.map((item: any) => ({
      ...item,
      departamento: item.departamento || '',
      puesto: item.puesto || '',
      nombreEquipo: item.nombreEquipo || '',
      equipo: item.equipo || '',
      marcaModelo: item.marcaModelo || '',
      numeroSerie: item.numeroSerie || '',
      memoria: item.memoria || '',
      versionSO: item.versionSO || '',
      comentarios: item.comentarios || ''
    }));
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getInventario");
  }
}

export async function updateInventario(id: string, item: Partial<InventarioDto>) {
  try {
    const updateData: Partial<InventarioDto> = {
      ...item,
      updatedAt: new Date()
    };
    const mongoResponse = await updateInventarioMongo(id, updateData);
    return { id: mongoResponse.upsertedId || id };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateInventario");
  }
}

export async function deleteInventario(id: string) {
  try {
    await deleteInventarioMongo(id);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteInventario");
  }
}
