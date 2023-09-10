import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto, CreateUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  @Get('getUser/:address')
  findOne(@Param('address') address: string) {
    return this.authService.findOne(address);
  }

  @Post('login')
  async login(@Body() authRequestDto: AuthRequestDto) {
    return await this.authService.login(authRequestDto);
  }
}
