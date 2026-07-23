import { ObjectId } from "mongodb";

export interface HallazgoItemDto {
  id?: string;
  no?: number;
  hallazgo: string;
  area: string;
  responsable: string;
  // Evidencia y seguimiento (Parte 2)
  evidencia?: string;
  realizado?: boolean;
  estatus?: "NO_REALIZADO" | "EN_PROCESO" | "REALIZADO";
  planAccion?: string;
}

export type SeccionDistintivoH = "AYB" | "COCINA" | "MANTENIMIENTO" | "ALMACEN" | "AMA_DE_LLAVES";

export interface DistintivoHDto {
  _id?: ObjectId;
  seccion: SeccionDistintivoH;  // AYB | COCINA | MANTENIMIENTO | ALMACEN | AMA_DE_LLAVES
  fecha: string;               // Fecha de auditoría (DD/MM/AAAA o YYYY-MM-DD)
  mesAuditoria?: string;       // Auditoría del mes de (ej. MAYO)
  responsableDepto?: string;   // Responsable del departamento
  auditor?: string;            // Auditor (ej. Onelia Villasis)
  titulo?: string;
  hallazgos: HallazgoItemDto[];
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
