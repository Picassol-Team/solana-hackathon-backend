import { Prop } from '@nestjs/mongoose';

export class CreateUserDto {
  address: string;
  role: string;
  nfts: string[];
}
export class UserDto {
  address: string;
  role: string;
  nfts: string[];
}
export class AuthRequestDto {
  hash: string;
}
export class DecotedHashDto {
  address: string;
  message: string;
}
