import * as bcrypt from 'bcrypt';

class EncryptService {
  public static async encrypt(value: string) {
    return bcrypt.hash(value, 10);
  }

  public static async verify(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}

export default EncryptService;
export type IEncryptService = typeof EncryptService;
