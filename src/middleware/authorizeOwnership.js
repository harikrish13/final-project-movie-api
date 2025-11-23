import { findReviewById } from '../respositories/reviewRepo.js';

export async function authorizeOwnership(req, res, next) {
  try {
    const reviewId = parseInt(req.params.id);
    const review = await findReviewById(reviewId);

    if (!review) {
      const error = new Error('Review not found');
      error.status = 404;
      return next(error);
    }

    if (review.User_ID !== req.user.id && req.user.role !== 'admin') {
      const error = new Error('Forbidden: INSUFFICIENT PERMISSION');
      error.status = 403;
      return next(error);
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

