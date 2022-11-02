import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { User } from './interfaces/User';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: uuidv4(),
      name: 'Nikita',
      email: 'nikitalipin97@gmail.com'
    }
  ];

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  create(userData: CreateUserDto): User {
    try {
      const id = uuidv4();

      const newUser = {
        ...userData,
        id
      };

      this.users.push(newUser);

      return newUser;

    } catch(e) {
      throw new InternalServerErrorException();
    }
  }

  update(updatedUserData: UpdateUserDto): User {
    const user = this.users.find(user => user.id === updatedUserData.id);

    if (!user) {
      throw new NotFoundException();
    }
    const id = user.id;
    const userIndex = this.users.findIndex(user => user.id === updatedUserData.id);

    const updatedUser = {
      ...user,
      ...updatedUserData,
      id
    };

    this.users[userIndex] = updatedUser;

    return updatedUser;
  }

  delete(id: string): User[] {
    this.users = this.users.filter(user => user.id !== id);

    return this.users;
  }
}
