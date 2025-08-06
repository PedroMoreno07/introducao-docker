import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFilmesDTO } from './dto/create-filmes.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class FilmesService {
    constructor(private prisma: PrismaService){}
    
    async create(data: Prisma.FilmesCreateInput){
        const newFilm = await this.prisma.filmes.create({data})
    }
    
}
