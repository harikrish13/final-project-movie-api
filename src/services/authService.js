import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Prisma from '../generated/prisma/index.js';
import * as userRepo from '../respositories/userRepo.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export async function signUp(userName, email, password, role = 'user') {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await userRepo.createUser({ 
      userName, 
      email, 
      password_hash: hashedPassword, 
      role 
    });
    return newUser;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const conflictError = new Error('Email has already been used');
        conflictError.status = 409;
        throw conflictError;
      }
    }
    throw error;
  }
}

export async function logIn(email, password) {
  if (!JWT_SECRET) {
    const error = new Error('JWT_SECRET is not configured');
    error.status = 500;
    throw error;
  }

  const user = await userRepo.findUserByEmail(email);
  if (!user) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }
  
  const isMatch = await bcrypt.compare(password, user.Password_hash);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }
  const accessToken = jwt.sign(
    { id: user.USER_ID, role: user.Role }, 
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
  return accessToken;
}
