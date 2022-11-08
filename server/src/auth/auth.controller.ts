import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import * as cookie from 'cookie';
import { User } from 'src/lib/decorators/user.decorator';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { SigninGuard } from './guards/signin.guard';

@Controller({
  version: '1',
  path: '/auth'
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res
  ) {
    const { accessToken, refreshToken } = await this.authService.signup(createUserDto);

    res.setHeader('Set-Cookie', cookie.serialize('refresh-token', refreshToken, {
      httpOnly: true
    }));

    return {
      accessToken
    };
  }

  @Post('/signin')
  @UseGuards(SigninGuard)
  async signIn(
    @User() user,
    @Res({ passthrough: true }) res
  ) {
    const { accessToken, refreshToken } = await this.authService.signin(user);

    res.setHeader('Set-Cookie', cookie.serialize('refresh-token', refreshToken, {
      httpOnly: true
    }));

    return { accessToken };
  }

  @Post('/logout')
  @UseGuards(AccessTokenGuard)
  async logout(
    @User('id') id: number,
    @Res({ passthrough: true }) res
  ) {

    await this.authService.logout(id);
    
    res.setHeader('Set-Cookie', cookie.serialize('refresh-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    }));

    return {};
  }

  @Post('/refresh-token')
  @UseGuards(AccessTokenGuard)
  async refreshToken(
    @User('id') id: number,
    @Res({ passthrough: true }) res
  ) {
    
    console.log(typeof id);
    return {};
  }
}
