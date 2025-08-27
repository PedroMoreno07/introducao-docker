import { Module } from '@nestjs/common';
import { FilmesModule } from './filmes/filmes.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [FilmesModule, PrismaModule, AuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
