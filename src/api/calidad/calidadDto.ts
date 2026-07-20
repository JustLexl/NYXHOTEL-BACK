import { ObjectId } from "mongodb";

export interface CalidadItemDto {
  nombre: string;
  estado: 'Bien' | 'Mal' | 'No aplica' | '';
  observaciones: string;
}

export interface CalidadSeccionDto {
  nombre: string;
  items: CalidadItemDto[];
}

export interface CalidadReporteDto {
  _id?: ObjectId;
  fecha: string;
  tipo: 'habitacion' | 'spa';
  numero: string; // Número de habitación o cabina
  puntuacion: number; // Puntuación porcentual calculada
  inspector: string;
  secciones: CalidadSeccionDto[];
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
