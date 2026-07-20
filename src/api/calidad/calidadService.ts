import { BaseError } from "../../shared/classes/base-error";
import { CalidadReporteDto, CalidadSeccionDto } from "./calidadDto";
import * as model from "./calidadModel";

function calcularPuntuacion(secciones: CalidadSeccionDto[]): number {
  let bienCount = 0;
  let totalCount = 0;

  if (!secciones || secciones.length === 0) return 0;

  for (const seccion of secciones) {
    if (!seccion.items) continue;
    for (const item of seccion.items) {
      if (item.estado === "Bien") {
        bienCount++;
        totalCount++;
      } else if (item.estado === "Mal") {
        totalCount++;
      }
    }
  }

  if (totalCount === 0) return 100; // Si no hay evaluados o todos son N/A, se considera 100% o 0? Digamos 100% por defecto.
  return Math.round((bienCount / totalCount) * 100 * 10) / 10; // Redondeado a un decimal
}

export async function createCalidadReporte(reporte: CalidadReporteDto) {
  try {
    const puntuacion = calcularPuntuacion(reporte.secciones);
    const data: CalidadReporteDto = {
      ...reporte,
      puntuacion,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const response = await model.createCalidadReporteMongo(data);
    return { ...data, _id: response.insertedId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createCalidadReporte");
  }
}

export async function getCalidadReportes() {
  try {
    return await model.getAllCalidadReportesMongo();
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getCalidadReportes");
  }
}

export async function getCalidadReporteById(id: string) {
  try {
    return await model.getCalidadReporteByIdMongo(id);
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getCalidadReporteById");
  }
}

export async function updateCalidadReporte(id: string, record: Partial<CalidadReporteDto>) {
  try {
    let extra: Partial<CalidadReporteDto> = {};
    if (record.secciones) {
      extra.puntuacion = calcularPuntuacion(record.secciones);
    }
    const data = {
      ...record,
      ...extra,
      updatedAt: new Date(),
    };
    await model.updateCalidadReporteMongo(id, data);
    return data;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateCalidadReporte");
  }
}

export async function deleteCalidadReporte(id: string) {
  try {
    await model.deleteCalidadReporteMongo(id);
    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteCalidadReporte");
  }
}
