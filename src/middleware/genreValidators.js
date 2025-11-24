import { body, param, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateGenreId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Genre ID must be a positive integer'),
  handleValidationErrors,
];

export const validateGenreQuery = [
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

export const validateCreateGenre = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Genre name is required'),
  handleValidationErrors,
];

export const validateUpdateGenre = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Genre name cannot be empty'),
  handleValidationErrors,
];






