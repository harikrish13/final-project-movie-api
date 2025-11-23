import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js';

const password = 'password123';
const passwordHash = await bcrypt.hash(password, 10);

try {
  console.log('Starting seed...');

  // Clear existing data (optional - uncomment if you want to reset)
  // await prisma.movieGenre.deleteMany();
  // await prisma.review.deleteMany();
  // await prisma.movie.deleteMany();
  // await prisma.genre.deleteMany();
  // await prisma.user.deleteMany();

  // Insert Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        UserName: 'admin',
        Email: 'admin@movieapi.com',
        Password_hash: passwordHash,
        Role: 'admin',
      },
    }),
    prisma.user.create({
      data: {
        UserName: 'john_doe',
        Email: 'john@example.com',
        Password_hash: passwordHash,
        Role: 'user',
      },
    }),
    prisma.user.create({
      data: {
        UserName: 'jane_smith',
        Email: 'jane@example.com',
        Password_hash: passwordHash,
        Role: 'user',
      },
    }),
    prisma.user.create({
      data: {
        UserName: 'bob_wilson',
        Email: 'bob@example.com',
        Password_hash: passwordHash,
        Role: 'user',
      },
    }),
  ]);

  console.log(`Created ${users.length} users`);

  // Insert Genres
  const genres = await Promise.all([
    prisma.genre.create({ data: { Name: 'Action' } }),
    prisma.genre.create({ data: { Name: 'Comedy' } }),
    prisma.genre.create({ data: { Name: 'Drama' } }),
    prisma.genre.create({ data: { Name: 'Thriller' } }),
    prisma.genre.create({ data: { Name: 'Sci-Fi' } }),
    prisma.genre.create({ data: { Name: 'Horror' } }),
    prisma.genre.create({ data: { Name: 'Romance' } }),
    prisma.genre.create({ data: { Name: 'Adventure' } }),
    prisma.genre.create({ data: { Name: 'Fantasy' } }),
    prisma.genre.create({ data: { Name: 'Crime' } }),
  ]);

  console.log(`Created ${genres.length} genres`);

  // Insert Movies
  const movies = await Promise.all([
    prisma.movie.create({
      data: {
        Title: 'The Dark Knight',
        Description:
          'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        Release_date: new Date('2008-07-18'),
        Director: 'Christopher Nolan',
      },
    }),
    prisma.movie.create({
      data: {
        Title: 'Inception',
        Description:
          'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        Release_date: new Date('2010-07-16'),
        Director: 'Christopher Nolan',
      },
    }),
    prisma.movie.create({
      data: {
        Title: 'The Matrix',
        Description:
          'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        Release_date: new Date('1999-03-31'),
        Director: 'Lana Wachowski, Lilly Wachowski',
      },
    }),
    prisma.movie.create({
      data: {
        Title: 'Pulp Fiction',
        Description:
          'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        Release_date: new Date('1994-10-14'),
        Director: 'Quentin Tarantino',
      },
    }),
    prisma.movie.create({
      data: {
        Title: 'The Shawshank Redemption',
        Description:
          'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        Release_date: new Date('1994-09-23'),
        Director: 'Frank Darabont',
      },
    }),
    prisma.movie.create({
      data: {
        Title: 'Forrest Gump',
        Description:
          'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
        Release_date: new Date('1994-07-06'),
        Director: 'Robert Zemeckis',
      },
    }),
    prisma.movie.create({
      data: {
        Title: 'The Godfather',
        Description:
          'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        Release_date: new Date('1972-03-24'),
        Director: 'Francis Ford Coppola',
      },
    }),
    prisma.movie.create({
      data: {
        Title: 'Interstellar',
        Description:
          'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        Release_date: new Date('2014-11-07'),
        Director: 'Christopher Nolan',
      },
    }),
    prisma.movie.create({
      data: {
        Title: 'Fight Club',
        Description:
          'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
        Release_date: new Date('1999-10-15'),
        Director: 'David Fincher',
      },
    }),
    prisma.movie.create({
      data: {
        Title: 'The Lord of the Rings: The Fellowship of the Ring',
        Description:
          'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
        Release_date: new Date('2001-12-19'),
        Director: 'Peter Jackson',
      },
    }),
  ]);

  console.log(`Created ${movies.length} movies`);

  // Insert Movie-Genre Relationships
  const movieGenres = [
    // The Dark Knight (Action, Thriller, Crime)
    { Movie_ID: movies[0].Id, Genre_ID: genres[0].Id }, // Action
    { Movie_ID: movies[0].Id, Genre_ID: genres[3].Id }, // Thriller
    { Movie_ID: movies[0].Id, Genre_ID: genres[9].Id }, // Crime
    // Inception (Action, Sci-Fi, Thriller)
    { Movie_ID: movies[1].Id, Genre_ID: genres[0].Id }, // Action
    { Movie_ID: movies[1].Id, Genre_ID: genres[4].Id }, // Sci-Fi
    { Movie_ID: movies[1].Id, Genre_ID: genres[3].Id }, // Thriller
    // The Matrix (Action, Sci-Fi)
    { Movie_ID: movies[2].Id, Genre_ID: genres[0].Id }, // Action
    { Movie_ID: movies[2].Id, Genre_ID: genres[4].Id }, // Sci-Fi
    // Pulp Fiction (Crime, Drama, Thriller)
    { Movie_ID: movies[3].Id, Genre_ID: genres[9].Id }, // Crime
    { Movie_ID: movies[3].Id, Genre_ID: genres[2].Id }, // Drama
    { Movie_ID: movies[3].Id, Genre_ID: genres[3].Id }, // Thriller
    // The Shawshank Redemption (Drama)
    { Movie_ID: movies[4].Id, Genre_ID: genres[2].Id }, // Drama
    // Forrest Gump (Drama, Romance)
    { Movie_ID: movies[5].Id, Genre_ID: genres[2].Id }, // Drama
    { Movie_ID: movies[5].Id, Genre_ID: genres[6].Id }, // Romance
    // The Godfather (Crime, Drama)
    { Movie_ID: movies[6].Id, Genre_ID: genres[9].Id }, // Crime
    { Movie_ID: movies[6].Id, Genre_ID: genres[2].Id }, // Drama
    // Interstellar (Drama, Sci-Fi, Adventure)
    { Movie_ID: movies[7].Id, Genre_ID: genres[2].Id }, // Drama
    { Movie_ID: movies[7].Id, Genre_ID: genres[4].Id }, // Sci-Fi
    { Movie_ID: movies[7].Id, Genre_ID: genres[7].Id }, // Adventure
    // Fight Club (Drama, Thriller)
    { Movie_ID: movies[8].Id, Genre_ID: genres[2].Id }, // Drama
    { Movie_ID: movies[8].Id, Genre_ID: genres[3].Id }, // Thriller
    // The Lord of the Rings (Adventure, Fantasy, Drama)
    { Movie_ID: movies[9].Id, Genre_ID: genres[7].Id }, // Adventure
    { Movie_ID: movies[9].Id, Genre_ID: genres[8].Id }, // Fantasy
    { Movie_ID: movies[9].Id, Genre_ID: genres[2].Id }, // Drama
  ];

  await prisma.movieGenre.createMany({ data: movieGenres });
  console.log(`Created ${movieGenres.length} movie-genre relationships`);

  // Insert Reviews
  const reviews = [
    // Reviews for The Dark Knight
    {
      User_ID: users[1].USER_ID,
      Movie_ID: movies[0].Id,
      Ratings: 9.5,
      Title: 'Masterpiece',
      Content:
        'One of the best superhero movies ever made. Heath Ledger\'s performance is phenomenal.',
    },
    {
      User_ID: users[2].USER_ID,
      Movie_ID: movies[0].Id,
      Ratings: 9.0,
      Title: 'Excellent Film',
      Content: 'Great action sequences and compelling story. Highly recommended!',
    },
    // Reviews for Inception
    {
      User_ID: users[1].USER_ID,
      Movie_ID: movies[1].Id,
      Ratings: 9.0,
      Title: 'Mind-bending',
      Content: 'Complex and thought-provoking. Christopher Nolan at his best.',
    },
    {
      User_ID: users[3].USER_ID,
      Movie_ID: movies[1].Id,
      Ratings: 8.5,
      Title: 'Great Concept',
      Content: 'The dream within a dream concept is executed brilliantly.',
    },
    // Reviews for The Matrix
    {
      User_ID: users[2].USER_ID,
      Movie_ID: movies[2].Id,
      Ratings: 9.5,
      Title: 'Revolutionary',
      Content:
        'Changed the way we think about sci-fi movies. Groundbreaking special effects.',
    },
    {
      User_ID: users[3].USER_ID,
      Movie_ID: movies[2].Id,
      Ratings: 9.0,
      Title: 'Iconic',
      Content: 'A true classic that still holds up today.',
    },
    // Reviews for Pulp Fiction
    {
      User_ID: users[1].USER_ID,
      Movie_ID: movies[3].Id,
      Ratings: 9.0,
      Title: 'Tarantino Classic',
      Content: 'Non-linear storytelling at its finest. Great dialogue and characters.',
    },
    {
      User_ID: users[2].USER_ID,
      Movie_ID: movies[3].Id,
      Ratings: 8.5,
      Title: 'Entertaining',
      Content: 'Quirky and entertaining. A must-watch for film enthusiasts.',
    },
    // Reviews for The Shawshank Redemption
    {
      User_ID: users[1].USER_ID,
      Movie_ID: movies[4].Id,
      Ratings: 10.0,
      Title: 'Perfect Film',
      Content: 'A story of hope and friendship. One of the greatest films ever made.',
    },
    {
      User_ID: users[3].USER_ID,
      Movie_ID: movies[4].Id,
      Ratings: 9.5,
      Title: 'Emotional Journey',
      Content: 'Beautifully crafted story that touches the heart.',
    },
    // Reviews for Forrest Gump
    {
      User_ID: users[2].USER_ID,
      Movie_ID: movies[5].Id,
      Ratings: 9.0,
      Title: 'Heartwarming',
      Content: 'Tom Hanks delivers an incredible performance. A feel-good movie.',
    },
    {
      User_ID: users[3].USER_ID,
      Movie_ID: movies[5].Id,
      Ratings: 8.5,
      Title: 'Great Story',
      Content: 'Touching and inspiring. Well worth watching.',
    },
    // Reviews for The Godfather
    {
      User_ID: users[1].USER_ID,
      Movie_ID: movies[6].Id,
      Ratings: 10.0,
      Title: 'Cinematic Excellence',
      Content: 'The perfect crime drama. Marlon Brando is outstanding.',
    },
    {
      User_ID: users[2].USER_ID,
      Movie_ID: movies[6].Id,
      Ratings: 9.5,
      Title: 'Classic',
      Content: 'A masterpiece of filmmaking. Every scene is perfect.',
    },
    // Reviews for Interstellar
    {
      User_ID: users[1].USER_ID,
      Movie_ID: movies[7].Id,
      Ratings: 9.0,
      Title: 'Epic Sci-Fi',
      Content: 'Visually stunning and emotionally powerful. Great performances.',
    },
    {
      User_ID: users[3].USER_ID,
      Movie_ID: movies[7].Id,
      Ratings: 8.5,
      Title: 'Ambitious',
      Content: 'Complex story with beautiful visuals. A bit long but worth it.',
    },
    // Reviews for Fight Club
    {
      User_ID: users[2].USER_ID,
      Movie_ID: movies[8].Id,
      Ratings: 9.0,
      Title: 'Thought-Provoking',
      Content: 'A dark and twisted tale that makes you think. Great twist ending.',
    },
    {
      User_ID: users[3].USER_ID,
      Movie_ID: movies[8].Id,
      Ratings: 8.0,
      Title: 'Unique',
      Content: 'Different from typical movies. Brad Pitt and Edward Norton are great.',
    },
    // Reviews for The Lord of the Rings
    {
      User_ID: users[1].USER_ID,
      Movie_ID: movies[9].Id,
      Ratings: 9.5,
      Title: 'Epic Fantasy',
      Content: 'Brings Tolkien\'s world to life beautifully. Stunning cinematography.',
    },
    {
      User_ID: users[2].USER_ID,
      Movie_ID: movies[9].Id,
      Ratings: 9.0,
      Title: 'Adventure Classic',
      Content: 'A fantastic start to an epic trilogy. Great characters and world-building.',
    },
  ];

  await prisma.review.createMany({ data: reviews });
  console.log(`Created ${reviews.length} reviews`);

  console.log('\n✅ Seed completed successfully!');
  console.log(`\nAll users have password: "${password}"`);
} catch (error) {
  console.error('❌ Seed failed:', error);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}

