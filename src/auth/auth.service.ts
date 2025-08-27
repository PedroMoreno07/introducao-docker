import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}

    async register(data: Prisma.UsersCreateInput){
        return this.prisma.users.create({data})
    }


}
