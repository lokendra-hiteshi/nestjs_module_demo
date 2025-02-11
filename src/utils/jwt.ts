import * as jwt from 'jsonwebtoken';
import { JwtPayload, Secret } from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY: Secret =
  process.env.JWT_SECRET_KEY ||
  'this1ismyjwt2secret3keyfor4authentication675453';
const TOKEN_EXPIRATION = 7 * 24 * 60 * 60;

export const generateToken = (email: string): string => {
  if (!SECRET_KEY) {
    throw new Error('Missing SECRET_KEY environment variable');
  }
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
};

export const verifyToken = (token: string): JwtPayload | null => {
  if (!SECRET_KEY) {
    throw new Error('Missing SECRET_KEY environment variable');
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return typeof decoded === 'string' ? null : decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};
