import { connect, getMongoId } from "../../shared/database/mongodb";
import { BaseError } from "../../shared/classes/base-error";
import { AlcoholimetroDto, AccidenteDto, AccidenteColaboradorDto, ExtravioDto } from "./seguridadDto";

// --- Alcoholimetro ---
export async function createAlcoholimetroMongo(record: AlcoholimetroDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<AlcoholimetroDto>("SeguridadAlcoholimetro");
    return await dbRef.insertOne(record);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createAlcoholimetroMongo");
  }
}

export async function getAllAlcoholimetroMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<AlcoholimetroDto>("SeguridadAlcoholimetro");
    return await dbRef.find({ isDeleted: { $ne: true } }).sort({ fecha: -1, createdAt: -1 }).toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllAlcoholimetroMongo");
  }
}

export async function updateAlcoholimetroMongo(id: string, record: Partial<AlcoholimetroDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<AlcoholimetroDto>("SeguridadAlcoholimetro");
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: record }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateAlcoholimetroMongo");
  }
}

export async function deleteAlcoholimetroMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<AlcoholimetroDto>("SeguridadAlcoholimetro");
    return await dbRef.updateOne({ _id: getMongoId(id) }, { $set: { isDeleted: true } });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteAlcoholimetroMongo");
  }
}

// --- Accidente ---
export async function createAccidenteMongo(record: AccidenteDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<AccidenteDto>("SeguridadAccidente");
    return await dbRef.insertOne(record);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createAccidenteMongo");
  }
}

export async function getAllAccidenteMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<AccidenteDto>("SeguridadAccidente");
    return await dbRef.find({ isDeleted: { $ne: true } }).sort({ fecha: -1, createdAt: -1 }).toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllAccidenteMongo");
  }
}

export async function updateAccidenteMongo(id: string, record: Partial<AccidenteDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<AccidenteDto>("SeguridadAccidente");
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: record }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateAccidenteMongo");
  }
}

export async function deleteAccidenteMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<AccidenteDto>("SeguridadAccidente");
    return await dbRef.updateOne({ _id: getMongoId(id) }, { $set: { isDeleted: true } });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteAccidenteMongo");
  }
}

// --- AccidenteColaborador ---
export async function createAccidenteColaboradorMongo(record: AccidenteColaboradorDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<AccidenteColaboradorDto>("SeguridadAccidenteColaborador");
    return await dbRef.insertOne(record);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createAccidenteColaboradorMongo");
  }
}

export async function getAllAccidenteColaboradorMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<AccidenteColaboradorDto>("SeguridadAccidenteColaborador");
    return await dbRef.find({ isDeleted: { $ne: true } }).sort({ fecha: -1, createdAt: -1 }).toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllAccidenteColaboradorMongo");
  }
}

export async function updateAccidenteColaboradorMongo(id: string, record: Partial<AccidenteColaboradorDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<AccidenteColaboradorDto>("SeguridadAccidenteColaborador");
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: record }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateAccidenteColaboradorMongo");
  }
}

export async function deleteAccidenteColaboradorMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<AccidenteColaboradorDto>("SeguridadAccidenteColaborador");
    return await dbRef.updateOne({ _id: getMongoId(id) }, { $set: { isDeleted: true } });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteAccidenteColaboradorMongo");
  }
}

// --- Extravio ---
export async function createExtravioMongo(record: ExtravioDto) {
  try {
    const db = await connect();
    const dbRef = db.collection<ExtravioDto>("SeguridadExtravio");
    return await dbRef.insertOne(record);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createExtravioMongo");
  }
}

export async function getAllExtravioMongo() {
  try {
    const db = await connect();
    const dbRef = db.collection<ExtravioDto>("SeguridadExtravio");
    return await dbRef.find({ isDeleted: { $ne: true } }).sort({ fecha: -1, createdAt: -1 }).toArray();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getAllExtravioMongo");
  }
}

export async function updateExtravioMongo(id: string, record: Partial<ExtravioDto>) {
  try {
    const db = await connect();
    const dbRef = db.collection<ExtravioDto>("SeguridadExtravio");
    return await dbRef.updateOne(
      { _id: getMongoId(id) },
      { $set: record }
    );
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateExtravioMongo");
  }
}

export async function deleteExtravioMongo(id: string) {
  try {
    const db = await connect();
    const dbRef = db.collection<ExtravioDto>("SeguridadExtravio");
    return await dbRef.updateOne({ _id: getMongoId(id) }, { $set: { isDeleted: true } });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteExtravioMongo");
  }
}
