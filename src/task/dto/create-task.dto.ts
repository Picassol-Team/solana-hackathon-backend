import { ObjectId } from 'mongoose';
import { TaskStatusEnum } from '../task.schema';

export class CreateTaskDto {
  projectId: ObjectId;
  title: string;
  description: string;
  estimation: number;
  multiplier: number;
  status:string;
}

export class MoveTaskDto {
  status:TaskStatusEnum;
  changerAddress:string
}
