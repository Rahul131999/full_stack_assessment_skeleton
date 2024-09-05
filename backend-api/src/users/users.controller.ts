import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('find-all')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('find-by-home/:id')
  async findByHome(@Param('id') homeId: number): Promise<User[]> {
    return this.usersService.findByHome(homeId);
  }
}
