import { VerifiedCallback, Strategy } from "passport-jwt";
import { JwtPayload } from "./model/jwt.model";
declare const JwtService_base: new (...args: any[]) => Strategy;
export declare class JwtService extends JwtService_base {
    constructor();
    validate(payload: JwtPayload, done: VerifiedCallback): Promise<void>;
}
export {};
