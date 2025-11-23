import {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} from '../services/genreService.js';

export async function getAllGenresHandler(req, res) {
  const {
    page = 1,
    limit = 100,
  } = req.query;

  const filters = {
    page: parseInt(page),
    limit: parseInt(limit)
  };

  const result = await getAllGenres(filters);
  res.status(200).json(result);
}

export async function getGenreByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const genre = await getGenreById(id);
  res.status(200).json(genre);
}

export async function createGenreHandler(req, res) {
  const data = {
    name: req.body.name
  };
  const newGenre = await createGenre(data);
  res.status(201).json(newGenre);
}

export async function updateGenreHandler(req, res) {
  const id = parseInt(req.params.id);
  const updates = {
    name: req.body.name
  };

  const updatedGenre = await updateGenre(id, updates);
  res.status(200).json(updatedGenre);
}

export async function deleteGenreHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteGenre(id);
  res.status(204).send();
}






