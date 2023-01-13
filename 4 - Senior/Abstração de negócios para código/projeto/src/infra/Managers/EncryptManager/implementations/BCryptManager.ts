import bcrypt from "bcryptjs";
import IEncryptManager from "../../../../auth/use-cases/ports/IEncryptManag";

export default class BCryptManager implements IEncryptManager {
  encrypt(raw: string): Promise<string> {
    return bcrypt.hash(raw, 10);
  }

  compare(raw: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(raw, hashed);
  }
}
