import { ObjectId } from 'mongoose';

export class CreateTaskDto {
  projectId: ObjectId;
  title: string;
  description: string;
  estimation: number;
  multiplier: number;
}
