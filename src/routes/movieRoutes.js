import express from 'express';
import {
  validateMovieId,
  validateMovieQuery,
  validateCreateMovie,
  validateUpdateMovie,
} from '../middleware/movieValidators.js';

import {
  getAllMoviesHandler,
  getMovieByIdHandler,
  createMovieHandler,
  updateMovieHandler,
  deleteMovieHandler,
} from '../controllers/movieController.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', validateMovieQuery, getAllMoviesHandler);
router.get('/:id', validateMovieId, getMovieByIdHandler);
router.post('/', authenticate, authorizeRoles('admin'), validateCreateMovie, createMovieHandler);
router.put('/:id', validateMovieId, authenticate, authorizeRoles('admin'), validateUpdateMovie, updateMovieHandler);
router.delete('/:id', validateMovieId, authenticate, authorizeRoles('admin'), deleteMovieHandler);

export default router;






