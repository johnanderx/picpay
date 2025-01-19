import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export async function encryptPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

export async function validatePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
