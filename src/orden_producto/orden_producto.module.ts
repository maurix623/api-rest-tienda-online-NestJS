import { Module } from '@nestjs/common';
import { OrdenProductoService } from './orden_producto.service';
import { OrdenProductoController } from './orden_producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenProducto } from './entities/orden_producto.entity';
import { Orden } from 'src/orden/entities/orden.entity';
import { Producto } from 'src/producto/entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenProducto, Orden, Producto])],
  controllers: [OrdenProductoController],
  providers: [OrdenProductoService],
})
export class OrdenProductoModule {}
