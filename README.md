# Library Management System

A NestJS API backed by PostgreSQL and Prisma for managing a library catalog.

## Development setup

1. Change into the API directory and install dependencies:

   ```bash
   cd api
   npm install
   ```

2. Copy `.env.example` to `.env` and set `DATABASE_URL` and `DIRECT_URL` to your Supabase PostgreSQL session-pooler connection string. Keep `.env` private.

3. Apply migrations and seed the catalog:

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. Start the API in development mode:

   ```bash
   npm run start:dev
   ```

## Schema Decisions

`Book` references `Genre` through the `genreId` foreign key. A genre is a shared piece of catalog data that can belong to many books, so storing it as its own row avoids repeating genre names on every book. The relation also lets PostgreSQL enforce that each book points to an existing genre and makes it straightforward to query books together with their genre.

`User` stores a `Role` enum with `PATRON` and `LIBRARIAN` values. This keeps role values consistent and makes the intended user roles explicit in the schema.

## Prisma and document databases

One difference I noticed is that Prisma makes relationships explicit with models and foreign keys. In a document database, related data is often embedded in a document, which can make reads convenient but can duplicate shared data such as a genre name across many books.
