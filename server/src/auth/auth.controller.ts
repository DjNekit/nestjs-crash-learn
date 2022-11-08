import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import * as cookie from 'cookie';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { AuthService } from './auth.service';
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
    @Req() req,
    @Res({ passthrough: true }) res
  ) {
    const { accessToken, refreshToken } = await this.authService.signin(req.user);

    res.setHeader('Set-Cookie', cookie.serialize('refresh-token', refreshToken, {
      httpOnly: true
    }));

    return { accessToken };
  }
}
