import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { SolanaService } from 'src/solana/solana.service';
import { AuthService } from 'src/auth/auth.service';
import { User, UserSchema } from 'src/auth/user.schema';
import { AvatarGenerator } from 'src/utils/avatarGenerator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService,AuthService,SolanaService,AvatarGenerator],
})
export class TaskModule {}
