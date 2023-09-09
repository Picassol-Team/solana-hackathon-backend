"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const task_schema_1 = require("./task.schema");
const solana_service_1 = require("../solana/solana.service");
const auth_service_1 = require("../auth/auth.service");
let TaskService = class TaskService {
    constructor(taskModel, solanaService, authService) {
        this.taskModel = taskModel;
        this.solanaService = solanaService;
        this.authService = authService;
    }
    async create(createTaskDto) {
        return await this.taskModel.create(createTaskDto);
    }
    async findAll() {
        return await this.taskModel.find().lean();
    }
    async findOne(id) {
        return await this.taskModel.findOne({ _id: id }).lean();
    }
    async update(id, updateTaskDto) {
        return await this.taskModel.updateOne({ _id: id }, updateTaskDto);
    }
    async move(id, newStatus, changerAddress) {
        let model = await this.taskModel.findOne({ _id: id }).lean();
        model.status = newStatus;
        let user = await this.authService.getUser(changerAddress);
        const nft = await this.solanaService.getNFT(user.nfts[0]);
        const metadata = nft.metadata;
        return await this.taskModel.updateOne({ _id: id }, model);
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, solana_service_1.SolanaService, auth_service_1.AuthService])
], TaskService);
//# sourceMappingURL=task.service.js.map