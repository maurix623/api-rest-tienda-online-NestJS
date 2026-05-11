import { PartialType } from '@nestjs/swagger';
import { CreateOrdenProductoDto } from './create-orden_producto.dto';

export class UpdateOrdenProductoDto extends PartialType(CreateOrdenProductoDto) {}
