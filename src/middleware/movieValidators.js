import { body, param, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateMovieId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Movie ID must be a positive integer'),
  handleValidationErrors,
];

export const validateMovieQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('genre')
    .optional()
    .isInt()
    .withMessage('Genre ID must be an integer'),
  query('search')
    .optional()
    .isString()
    .withMessage('Search must be a string'),
  handleValidationErrors,
];

export const validateCreateMovie = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),
  body('description')
    .optional()
    .isString(),
  body('release_date')
    .optional()
    .isISO8601()
    .withMessage('Release date must be a valid date'),
  body('director')
    .optional()
    .isString(),
  body('genreIds')
    .optional()
    .isArray()
    .withMessage('Genre IDs must be an array'),
  body('genreIds.*')
    .optional()
    .isInt()
    .withMessage('Each genre ID must be an integer'),
  handleValidationErrors,
];

export const validateUpdateMovie = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty'),
  body('description')
    .optional()
    .isString(),
  body('release_date')
    .optional()
    .isISO8601()
    .withMessage('Release date must be a valid date'),
  body('director')
    .optional()
    .isString(),
  body('genreIds')
    .optional()
    .isArray()
    .withMessage('Genre IDs must be an array'),
  handleValidationErrors,
];






