import { ObjectId } from 'mongoose';
export declare class CreateTaskDto {
    projectId: ObjectId;
    title: string;
    description: string;
    estimation: number;
    multiplier: number;
}
