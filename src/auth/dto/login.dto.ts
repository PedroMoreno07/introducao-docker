import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({example: "pedro@gmail.com"})
  @IsEmail()
  email: string;
  
  @ApiProperty({example: "pedro123"})
  @IsString()
  password: string;
}