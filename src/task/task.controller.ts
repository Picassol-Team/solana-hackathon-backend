import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, MoveTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Get('getByProjectId/:projectid')
  getByOwnerAddress(@Param('projectid') projectid: string) {
    return this.taskService.getByProjectId(projectid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Patch('move/:id')
  move(@Param('id') id: string, @Body() moveTaskDto: MoveTaskDto) {
    return this.taskService.update(id, moveTaskDto);
  }
}
