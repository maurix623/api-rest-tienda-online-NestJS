import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNumber, IsString } from "class-validator";


export class CreateProductoDto {

    @ApiProperty()
    @IsNumber()
    idCategoria: number;

    @ApiProperty()
    @IsString()
    nombre: string;
    
    @ApiProperty()
    @IsString()
    descripcion: string;

    @ApiProperty()
    @IsNumber()
    precio: number;

    @ApiProperty()
    @IsNumber()
    stock: number; 


}
