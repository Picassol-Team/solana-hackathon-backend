import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

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
}
