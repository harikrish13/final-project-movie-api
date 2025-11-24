import prisma from '../config/db.js';
export async function findAllReviews(filters = {}) {
  const { page = 1, limit = 10, movieId, userId } = filters;
  const skip = (page - 1) * limit;

  const where = {};
  if (movieId) where.Movie_ID = movieId;
  if (userId) where.User_ID = userId;

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where,
      skip,
      take: limit,
      include: {
        User: {
          select: {
            USER_ID: true,
            UserName: true
          }
        },
        Movie: {
          select: {
            Id: true,
            Title: true
          }
        }
      },
      orderBy: {
        Created_at: 'desc'
      }
    }),
    prisma.review.count({ where })
  ]);

  return { reviews, total, page, limit };
}

export async function findReviewById(reviewId) {
  return await prisma.review.findUnique({
    where: { Id: reviewId },
    include: {
      User: {
        select: {
          USER_ID: true,
          UserName: true,
          Email: true
        }
      },
      Movie: {
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
      }
    }
  });
}

export async function findReviewByUserAndMovie(userId, movieId) {
  return await prisma.review.findFirst({
    where: {
      Movie_ID: movieId,
      User_ID: userId
    }
  });
}

export async function createReview(reviewData) {
  const { userId, movieId, ratings, title, content } = reviewData;

  return await prisma.review.create({
    data: {
      User_ID: userId,
      Movie_ID: movieId,
      Ratings: ratings,
      Title: title,
      Content: content
    },
    include: {
      User: {
        select: {
          USER_ID: true,
          UserName: true
        }
      },
      Movie: {
        select: {
          Id: true,
          Title: true
        }
      }
    }
  });
}

export async function updateReviewById(reviewId, reviewData) {
  const { ratings, title, content } = reviewData;

  const updateData = {};
  if (ratings !== undefined) updateData.Ratings = ratings;
  if (title !== undefined) updateData.Title = title;
  if (content !== undefined) updateData.Content = content;

  return await prisma.review.update({
    where: { Id: reviewId },
    data: updateData,
    include: {
      User: {
        select: {
          USER_ID: true,
          UserName: true
        }
      },
      Movie: {
        select: {
          Id: true,
          Title: true
        }
      }
    }
  });
}

export async function deleteReviewById(reviewId) {
  return await prisma.review.delete({
    where: { Id: reviewId }
  });
}






