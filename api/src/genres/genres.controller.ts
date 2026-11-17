import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get() findAll() { return this.genresService.findAll(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.genresService.findOne(id); }

  @Post() @UseGuards(JwtAuthGuard, RolesGuard) @Roles('LIBRARIAN')
  create(@Body() dto: CreateGenreDto) { return this.genresService.create(dto); }

  @UseGuards(JwtAuthGuard, RolesGuard) @Roles('LIBRARIAN')
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGenreDto) { return this.genresService.update(id, dto); }

  @UseGuards(JwtAuthGuard, RolesGuard) @Roles('LIBRARIAN')
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.genresService.remove(id); }
}
