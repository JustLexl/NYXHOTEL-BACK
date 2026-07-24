import { ObjectId } from "mongodb";

export interface InventarioDto {
    _id?: ObjectId;
    departamento?: string;
    puesto?: string;
    nombreEquipo?: string;
    equipo?: string;
    marcaModelo?: string;
    numeroSerie?: string;
    memoria?: string;
    versionSO?: string;
    comentarios?: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
