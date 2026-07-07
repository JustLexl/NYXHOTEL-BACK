import { ObjectId } from "mongodb";

export interface ListaReportesDto {
    _id?: ObjectId;
    area: string;
    reportType: string;
    startDate?: Date;
    endDate?: Date;
    reportCreator: string;
    targetName?: string;
    targetStatus?: string;
    createdAt?: Date;
    updatedAt?: Date;
    stats?: any[];
    logs?: any[];
    isDeleted?: boolean;
}


