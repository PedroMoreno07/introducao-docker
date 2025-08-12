import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFilmesDTO } from './dto/create-filmes.dto';
import { Filmes, Prisma } from '@prisma/client';

@Injectable()
export class FilmesService {
    constructor(private prisma: PrismaService){}
    
    async create(data: Prisma.FilmesCreateInput){
        return await this.prisma.filmes.create({data})
    }

    async getAllFilmes(){
        const foundFilm = await this.prisma.filmes.findMany()

        if(!foundFilm){
            throw new BadRequestException(
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
            throw new BadRequestException(
                `Nenhum Filme encontrado com ID ${id}`
            )
        }

        return foundFilm
    }

    async update(id: string, data: Prisma.FilmesUpdateInput): Promise<Filmes | null> {
        const found = await this.prisma.filmes.findUnique({
            where: {id}
        })

        if(!found){
            throw new BadRequestException(
                `Nenhum Filme encontado com esse ID ${id}`
            )
        }

        const update = await this.prisma.filmes.update({
            where: {id},
            data
        })

        return update
    }

    async delete(id: string): Promise<Filmes | null> {
        const found = await this.prisma.filmes.findUnique({
            where: {id}
        })

        if(!found){
            throw new BadRequestException(
                `Nenhum Filme encontado com esse ID ${id}`
            )
        }
        
        return await this.prisma.filmes.delete({
            where: {id}
        })
    }
    
}
