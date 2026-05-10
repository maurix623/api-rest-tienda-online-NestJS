import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";


export class CreateClienteDto {
    @ApiProperty()
    @IsString()
    nombres: string;

    @ApiProperty()
    @IsString()
    paterno: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    materno: string;

    @ApiProperty()
    @IsEmail()
    email: string;
}
