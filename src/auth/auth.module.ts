import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { AvatarGenerator } from 'src/utils/avatarGenerator';
import { SolanaService } from 'src/solana/solana.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService,SolanaService,AvatarGenerator],
})
export class AuthModule {}
