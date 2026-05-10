import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class CreateOrdenDto {
    @ApiProperty()
    @IsNumber()
    idCliente: number;

    @ApiProperty()
    @IsString()
    estado: string; 

    @ApiProperty()
    @IsNumber()
    total: number;
}
