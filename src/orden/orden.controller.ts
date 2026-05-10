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

import { OrdenService } from './orden.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

@ApiTags('ordenes')
@Controller('ordenes')
export class OrdenController {
  constructor(private readonly ordenService: OrdenService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva orden',
    description: 'Crea una nueva orden asociada a un cliente existente',
  })
  @ApiBody({
    type: CreateOrdenDto,
    description: 'Datos necesarios para crear una orden',
  })
  @ApiResponse({
    status: 201,
    description: 'Orden creada correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado',
  })
  create(
    @Body()
    createOrdenDto: CreateOrdenDto,
  ) {
    return this.ordenService.create(createOrdenDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar órdenes',
    description: 'Obtiene todas las órdenes registradas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de órdenes obtenida correctamente',
  })
  findAll() {
    return this.ordenService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener orden por id',
    description: 'Obtiene una orden específica con todos sus productos',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la orden',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Orden encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Orden no encontrada',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.ordenService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar orden',
    description: 'Actualiza parcialmente una orden existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la orden',
    example: 1,
  })
  @ApiBody({
    type: UpdateOrdenDto,
    description: 'Datos necesarios para actualizar una orden',
  })
  @ApiResponse({
    status: 200,
    description: 'Orden actualizada correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Orden no encontrada',
  })
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updateOrdenDto: UpdateOrdenDto,
  ) {
    return this.ordenService.update(id, updateOrdenDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar orden',
    description: 'Realiza un borrado lógico de una orden',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la orden',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Orden eliminada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Orden no encontrada',
  })
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.ordenService.remove(id);
  }
}
