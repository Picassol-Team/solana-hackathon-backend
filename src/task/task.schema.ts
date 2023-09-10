import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import mongoose, { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

export enum TaskStatusEnum {
  Todo = 'Todo',
  InProgress = 'InProgress',
  Done = 'Done',
}

@Schema({
  timestamps:true
})
export class Task {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'project' })
  projectId: ObjectId;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true, enum:TaskStatusEnum, default:TaskStatusEnum.Todo })
  status: TaskStatusEnum;
  @Prop({ required: true})
  estimation: number;
  @Prop({ required: true, default: 1 })
  multiplier: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
