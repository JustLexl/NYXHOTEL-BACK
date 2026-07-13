import { ObjectId } from "mongodb";

export interface ControlLlavesDto {
  _id?: ObjectId;
  tipo: 'ENTREGADA' | 'DEVUELTA';
  tipoLlave: 'MAGNETICA' | 'METALICA';
  entregadaId?: string;
  fecha: string;
  hora: string;
  colaborador: string;
  departamento: string;
  puesto: string;
  numeroLlave: string;
  numeroPiezas: number;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
