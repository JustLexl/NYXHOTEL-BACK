import * as model from "./registroFaltanteModel";
import { RegistroFaltanteDto } from "./registroFaltanteDto";

export async function createRegistroFaltante(registro: RegistroFaltanteDto) {
  const existe = await model.findByNombreAndFechaMongo(registro.developer, registro.date);
  if (existe) return existe;
  
  return await model.createRegistroFaltanteMongo(registro);
}

export async function getAllRegistrosFaltantes() {
  return await model.getAllRegistrosFaltantesMongo();
}

export async function deleteRegistroFaltante(id: string) {
  return await model.deleteRegistroFaltanteMongo(id);
}
