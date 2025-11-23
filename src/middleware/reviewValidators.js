import { body, param, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateReviewId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Review ID must be a positive integer'),
  handleValidationErrors,
];

export const validateReviewQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('movieId')
    .optional()
    .isInt()
    .withMessage('Movie ID must be an integer'),
  query('userId')
    .optional()
    .isInt()
    .withMessage('User ID must be an integer'),
  handleValidationErrors,
];

export const validateCreateReview = [
  body('movieId')
    .notEmpty()
    .withMessage('Movie ID is required')
    .isInt({ min: 1 })
    .withMessage('Movie ID must be a positive integer')
    .toInt(),
  body('ratings')
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage('Ratings must be between 0 and 10')
    .toFloat(),
  body('title')
    .optional()
    .trim()
    .isString(),
  body('content')
    .optional()
    .trim()
    .isString(),
  handleValidationErrors,
];

export const validateUpdateReview = [
  body('ratings')
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage('Ratings must be between 0 and 10'),
  body('title')
    .optional()
    .trim()
    .isString(),
  body('content')
    .optional()
    .trim()
    .isString(),
  handleValidationErrors,
];





