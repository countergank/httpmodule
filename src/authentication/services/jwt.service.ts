import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, VerifiedCallback, Strategy } from "passport-jwt";
import { JwtPayload } from "./model/jwt.model";
import * as fs from "fs";
import { key } from "../auth.module";

@Injectable()
export class JwtService extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: fs.readFileSync(key, "utf-8"),
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    return done(
      null,
      {
        userId: payload.userId,
        username: payload.username,
        roles: payload.roles,
      },
      payload.iat
    );
  }
}
