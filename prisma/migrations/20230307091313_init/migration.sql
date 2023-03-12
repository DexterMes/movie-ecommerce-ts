-- CreateTable
CREATE TABLE "TitleAkas" (
    "titleId" TEXT NOT NULL,
    "ordering" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "region" TEXT,
    "language" TEXT,
    "types" TEXT[],
    "attributes" TEXT[],
    "isOriginalTitle" BOOLEAN NOT NULL,

    CONSTRAINT "TitleAkas_pkey" PRIMARY KEY ("titleId")
);

-- CreateTable
CREATE TABLE "Movie" (
    "tconst" TEXT NOT NULL,
    "titleType" TEXT NOT NULL,
    "primaryTitle" TEXT NOT NULL,
    "originalTitle" TEXT NOT NULL,
    "isAdult" BOOLEAN NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "runtimeMinutes" INTEGER,
    "genres" TEXT,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("tconst")
);

-- CreateTable
CREATE TABLE "Crew" (
    "tconst" TEXT NOT NULL,
    "directors" TEXT[],
    "writers" TEXT[],

    CONSTRAINT "Crew_pkey" PRIMARY KEY ("tconst")
);

-- CreateTable
CREATE TABLE "Episode" (
    "tconst" TEXT NOT NULL,
    "parentTconst" TEXT NOT NULL,
    "seasonNumber" INTEGER,
    "episodeNumber" INTEGER,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("tconst")
);

-- CreateTable
CREATE TABLE "Principals" (
    "tconst" TEXT NOT NULL,
    "ordering" INTEGER NOT NULL,
    "nconst" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "job" TEXT,
    "characters" TEXT,

    CONSTRAINT "Principals_pkey" PRIMARY KEY ("tconst")
);

-- CreateTable
CREATE TABLE "Name" (
    "nconst" TEXT NOT NULL,
    "primaryName" TEXT NOT NULL,
    "birthYear" INTEGER,
    "deathYear" INTEGER,
    "primaryProfession" TEXT[],
    "knownForTitles" TEXT[],

    CONSTRAINT "Name_pkey" PRIMARY KEY ("nconst")
);

-- CreateTable
CREATE TABLE "Rating" (
    "tconst" TEXT NOT NULL,
    "averageRating" DOUBLE PRECISION NOT NULL,
    "numVotes" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("tconst")
);

-- CreateIndex
CREATE UNIQUE INDEX "Episode_parentTconst_key" ON "Episode"("parentTconst");

-- AddForeignKey
ALTER TABLE "TitleAkas" ADD CONSTRAINT "TitleAkas_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Movie"("tconst") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crew" ADD CONSTRAINT "Crew_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "Movie"("tconst") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_parentTconst_fkey" FOREIGN KEY ("parentTconst") REFERENCES "Movie"("tconst") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "Movie"("tconst") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Principals" ADD CONSTRAINT "Principals_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "Movie"("tconst") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Principals" ADD CONSTRAINT "Principals_nconst_fkey" FOREIGN KEY ("nconst") REFERENCES "Name"("nconst") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "Movie"("tconst") ON DELETE RESTRICT ON UPDATE CASCADE;
