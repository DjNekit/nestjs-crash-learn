import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUserDto';
import { User } from './interfaces/User';
import { UpdateUserDto } from './dto/updateUserDto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers(): User[] {
    return this.usersService.findAll();
  }

  @Post()
  findById(@Body('id') id: string): User {
    const user = this.usersService.findById(id);

    return user;
  }

  @Put()
  create(@Body() body: CreateUserDto): User {
    const newUser = this.usersService.create(body);

    return newUser;
  }

  @Patch()
  update(@Body() body: UpdateUserDto): User {
    const user = this.usersService.update(body);

    return user;
  }

  @Delete()
  delete(@Body('id') id: string): User[] {
    const users = this.usersService.delete(id);

    return users;
  }
}
