import * as movieRepo from '../respositories/movieRepo.js';
import * as genreRepo from '../respositories/genreRepo.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

export async function getAllMovies(filters = {}) {
  const result = await movieRepo.findAllMovies(filters);
  return {
    movies: result.movies,
    pagination: {
      page: result.page,
      limit: result.limit,
      total: result.total,
      pages: Math.ceil(result.total / result.limit)
    }
  };
}

export async function getMovieById(movieId) {
  if (isNaN(movieId)) {
    throw new ValidationError('Invalid movie ID');
  }

  const movie = await movieRepo.findMovieById(movieId);
  if (!movie) {
    throw new NotFoundError('Movie');
  }

  return movie;
}

export async function createMovie(movieData) {
  const { title, description, release_date, director, genreIds = [] } = movieData;

  if (genreIds.length > 0) {
    const genres = await genreRepo.findGenresByIds(genreIds);
    if (genres.length !== genreIds.length) {
      throw new ValidationError('One or more genre IDs are invalid');
    }
  }

  return movieRepo.createMovie({
    title,
    description,
    release_date,
    director,
    genreIds
  });
}

export async function updateMovie(movieId, movieData) {
  if (isNaN(movieId)) {
    throw new ValidationError('Invalid movie ID');
  }

  const movie = await movieRepo.findMovieById(movieId);
  if (!movie) {
    throw new NotFoundError('Movie');
  }

  const { genreIds } = movieData;

  if (genreIds !== undefined && genreIds.length > 0) {
    const genres = await genreRepo.findGenresByIds(genreIds);
    if (genres.length !== genreIds.length) {
      throw new ValidationError('One or more genre IDs are invalid');
    }
  }

  return movieRepo.updateMovieById(movieId, movieData);
}

export async function deleteMovie(movieId) {
  if (isNaN(movieId)) {
    throw new ValidationError('Invalid movie ID');
  }

  const movie = await movieRepo.findMovieById(movieId);
  if (!movie) {
    throw new NotFoundError('Movie');
  }

  await movieRepo.deleteMovieById(movieId);
}
