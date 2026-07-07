import { ObjectId } from "mongodb";

export interface CicdDto {
    _id?: ObjectId;
    name: string;
    area: string;
    client: string;
    startDate: Date;
    deliveryDate: Date;
    cicdHours: number;
    status: string;
    description?: string;
    isDeleted?: boolean;
}
