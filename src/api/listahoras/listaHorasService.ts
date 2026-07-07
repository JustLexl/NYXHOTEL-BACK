import * as firebase from "../../shared/database/firebase";
import { BaseError } from "../../shared/classes/base-error";
import { ListaHorasDto } from "./listaHorasDto";
import { createHoraMongo, deleteHoraMongo, getAllHorasMongo, updateHoraMongo } from "./listaHorasModel";

const db = firebase.firestore();

export async function createHora(hora: ListaHorasDto) {
  try {
    const horaData = { ...hora, isDeleted: false };
    const mongoResponse = await createHoraMongo(horaData);
    const horaId = mongoResponse.insertedId.toString();


    return { ...horaData, _idhora: mongoResponse.insertedId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createHora");
  }
}

export async function getHoras() {
  try {
    const list = await getAllHorasMongo();
    return list.map((item: any) => ({
      ...item,
      _idhora: item._id,
      area: item.area || ''
    }));
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getHoras");
  }
}

export async function updateHora(id: string, hora: Partial<ListaHorasDto>) {
  try {
    const mongoResponse = await updateHoraMongo(id, hora);

    return mongoResponse;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateHora");
  }
}

export async function deleteHora(id: string) {
  try {
    await deleteHoraMongo(id);

    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteHora");
  }
}
