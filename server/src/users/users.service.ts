import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { User } from './entity/user.entity';
import { IUser } from './interfaces/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  // private users: IUser[] = [
  //   {
  //     id: uuidv4(),
  //     name: 'Nikita',
  //     email: 'nikitalipin97@gmail.com'
  //   }
  // ];

  async findAll(): Promise<IUser[]> {
    return await this.usersRepository.find();
  }

  async findById(id: number): Promise<IUser> {
    return await this.usersRepository.findOneBy({ id });
  }

  async create(userData: CreateUserDto): Promise<IUser> {
    try {
      const { email, name } = userData;
      const newUser = new User();
      newUser.name = name;
      newUser.email = email;

      await this.usersRepository.save(newUser);
      return newUser;

    } catch(e) {
      throw new InternalServerErrorException();
    }
  }

  // update(updatedUserData: UpdateUserDto): IUser {
  //   const user = this.users.find(user => user.id === updatedUserData.id);

  //   if (!user) {
  //     throw new NotFoundException();
  //   }
  //   const id = user.id;
  //   const userIndex = this.users.findIndex(user => user.id === updatedUserData.id);

  //   const updatedUser = {
  //     ...user,
  //     ...updatedUserData,
  //     id
  //   };

  //   this.users[userIndex] = updatedUser;

  //   return updatedUser;
  // }

  async delete(id: number): Promise<void> {
    try {
      await this.usersRepository.delete({ id });
    } catch(e) {
      throw new InternalServerErrorException();
    }
  }
}
