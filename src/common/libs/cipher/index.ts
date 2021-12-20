import * as bcrypt from 'bcrypt';

export class Cipher {
  static async ENCRYPT(plainText: string, saltRound = 10): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(plainText, salt);
    return hashedPassword;
  }

  static async COMPARE(plainText: string, encrytText: string): Promise<boolean> {
    return await bcrypt.compare(plainText, encrytText);
  }
}
