import { ObjectId } from "mongodb";

export interface CuentaDto {
    _id?: ObjectId;
    nombre?: string;
    departamento?: string;
    puesto?: string;
    tipoCuenta?: string;
    correo?: string;
    contrasena?: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
