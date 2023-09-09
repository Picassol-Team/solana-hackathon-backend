import { ObjectId } from 'mongoose';

export class CreateTaskDto {
  projectId: ObjectId;
  title: string;
  description: string;
  estimation: Date;
  priorty: number;
}
