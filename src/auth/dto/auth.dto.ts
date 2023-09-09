import { Prop } from '@nestjs/mongoose';

export class CreateUserDto {
  address: string;
  role: string;
}
export class AuthRequestDto {
  @Prop({ required: true })
  hash: string;
}
export class DecotedHashDto {
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  message: string;
}
