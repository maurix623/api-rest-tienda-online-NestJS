import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@ApiTags('categorias')
@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva categoría',
    description: 'Crea una nueva categoría en el sistema',
  })
  @ApiBody({
    type: CreateCategoriaDto,
    description: 'Datos necesarios para crear una categoría',
  })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  create(
    @Body()
    createCategoriaDto: CreateCategoriaDto,
  ) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar categorías',
    description: 'Obtiene todas las categorías registradas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías obtenida correctamente',
  })
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener categoría por id',
    description: 'Obtiene una categoría específica mediante su id',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.categoriaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar categoría',
    description: 'Actualiza parcialmente una categoría existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría',
    example: 1,
  })
  @ApiBody({
    type: UpdateCategoriaDto,
    description: 'Datos necesarios para actualizar una categoría',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar categoría',
    description: 'Realiza un borrado lógico de una categoría',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría eliminada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.categoriaService.remove(id);
  }
}
