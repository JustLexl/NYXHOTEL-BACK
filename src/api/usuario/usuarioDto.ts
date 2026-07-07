import { ObjectId } from "mongodb";

export interface UsuariosDto {
    _id?: ObjectId;
    name: string;
    email: string;
    jobPosition: string;
    jobArea: string;
    role: string;
    phone: number;
    firebaseUid?: string;
    isDeleted?: boolean;
}

export interface CreateUsuariosDto extends Omit<UsuariosDto, "_id"> {
    password?: string;
}
