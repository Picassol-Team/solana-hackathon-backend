import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { ProjectSchema } from './project.schema';
import { TaskService } from 'src/task/task.service';
import { Task, TaskSchema } from 'src/task/task.schema';
import { SolanaService } from 'src/solana/solana.service';
import { AuthService } from 'src/auth/auth.service';
import { User, UserSchema } from 'src/auth/user.schema';
import { AvatarGenerator } from 'src/utils/avatarGenerator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService,TaskService,SolanaService,AuthService,AvatarGenerator],
})
export class ProjectModule {}
