import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDTO } from './dto/create-user-dto';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService){}

    async create(@Body() data: UserCreateDTO){
        return this.service.create(data)
    }
}
