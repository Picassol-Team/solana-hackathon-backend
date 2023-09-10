import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private readonly taskService:TaskService
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    return await this.projectModel.create(createProjectDto);
  }

  async findAll() {
    return await this.projectModel.find().lean();
  }

  async findOne(id: string) {
    return await this.projectModel.findOne({ _id: id }).lean();
  }

  async getByOwnerAddress(projectOwnerAddress: string) {
    let result = await this.projectModel.find({ projectOwnerAddress: projectOwnerAddress }).lean();
    for (let index = 0; index < result.length; index++) {
      let element = result[index];
      let tasks = await this.taskService.getByProjectId(element._id.toString());
      result[index].totalTask = tasks.length;
    }
    return result;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectModel.updateOne({ _id: id }, updateProjectDto);
  }
}
