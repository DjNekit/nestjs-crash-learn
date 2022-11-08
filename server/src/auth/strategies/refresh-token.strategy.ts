import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
      passReqToCallback: true
    });
  }

  async validate(req, payload) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return {
      ...payload, refreshToken
    };
  }
}