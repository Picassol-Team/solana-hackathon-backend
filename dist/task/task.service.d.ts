/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { StatusEnum, Task } from './task.schema';
import { SolanaService } from 'src/solana/solana.service';
import { AuthService } from 'src/auth/auth.service';
export declare class TaskService {
    private taskModel;
    private readonly solanaService;
    private readonly authService;
    constructor(taskModel: Model<Task>, solanaService: SolanaService, authService: AuthService);
    create(createTaskDto: CreateTaskDto): Promise<import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<(import("mongoose").FlattenMaps<Task> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<Task> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<import("mongoose").UpdateWriteOpResult>;
    move(id: string, newStatus: StatusEnum, changerAddress: string): Promise<import("mongoose").UpdateWriteOpResult>;
}
