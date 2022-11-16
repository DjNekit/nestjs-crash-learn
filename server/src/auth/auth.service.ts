import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { Payload, Tokens } from './interfaces/tokens';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) { }

  async validateUser(email: string, inputPassword: string) {
    const user = await this.usersService.findByEmail(email);

    const { password, ...userData } = user;
    const isMatch = await bcrypt.compare(inputPassword, password);
    if (!user || !isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    return userData;
  }

  async signin(user): Promise<Tokens> {
    const { email, id } = user;

    const payload = {
      email,
      sub: id
    };

    const { accessToken, refreshToken } = await this.getTokens(payload);

    await this.usersService.updateByIdOrFail(id, {
      refreshToken
    });

    return { accessToken, refreshToken };
  }

  async signup(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const isUserExist = Boolean(await this.usersService.findByEmail(email));

    if (isUserExist) {
      throw new BadRequestException('User already exist');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashPassword
    });

    const payload = {
      sub: newUser.id,
      email
    };

    const tokens = await this.getTokens(payload);


    await this.usersService.updateByIdOrFail(newUser.id, {
      refreshToken: tokens.refreshToken
    });

    return tokens;
  }

  async logout(id: number): Promise<void> {
    await this.usersService.updateByIdOrFail(id, {
      refreshToken: null
    });
  }

  async refreshTokens(id: number, refreshToken: string): Promise<Tokens> {
    const user = await this.usersService.findByIdOrFail(id);

    const isRefreshTokenValide = refreshToken === user.refreshToken;

    if (!isRefreshTokenValide) {
      await this.usersService.updateByIdOrFail(id, {
        refreshToken: null
      });
      return null;
    }

    const payload = {
      sub: user.id,
      email: user.email
    };

    const tokens = await this.getTokens(payload);

    return tokens;
  }

  async getTokens(payload: Payload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: '6s' }),
      this.jwtService.signAsync(payload, { expiresIn: '7d' })
    ]);

    return {
      accessToken,
      refreshToken
    };
  }
}
