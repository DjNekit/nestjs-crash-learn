import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../users/interfaces/User';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async validateUser(email: string, inputPassword: string) {
    const user = await this.usersService.findByEmail(email);

    const { password, ...userData } = user;
    if (!user || password !== inputPassword) {
      throw new UnauthorizedException();
    }

    return userData;
  }

  async login(user: Omit<IUser, 'password'>) {
    const { email, id } = user;

    const payload = {
      email,
      sub: id
    };

    const access_token = await this.jwtService.signAsync(payload);

    return { access_token};
  }
}
