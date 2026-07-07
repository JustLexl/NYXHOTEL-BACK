import { ObjectId } from "mongodb";

export interface ListaProyectosDto {
    _id?: ObjectId;
    projectName: string;
    area: string;
    client: string;
    startDate: Date;
    deliveryDate: Date;
    workStatus: string;
    generalStatus: string;
    developerInCharge?: string;
    description?: string;
    isDeleted?: boolean;
}
