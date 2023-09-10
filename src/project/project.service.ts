import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
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
    return await this.projectModel.findOne({ projectOwnerAddress: projectOwnerAddress }).lean();
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectModel.updateOne({ _id: id }, updateProjectDto);
  }
}
