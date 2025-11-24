import * as reviewRepo from '../respositories/reviewRepo.js';
import { getMovieById } from './movieService.js';
import { NotFoundError, ConflictError, ValidationError, ForbiddenError } from '../utils/errors.js';

export async function getAllReviews(filters = {}) {
  const result = await reviewRepo.findAllReviews(filters);
  return {
    reviews: result.reviews,
    pagination: {
      page: result.page,
      limit: result.limit,
      total: result.total,
      pages: Math.ceil(result.total / result.limit)
    }
  };
}

export async function getReviewById(reviewId) {
  if (isNaN(reviewId)) {
    throw new ValidationError('Invalid review ID');
  }

  const review = await reviewRepo.findReviewById(reviewId);
  if (!review) {
    throw new NotFoundError('Review');
  }

  return review;
}

export async function createReview(userId, reviewData) {
  if (!userId || isNaN(userId)) {
    throw new ValidationError('Invalid user ID');
  }

  const { movieId, ratings, title, content } = reviewData;

  if (isNaN(movieId)) {
    throw new ValidationError('Invalid movie ID');
  }

  await getMovieById(movieId);

  const existingReview = await reviewRepo.findReviewByUserAndMovie(userId, movieId);
  if (existingReview) {
    throw new ConflictError('You have already reviewed this movie');
  }

  return reviewRepo.createReview({
    userId,
    movieId,
    ratings,
    title,
    content
  });
}

export async function updateReview(reviewId, userId, userRole, reviewData) {
  if (isNaN(reviewId)) {
    throw new ValidationError('Invalid review ID');
  }

  const review = await reviewRepo.findReviewById(reviewId);
  if (!review) {
    throw new NotFoundError('Review');
  }

  if (userRole !== 'admin' && review.User_ID !== userId) {
    throw new ForbiddenError('You can only modify your own reviews');
  }

  return reviewRepo.updateReviewById(reviewId, reviewData);
}

export async function deleteReview(reviewId, userId, userRole) {
  if (isNaN(reviewId)) {
    throw new ValidationError('Invalid review ID');
  }

  const review = await reviewRepo.findReviewById(reviewId);
  if (!review) {
    throw new NotFoundError('Review');
  }

  if (userRole !== 'admin' && review.User_ID !== userId) {
    throw new ForbiddenError('You can only delete your own reviews');
  }

  await reviewRepo.deleteReviewById(reviewId);
}
