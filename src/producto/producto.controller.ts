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

import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@ApiTags('productos')
@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo producto',
    description: 'Crea un nuevo producto asociado a una categoría existente',
  })
  @ApiBody({
    type: CreateProductoDto,
    description: 'Datos necesarios para crear un producto',
  })
  @ApiResponse({
    status: 201,
    description: 'Producto creado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  create(
    @Body()
    createProductoDto: CreateProductoDto,
  ) {
    return this.productoService.create(createProductoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar productos',
    description: 'Obtiene todos los productos registrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida correctamente',
  })
  findAll() {
    return this.productoService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener producto por id',
    description: 'Obtiene un producto específico incluyendo su categoría',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del producto',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.productoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar producto',
    description: 'Actualiza parcialmente un producto existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del producto',
    example: 1,
  })
  @ApiBody({
    type: UpdateProductoDto,
    description: 'Datos necesarios para actualizar un producto',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto o categoría no encontrada',
  })
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updateProductoDto: UpdateProductoDto,
  ) {
    return this.productoService.update(id, updateProductoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar producto',
    description: 'Realiza un borrado lógico de un producto',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del producto',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Producto eliminado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.productoService.remove(id);
  }
}
