import * as userRepo from '../respositories/userRepo.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

export async function getAllUsers() {
  return userRepo.findAllUsers();
}

export async function getUserById(userId) {
  if (isNaN(userId)) {
    throw new ValidationError('Invalid user ID');
  }

  const user = await userRepo.findUserById(userId);
  if (!user) {
    throw new NotFoundError('User');
  }

  return user;
}

export async function updateUser(userId, data) {
  if (isNaN(userId)) {
    throw new ValidationError('Invalid user ID');
  }

  const user = await userRepo.findUserById(userId);
  if (!user) {
    throw new NotFoundError('User');
  }

  return await userRepo.updateUserById(userId, data);
}

export async function deleteUser(userId) {
  if (isNaN(userId)) {
    throw new ValidationError('Invalid user ID');
  }

  const user = await userRepo.findUserById(userId);
  if (!user) {
    throw new NotFoundError('User');
  }

  return await userRepo.deleteUserById(userId);
}

export async function getUserReviews(userId) {
  if (isNaN(userId)) {
    throw new ValidationError('Invalid user ID');
  }

  const user = await userRepo.findUserById(userId);
  if (!user) {
    throw new NotFoundError('User');
  }

  return await userRepo.findUserReviewsByUserId(userId);
}


