import { sign } from "jsonwebtoken";
import ITokenManager from "../../../../auth/use-cases/ports/ITokenManager";

export default class JwtManager implements ITokenManager {
  generate(id: string): string {
    const token = sign({}, process.env.JWT_HASH_SECRET, {
      expiresIn: "1d",
      subject: id,
    });

    return token;
  }
}
