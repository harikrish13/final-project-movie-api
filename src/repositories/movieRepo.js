import prisma from '../config/db.js';

export async function findAllMovies(filters = {}) {
  const { page = 1, limit = 10, genreId, search } = filters;
  const skip = (page - 1) * limit;

  const where = {};

  if (search) {
    where.OR = [
      { Title: { contains: search, mode: 'insensitive' } },
      { Description: { contains: search, mode: 'insensitive' } },
      { Director: { contains: search, mode: 'insensitive' } }
    ];
  }

  if (genreId) {
    where.MovieGenres = {
      some: {
        Genre_ID: genreId
      }
    };
  }

  const [movies, total] = await Promise.all([
    prisma.movie.findMany({
      where,
      skip,
      take: limit,
      include: {
        MovieGenres: {
          include: {
            Genre: {
              select: {
                Id: true,
                Name: true
              }
            }
          }
        },
        _count: {
          select: {
            Reviews: true
          }
        }
      },
      orderBy: {
        Id: 'desc'
      }
    }),
    prisma.movie.count({ where })
  ]);

  return { movies, total, page, limit };
}

export async function findMovieById(movieId) {
  return await prisma.movie.findUnique({
    where: { Id: movieId },
    include: {
      MovieGenres: {
        include: {
          Genre: {
            select: {
              Id: true,
              Name: true
            }
          }
        }
      },
      Reviews: {
        include: {
          User: {
            select: {
              USER_ID: true,
              UserName: true
            }
          }
        },
        orderBy: {
          Created_at: 'desc'
        }
      }
    }
  });
}

export async function createMovie(movieData) {
  const { title, description, release_date, director, genreIds = [] } = movieData;

  return await prisma.movie.create({
    data: {
      Title: title,
      Description: description,
      Release_date: release_date ? new Date(release_date) : null,
      Director: director,
      MovieGenres: {
        create: genreIds.map(genreId => ({
          Genre_ID: genreId
        }))
      }
    },
    include: {
      MovieGenres: {
        include: {
          Genre: {
            select: {
              Id: true,
              Name: true
            }
          }
        }
      }
    }
  });
}

export async function updateMovieById(movieId, movieData) {
  const { title, description, release_date, director, genreIds } = movieData;

  const updateData = {};
  if (title !== undefined) updateData.Title = title;
  if (description !== undefined) updateData.Description = description;
  if (release_date !== undefined) updateData.Release_date = release_date ? new Date(release_date) : null;
  if (director !== undefined) updateData.Director = director;

  if (genreIds !== undefined) {
    await prisma.movieGenre.deleteMany({
      where: { Movie_ID: movieId }
    });

    updateData.MovieGenres = {
      create: genreIds.map(genreId => ({
        Genre_ID: genreId
      }))
    };
  }

  return await prisma.movie.update({
    where: { Id: movieId },
    data: updateData,
    include: {
      MovieGenres: {
        include: {
          Genre: {
            select: {
              Id: true,
              Name: true
            }
          }
        }
      }
    }
  });
}

export async function deleteMovieById(movieId) {
  return await prisma.movie.delete({
    where: { Id: movieId }
  });
}






