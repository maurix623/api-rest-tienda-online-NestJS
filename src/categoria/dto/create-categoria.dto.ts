import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateCategoriaDto {
    @ApiProperty()
    @IsString()
    nombre: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    descripcion: string;

}
