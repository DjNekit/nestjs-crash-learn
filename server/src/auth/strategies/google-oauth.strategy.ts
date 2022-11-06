import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { IUserData } from "../../users/interfaces/User";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: '28360486616-9t4msfqdc557n092ldkj7nr849jtgp9a.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/v1/oauth2/redirect/google',
      scope: ['profile'],
      state: true
    });
  }

  verify(accessToken, refreshToken, profile, cb) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return null;
  }
}