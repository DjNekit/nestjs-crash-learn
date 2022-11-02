import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/User';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';

@Controller({
  version: '1',
  path: 'users'
})
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers(): User[] {
    return this.usersService.findAll();
  }

  @Post()
  findById(@Body('id') id: string): User {
    return this.usersService.findById(id);
  }

  @Put()
  create(@Body() body: CreateUserDto): User {
    return this.usersService.create(body);
  }

  @Patch()
  update(@Body() body: UpdateUserDto): User {
    return this.usersService.update(body);
  }

  @Delete()
  delete(@Body('id') id: string): User[] {
    return this.usersService.delete(id);
  }
}
