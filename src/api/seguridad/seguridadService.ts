import { BaseError } from "../../shared/classes/base-error";
import { AlcoholimetroDto, AccidenteDto, AccidenteColaboradorDto, ExtravioDto } from "./seguridadDto";
import * as model from "./seguridadModel";

// --- Alcoholimetro ---
export async function createAlcoholimetro(record: AlcoholimetroDto) {
  try {
    const data = {
      ...record,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const response = await model.createAlcoholimetroMongo(data);
    return { ...data, _id: response.insertedId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createAlcoholimetro");
  }
}

export async function getAlcoholimetros() {
  try {
    return await model.getAllAlcoholimetroMongo();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAlcoholimetros");
  }
}

export async function updateAlcoholimetro(id: string, record: Partial<AlcoholimetroDto>) {
  try {
    const data = {
      ...record,
      updatedAt: new Date()
    };
    await model.updateAlcoholimetroMongo(id, data);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateAlcoholimetro");
  }
}

export async function deleteAlcoholimetro(id: string) {
  try {
    await model.deleteAlcoholimetroMongo(id);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteAlcoholimetro");
  }
}

// --- Accidente ---
export async function createAccidente(record: AccidenteDto) {
  try {
    const data = {
      ...record,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const response = await model.createAccidenteMongo(data);
    return { ...data, _id: response.insertedId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createAccidente");
  }
}

export async function getAccidentes() {
  try {
    return await model.getAllAccidenteMongo();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAccidentes");
  }
}

export async function updateAccidente(id: string, record: Partial<AccidenteDto>) {
  try {
    const data = {
      ...record,
      updatedAt: new Date()
    };
    await model.updateAccidenteMongo(id, data);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateAccidente");
  }
}

export async function deleteAccidente(id: string) {
  try {
    await model.deleteAccidenteMongo(id);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteAccidente");
  }
}

// --- AccidenteColaborador ---
export async function createAccidenteColaborador(record: AccidenteColaboradorDto) {
  try {
    const data = {
      ...record,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const response = await model.createAccidenteColaboradorMongo(data);
    return { ...data, _id: response.insertedId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createAccidenteColaborador");
  }
}

export async function getAccidenteColaboradores() {
  try {
    return await model.getAllAccidenteColaboradorMongo();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAccidenteColaboradores");
  }
}

export async function updateAccidenteColaborador(id: string, record: Partial<AccidenteColaboradorDto>) {
  try {
    const data = {
      ...record,
      updatedAt: new Date()
    };
    await model.updateAccidenteColaboradorMongo(id, data);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateAccidenteColaborador");
  }
}

export async function deleteAccidenteColaborador(id: string) {
  try {
    await model.deleteAccidenteColaboradorMongo(id);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteAccidenteColaborador");
  }
}

// --- Extravio ---
export async function createExtravio(record: ExtravioDto) {
  try {
    const data = {
      ...record,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const response = await model.createExtravioMongo(data);
    return { ...data, _id: response.insertedId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createExtravio");
  }
}

export async function getExtravios() {
  try {
    return await model.getAllExtravioMongo();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getExtravios");
  }
}

export async function updateExtravio(id: string, record: Partial<ExtravioDto>) {
  try {
    const data = {
      ...record,
      updatedAt: new Date()
    };
    await model.updateExtravioMongo(id, data);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateExtravio");
  }
}

export async function deleteExtravio(id: string) {
  try {
    await model.deleteExtravioMongo(id);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteExtravio");
  }
}
