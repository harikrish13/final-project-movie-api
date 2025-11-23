import { param, query, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateUserId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
  handleValidationErrors,
];

export const validateUserQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors,
];

export const validateUserUpdate = [
  body('userName')
    .optional()
    .trim()
    .isString()
    .withMessage('userName must be a string')
    .isLength({ min: 3 })
    .withMessage('userName must be at least 3 characters'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('email is not valid')
    .normalizeEmail(),
  
  body('password')
    .optional()
    .isLength({min: 8, max: 64})
    .withMessage('password must contain at least 8 characters and at most 64'),
  
  handleValidationErrors,
];

export const validateRoleUpdate = [
  body('role')
    .exists()
    .withMessage('role is required')
    .isIn(['user', 'admin'])
    .withMessage('role must be user or admin'),
  
  handleValidationErrors,
];


