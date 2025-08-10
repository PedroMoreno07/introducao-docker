import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFilmesDTO } from './dto/create-filmes.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class FilmesService {
    constructor(private prisma: PrismaService){}
    
    async create(data: Prisma.FilmesCreateInput){
        return await this.prisma.filmes.create({data})
    }

    async getAllFilmes(){
        const foundFilm = await this.prisma.filmes.findMany()

        if(!foundFilm){
            throw new NotFoundException(
                `Nenhum Filme encontrado`
            )
        }

        return foundFilm
        
    }
    
    async findById(id: string){
        const foundFilm = await this.prisma.filmes.findUnique({
            where: {id}
        })

        if(!foundFilm){
            throw new NotFoundException(
                `Nenhum Filme encontrado com ID ${id}`
            )
        }

        return foundFilm
    }
    
}
