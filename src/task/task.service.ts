import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { StatusEnum, Task } from './task.schema';
import { SolanaService } from 'src/solana/solana.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>, private readonly solanaService:SolanaService, private readonly authService:AuthService ) {}

  async create(createTaskDto: CreateTaskDto) {
    return await this.taskModel.create(createTaskDto);
  }

  async findAll() {
    return await this.taskModel.find().lean();
  }

  async findOne(id: string) {
    return await this.taskModel.findOne({ _id: id }).lean();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.taskModel.updateOne({ _id: id }, updateTaskDto);
  }

  async move(id: string, newStatus: StatusEnum, changerAddress:string) {

    let model = await this.taskModel.findOne({ _id: id }).lean();
    model.status = newStatus;

    let user = await this.authService.getUser(changerAddress);

    const nft = await this.solanaService.getNFT(user.nfts[0]);

    const metadata = nft.metadata;
    // TRANSFER

    return await this.taskModel.updateOne({ _id: id }, model);
  }
}
