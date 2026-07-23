import { BaseError } from "../../shared/classes/base-error";
import { CuentaDto } from "./cuentasDto";
import { createCuentaMongo, deleteCuentaMongo, getAllCuentasMongo, updateCuentaMongo } from "./cuentasModel";

export async function createCuenta(cuenta: CuentaDto) {
  try {
    const cuentaData: CuentaDto = {
      ...cuenta,
      nombre: cuenta.nombre || '',
      departamento: cuenta.departamento || '',
      puesto: cuenta.puesto || '',
      tipoCuenta: cuenta.tipoCuenta || '',
      correo: cuenta.correo || '',
      contrasena: cuenta.contrasena || '',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const mongoResponse = await createCuentaMongo(cuentaData);
    return { ...cuentaData, _id: mongoResponse.insertedId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createCuenta");
  }
}

export async function getCuentas() {
  try {
    const list = await getAllCuentasMongo();
    return list.map((item: any) => ({
      ...item,
      nombre: item.nombre || '',
      departamento: item.departamento || '',
      puesto: item.puesto || '',
      tipoCuenta: item.tipoCuenta || '',
      correo: item.correo || '',
      contrasena: item.contrasena || ''
    }));
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getCuentas");
  }
}

export async function updateCuenta(id: string, cuenta: Partial<CuentaDto>) {
  try {
    const updateData: Partial<CuentaDto> = {
      ...cuenta,
      updatedAt: new Date()
    };
    const mongoResponse = await updateCuentaMongo(id, updateData);
    return { id: mongoResponse.upsertedId || id };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateCuenta");
  }
}

export async function deleteCuenta(id: string) {
  try {
    await deleteCuentaMongo(id);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteCuenta");
  }
}
