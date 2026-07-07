import * as firebase from "../../shared/database/firebase";
import { BaseError } from "../../shared/classes/base-error";
import { ClienteDto } from "./clientesDto";
import { createClienteMongo, deleteClienteMongo, getAllClientesMongo, updateClienteMongo } from "./clientesModel";

const db = firebase.firestore();

export async function createCliente(cliente: ClienteDto) {
  try {
    const clienteData = { ...cliente, isDeleted: false };
    const mongoResponse = await createClienteMongo(clienteData);
    const id = mongoResponse.insertedId.toString();

    return { ...clienteData, _id: mongoResponse.insertedId, _idcliente: mongoResponse.insertedId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createCliente");
  }
}

export async function getClientes() {
  try {
    const list = await getAllClientesMongo();
    return list.map((c: any) => ({
      ...c,
      _idcliente: c._id
    }));
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getClientes");
  }
}

export async function updateCliente(id: string, cliente: Partial<ClienteDto>) {
  try {
    const mongoResponse = await updateClienteMongo(id, cliente);

    return mongoResponse.upsertedId;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateCliente");
  }
}

export async function deleteCliente(id: string) {
  try {
    await deleteClienteMongo(id);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteCliente");
  }
}
