import * as firebase from "../../shared/database/firebase";
import { BaseError } from "../../shared/classes/base-error";
import { ListaProyectosDto } from "./listaProyectosDto";
import { createProyectoMongo, deleteProyectoMongo, getAllProyectosMongo, updateProyectoMongo } from "./listaProyectosModel";

const db = firebase.firestore();

export async function createProyecto(proyecto: ListaProyectosDto) {
  try {
    const proyectoData = { ...proyecto, isDeleted: false };
    const mongoResponse = await createProyectoMongo(proyectoData);
    const projectId = mongoResponse.insertedId.toString();

    return { ...proyectoData, _idproyecto: mongoResponse.insertedId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createProyecto");
  }
}

export async function getProyectos() {
  try {
    const list = await getAllProyectosMongo();
    return list.map((item: any) => ({
      ...item,
      _idproyecto: item._id,
      area: item.area || ''
    }));
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getProyectos");
  }
}

export async function updateProyecto(id: string, proyecto: Partial<ListaProyectosDto>) {
  try {
    const mongoResponse = await updateProyectoMongo(id, proyecto);

    return mongoResponse;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateProyecto");
  }
}

export async function deleteProyecto(id: string) {
  try {
    await deleteProyectoMongo(id);

    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteProyecto");
  }
}
