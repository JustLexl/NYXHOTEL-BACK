import { ObjectId } from "mongodb";

export interface MktDto {
    _id?: ObjectId;
    name: string;
    area: string;
    client: string;
    startDate: Date;
    deliveryDate: Date;
    mktHours: number;
    status: string;
    services?: string;
    description?: string;
    isDeleted?: boolean;
}
