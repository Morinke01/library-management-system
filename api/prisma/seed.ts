import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const fiction = await prisma.genre.upsert({
    where: { slug: 'fiction' },
    update: { name: 'Fiction' },
    create: { name: 'Fiction', slug: 'fiction' },
  });

  const fantasy = await prisma.genre.upsert({
    where: { slug: 'fantasy' },
    update: { name: 'Fantasy' },
    create: { name: 'Fantasy', slug: 'fantasy' },
  });

  const mystery = await prisma.genre.upsert({
    where: { slug: 'mystery' },
    update: { name: 'Mystery' },
    create: { name: 'Mystery', slug: 'mystery' },
  });

  const science = await prisma.genre.upsert({
    where: { slug: 'science' },
    update: { name: 'Science' },
    create: { name: 'Science', slug: 'science' },
  });

  const books = [
    { title: 'The Quiet Harbor', author: 'M. A. Rivers', isbn: '9780000000001', totalCopies: 3, availableCopies: 3, genreId: fiction.id },
    { title: 'City of Paper', author: 'Lena Brooks', isbn: '9780000000002', totalCopies: 2, availableCopies: 2, genreId: fiction.id },
    { title: 'The Last Orchard', author: 'Jon Bell', isbn: '9780000000003', totalCopies: 4, availableCopies: 4, genreId: fiction.id },
    { title: 'Letters from Winter', author: 'Amara Wells', isbn: '9780000000004', totalCopies: 3, availableCopies: 3, genreId: fiction.id },
    { title: 'A Map of Ashes', author: 'N. K. Vale', isbn: '9780000000005', totalCopies: 3, availableCopies: 3, genreId: fantasy.id },
    { title: 'The Glass Kingdom', author: 'R. M. Sol', isbn: '9780000000006', totalCopies: 2, availableCopies: 2, genreId: fantasy.id },
    { title: 'Wolves of the Moon', author: 'Tara Wren', isbn: '9780000000007', totalCopies: 5, availableCopies: 5, genreId: fantasy.id },
    { title: 'The Ember Crown', author: 'D. J. North', isbn: '9780000000008', totalCopies: 3, availableCopies: 3, genreId: fantasy.id },
    { title: 'The Clockmaker Case', author: 'Elliot March', isbn: '9780000000009', totalCopies: 2, availableCopies: 2, genreId: mystery.id },
    { title: 'Murder at Cedar House', author: 'S. J. Rowan', isbn: '9780000000010', totalCopies: 3, availableCopies: 3, genreId: mystery.id },
    { title: 'The Vanishing Key', author: 'Mina Hart', isbn: '9780000000011', totalCopies: 4, availableCopies: 4, genreId: mystery.id },
    { title: 'A Study in Blue', author: 'Caleb Finch', isbn: '9780000000012', totalCopies: 2, availableCopies: 2, genreId: mystery.id },
    { title: 'Small Worlds, Big Ideas', author: 'A. Chen', isbn: '9780000000013', totalCopies: 2, availableCopies: 2, genreId: science.id },
    { title: 'Signals from Space', author: 'Priya Das', isbn: '9780000000014', totalCopies: 4, availableCopies: 4, genreId: science.id },
    { title: 'The Living Cell', author: 'Evan Cole', isbn: '9780000000015', totalCopies: 3, availableCopies: 3, genreId: science.id },
    { title: 'Weather on Other Worlds', author: 'Noah Kim', isbn: '9780000000016', totalCopies: 2, availableCopies: 2, genreId: science.id },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: book,
      create: book,
    });
  }

  console.log(`Seeded ${books.length} books across 4 genres.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
