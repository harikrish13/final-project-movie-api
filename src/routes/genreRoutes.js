import express from 'express';
import {
  validateGenreId,
  validateGenreQuery,
  validateCreateGenre,
  validateUpdateGenre,
} from '../middleware/genreValidators.js';

import {
  getAllGenresHandler,
  getGenreByIdHandler,
  createGenreHandler,
  updateGenreHandler,
  deleteGenreHandler,
} from '../controllers/genreController.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', validateGenreQuery, getAllGenresHandler);
router.get('/:id', validateGenreId, getGenreByIdHandler);
router.post('/', authenticate, authorizeRoles('admin'), validateCreateGenre, createGenreHandler);
router.put('/:id', validateGenreId, authenticate, authorizeRoles('admin'), validateUpdateGenre, updateGenreHandler);
router.delete('/:id', validateGenreId, authenticate, authorizeRoles('admin'), deleteGenreHandler);

export default router;






