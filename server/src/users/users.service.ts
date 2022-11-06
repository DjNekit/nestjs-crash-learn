import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findAll(): Promise<IUser[]> {
    return await this.usersRepository.find();
  }

  async findById(id: number): Promise<IUser> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      return null;
    }

    return user;
  }

  async create(userData: CreateUserDto): Promise<void> {
    try {
      const newUser = new User();

      for (const userField in userData) {
        newUser[userField] = userData[userField];
      }

      await this.usersRepository.save(newUser);

    } catch(e) {
      throw new InternalServerErrorException();
    }
  }

  async update(updatedUserData: UpdateUserDto): Promise<IUser> {
    const { id, name, email } = updatedUserData;
    const user = await this.usersRepository.findOneBy({ id });
    
    user.name = name;
    user.email = email;

    return await this.usersRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    try {
      await this.usersRepository.delete({ id });
    } catch(e) {
      throw new InternalServerErrorException();
    }
  }
}
