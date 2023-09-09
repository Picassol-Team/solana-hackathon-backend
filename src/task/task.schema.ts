import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true, type: ObjectId, ref: 'project' })
  projectId: ObjectId;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  estimation: Date;
  @Prop({ required: true, default: 1 })
  priorty: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
