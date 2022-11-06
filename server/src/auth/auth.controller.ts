import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller({
  version: '1',
  path: '/auth'
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }

  @Post('oauth2/redirect/google')
  async redirect(@Req() req) {
    console.log(req);
    return null;
  }
}
