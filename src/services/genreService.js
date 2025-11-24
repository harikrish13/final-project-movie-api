import * as genreRepo from '../respositories/genreRepo.js';
import { NotFoundError, ConflictError, ValidationError } from '../utils/errors.js';

export async function getAllGenres(filters = {}) {
  const result = await genreRepo.findAllGenres(filters);
  return {
    genres: result.genres,
    pagination: {
      page: result.page,
      limit: result.limit,
      total: result.total,
      pages: Math.ceil(result.total / result.limit)
    }
  };
}

export async function getGenreById(genreId) {
  if (isNaN(genreId)) {
    throw new ValidationError('Invalid genre ID');
  }

  const genre = await genreRepo.findGenreById(genreId);
  if (!genre) {
    throw new NotFoundError('Genre');
  }

  return genre;
}

export async function createGenre(genreData) {
  const { name } = genreData;

  const existingGenre = await genreRepo.findGenreByName(name);
  if (existingGenre) {
    throw new ConflictError('Genre with this name already exists');
  }

  return genreRepo.createGenre({ name });
}

export async function updateGenre(genreId, genreData) {
  if (isNaN(genreId)) {
    throw new ValidationError('Invalid genre ID');
  }

  const genre = await genreRepo.findGenreById(genreId);
  if (!genre) {
    throw new NotFoundError('Genre');
  }

  const { name } = genreData;

  const existingGenre = await genreRepo.findGenreByName(name);
  if (existingGenre && existingGenre.Id !== genreId) {
    throw new ConflictError('Genre with this name already exists');
  }

  return genreRepo.updateGenreById(genreId, { name });
}

export async function deleteGenre(genreId) {
  if (isNaN(genreId)) {
    throw new ValidationError('Invalid genre ID');
  }

  const genre = await genreRepo.findGenreById(genreId);
  if (!genre) {
    throw new NotFoundError('Genre');
  }

  await genreRepo.deleteGenreById(genreId);
}
