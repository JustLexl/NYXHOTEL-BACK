import { ObjectId } from "mongodb";

export interface ClienteDto {
    _id?: ObjectId;
    clientName: string;
    email: string;
    phone?: string;
    registrationDate?: Date;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
}
