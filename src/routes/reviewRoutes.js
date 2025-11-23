import express from 'express';
import {
  validateReviewId,
  validateReviewQuery,
  validateCreateReview,
  validateUpdateReview,
} from '../middleware/reviewValidators.js';

import {
  getAllReviewsHandler,
  getReviewByIdHandler,
  createReviewHandler,
  updateReviewHandler,
  deleteReviewHandler,
} from '../controllers/reviewController.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();

router.get('/', validateReviewQuery, getAllReviewsHandler);
router.get('/:id', validateReviewId, getReviewByIdHandler);
router.post('/', authenticate, validateCreateReview, createReviewHandler);
router.put('/:id', validateReviewId, authenticate, authorizeOwnership, validateUpdateReview, updateReviewHandler);
router.delete('/:id', validateReviewId, authenticate, authorizeOwnership, deleteReviewHandler);

export default router;






