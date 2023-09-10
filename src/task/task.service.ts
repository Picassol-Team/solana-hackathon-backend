import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto, MoveTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatusEnum, Task } from './task.schema';
import { SolanaService } from 'src/solana/solana.service';
import { AuthService } from 'src/auth/auth.service';
import { UpdateNftDto } from 'src/solana/dto/solana.dto';

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

  async getByProjectId(projectId: string) {
    return await this.taskModel.findOne({ projectId: projectId }).lean();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.taskModel.updateOne({ _id: id }, updateTaskDto);
  }

  async move(id: string, moveTaskDto: MoveTaskDto) {

    let model = await this.taskModel.findOne({ _id: id }).lean();

    if(moveTaskDto.status != model.status){
      model.status = moveTaskDto.status;
      await this.taskModel.updateOne({ _id: id }, model);

      if(moveTaskDto.status == TaskStatusEnum.Done){
        let user = await this.authService.getUser(moveTaskDto.changerAddress);
  
        const nft = await this.solanaService.getNFT(user.nfts[0]);
        let metadata = nft.metadata;
        let updateNftDto:UpdateNftDto;

        await this.solanaService.updateNFT(user.nfts[0],metadata,updateNftDto);
      }
  
      return {success:true};
    }
    throw new HttpException('CONTINUE', HttpStatus.CONTINUE);
  }
}
