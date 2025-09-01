import { Module } from '@nestjs/common';
import { FilmesModule } from './filmes/filmes.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { FilmesController } from './filmes/filmes.controller';
import { FilmesService } from './filmes/filmes.service';
import { CloudinaryService } from './filmes/cloudinary.service';

@Module({
  imports: [FilmesModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
