import { ObjectId } from "mongodb";

export interface ItemReporteDto {
  descripcion: string;
  bien: boolean | null;
  mal: boolean | null;
  observaciones: string;
}

export interface RestauranteReporteDto {
  nombre: string;
  items: ItemReporteDto[];
  comentarios: string;
}

export interface EvidenciaImagenDto {
  preview: string;
  label: string;
}

export interface ReporteGuardiaDto {
  _id?: ObjectId;
  fecha: string;
  nombreEjecutivo: string;
  areasHuespedes: ItemReporteDto[];
  comentariosAreasHuespedes: string;
  equipos: ItemReporteDto[];
  comentariosEquipos: string;
  areasColaboradores: ItemReporteDto[];
  comentariosColaboradores: string;
  restaurantes: RestauranteReporteDto[];
  incidentes: string;
  firmaEjecutivo?: string;
  evidencias?: Record<string, EvidenciaImagenDto[]>;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
