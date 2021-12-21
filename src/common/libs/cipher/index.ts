import * as bcrypt from 'bcrypt';

export class Cipher {
  // 파라미터로 전달받은 평문을 암호화하여 반환
  static async ENCRYPT(plainText: string, saltRound = 10): Promise<string> {
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(plainText, salt);
    return hashedPassword;
  }

  // 기존 암호화된 값와 평문을 비교하여 결과값을 반환 (true / false)
  static async COMPARE(plainText: string, encrytText: string): Promise<boolean> {
    return await bcrypt.compare(plainText, encrytText);
  }
}
