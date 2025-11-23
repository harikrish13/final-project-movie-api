import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from '../services/reviewService.js';

export async function getAllReviewsHandler(req, res) {
  const {
    page = 1,
    limit = 10,
    movieId,
    userId,
  } = req.query;

  const filters = {
    page: parseInt(page),
    limit: parseInt(limit),
    movieId: movieId ? parseInt(movieId) : null,
    userId: userId ? parseInt(userId) : null
  };

  const result = await getAllReviews(filters);
  res.status(200).json(result);
}

export async function getReviewByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const review = await getReviewById(id);
  res.status(200).json(review);
}

export async function createReviewHandler(req, res, next) {
  try {
    if (!req.user || !req.user.id) {
      const error = new Error('User authentication required');
      error.status = 401;
      return next(error);
    }

    const data = {
      movieId: parseInt(req.body.movieId),
      ratings: req.body.ratings !== undefined ? parseFloat(req.body.ratings) : undefined,
      title: req.body.title,
      content: req.body.content
    };
    const newReview = await createReview(req.user.id, data);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
}

export async function updateReviewHandler(req, res) {
  const id = parseInt(req.params.id);
  const updates = {};
  if (req.body.ratings !== undefined) updates.ratings = req.body.ratings;
  if (req.body.title !== undefined) updates.title = req.body.title;
  if (req.body.content !== undefined) updates.content = req.body.content;

  const updatedReview = await updateReview(id, req.user.id, req.user.role, updates);
  res.status(200).json(updatedReview);
}

export async function deleteReviewHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteReview(id, req.user.id, req.user.role);
  res.status(204).send();
}





