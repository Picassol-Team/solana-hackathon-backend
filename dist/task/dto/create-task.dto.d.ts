import { ObjectId } from 'mongoose';
export declare class CreateTaskDto {
    projectId: ObjectId;
    title: string;
    description: string;
    estimation: Date;
    priorty: number;
}
