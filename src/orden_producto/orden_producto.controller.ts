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

import { OrdenProductoService } from './orden_producto.service';
import { CreateOrdenProductoDto } from './dto/create-orden_producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden_producto.dto';

@ApiTags('orden_producto')
@Controller('orden_producto')
export class OrdenProductoController {
  constructor(private readonly ordenProductoService: OrdenProductoService) {}

  @Post()
  @ApiOperation({
    summary: 'Agregar producto a una orden',
    description:
      'Crea una relación entre una orden y un producto incluyendo cantidad y precio unitario',
  })
  @ApiBody({
    type: CreateOrdenProductoDto,
    description: 'Datos necesarios para agregar un producto a una orden',
  })
  @ApiResponse({
    status: 201,
    description: 'Producto agregado a la orden correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Orden o producto no encontrado',
  })
  create(
    @Body()
    createOrdenProductoDto: CreateOrdenProductoDto,
  ) {
    return this.ordenProductoService.create(createOrdenProductoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar relaciones orden-producto',
    description: 'Obtiene todas las relaciones entre órdenes y productos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de relaciones obtenida correctamente',
  })
  findAll() {
    return this.ordenProductoService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener relación orden-producto por id',
    description:
      'Obtiene una relación orden-producto incluyendo la orden y el producto relacionados',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la relación orden-producto',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Relación orden-producto encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Relación orden-producto no encontrada',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.ordenProductoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar relación orden-producto',
    description:
      'Actualiza cantidad o precio unitario de un producto dentro de una orden',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la relación orden-producto',
    example: 1,
  })
  @ApiBody({
    type: UpdateOrdenProductoDto,
    description: 'Datos necesarios para actualizar la relación orden-producto',
  })
  @ApiResponse({
    status: 200,
    description: 'Relación orden-producto actualizada correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Relación orden-producto no encontrada',
  })
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updateOrdenProductoDto: UpdateOrdenProductoDto,
  ) {
    return this.ordenProductoService.update(id, updateOrdenProductoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar relación orden-producto',
    description: 'Realiza un borrado lógico de una relación orden-producto',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la relación orden-producto',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Relación orden-producto eliminada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Relación orden-producto no encontrada',
  })
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.ordenProductoService.remove(id);
  }

  @Delete('/orden/:id/productos/:productId')
  @ApiOperation({
    summary: 'Quitar producto de una orden',
    description: 'Elimina un producto específico de una orden',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la orden',
    example: 1,
  })
  @ApiParam({
    name: 'productId',
    description: 'ID del producto',
    example: 2,
  })
  @ApiResponse({
    status: 200,
    description: 'Producto eliminado de la orden correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado en la orden',
  })
  removeProducto(
    @Param('id', ParseIntPipe)
    id: number,

    @Param('productId', ParseIntPipe)
    productId: number,
  ) {
    return this.ordenProductoService.removeProducto(id, productId);
  }
}
