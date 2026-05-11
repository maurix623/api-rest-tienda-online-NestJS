import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";


export class CreateOrdenProductoDto {
    @ApiProperty()
    @IsNumber()
    idProducto: number;

    @ApiProperty()
    @IsNumber()
    idOrden: number;

    @ApiProperty()
    @IsNumber()
    cantidad: number;

}
