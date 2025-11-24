import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserReviews,
} from '../services/userService.js';
import bcrypt from 'bcrypt';
import { findUserByEmail } from '../respositories/userRepo.js';
import Prisma from '../generated/prisma/index.js';

export async function getAllUsersHandler(req, res) {
  const users = await getAllUsers();
  res.status(200).json(users);
}

export async function getCurrentUserHandler(req, res) {
  const user = await getUserById(req.user.id);
  res.status(200).json(user);
}

export async function updateCurrentUserHandler(req, res) {
  const { userName, email, password } = req.body;
  
  if (!userName && !email && !password) {
    const error = new Error('At least one field (userName, email, or password) must be provided');
    error.status = 400;
    throw error;
  }

  const updateData = {};
  
  if (userName) {
    updateData.userName = userName;
  }
  
  if (email) {
    updateData.email = email;
  }
  
  if (password) {
    updateData.password_hash = await bcrypt.hash(password, 10);
  }

  try {
    const updatedUser = await updateUser(req.user.id, updateData);
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const conflictError = new Error('Email is not unique');
        conflictError.status = 409;
        throw conflictError;
      }
    }
    throw error;
  }
}

export async function deleteCurrentUserHandler(req, res) {
  await deleteUser(req.user.id);
  res.status(204).send();
}

export async function getCurrentUserReviewsHandler(req, res) {
  const reviews = await getUserReviews(req.user.id);
  res.status(200).json(reviews);
}

export async function updateUserRoleHandler(req, res) {
  const { id } = req.params;
  const { role } = req.body;
  
  if (!role) {
    const error = new Error('Role is required');
    error.status = 400;
    throw error;
  }
  
  if (role !== 'user' && role !== 'admin') {
    const error = new Error('Invalid role. Must be user or admin');
    error.status = 400;
    throw error;
  }

  try {
    const updatedUser = await updateUser(parseInt(id), { role });
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        const notFoundError = new Error('User not found');
        notFoundError.status = 404;
        throw notFoundError;
      }
    }
    throw error;
  }
}


