import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

export enum StatusEnum {
  Todo = 'Todo',
  Doing = 'Doing',
  Done = 'Done',
}

@Schema()
export class Task {
  @Prop({ required: true, type: ObjectId, ref: 'project' })
  projectId: ObjectId;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true, enum:StatusEnum })
  status: StatusEnum;
  @Prop({ required: true})
  estimation: number;
  @Prop({ required: true, default: 1 })
  multiplier: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
