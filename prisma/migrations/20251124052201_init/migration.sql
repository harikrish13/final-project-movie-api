-- CreateTable
CREATE TABLE "User" (
    "USER_ID" SERIAL NOT NULL,
    "UserName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password_hash" TEXT NOT NULL,
    "Role" TEXT NOT NULL,
    "Created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("USER_ID")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "Id" SERIAL NOT NULL,
    "User_ID" INTEGER NOT NULL,
    "Movie_ID" INTEGER NOT NULL,
    "Ratings" DOUBLE PRECISION,
    "Title" TEXT,
    "Content" TEXT,
    "Created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Movies" (
    "Id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT,
    "Release_date" TIMESTAMP(3),
    "Director" TEXT,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Genres" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Genres_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "MovieGenres" (
    "Movie_ID" INTEGER NOT NULL,
    "Genre_ID" INTEGER NOT NULL,

    CONSTRAINT "MovieGenres_pkey" PRIMARY KEY ("Movie_ID","Genre_ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Genres_Name_key" ON "Genres"("Name");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "User"("USER_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_Movie_ID_fkey" FOREIGN KEY ("Movie_ID") REFERENCES "Movies"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenres" ADD CONSTRAINT "MovieGenres_Movie_ID_fkey" FOREIGN KEY ("Movie_ID") REFERENCES "Movies"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenres" ADD CONSTRAINT "MovieGenres_Genre_ID_fkey" FOREIGN KEY ("Genre_ID") REFERENCES "Genres"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
