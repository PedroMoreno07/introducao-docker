import { ApiProperty } from "@nestjs/swagger"
import { role } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"

export class UserCreateDTO {
    @ApiProperty({example: "Pedro"})
    @IsString()
    @IsNotEmpty()
    name: string
    @ApiProperty({example: "pedro@gmail.com"})
    @IsString()
    @IsNotEmpty()
    email: string
    @ApiProperty({example: "pedro123"})
    @IsString()
    @IsNotEmpty()
    password: string
    @ApiProperty({example: "ADMIN", enum: role})
    @IsNotEmpty()
    @IsString()
    @IsEnum(role)
    role: role
}