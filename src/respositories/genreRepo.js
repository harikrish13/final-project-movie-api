import prisma from '../config/db.js';

export async function findAllGenres(filters = {}) {
  const { page = 1, limit = 100 } = filters;
  const skip = (page - 1) * limit;

  const [genres, total] = await Promise.all([
    prisma.genre.findMany({
      skip,
      take: limit,
      include: {
        _count: {
          select: {
            MovieGenres: true
          }
        }
      },
      orderBy: {
        Name: 'asc'
      }
    }),
    prisma.genre.count()
  ]);

  return { genres, total, page, limit };
}

export async function findGenreById(genreId) {
  return await prisma.genre.findUnique({
    where: { Id: genreId },
    include: {
      MovieGenres: {
        include: {
          Movie: {
            select: {
              Id: true,
              Title: true,
              Release_date: true
            }
          }
        }
      }
    }
  });
}

export async function findGenreByName(name) {
  return await prisma.genre.findUnique({
    where: { Name: name }
  });
}

export async function findGenresByIds(genreIds) {
  return await prisma.genre.findMany({
    where: {
      Id: { in: genreIds }
    }
  });
}

export async function createGenre(genreData) {
  return await prisma.genre.create({
    data: {
      Name: genreData.name
    }
  });
}

export async function updateGenreById(genreId, genreData) {
  return await prisma.genre.update({
    where: { Id: genreId },
    data: {
      Name: genreData.name
    }
  });
}

export async function deleteGenreById(genreId) {
  return await prisma.genre.delete({
    where: { Id: genreId }
  });
}






