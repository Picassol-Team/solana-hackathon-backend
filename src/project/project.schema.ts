import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

export enum ProjectStatusEnum {
  Draft = 'Draft',
  InProgress = 'InProgress',
  Done = 'Done',
  Cancelled = 'Cancelled',
}

@Schema({
  timestamps:true
})
export class Project {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  projectOwnerAddress: string;
  @Prop({ required: true, enum:ProjectStatusEnum, default:ProjectStatusEnum.Draft })
  status: ProjectStatusEnum;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
