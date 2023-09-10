import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum RoleEnum {
  CompanyManager = 'CompanyManager',
  ProjectManager = 'ProjectManager',
  Developer = 'Developer',
  Tester = 'Tester',
}

@Schema({
  timestamps:true
})
export class User {
  @Prop({ required: true })
  address: string;
  @Prop({ required: true, default: RoleEnum.Developer })
  role: RoleEnum;
  @Prop()
  nfts: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
