import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.genre.findMany({ include: { _count: { select: { books: true } } }, orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const genre = await this.prisma.genre.findUnique({ where: { id }, include: { _count: { select: { books: true } } } });
    if (!genre) throw new NotFoundException(`Genre ${id} not found`);
    return genre;
  }

  async create(dto: CreateGenreDto) {
    try { return await this.prisma.genre.create({ data: dto }); }
    catch (error) { this.handlePrismaError(error); }
  }

  async update(id: number, dto: UpdateGenreDto) {
    await this.findOne(id);
    try { return await this.prisma.genre.update({ where: { id }, data: dto }); }
    catch (error) { this.handlePrismaError(error); }
  }

  async remove(id: number) {
    await this.findOne(id);
    try { return await this.prisma.genre.delete({ where: { id } }); }
    catch (error) { this.handlePrismaError(error); }
  }

  private handlePrismaError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') throw new ConflictException('A genre with that name or slug already exists');
      if (error.code === 'P2003') throw new ConflictException('Cannot delete a genre while books reference it');
    }
    throw error;
  }
}
