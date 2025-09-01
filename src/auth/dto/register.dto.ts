import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"

export class RegisterDTO {
    @ApiProperty({example: "Pedro"})
    @IsString()
    @IsNotEmpty()
    name: string
    @ApiProperty({example: "pedro@gmail.com"})
    @IsEmail()
    @IsNotEmpty()
    email: string
    @ApiProperty({example: "pedro123"})
    @IsString()
    @IsNotEmpty()
    password: string
}