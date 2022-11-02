import { Body, Controller, Delete, Get, ParseUUIDPipe, Patch, Post, Put } from '@nestjs/common';
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
  findById(@Body('id', new ParseUUIDPipe({ version: '4' })) id: string): User {
    return this.usersService.findById(id);
  }

  @Put()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto): User {
    return this.usersService.update(updateUserDto);
  }

  @Delete()
  delete(@Body('id', new ParseUUIDPipe({ version: '4' })) id: string): User[] {
    return this.usersService.delete(id);
  }
}
