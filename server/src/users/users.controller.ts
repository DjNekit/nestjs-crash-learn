import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/User';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { Roles } from '../lib/decorators/role.decorator';
import { RolesGuard } from '../lib/guards/roles.guard';

@Controller({
  version: '1',
  path: 'users'
})
// @Roles('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<IUser[]> {
    return await this.usersService.findAll();
  }

  @Post()
  async findById(@Body('id', ParseIntPipe) id: number): Promise<IUser> {
    return await this.usersService.findById(id);
  }

  @Put()
  // @Roles('admin')
  @UseGuards(RolesGuard)
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return await this.usersService.create(createUserDto);
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto): Promise<IUser> {
    return await this.usersService.update(updateUserDto);
  }

  @Delete()
  async delete(@Body('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.delete(id);
    return;
  }
}
