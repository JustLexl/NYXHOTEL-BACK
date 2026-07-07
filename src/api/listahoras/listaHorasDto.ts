import { ObjectId } from "mongodb";

export interface ListaHorasDto {
    _id?: ObjectId;
    developer: string;
    projectName: string;
    area: string;
    hoursWorked: number;
    date: Date;
    isDeleted?: boolean;
    taskType?: string;
}
