import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
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

  create(userData: Omit<User, 'id'>): User {
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

  update(updatedUser: User) {
    const userIndex = this.users.findIndex(user => user.id === updatedUser.id);

    if (userIndex === -1) {
      throw new NotFoundException();
    }

    this.users[userIndex] = updatedUser;

    return this.users[userIndex];
  }

  delete(id: string) {
    this.users = this.users.filter(user => user.id !== id);

    return this.users;
  }
}
