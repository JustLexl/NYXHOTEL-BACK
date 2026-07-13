import { ObjectId } from "mongodb";

export interface AlcoholimetroDto {
  _id?: ObjectId;
  fecha: string;
  nombre: string;
  observaciones: string;
  departamento: string;
  destacado?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

export interface AccidenteDto {
  _id?: ObjectId;
  fecha: string;
  nombreHuesped: string;
  habitacion: string;
  lugar: string;
  descripcion: string;
  acciones: string;
  reportadoPor: string;
  tipoAtencion: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

export interface AccidenteColaboradorDto {
  _id?: ObjectId;
  fecha: string;
  nombreColaborador: string;
  areaColaborador: string;
  observaciones: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

export interface ExtravioDto {
  _id?: ObjectId;
  fecha: string;
  habitacion: string;
  nombreHuesped: string;
  observaciones: string;
  categoria: 'HABITACIONES' | 'AREAS_COMUNES';
  estado: 'ENCONTRADO' | 'NO_ENCONTRADO' | 'PENDIENTE';
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
