import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksQueryDto } from './dto/books-query.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: BooksQueryDto) {
    const { genreId, search, page = 1, limit = 20 } = query;
    const where: Prisma.BookWhereInput = {
      ...(genreId ? { genreId } : {}),
      ...(search ? { OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
      ] } : {}),
    };
    const safeLimit = Math.min(limit, 100);
    const [data, total] = await this.prisma.$transaction([
      this.prisma.book.findMany({ where, include: { genre: true }, orderBy: { id: 'asc' }, skip: (page - 1) * safeLimit, take: safeLimit }),
      this.prisma.book.count({ where }),
    ]);
    return { data, pagination: { page, limit: safeLimit, total, totalPages: Math.ceil(total / safeLimit) } };
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id }, include: { genre: true } });
    if (!book) throw new NotFoundException(`Book ${id} not found`);
    return book;
  }

  async create(dto: CreateBookDto) {
    try { return await this.prisma.book.create({ data: { ...dto, availableCopies: dto.totalCopies }, include: { genre: true } }); }
    catch (error) { this.handlePrismaError(error); }
  }

  async update(id: number, dto: UpdateBookDto) {
    const current = await this.findOne(id);
    const data: Prisma.BookUpdateInput = { ...dto };
    if (dto.totalCopies !== undefined) {
      const borrowed = current.totalCopies - current.availableCopies;
      if (dto.totalCopies < borrowed) throw new ConflictException(`At least ${borrowed} copies are currently borrowed`);
      data.availableCopies = dto.totalCopies - borrowed;
    }
    try { return await this.prisma.book.update({ where: { id }, data, include: { genre: true } }); }
    catch (error) { this.handlePrismaError(error); }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.book.delete({ where: { id } });
  }

  private handlePrismaError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') throw new ConflictException('A book with that ISBN already exists');
      if (error.code === 'P2003') throw new NotFoundException('The selected genre does not exist');
    }
    throw error;
  }
}
