import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { IUser, IUserData } from '../users/interfaces/User';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/createUserDto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async validateUser(email: string, inputPassword: string) {
    const user = await this.usersService.findByEmail(email);

    const { password, ...userData } = user;
    const isMatch = await bcrypt.compare(inputPassword, password);
    if (!user || !isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    return userData;
  }

  async signin(user: IUserData) {
    const { email, id, refreshToken } = user;

    const payload = {
      email,
      sub: id
    };

    const accessToken = await this.jwtService.signAsync(payload);

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
    
    const newUser: IUser = await this.usersService.create({
      ...createUserDto,
      password: hashPassword
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);


    await this.usersService.findAndUpdateById(newUser.id, {
      refreshToken: tokens.refreshToken
    });
    
    return tokens;
  }

  async logout(id: number): Promise<void> {
    try {
      await this.usersService.findAndUpdateById(id, {
        refreshToken: null
      });
    } catch(e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async refreshTokens() {
    return {};
  }

  async getTokens(id: number, email: string) {
    const payload = {
      sub: id,
      email
    };

    const accessTokenOptions = {
      expiresIn: '60s'
    };

    const refreshTokenOptions = {
      expiresIn: '7d'
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, accessTokenOptions),
      this.jwtService.signAsync(payload, refreshTokenOptions)
    ]);

    return {
      accessToken,
      refreshToken
    };
  }
}
