import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from '../services/movieService.js';

export async function getAllMoviesHandler(req, res) {
  const {
    page = 1,
    limit = 10,
    genre,
    search = '',
  } = req.query;

  const filters = {
    page: parseInt(page),
    limit: parseInt(limit),
    genreId: genre ? parseInt(genre) : null,
    search
  };

  const result = await getAllMovies(filters);
  res.status(200).json(result);
}

export async function getMovieByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const movie = await getMovieById(id);
  res.status(200).json(movie);
}

export async function createMovieHandler(req, res) {
  const data = {
    title: req.body.title,
    description: req.body.description,
    release_date: req.body.release_date,
    director: req.body.director,
    genreIds: req.body.genreIds || []
  };
  const newMovie = await createMovie(data);
  res.status(201).json(newMovie);
}

export async function updateMovieHandler(req, res) {
  const id = parseInt(req.params.id);
  const updates = {};
  if (req.body.title !== undefined) updates.title = req.body.title;
  if (req.body.description !== undefined) updates.description = req.body.description;
  if (req.body.release_date !== undefined) updates.release_date = req.body.release_date;
  if (req.body.director !== undefined) updates.director = req.body.director;
  if (req.body.genreIds !== undefined) updates.genreIds = req.body.genreIds;

  const updatedMovie = await updateMovie(id, updates);
  res.status(200).json(updatedMovie);
}

export async function deleteMovieHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteMovie(id);
  res.status(204).send();
}






