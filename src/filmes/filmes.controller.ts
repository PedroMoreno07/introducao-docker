import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { CreateFilmesDTO } from './dto/create-filmes.dto';
import { CloudinaryService } from './cloudinary.service';
import { File as MulterFile } from 'multer'
import { BadRequestException } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('filmes')
export class FilmesController {
    constructor( private service:FilmesService, private cloudinary: CloudinaryService ){}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 3 }]))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({summary: "Casdastrar um novo livro"})
    @ApiBody({
        description: "Formulario com os dados dos Filmes.",
        schema: {
            type: "object",
            required: ["name", "director", "synopsis", "gender", "releaser", "images"],
            properties: {
                name: {type: "string", example: "harry potter prisioneiro de azkaban"},
                director: {type: "string", example: "Alfonso Cuarón"},
                synopsis: {
                    type: "string", 
                    example: `É o início do terceiro ano na escola de bruxaria Hogwarts. 
                    Harry, Ron e Hermione têm muito o que aprender. Mas uma ameaça ronda 
                    a escola e ela se chama Sirius Black. Após doze anos encarcerado na 
                    prisão de Azkaban, ele consegue escapar e volta para vingar seu mestre, 
                    Lord Voldemort. Para piorar, os Dementores, guardas supostamente enviados
                    para proteger Hogwarts e seguir os passos de Black, parecem ser ameaças 
                    ainda mais perigosas.`},
                gender: {type: "string", enum: ["ACAO",
                    "AVENTURA",
                    "COMEDIA",
                    "DRAMA",
                    "FICCAO",
                    "TERROR",
                    "ROMANCE",
                    "FANTASIA",
                    "MUSICAL",
                    "DOCUMENTARIO",]},
                releaser: {type: "string", example: "04-06-2004"},
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                    description: 'Máximo de 3 imagens',
                },
                
            }

        }
    })
    @ApiResponse({status: 201, description: "Filme criado com sucesso."})
    @ApiResponse({status: 400, description: "Dados inválidos fornecidos."})
    @ApiResponse({status: 500, description: "Erro interno do servidor."})
    async create(@Body() data: CreateFilmesDTO, @UploadedFiles() files: {images?: MulterFile[]}){
        if (!files.images || files.images.length === 0) {
            throw new BadRequestException('Pelo menos uma imagem deve ser enviada.');
        }

        const imageUrls = await Promise.all(
            files.images.map((file) => this.cloudinary.uploadImage(file.buffer)))

        return this.service.create({
            ...data,
            images: imageUrls, // Aqui você injeta as URLs para salvar
        });
    }
}
